# 🏢 HR Attrition Predictor

🎯 **An intelligent machine learning solution for predicting employee turnover and analyzing HR patterns.** This project provides a comprehensive ML pipeline for HR analytics with a modern web interface, featuring Flask backend API and React frontend architecture.

> **🎓 Fellowship Project**: This is the capstone project for the **GDGoC FAST Peshawar AI/ML Fellowship 2025**, demonstrating advanced machine learning techniques, web development, and data science best practices.

## 🎯 Project Objectives

- **Predict Employee Attrition**: Build high-accuracy models to identify employees at risk of leaving
- **HR Analytics Dashboard**: Provide interactive visualizations for HR decision-making
- **Data-Driven Insights**: Uncover patterns in employee behavior and satisfaction
- **Modern Web Architecture**: Implement scalable Flask + React architecture
- **Production-Ready Solution**: Create a deployable application for real-world use

## 🏗️ Project Architecture

### **Backend (Flask)**
- 🚀 REST API endpoints for ML operations
- 🤖 Advanced model loading and prediction services
- 📊 Real-time data processing and analysis
- 🖼️ Dynamic visualization image serving
- 📤 File upload handling for batch predictions

### **Frontend (React + Tailwind CSS)**
- 🎨 Modern, responsive user interface
- 📱 Mobile-first design approach
- 📈 Interactive data visualizations
- 📂 Drag-and-drop file upload functionality
- ⚡ Real-time API integration with error handling

---

## 🚀 Getting Started

### **Prerequisites**
- Python 3.8+
- Node.js 14+
- npm or yarn

### **Backend Setup**

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd HR-Attrition-Predictor
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   
   # Windows
   venv\Scripts\activate
   
   # Linux/Mac
   source venv/bin/activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run Flask server**
   ```bash
   python app.py
   ```
   
   The backend will be available at `http://localhost:5000`

### **Frontend Setup**

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start React development server**
   ```bash
   npm start
   ```
   
   The frontend will be available at `http://localhost:3000`

---

## 📂 Project Structure

```
HR-Attrition-Predictor/
├── 📁 frontend/                       # React frontend application
│   ├── 📁 public/
│   │   └── index.html                # HTML template
│   ├── 📁 src/
│   │   ├── 📁 components/            # Reusable React components
│   │   │   ├── Sidebar.js
│   │   │   ├── MetricCard.js
│   │   │   ├── DataTable.js
│   │   │   └── FileUpload.js
│   │   ├── 📁 pages/                 # Page components
│   │   │   ├── Home.js
│   │   │   ├── EDA.js
│   │   │   ├── SupervisedLearning.js
│   │   │   ├── UnsupervisedLearning.js
│   │   │   └── About.js
│   │   ├── 📁 services/
│   │   │   └── api.js                # API service layer
│   │   ├── App.js                    # Main React component
│   │   ├── index.js                  # React entry point
│   │   └── index.css                 # Tailwind CSS imports
│   ├── package.json                  # Node.js dependencies
│   ├── package-lock.json             # Dependency lock file
│   ├── tailwind.config.js            # Tailwind configuration
│   └── postcss.config.js             # PostCSS configuration
├── 📁 data/                          # Datasets and processed data
│   ├── WA_Fn-UseC_-HR-Employee-Attrition.csv    # Original dataset
│   ├── preprocessed_hr_data.csv      # Cleaned and processed data
│   ├── cluster_profiles.csv          # Clustering analysis results
│   ├── clustered_hr_data.csv         # Data with cluster assignments
│   ├── pca_hr_results.csv            # PCA transformation results
│   ├── X_test.csv & y_test.csv       # Test datasets
│   └── ...
├── 📁 models/                        # Trained ML models and metrics
│   ├── decision_tree_model.pkl       # Main prediction model
│   ├── kmeans_model.pkl              # Clustering model
│   ├── pca_model.pkl                 # PCA transformation model
│   ├── model_metrics.csv             # Performance metrics
│   └── classification_report.csv     # Detailed classification results
├── 📁 images/                        # Generated visualizations
│   ├── confusion_matrix.png
│   ├── feature_importance.png
│   ├── correlation_heatmap.png
│   ├── cluster_analysis_plots.png
│   └── ...
├── 📁 venv/                          # Virtual environment (ignored by git)
├── 📁 uploads/                       # Temporary upload directory
├── 🐍 app.py                         # Flask backend application
├── 🔧 requirements.txt               # Python dependencies
├── 📊 preprocess.py                  # Data preprocessing script
├── 🤖 train-model.py                 # Model training script
├── 🔍 cluster-analysis.py            # Clustering analysis script
├── 📓 hr_attrition_predictor.ipynb   # Jupyter notebook for EDA
├── 📝 README.md                      # Project documentation
├── 📋 LICENSE                        # Project license
└── 🚫 .gitignore                     # Git ignore file
```

---

## 🔧 API Endpoints

### **Backend API Routes**

| Method | Endpoint | Description | Response Format |
|--------|----------|-------------|----------------|
| GET | `/api/health` | Health check and model status | `{"status": "healthy", "models_loaded": true}` |
| GET | `/api/dataset-overview` | Dataset statistics and sample data | `{"total_employees": int, "features": int, "sample_data": []}` |
| GET | `/api/model-metrics` | Model performance metrics (97.97% accuracy) | `{"metrics": {}, "classification_report": []}` |
| GET | `/api/cluster-profiles` | Clustering analysis results | `[{"cluster": int, "profile": {}}]` |
| GET | `/api/images/<filename>` | Serve visualization images | Binary image data |
| POST | `/api/predict` | Make predictions (file upload or sample) | `{"results": [], "filename": str}` |

### **Frontend Pages**

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | Home | Dataset overview and project info |
| `/eda` | EDA | Exploratory data analysis visualizations |
| `/supervised-learning` | SupervisedLearning | Model performance and predictions |
| `/unsupervised-learning` | UnsupervisedLearning | Clustering analysis results |
| `/about` | About | Project documentation and tech stack |

---

## ⭐ Key Features

### **🤖 Machine Learning Capabilities**
- ✅ **High Accuracy Prediction**: 97.97% accuracy in attrition prediction
- ✅ **Decision Tree Model**: Interpretable ML model with feature importance
- ✅ **Clustering Analysis**: K-means clustering for employee segmentation
- ✅ **PCA Dimensionality Reduction**: Advanced data analysis techniques
- ✅ **Comprehensive Metrics**: Precision, recall, F1-score, and confusion matrix

### **🖥️ Web Application Features**
- 🎨 **Modern UI**: Clean, responsive design with Tailwind CSS
- 🚀 **REST API Architecture**: Scalable Flask backend with CORS support
- 📱 **Mobile-First Design**: Optimized for all device sizes
- 📊 **Interactive Visualizations**: Dynamic charts and graphs
- 📤 **File Upload System**: Drag-and-drop CSV processing
- 💾 **Export Functionality**: Download predictions as CSV
- ⚡ **Real-Time Processing**: Instant predictions and analysis

### **📈 Analytics Dashboard**
- 📋 **Dataset Overview**: Employee statistics and data insights
- 🔍 **Exploratory Data Analysis**: Interactive data exploration
- 🎯 **Supervised Learning**: Model performance and predictions
- 🔗 **Unsupervised Learning**: Clustering and pattern analysis
- 📚 **Comprehensive Documentation**: Detailed project information

---

## 🧠 Technology Stack

### **🐍 Backend Technologies**
- **Flask 2.3.3** - Lightweight REST API framework
- **Flask-CORS 4.0.0** - Cross-origin resource sharing
- **Pandas 2.0.3** - Data manipulation and analysis
- **NumPy ≥1.25** - Numerical computing
- **Scikit-learn 1.3.0** - Machine learning algorithms
- **Joblib 1.3.2** - Model serialization and persistence
- **Matplotlib 3.7.2** - Static visualizations
- **Seaborn 0.12.2** - Statistical data visualization
- **Pillow 10.0.0** - Image processing

### **⚛️ Frontend Technologies**
- **React 19.1.1** - Modern UI library
- **React Router DOM 7.8.1** - Client-side routing
- **Tailwind CSS 3.4.1** - Utility-first CSS framework
- **Axios 1.11.0** - Promise-based HTTP client
- **PostCSS 8.4.35** - CSS processing tool
- **Autoprefixer 10.4.17** - CSS vendor prefixing

### **🛠️ Development Tools**
- **Python 3.8+** - Backend runtime
- **Node.js 14+** - Frontend build system
- **Jest** - JavaScript testing framework
- **Black, Flake8, MyPy** - Python code quality tools
- **pytest** - Python testing framework

---

## 📊 Usage

1. **Start both servers** (backend on :5000, frontend on :3000)
2. **Navigate through the sidebar** to explore different sections
3. **Upload CSV files** for batch predictions in the Supervised Learning section
4. **View interactive visualizations** in the EDA and Clustering sections
5. **Download prediction results** as CSV files

---

## 🔍 Development Notes

### **CORS Configuration**
The Flask backend is configured with CORS to allow requests from the React frontend running on a different port.

### **File Upload Handling**
- Maximum file size: 16MB
- Supported format: CSV
- Temporary storage in `backend/uploads/` directory

### **Image Serving**
Visualization images are served directly from the Flask backend to the React frontend via API endpoints.

### **Error Handling**
Both frontend and backend include comprehensive error handling with user-friendly messages.

---

## 🚀 Deployment Considerations

### **Production Setup**
1. Build React app: `npm run build`
2. Serve built files through Flask
3. Use production WSGI server (Gunicorn, uWSGI)
4. Configure reverse proxy (Nginx)
5. Set up environment variables

### **Environment Variables**
```bash
FLASK_ENV=production
FLASK_DEBUG=False
API_BASE_URL=https://your-domain.com/api
```

---

## 🎓 Fellowship Information

### **GDGoC FAST Peshawar AI/ML Fellowship 2025**

This project represents the capstone achievement of the **Google Developer Groups on Campus (GDGoC) FAST University Peshawar AI/ML Fellowship 2025**. The fellowship program focused on:

- 🤖 **Advanced Machine Learning**: Deep dive into supervised and unsupervised learning
- 🌐 **Full-Stack Development**: Building production-ready web applications
- 📊 **Data Science**: Real-world data analysis and visualization
- 🚀 **Modern Web Technologies**: React, Flask, and API development
- 🔧 **MLOps Practices**: Model deployment and maintenance

### **Project Impact & Learning Outcomes**

- ✅ **High-Performance ML Model**: Achieved 97.97% accuracy in employee attrition prediction
- ✅ **Production-Ready Architecture**: Scalable Flask + React architecture
- ✅ **Advanced Analytics**: K-means clustering and PCA for employee insights
- ✅ **Modern Web Development**: Responsive design with Tailwind CSS
- ✅ **API Development**: RESTful services with comprehensive error handling

---

## 👨‍💻 Developer Information

- 👤 **Developer**: Abu Bakar
- 🎯 **Role**: AI/ML Fellowship Participant 2025
- 🏛️ **Institution**: Namal University Mianwali
- 🌐 **GitHub**: [abubakarp789](https://github.com/abubakarp789)
- 💼 **LinkedIn**: [abubakar56](https://linkedin.com/in/abubakar56)
- 📧 **Project Type**: Capstone Fellowship Project
---
