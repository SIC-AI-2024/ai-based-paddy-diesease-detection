
# Paddy Disease Detection Project

This project aims to detect paddy diseases using a trained  models. The project is divided into three main components: **Model Training**, **Frontend**, and **Backend**.

---

## Dataset Description

The dataset, **Paddy Doctor Dataset**, consists of:
- **13 Classes** of paddy diseases (e.g., bacterial leaf blight, brown spot, etc.).
- **16,000+ RGB Images** collected and labeled for effective model training.

[🔗 Paddy Doctor Dataset](https://paddydoc.github.io/)


---

## 1. Model Training

The model training process involves:
- **Dataset Generation:** Preparing and organizing data for model training and Creating metadata for efficient data handling and preprocessing.
- **Training Notebook:** Kaggle notebooks for training models.

### Kaggle Notebook
The complete training process can be viewed on Kaggle:  
[🔗 Paddy Disease Detection Notebook](https://www.kaggle.com/code/itmaybehimmm/paddy-disease-detection)

---

## 2. Frontend

The frontend is built with **Next.js**. It serves as the user interface for interacting with the detection system.

### Steps to Run the Frontend:
1. Navigate to the frontend folder:
   ```bash
   cd paddy-disease-frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Build the project:
   ```bash
   npm run build
   ```
4. Start the production server:
   ```bash
   npm run start
   ```
   **Or**, for development mode:
   ```bash
   npm run dev
   ```

---

## 3. Backend

The backend is built with **Flask** and handles the model inference and API requests.

### Steps to Run the Backend:
1. Navigate to the backend folder:
   ```bash
   cd paddy-disease-backend
   ```
2. Create a virtual environment:
   ```bash
   python -m venv venv
   ```
3. Activate the virtual environment and install dependencies:
   ```bash
   source venv/bin/activate   # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```
4. Navigate to the application folder:
   ```bash
   cd app
   ```
5. Start the Flask server:
   ```bash
   flask --app main.py run
   ```

---

## Project Structure

```plaintext
.
├── model-training/
│   ├── dataset-generation/
|        ├── <Your Dataset Folder>
│   └── kaggle-notebooks/
├── paddy-disease-frontend/
│   ├── components/
│   ├── app/
│   └── public/
├── paddy-disease-backend/
│   ├── app/
```

---

Feel free to explore the Kaggle notebook and clone this repository to run the system locally.
