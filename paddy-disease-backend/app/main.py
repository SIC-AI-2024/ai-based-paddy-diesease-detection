from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import torch
from PIL import Image
import io
from torch_utils import model, transform, label_mappings  
from googlesearch import search


app = Flask(__name__)
cors = CORS(app) # allow CORS for all domains on all routes.
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/predict', methods=['POST'])
@cross_origin()
def predict():
    # Load image from the request
    image_file = request.files['image'].read()  # Read the image file from the request
    img = Image.open(io.BytesIO(image_file))  # Open the image with PIL

    # Apply the transformation
    img = transform(img)  # Transform the image (including preprocessing)

    # Ensure the image is on the correct device (CPU or GPU)
    img = img.unsqueeze(0).to(torch.device("cpu"))  # Add batch dimension and move image to device

    # Model prediction
    model.eval()  # Set the model to evaluation mode
    with torch.no_grad():
        outputs = model(img)  # Forward pass through the model
        _, predicted = torch.max(outputs, 1)  # Get the predicted class index
        predicted_class: str = label_mappings[predicted.item()]  # Map index to class label

    x = predicted_class.split('_')

    disease = " ".join(x)
    query = f"{disease} rice treatments"

    # Perform the search
    if(disease == "normal"):
         search_results=[]
    else:
        search_results = search(query, num_results=40) 

    # Filter out PDFs from the results
    result_links = [
        result for result in search_results if not result.lower().endswith('.pdf')
    ]

    return jsonify({"prediction": disease, "links": result_links})  # Return the predicted class as JSON

if __name__ == '__main__':
    app.run(debug=True)