import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.cluster import KMeans
from sklearn.decomposition import PCA
from sklearn.preprocessing import StandardScaler
import os
import joblib

def load_preprocessed_data(filepath='data/preprocessed_hr_data.csv'):
    """Load preprocessed data from CSV file"""
    return pd.read_csv(filepath)

def prepare_data_for_clustering(df):
    """Prepare data for clustering by dropping the target variable"""
    if 'left' in df.columns:
        X = df.drop('left', axis=1)
    else:
        X = df.copy()
    
    # If we need to scale data again (though it should already be scaled from preprocessing)
    # scaler = StandardScaler()
    # X_scaled = scaler.fit_transform(X)
    # return pd.DataFrame(X_scaled, columns=X.columns)
    
    return X

def find_optimal_clusters(data, max_k=15):
    """Find the optimal number of clusters using the Elbow method"""
    inertia = []
    k_range = range(1, max_k + 1)
    
    for k in k_range:
        kmeans = KMeans(n_clusters=k, random_state=42, n_init=10)
        kmeans.fit(data)
        inertia.append(kmeans.inertia_)
    
    # Plot Elbow curve
    plt.figure(figsize=(12, 8))
    plt.plot(k_range, inertia, marker='o', linestyle='-')
    plt.xlabel('Number of Clusters')
    plt.ylabel('Inertia')
    plt.title('Elbow Method for Optimal k')
    plt.xticks(k_range)
    plt.grid(True)
    plt.tight_layout()
    plt.savefig('plots/kmeans_elbow.png')
    plt.close()
    
    # Return the optimal k (this is a simple heuristic)
    # Look for the point where the rate of decrease sharply changes
    inertia_diff = np.diff(inertia)
    inertia_diff2 = np.diff(inertia_diff)
    optimal_k = np.argmax(inertia_diff2) + 2  # +2 due to two diff operations
    
    # Ensure optimal_k is within range
    optimal_k = min(max(optimal_k, 2), max_k)
    
    print(f"Optimal number of clusters detected: {optimal_k}")
    return optimal_k

def perform_kmeans_clustering(data, n_clusters):
    """Perform K-Means clustering"""
    kmeans = KMeans(n_clusters=n_clusters, random_state=42, n_init=10)
    clusters = kmeans.fit_predict(data)
    
    # Add cluster labels to the data
    data_with_clusters = data.copy()
    data_with_clusters['Cluster'] = clusters
    
    # Save the KMeans model
    joblib.dump(kmeans, 'models/kmeans_model.pkl')
    
    # Save cluster data
    data_with_clusters.to_csv('data/clustered_hr_data.csv', index=False)
    
    return kmeans, data_with_clusters

def visualize_clusters(data, clusters, kmeans_model):
    """Visualize clusters using PCA for dimensionality reduction"""
    # Apply PCA to reduce dimensions to 2 for visualization
    pca = PCA(n_components=2)
    pca_result = pca.fit_transform(data.drop('Cluster', axis=1) if 'Cluster' in data.columns else data)
    
    # Save PCA model for future use
    joblib.dump(pca, 'models/pca_model.pkl')
    
    # Create a DataFrame for the PCA results
    pca_df = pd.DataFrame(data=pca_result, columns=['PC1', 'PC2'])
    pca_df['Cluster'] = clusters['Cluster'] if 'Cluster' in clusters.columns else kmeans_model.labels_
    
    # Save PCA results
    pca_df.to_csv('data/pca_hr_results.csv', index=False)
    
    # Plot the clusters
    plt.figure(figsize=(12, 8))
    
    # Plot each cluster with a different color
    for cluster_id in range(kmeans_model.n_clusters):
        cluster_data = pca_df[pca_df['Cluster'] == cluster_id]
        plt.scatter(
            cluster_data['PC1'], 
            cluster_data['PC2'], 
            s=50, alpha=0.7,
            label=f'Cluster {cluster_id}'
        )
    
    # Plot cluster centers
    centers_pca = pca.transform(kmeans_model.cluster_centers_)
    plt.scatter(
        centers_pca[:, 0], centers_pca[:, 1],
        s=200, marker='X', c='red', 
        label='Cluster Centers'
    )
    
    plt.title('K-Means Clusters Visualization (PCA)')
    plt.xlabel('Principal Component 1')
    plt.ylabel('Principal Component 2')
    plt.legend()
    plt.grid(True, alpha=0.3)
    plt.tight_layout()
    plt.savefig('plots/kmeans_clusters.png')
    plt.close()

def analyze_clusters(data_with_clusters, original_data):
    """Analyze the characteristics of each cluster"""
    # Get the number of clusters
    n_clusters = data_with_clusters['Cluster'].nunique()
    
    # Create a DataFrame to store cluster profiles
    profiles = []
    
    # If we have the original data with non-scaled values, we can use it for more interpretable analysis
    if original_data is not None:
        # Add cluster labels to original data
        original_data_with_clusters = original_data.copy()
        original_data_with_clusters['Cluster'] = data_with_clusters['Cluster'].values
        
        # For each cluster, compute mean values of important features
        for cluster_id in range(n_clusters):
            cluster_data = original_data_with_clusters[original_data_with_clusters['Cluster'] == cluster_id]
            
            # Select key features for profiling
            key_features = [
                'satisfaction_level', 'last_evaluation', 'number_project',
                'average_montly_hours', 'time_spend_company', 'Work_accident',
                'promotion_last_5years'
            ]
            
            # Ensure all key features exist in the data
            key_features = [f for f in key_features if f in cluster_data.columns]
            
            # Compute profile
            profile = {
                'Cluster': cluster_id,
                'Size': len(cluster_data),
                'Percentage': len(cluster_data) / len(original_data_with_clusters) * 100
            }
            
            # Add mean values for key features
            for feature in key_features:
                profile[f'Mean_{feature}'] = cluster_data[feature].mean()
            
            # Add turnover rate if available
            if 'left' in cluster_data.columns:
                turnover_values = cluster_data['left'].value_counts(normalize=True)
                profile['Turnover_Rate'] = turnover_values.get(1, 0) * 100  # Percentage
            
            profiles.append(profile)
        
        # Create profiles DataFrame and save it
        profiles_df = pd.DataFrame(profiles)
        profiles_df.to_csv('data/cluster_profiles.csv', index=False)
        
        # Visualize key features for each cluster
        plot_cluster_profiles(profiles_df, key_features)
    
    return profiles

def plot_cluster_profiles(profiles_df, key_features):
    """Plot the profiles of each cluster based on key features"""
    # Prepare feature names for plotting
    features_to_plot = [f'Mean_{feature}' for feature in key_features if f'Mean_{feature}' in profiles_df.columns]
    
    if not features_to_plot:
        print("No key features found for plotting cluster profiles")
        return
    
    # Create subplots for each feature
    n_features = len(features_to_plot)
    fig, axes = plt.subplots(n_features, 1, figsize=(12, n_features * 4))
    
    # Handle case where there's only one feature
    if n_features == 1:
        axes = [axes]
    
    for i, feature in enumerate(features_to_plot):
        # Plot the feature for each cluster
        clean_feature_name = feature.replace('Mean_', '')
        cluster_ids = profiles_df['Cluster'].tolist()
        feature_values = profiles_df[feature].tolist()
        
        axes[i].bar(cluster_ids, feature_values)
        axes[i].set_title(f'Average {clean_feature_name} by Cluster')
        axes[i].set_xlabel('Cluster')
        axes[i].set_ylabel(clean_feature_name)
        axes[i].set_xticks(cluster_ids)
        axes[i].grid(True, alpha=0.3)
    
    plt.tight_layout()
    plt.savefig('plots/cluster_profiles.png')
    plt.close()
    
    # Plot cluster sizes
    plt.figure(figsize=(10, 6))
    plt.bar(profiles_df['Cluster'], profiles_df['Size'])
    plt.title('Cluster Sizes')
    plt.xlabel('Cluster')
    plt.ylabel('Number of Employees')
    plt.xticks(profiles_df['Cluster'])
    plt.grid(True, alpha=0.3)
    plt.tight_layout()
    plt.savefig('plots/cluster_sizes.png')
    plt.close()
    
    # Plot turnover rate by cluster if available
    if 'Turnover_Rate' in profiles_df.columns:
        plt.figure(figsize=(10, 6))
        plt.bar(profiles_df['Cluster'], profiles_df['Turnover_Rate'])
        plt.title('Turnover Rate by Cluster')
        plt.xlabel('Cluster')
        plt.ylabel('Turnover Rate (%)')
        plt.xticks(profiles_df['Cluster'])
        plt.grid(True, alpha=0.3)
        plt.tight_layout()
        plt.savefig('plots/cluster_turnover_rates.png')
        plt.close()

def main():
    # Ensure directories exist
    os.makedirs('models', exist_ok=True)
    os.makedirs('plots', exist_ok=True)
    os.makedirs('data', exist_ok=True)
    
    # Load preprocessed data
    df = load_preprocessed_data()
    
    # Keep a copy of original data for interpretable analysis
    original_data_path = 'data/WA_Fn-UseC_-HR-Employee-Attrition.csv'
    original_data = pd.read_csv(original_data_path) if os.path.exists(original_data_path) else None
    
    # Prepare data for clustering
    X = prepare_data_for_clustering(df)
    
    # Find optimal number of clusters
    optimal_k = find_optimal_clusters(X)
    
    # Perform K-Means clustering
    kmeans_model, data_with_clusters = perform_kmeans_clustering(X, optimal_k)
    
    # Visualize clusters
    visualize_clusters(data_with_clusters, data_with_clusters, kmeans_model)
    
    # Analyze clusters
    cluster_profiles = analyze_clusters(data_with_clusters, original_data)
    
    print("Clustering analysis completed successfully!")

if __name__ == "__main__":
    main()
