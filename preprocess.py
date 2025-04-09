import pandas as pd
import numpy as np
from sklearn.preprocessing import LabelEncoder, StandardScaler
import matplotlib.pyplot as plt
import seaborn as sns
import os

def load_data(file_path):
    """
    Load the HR Analytics dataset
    """
    df = pd.read_csv(file_path)
    print(f"Dataset loaded with shape: {df.shape}")
    return df

def check_missing_values(df):
    """
    Check for missing values in the dataset
    """
    missing_values = df.isnull().sum()
    print("\nMissing Values:")
    print(missing_values[missing_values > 0] if len(missing_values[missing_values > 0]) > 0 else "No missing values found")
    return missing_values

def preprocess_data(df):
    """
    Preprocess the HR Analytics dataset
    """
    # Make a copy of the dataframe
    processed_df = df.copy()
    
    # Drop irrelevant features
    if 'EmployeeNumber' in processed_df.columns:
        processed_df.drop('EmployeeNumber', axis=1, inplace=True)
    
    if 'Over18' in processed_df.columns and processed_df['Over18'].nunique() == 1:
        processed_df.drop('Over18', axis=1, inplace=True)
    
    # Check for any constant columns and drop them
    constant_cols = [col for col in processed_df.columns if processed_df[col].nunique() == 1]
    if constant_cols:
        processed_df.drop(constant_cols, axis=1, inplace=True)
        print(f"Dropped constant columns: {constant_cols}")
    
    # Encode categorical variables
    categorical_cols = processed_df.select_dtypes(include=['object']).columns
    
    # Create a dictionary to store the label encoders
    label_encoders = {}
    
    for col in categorical_cols:
        if col != 'left':  # We'll handle left separately
            le = LabelEncoder()
            processed_df[col] = le.fit_transform(processed_df[col])
            label_encoders[col] = le
    
    # Convert left to binary (1 for 'Yes', 0 for 'No')
    if 'left' in processed_df.columns:
        processed_df['left'] = processed_df['left'].map({1: 1, 0: 0})  # Already binary
    
    # Scale numerical features
    numerical_cols = processed_df.select_dtypes(include=['int64', 'float64']).columns
    scaler = StandardScaler()
    
    # We'll create a new dataframe for the scaled features to avoid scaling binary variables
    scaled_features = pd.DataFrame(
        scaler.fit_transform(processed_df[numerical_cols]),
        columns=numerical_cols,
        index=processed_df.index
    )
    
    # Replace the original numerical columns with the scaled ones
    for col in numerical_cols:
        if col != 'left':  # Don't scale the target variable
            processed_df[col] = scaled_features[col]
    
    return processed_df, label_encoders

def create_plots_directory():
    """
    Create directory for saving plots
    """
    if not os.path.exists('images'):
        os.makedirs('images')
        print("Created 'images' directory for saving visualizations")

def plot_attrition_distribution(df):
    """
    Plot the distribution of left (pie chart and bar plot)
    """
    create_plots_directory()
    
    # Count the values for left
    left_counts = df['left'].value_counts()
    labels = ['No', 'Yes']
    
    # Pie Chart
    plt.figure(figsize=(10, 6))
    plt.pie(left_counts, labels=labels, autopct='%1.1f%%', startangle=90, colors=['#66b3ff','#ff9999'])
    plt.title('Employee Turnover Distribution')
    plt.axis('equal')
    plt.tight_layout()
    plt.savefig('images/attrition_distribution_pie.png')
    plt.close()
    
    # Bar Plot
    plt.figure(figsize=(10, 6))
    sns.countplot(x='left', data=df)
    plt.title('Employee Turnover Distribution')
    plt.xlabel('Left Company')
    plt.ylabel('Count')
    plt.tight_layout()
    plt.savefig('images/attrition_distribution_bar.png')
    plt.close()
    
    print("Employee turnover distribution plots saved to 'images' directory")

def plot_correlation_heatmap(df):
    """
    Plot correlation heatmap for numerical features
    """
    create_plots_directory()
    
    # Select numerical columns
    numerical_df = df.select_dtypes(include=['int64', 'float64'])
    
    # Calculate the correlation matrix
    corr_matrix = numerical_df.corr()
    
    # Plot the heatmap
    plt.figure(figsize=(16, 12))
    mask = np.triu(np.ones_like(corr_matrix, dtype=bool))
    sns.heatmap(corr_matrix, mask=mask, annot=True, cmap='coolwarm', fmt=".2f", linewidths=0.5)
    plt.title('Correlation Heatmap')
    plt.tight_layout()
    plt.savefig('images/correlation_heatmap.png')
    plt.close()
    
    print("Correlation heatmap saved to 'images' directory")

def plot_job_satisfaction_vs_attrition(df):
    """
    Plot JobSatisfaction vs left
    """
    create_plots_directory()
    
    # Check if we need to create a copy with label-mapped values for plotting
    plot_df = df.copy()
    
    # If left is numeric, create a mapped version for better visualization
    if 'left' in plot_df.columns and plot_df['left'].dtype != 'object':
        plot_df['leftLabel'] = plot_df['left'].map({1: 'Yes', 0: 'No'})
        left_col = 'leftLabel'
    else:
        left_col = 'left'
    
    # Plot JobSatisfaction vs left
    plt.figure(figsize=(12, 6))
    sns.countplot(x='satisfaction_level', hue=left_col, data=plot_df)
    plt.title('Job Satisfaction vs Employee Turnover')
    plt.xlabel('Job Satisfaction Level')
    plt.ylabel('Count')
    plt.tight_layout()
    plt.savefig('images/job_satisfaction_vs_attrition.png')
    plt.close()
    
    print("Job Satisfaction vs Employee Turnover plot saved to 'images' directory")

def save_processed_data(df, output_path):
    """
    Save the preprocessed dataset to CSV
    """
    # Create data directory if it doesn't exist
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    
    # Save to CSV
    df.to_csv(output_path, index=False)
    print(f"Preprocessed data saved to {output_path}")

def main():
    """
    Main function to execute the preprocessing pipeline
    """
    # Load data
    data_path = 'data/WA_Fn-UseC_-HR-Employee-Attrition.csv'
    df = load_data(data_path)
    
    # Check for missing values
    check_missing_values(df)
    
    # Preprocess data
    processed_df, label_encoders = preprocess_data(df)
    
    # Generate and save EDA plots
    plot_attrition_distribution(df)  # Using original data for better labels
    plot_correlation_heatmap(processed_df)
    plot_job_satisfaction_vs_attrition(df)  # Using original data for better labels
    
    # Save preprocessed data
    save_processed_data(processed_df, 'data/preprocessed_hr_data.csv')
    
    print("Preprocessing completed successfully!")

if __name__ == "__main__":
    main()