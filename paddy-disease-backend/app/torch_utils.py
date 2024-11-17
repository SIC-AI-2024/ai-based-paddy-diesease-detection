import os
import numpy as np
import torch
import torch.nn as nn
import torchvision.transforms as transforms
from PIL import Image
import torchvision.models as models
from sklearn.preprocessing import LabelEncoder
import pickle
import cv2

MEAN=[0.23887189, 0.5860071,  0.49763182]
STD=[0.18352188, 0.22406353, 0.22234197]


label_encoder_path = "./model-files/label_encoder.pkl"
best_model_path = os.path.join('model-files','best_model.pth')   

# Load the LabelEncoder object
with open(label_encoder_path, "rb") as f:
    label_encoder = pickle.load(f)

# Get label mappings
label_mappings = {idx : label for idx, label in enumerate(label_encoder.classes_)}

# Get the number of classes
num_classes = 16225


device = torch.device( "cpu")

class CustomPreprocess:
    def __call__(self, img):
        # Convert PIL image to NumPy array (BGR format, as OpenCV uses BGR by default)
        img = cv2.cvtColor(np.array(img), cv2.COLOR_RGB2BGR)

        # Apply CLAHE (Contrast Limited Adaptive Histogram Equalization)
        clahe = cv2.createCLAHE(clipLimit=1.5, tileGridSize=(4, 4))

        # Split the image into channels
        channels = cv2.split(img)

        # Apply equalization on each channel
        equalized_channels = [clahe.apply(ch) for ch in channels]
        img = cv2.merge(equalized_channels)

        return img

    
transform = transforms.Compose([
    CustomPreprocess(),   
    transforms.ToPILImage(),  # Convert OpenCV image to PIL image
    transforms.Resize((224, 224)),  # Resize to 224x224
    transforms.ToTensor(),  # Convert to Tensor
    transforms.Normalize(mean=MEAN, std=STD)  # Normalize using computed mean and std
])

def create_model(dropout_rate=0.5):
    # Load the pre-trained ResNet50 model
    model = models.resnet50(pretrained=True)

    # Add a Dropout layer before the final fully connected layer
    model.avgpool = nn.Sequential(
        model.avgpool,
        nn.Dropout(p=dropout_rate)  # Dropout layer with the given rate
    )

    # Replace the final fully connected layer to match the number of classes
    model.fc = nn.Linear(model.fc.in_features, num_classes)
    
    # Move the model to the device (CPU or GPU)
    model.to(device)


    
    return model

model = create_model()
model.load_state_dict(torch.load(best_model_path, map_location=device))
model.eval()  # Set the model to evaluation mode
