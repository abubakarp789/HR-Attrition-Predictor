import streamlit as st
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import os
import joblib
from PIL import Image
import io
import base64

# Set page config
st.set_page_config(
    page_title="Employee Turnover Prediction",
    page_icon="🧑‍💼",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Apply custom CSS for better styling
st.markdown("""
<style>
    .main {
        padding: 1rem;
    }
    .stTabs [data-baseweb="tab-list"] {
        gap: 10px;
    }
    .stTabs [data-baseweb="tab"] {
        padding: 10px 20px;
        border-radius: 5px;
    }
    h1, h2, h3 {
        padding-top: 1rem;
    }
    .metric-container {
        background-color: #f0f2f6;
        border-radius: 10px;
        padding: 15px;
        margin-bottom: 15px;
    }
    .footer {
        padding-top: 2rem;
        text-align: center;
        color: #888;
    }
</style>
""", unsafe_allow_html=True)

# Load models and data
@st.cache_resource
def load_models():
    try:
        decision_tree = joblib.load('models/decision_tree_model.pkl')
        kmeans_model = joblib.load('models/kmeans_model.pkl')
        pca_model = joblib.load('models/pca_model.pkl')
        return decision_tree, kmeans_model, pca_model
    except FileNotFoundError as e:
        st.error(f"Error loading models: {e}")
        return None, None, None

@st.cache_data
def load_dataset(path='data/WA_Fn-UseC_-HR-Employee-Attrition.csv'):
    try:
        df = pd.read_csv(path)
        # Convert float64 columns to float32 to avoid Arrow serialization issues
        float_cols = df.select_dtypes(include=['float64']).columns
        df[float_cols] = df[float_cols].astype('float32')
        return df
    except FileNotFoundError:
        st.error(f"Dataset not found at {path}")
        return None

@st.cache_data
def load_model_metrics(path='models/model_metrics.csv'):
    try:
        df = pd.read_csv(path)
        # Convert float64 columns to float32 to avoid Arrow serialization issues
        float_cols = df.select_dtypes(include=['float64']).columns
        df[float_cols] = df[float_cols].astype('float32')
        return df
    except FileNotFoundError:
        st.warning(f"Model metrics not found at {path}")
        return None

@st.cache_data
def load_preprocessed_data(path='data/preprocessed_hr_data.csv'):
    try:
        df = pd.read_csv(path)
        # Convert float64 columns to float32 to avoid Arrow serialization issues
        float_cols = df.select_dtypes(include=['float64']).columns
        df[float_cols] = df[float_cols].astype('float32')
        return df
    except FileNotFoundError:
        st.warning(f"Preprocessed data not found at {path}")
        return None

@st.cache_data
def load_cluster_profiles(path='data/cluster_profiles.csv'):
    try:
        df = pd.read_csv(path)
        # Convert float64 columns to float32 to avoid Arrow serialization issues
        float_cols = df.select_dtypes(include=['float64']).columns
        df[float_cols] = df[float_cols].astype('float32')
        return df
    except FileNotFoundError:
        st.warning(f"Cluster profiles not found at {path}")
        return None

# Load images from plots folder
@st.cache_data
def load_image(image_path):
    try:
        return Image.open(image_path)
    except FileNotFoundError:
        st.warning(f"Image not found at {image_path}")
        return None

# Function to make predictions on new data
def predict_turnover(model, data):
    return model.predict(data), model.predict_proba(data)[:, 1]

# Function to preprocess user uploaded data
def preprocess_user_data(df, sample_data):
    # Ensure uploaded data has the same columns as trained data
    missing_cols = set(sample_data.columns) - set(df.columns)
    if missing_cols:
        st.error(f"Missing columns in uploaded data: {missing_cols}")
        return None
    
    # Ensure no extra columns in uploaded data
    extra_cols = set(df.columns) - set(sample_data.columns)
    if extra_cols:
        st.warning(f"Extra columns found in uploaded data: {extra_cols}")
        df = df.drop(columns=extra_cols)
    
    # Reorder columns to match training data
    df = df[sample_data.columns]
    
    # Convert float64 columns to float32 to avoid Arrow serialization issues
    float_cols = df.select_dtypes(include=['float64']).columns
    df[float_cols] = df[float_cols].astype('float32')
    
    return df

# Main app function
def main():
    # Load models
    decision_tree, kmeans_model, pca_model = load_models()
    
    # Load datasets
    dataset = load_dataset()
    preprocessed_data = load_preprocessed_data()
    model_metrics = load_model_metrics()
    cluster_profiles = load_cluster_profiles()
    
    # Sidebar navigation
    st.sidebar.title("🧑‍💼 Employee Analytics")
    pages = ["Home", "Exploratory Data Analysis", "Supervised Learning", "Unsupervised Learning", "About"]
    selected_page = st.sidebar.radio("Navigation", pages)
    
    # Display page based on selection
    if selected_page == "Home":
        display_home_page(dataset)
    elif selected_page == "Exploratory Data Analysis":
        display_eda_page()
    elif selected_page == "Supervised Learning":
        display_supervised_learning_page(decision_tree, preprocessed_data, model_metrics)
    elif selected_page == "Unsupervised Learning":
        display_unsupervised_learning_page(kmeans_model, pca_model, cluster_profiles)
    elif selected_page == "About":
        display_about_page()
    
    # Footer
    st.markdown("<div class='footer'>Developed as part of the GDGoC FAST Peshawar ML Fellowshp | Developed by Abu Bakar</div>", unsafe_allow_html=True)

def display_home_page(dataset):
    st.title("🎯 Employee Turnover Prediction & Workforce Insights")
    
    st.markdown("""
    ## 📌 Project Objective
    This application provides a complete machine learning pipeline to:
    
    - **Predict employee turnover** using supervised learning (Decision Trees)
    - **Extract workforce patterns** using unsupervised learning (K-Means Clustering)
    - **Visualize key insights** through interactive data analysis
    
    Navigate through the sidebar to explore different aspects of the project.
    """)
    
    # Dataset overview
    st.header("📊 Dataset Overview")
    if dataset is not None:
        col1, col2 = st.columns(2)
        with col1:
            st.metric("Total Employees", dataset.shape[0])
            
            # Calculate turnover rate if the column exists
            if 'left' in dataset.columns:
                turnover_yes = dataset[dataset['left'] == 1].shape[0]
                turnover_rate = (turnover_yes / dataset.shape[0]) * 100
                st.metric("Turnover Rate", f"{turnover_rate:.2f}%")
        
        with col2:
            st.metric("Features", dataset.shape[1])
            
            # Get distribution of departments if the column exists
            if 'Department' in dataset.columns:
                dept_count = dataset['Department'].nunique()
                st.metric("Departments", dept_count)
        
        # Show sample data
        st.subheader("Sample Data")
        st.dataframe(dataset.head())
        
        # Show column information
        st.subheader("Dataset Columns")
        col_df = pd.DataFrame({
            'Column': dataset.columns,
            'Type': dataset.dtypes,
            'Non-Null Count': dataset.count(),
            'Null Count': dataset.isnull().sum()
        })
        st.dataframe(col_df)
    else:
        st.error("Dataset could not be loaded. Please check the file path.")
    
    # Algorithms used
    st.header("🧠 Algorithms Used")
    
    col1, col2 = st.columns(2)
    
    with col1:
        st.subheader("Supervised Learning")
        st.markdown("""
        - **Decision Tree Classifier**
        - Hyperparameter optimization with GridSearchCV
        - Evaluation metrics: Accuracy, Precision, Recall, F1-score
        """)
    
    with col2:
        st.subheader("Unsupervised Learning")
        st.markdown("""
        - **K-Means Clustering**
        - Optimal cluster detection with Elbow method
        - PCA for dimensionality reduction and visualization
        """)

def display_eda_page():
    st.title("📊 Exploratory Data Analysis")
    
    st.markdown("""
    This page displays key visualizations from our exploratory data analysis.
    These insights help understand patterns in employee data and factors affecting turnover.
    """)
    
    # Display plots saved during EDA
    plot_paths = [
        ("Turnover Distribution", "images/attrition_distribution_pie.png"),
        ("Job Satisfaction vs Turnover", "images/job_satisfaction_vs_attrition.png"),
        ("Correlation Heatmap", "images/correlation_heatmap.png")
    ]
    
    # Create two columns for displaying plots
    for i in range(0, len(plot_paths), 2):
        col1, col2 = st.columns(2)
        
        # First plot in the row
        with col1:
            title1, path1 = plot_paths[i]
            st.subheader(title1)
            image1 = load_image(path1)
            if image1:
                st.image(image1)
            else:
                st.warning(f"Could not load image: {path1}")
        
        # Second plot in the row (if available)
        if i + 1 < len(plot_paths):
            with col2:
                title2, path2 = plot_paths[i + 1]
                st.subheader(title2)
                image2 = load_image(path2)
                if image2:
                    st.image(image2)
                else:
                    st.warning(f"Could not load image: {path2}")
    
    # Key insights from EDA
    st.header("🔍 Key Insights")
    
    st.markdown("""
    - Turnover is more common among employees with lower job satisfaction
    - Employees with lower satisfaction levels show higher turnover rates
    - Work-life balance and overtime appear to be correlated with turnover
    """)

def display_supervised_learning_page(model, preprocessed_data, model_metrics):
    st.title("🔮 Supervised Learning: Turnover Prediction")
    
    # Display model metrics if available
    if model_metrics is not None:
        st.header("Model Performance Metrics")
        
        col1, col2, col3, col4 = st.columns(4)
        
        with col1:
            st.markdown("<div class='metric-container'>", unsafe_allow_html=True)
            st.metric("Accuracy", f"{model_metrics['accuracy'].iloc[0]:.4f}")
            st.markdown("</div>", unsafe_allow_html=True)
        
        with col2:
            st.markdown("<div class='metric-container'>", unsafe_allow_html=True)
            st.metric("Precision", f"{model_metrics['precision'].iloc[0]:.4f}")
            st.markdown("</div>", unsafe_allow_html=True)
        
        with col3:
            st.markdown("<div class='metric-container'>", unsafe_allow_html=True)
            st.metric("Recall", f"{model_metrics['recall'].iloc[0]:.4f}")
            st.markdown("</div>", unsafe_allow_html=True)
        
        with col4:
            st.markdown("<div class='metric-container'>", unsafe_allow_html=True)
            st.metric("F1 Score", f"{model_metrics['f1_score'].iloc[0]:.4f}")
            st.markdown("</div>", unsafe_allow_html=True)
    
    # Display model visualizations
    st.header("Model Evaluation")
    
    col1, col2 = st.columns(2)
    
    with col1:
        st.subheader("Confusion Matrix")
        confusion_matrix_img = load_image("images/confusion_matrix.png")
        if confusion_matrix_img:
            st.image(confusion_matrix_img)
    
    with col2:
        st.subheader("ROC Curve")
        roc_curve_img = load_image("images/roc_curve.png")
        if roc_curve_img:
            st.image(roc_curve_img)
    
    # Display feature importance
    st.header("Feature Importance")
    feature_importance_img = load_image("images/feature_importance.png")
    if feature_importance_img:
        st.image(feature_importance_img)
    
    # Decision Tree Visualization
    with st.expander("View Decision Tree Visualization"):
        decision_tree_img = load_image("images/decision_tree_plot.png")
        if decision_tree_img:
            st.image(decision_tree_img)
            st.caption("Click to enlarge decision tree visualization")
    
    # Make predictions on new data
    st.header("Predict Turnover for New Employees")
    
    upload_option = st.radio(
        "Choose input method:",
        ["Upload CSV file", "Use sample data"]
    )
    
    if upload_option == "Upload CSV file":
        uploaded_file = st.file_uploader("Upload employee data (CSV format)", type=["csv"])
        
        if uploaded_file is not None:
            # Load and preprocess the uploaded data
            user_data = pd.read_csv(uploaded_file)
            
            if preprocessed_data is not None:
                # Get sample data without the target variable
                sample_data = preprocessed_data.drop('left', axis=1) if 'left' in preprocessed_data.columns else preprocessed_data
                
                # Preprocess user data
                processed_user_data = preprocess_user_data(user_data, sample_data)
                
                if processed_user_data is not None and model is not None:
                    # Make predictions
                    predictions, probabilities = predict_turnover(model, processed_user_data)
                    
                    # Add predictions to the user data
                    user_data['Predicted_Turnover'] = predictions
                    user_data['Turnover_Probability'] = probabilities
                    
                    # Display results
                    st.subheader("Prediction Results")
                    
                    # Count of predicted turnover
                    turnover_count = sum(predictions)
                    total_count = len(predictions)
                    turnover_rate = (turnover_count / total_count) * 100 if total_count > 0 else 0
                    
                    col1, col2, col3 = st.columns(3)
                    
                    with col1:
                        st.metric("Total Employees", total_count)
                    
                    with col2:
                        st.metric("Predicted to Leave", turnover_count)
                    
                    with col3:
                        st.metric("Turnover Rate", f"{turnover_rate:.2f}%")
                    
                    # Display the data with predictions
                    st.dataframe(user_data)
                    
                    # Option to download predictions
                    csv = user_data.to_csv(index=False)
                    b64 = base64.b64encode(csv.encode()).decode()
                    href = f'<a href="data:file/csv;base64,{b64}" download="turnover_predictions.csv">Download Prediction Results</a>'
                    st.markdown(href, unsafe_allow_html=True)
    
    else:  # Use sample data
        st.info("Using sample data for demonstration")
        
        if preprocessed_data is not None and model is not None:
            # Get sample data without the target variable (first 5 rows)
            sample_data = preprocessed_data.drop('left', axis=1).head(5) if 'left' in preprocessed_data.columns else preprocessed_data.head(5)
            
            # Make predictions
            predictions, probabilities = predict_turnover(model, sample_data)
            
            # Add predictions to the sample data
            sample_results = sample_data.copy()
            sample_results['Predicted_Turnover'] = predictions
            sample_results['Turnover_Probability'] = probabilities
            
            # Display results
            st.subheader("Sample Prediction Results")
            st.dataframe(sample_results)

def display_unsupervised_learning_page(kmeans_model, pca_model, cluster_profiles):
    st.title("🔍 Unsupervised Learning: Employee Segmentation")
    
    st.markdown("""
    This page shows the results of K-means clustering analysis, which helps identify natural
    groupings of employees based on their characteristics. This analysis can reveal patterns
    that may not be apparent through traditional analysis.
    """)
    
    # Display elbow curve
    st.header("Optimal Number of Clusters")
    elbow_img = load_image("images/kmeans_elbow.png")
    if elbow_img:
        st.image(elbow_img)
        st.caption("Elbow method to determine the optimal number of clusters")
    
    # Display cluster visualization
    st.header("Cluster Visualization")
    cluster_img = load_image("images/kmeans_clusters.png")
    if cluster_img:
        st.image(cluster_img)
        st.caption("2D visualization of clusters using PCA dimensionality reduction")
    
    # Display cluster profiles
    st.header("Cluster Profiles")
    
    if cluster_profiles is not None:
        # Display cluster sizes
        cluster_sizes_img = load_image("images/cluster_sizes.png")
        if cluster_sizes_img:
            st.image(cluster_sizes_img)
            st.caption("Size of each cluster in the dataset")
        
        # Display turnover rates by cluster
        turnover_rates_img = load_image("images/cluster_turnover_rates.png")
        if turnover_rates_img:
            st.image(turnover_rates_img)
            st.caption("Turnover rates for each cluster")
        
        # Display cluster profiles
        profile_img = load_image("images/cluster_profiles.png")
        if profile_img:
            st.image(profile_img)
            st.caption("Key characteristics of each cluster")
        
        # Show cluster profile details
        st.subheader("Detailed Cluster Characteristics")
        st.dataframe(cluster_profiles)
        
        # Interpretation of clusters
        st.header("Cluster Interpretation")
        
        n_clusters = cluster_profiles['Cluster'].nunique()
        
        for cluster_id in range(n_clusters):
            cluster_data = cluster_profiles[cluster_profiles['Cluster'] == cluster_id]
            
            # Skip if no data for this cluster
            if cluster_data.empty:
                continue
            
            with st.expander(f"Cluster {cluster_id} Analysis"):
                st.markdown(f"""
                #### Cluster {cluster_id} ({cluster_data['Size'].iloc[0]} employees, {cluster_data['Percentage'].iloc[0]:.2f}% of workforce)
                """)
                
                # Create description based on available columns
                description = []
                
                # Satisfaction Level
                if 'Mean_satisfaction_level' in cluster_data.columns:
                    satisfaction = cluster_data['Mean_satisfaction_level'].iloc[0]
                    if satisfaction < 0.4:
                        description.append("low satisfaction level")
                    elif satisfaction < 0.7:
                        description.append("moderate satisfaction level")
                    else:
                        description.append("high satisfaction level")
                
                # Last Evaluation
                if 'Mean_last_evaluation' in cluster_data.columns:
                    evaluation = cluster_data['Mean_last_evaluation'].iloc[0]
                    if evaluation < 0.5:
                        description.append("lower performance")
                    elif evaluation < 0.8:
                        description.append("moderate performance")
                    else:
                        description.append("high performance")
                
                # Number of Projects
                if 'Mean_number_project' in cluster_data.columns:
                    projects = cluster_data['Mean_number_project'].iloc[0]
                    if projects < 2:
                        description.append("few projects")
                    elif projects < 4:
                        description.append("moderate project load")
                    else:
                        description.append("heavy project load")
                
                # Average Monthly Hours
                if 'Mean_average_montly_hours' in cluster_data.columns:
                    hours = cluster_data['Mean_average_montly_hours'].iloc[0]
                    if hours < 150:
                        description.append("low work hours")
                    elif hours < 200:
                        description.append("moderate work hours")
                    else:
                        description.append("high work hours")
                
                # Turnover Rate
                if 'Turnover_Rate' in cluster_data.columns:
                    turnover = cluster_data['Turnover_Rate'].iloc[0]
                    if turnover > 25:
                        description.append("**high turnover risk**")
                    elif turnover > 15:
                        description.append("moderate turnover risk")
                    else:
                        description.append("low turnover risk")
                
                if description:
                    st.markdown("**Profile:** " + " with ".join(description))
                
                # All metrics
                metrics_to_show = [col for col in cluster_data.columns if col.startswith('Mean_')]
                for metric in metrics_to_show:
                    clean_name = metric.replace('Mean_', '')
                    st.metric(clean_name, f"{cluster_data[metric].iloc[0]:.2f}")

def display_about_page():
    st.title("ℹ️ About This Project")
    
    st.markdown("""
    ## Project Overview
    
    This application demonstrates a comprehensive machine learning pipeline for HR analytics,
    focusing on predicting employee turnover and extracting workforce insights through clustering.
    
    ### Key Components:
    
    1. **Data Preprocessing**: Handling missing values, encoding categorical variables, and feature scaling
    
    2. **Exploratory Data Analysis**: Visualization of key relationships and patterns in the data
    
    3. **Supervised Learning**: Decision Tree classifier for turnover prediction with hyperparameter tuning
    
    4. **Unsupervised Learning**: K-Means clustering for employee segmentation
    
    5. **Model Interpretability**: Visualization of decision trees and feature importance
    
    6. **Interactive Web App**: Streamlit-based interface for exploring results and making predictions
    
    ### Libraries Used:
    
    - **Data Manipulation**: Pandas, NumPy
    - **Machine Learning**: Scikit-learn
    - **Visualization**: Matplotlib, Seaborn
    - **Web App**: Streamlit
    
    ### Dataset:
    
    The project uses the HR Analytics Employee Turnover dataset, which contains various employee
    attributes like satisfaction level, last evaluation, number of projects, and whether they left the company.
    
    ### Learning Outcomes:
    
    - Building end-to-end machine learning pipelines
    - Applying both supervised and unsupervised learning techniques
    - Creating interactive web applications with Streamlit
    - Extracting and visualizing insights from data
    - Model evaluation and interpretation
    
    ### Future Improvements:
    
    - Implement additional models (Random Forest, XGBoost)
    - Add more advanced visualizations
    - Include feature engineering techniques
    - Deploy the application to a cloud platform
    """)

if __name__ == "__main__":
    main()
