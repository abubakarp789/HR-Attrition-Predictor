from flask import Flask, jsonify, request, send_file
from flask_cors import CORS
import pandas as pd
import numpy as np
import joblib
import os
import io
import base64
from werkzeug.utils import secure_filename
import json
from PIL import Image

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Configure upload folder
UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file size

# Global variables to cache models and data
models = {}
datasets = {}

def load_models():
    """Load all ML models"""
    global models
    try:
        models['decision_tree'] = joblib.load('models/decision_tree_model.pkl')
        models['kmeans'] = joblib.load('models/kmeans_model.pkl')
        models['pca'] = joblib.load('models/pca_model.pkl')
        print("Models loaded successfully")
    except Exception as e:
        print(f"Error loading models: {e}")
        models = {}

def load_datasets():
    """Load all datasets"""
    global datasets
    try:
        datasets['original'] = pd.read_csv('data/WA_Fn-UseC_-HR-Employee-Attrition.csv')
        datasets['preprocessed'] = pd.read_csv('data/preprocessed_hr_data.csv')
        datasets['model_metrics'] = pd.read_csv('models/model_metrics.csv')
        datasets['cluster_profiles'] = pd.read_csv('data/cluster_profiles.csv')
        datasets['classification_report'] = pd.read_csv('models/classification_report.csv')
        print("Datasets loaded successfully")
    except Exception as e:
        print(f"Error loading datasets: {e}")

def preprocess_user_data(df, sample_data):
    """Preprocess user uploaded data to match training data format"""
    # Ensure uploaded data has the same columns as trained data
    missing_cols = set(sample_data.columns) - set(df.columns)
    if missing_cols:
        raise ValueError(f"Missing columns in uploaded data: {missing_cols}")
    
    # Remove extra columns
    extra_cols = set(df.columns) - set(sample_data.columns)
    if extra_cols:
        df = df.drop(columns=extra_cols)
    
    # Reorder columns to match training data
    df = df[sample_data.columns]
    
    # Convert float64 to float32
    float_cols = df.select_dtypes(include=['float64']).columns
    df[float_cols] = df[float_cols].astype('float32')
    
    return df

# Initialize models and datasets on startup
load_models()
load_datasets()

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({'status': 'healthy', 'models_loaded': len(models) > 0})

@app.route('/api/dataset-overview', methods=['GET'])
def get_dataset_overview():
    """Get dataset overview information"""
    try:
        if 'original' not in datasets:
            return jsonify({'error': 'Dataset not loaded'}), 500
        
        df = datasets['original']
        
        # Calculate basic statistics
        overview = {
            'total_employees': int(df.shape[0]),
            'total_features': int(df.shape[1]),
            'sample_data': df.head().to_dict('records')
        }
        
        # Calculate turnover rate if available
        if 'left' in df.columns:
            turnover_yes = int(df[df['left'] == 1].shape[0])
            turnover_rate = (turnover_yes / df.shape[0]) * 100
            overview['turnover_rate'] = round(turnover_rate, 2)
        
        # Get department count if available
        if 'Department' in df.columns:
            overview['departments'] = int(df['Department'].nunique())
        
        # Get column information
        col_info = []
        for col in df.columns:
            col_info.append({
                'column': col,
                'type': str(df[col].dtype),
                'non_null_count': int(df[col].count()),
                'null_count': int(df[col].isnull().sum())
            })
        overview['columns'] = col_info
        
        return jsonify(overview)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/model-metrics', methods=['GET'])
def get_model_metrics():
    """Get model performance metrics"""
    try:
        if 'model_metrics' not in datasets:
            return jsonify({'error': 'Model metrics not loaded'}), 500
        
        metrics = datasets['model_metrics'].to_dict('records')[0]
        
        # Also include classification report if available
        classification_data = None
        if 'classification_report' in datasets:
            classification_data = datasets['classification_report'].to_dict('records')
        
        return jsonify({
            'metrics': metrics,
            'classification_report': classification_data
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/cluster-profiles', methods=['GET'])
def get_cluster_profiles():
    """Get cluster analysis profiles"""
    try:
        if 'cluster_profiles' not in datasets:
            return jsonify({'error': 'Cluster profiles not loaded'}), 500
        
        profiles = datasets['cluster_profiles'].to_dict('records')
        return jsonify(profiles)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/images/<path:filename>', methods=['GET'])
def serve_image(filename):
    """Serve images from the images directory"""
    try:
        image_path = os.path.join('images', filename)
        if os.path.exists(image_path):
            return send_file(image_path)
        else:
            return jsonify({'error': 'Image not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/predict', methods=['POST'])
def predict_turnover():
    """Predict turnover for uploaded data or sample data"""
    try:
        if 'decision_tree' not in models:
            return jsonify({'error': 'Decision tree model not loaded'}), 500
        
        use_sample = request.form.get('use_sample', 'false').lower() == 'true'
        
        if use_sample:
            # Use sample data
            if 'preprocessed' not in datasets:
                return jsonify({'error': 'Preprocessed data not loaded'}), 500
            
            sample_data = datasets['preprocessed'].drop('left', axis=1).head(5) if 'left' in datasets['preprocessed'].columns else datasets['preprocessed'].head(5)
            predictions = models['decision_tree'].predict(sample_data)
            probabilities = models['decision_tree'].predict_proba(sample_data)[:, 1]
            
            # Prepare results
            results = sample_data.copy()
            results['Predicted_Turnover'] = predictions.astype(int)
            results['Turnover_Probability'] = probabilities.astype(float)
            
        else:
            # Handle file upload
            if 'file' not in request.files:
                return jsonify({'error': 'No file uploaded'}), 400
            
            file = request.files['file']
            if file.filename == '':
                return jsonify({'error': 'No file selected'}), 400
            
            if file and file.filename.lower().endswith('.csv'):
                # Read uploaded CSV
                user_data = pd.read_csv(file.stream)
                
                # Get sample data for preprocessing
                if 'preprocessed' not in datasets:
                    return jsonify({'error': 'Preprocessed data not loaded'}), 500
                
                sample_data = datasets['preprocessed'].drop('left', axis=1) if 'left' in datasets['preprocessed'].columns else datasets['preprocessed']
                
                # Preprocess user data
                processed_data = preprocess_user_data(user_data, sample_data)
                
                # Make predictions
                predictions = models['decision_tree'].predict(processed_data)
                probabilities = models['decision_tree'].predict_proba(processed_data)[:, 1]
                
                # Prepare results
                results = user_data.copy()
                results['Predicted_Turnover'] = predictions.astype(int)
                results['Turnover_Probability'] = probabilities.astype(float)
            else:
                return jsonify({'error': 'Invalid file format. Please upload a CSV file'}), 400
        
        # Calculate summary statistics
        total_count = len(predictions)
        turnover_count = int(sum(predictions))
        turnover_rate = (turnover_count / total_count) * 100 if total_count > 0 else 0
        
        return jsonify({
            'predictions': results.to_dict('records'),
            'summary': {
                'total_employees': total_count,
                'predicted_to_leave': turnover_count,
                'turnover_rate': round(turnover_rate, 2)
            }
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/available-images', methods=['GET'])
def get_available_images():
    """Get list of available images"""
    try:
        image_dir = 'images'
        if os.path.exists(image_dir):
            images = [f for f in os.listdir(image_dir) if f.lower().endswith(('.png', '.jpg', '.jpeg'))]
            return jsonify(images)
        else:
            return jsonify([])
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
