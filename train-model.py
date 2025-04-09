import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import joblib
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.tree import DecisionTreeClassifier, plot_tree
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, confusion_matrix
from sklearn.metrics import roc_curve, roc_auc_score
import seaborn as sns
import os

def load_preprocessed_data(filepath='data/preprocessed_hr_data.csv'):
    """Load preprocessed data from CSV file"""
    return pd.read_csv(filepath)

def split_data(df, target_col='left', test_size=0.2, random_state=42):
    """Split data into train and test sets"""
    X = df.drop(target_col, axis=1)
    y = df[target_col]
    
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=test_size, random_state=random_state, stratify=y
    )
    
    print(f"Training set shape: {X_train.shape}, Test set shape: {X_test.shape}")
    return X_train, X_test, y_train, y_test

def train_decision_tree(X_train, y_train):
    """Train a Decision Tree classifier with hyperparameter tuning"""
    param_grid = {
        'max_depth': [3, 5, 7, 10, None],
        'min_samples_split': [2, 5, 10],
        'min_samples_leaf': [1, 2, 4],
        'criterion': ['gini', 'entropy']
    }
    
    # Base model
    dt = DecisionTreeClassifier(random_state=42)
    
    # Grid search
    grid_search = GridSearchCV(
        estimator=dt,
        param_grid=param_grid,
        cv=5,
        scoring='f1',
        verbose=1
    )
    
    # Fit grid search
    grid_search.fit(X_train, y_train)
    
    # Get best model
    best_model = grid_search.best_estimator_
    best_params = grid_search.best_params_
    
    print(f"Best Parameters: {best_params}")
    return best_model

def plot_decision_tree_visualization(model, X_train, feature_names=None):
    """Plot and save the decision tree"""
    plt.figure(figsize=(25, 15))
    plot_tree(model, feature_names=feature_names, 
              class_names=['Stayed', 'Left'],
              filled=True, rounded=True, fontsize=10)
    plt.title('Decision Tree Visualization')
    plt.tight_layout()
    plt.savefig('images/decision_tree_plot.png', dpi=300, bbox_inches='tight')
    plt.close()
    
def plot_feature_importance(model, feature_names):
    """Plot the feature importance"""
    # Get feature importances
    importances = model.feature_importances_
    
    # Sort feature importances in descending order
    indices = np.argsort(importances)[::-1]
    
    # Rearrange feature names so they match the sorted feature importances
    names = [feature_names[i] for i in indices]
    
    # Get top 15 features
    indices = indices[:15]
    names = names[:15]
    
    # Create plot
    plt.figure(figsize=(12, 8))
    plt.barh(range(len(indices)), importances[indices], align='center')
    plt.yticks(range(len(indices)), names)
    plt.xlabel('Relative Importance')
    plt.title('Feature Importance')
    plt.tight_layout()
    plt.savefig('images/feature_importance.png')
    plt.close()

def evaluate_model(model, X_test, y_test):
    """Evaluate the model and save metrics"""
    # Predictions
    y_pred = model.predict(X_test)
    y_pred_proba = model.predict_proba(X_test)[:, 1]
    
    # Metrics
    accuracy = accuracy_score(y_test, y_pred)
    precision = precision_score(y_test, y_pred)
    recall = recall_score(y_test, y_pred)
    f1 = f1_score(y_test, y_pred)
    
    print(f"Accuracy: {accuracy:.4f}")
    print(f"Precision: {precision:.4f}")
    print(f"Recall: {recall:.4f}")
    print(f"F1 Score: {f1:.4f}")
    
    # Save metrics to a file
    metrics = {
        'accuracy': accuracy,
        'precision': precision,
        'recall': recall,
        'f1_score': f1
    }
    
    # Create a dataframe and save to CSV
    metrics_df = pd.DataFrame([metrics])
    metrics_df.to_csv('models/model_metrics.csv', index=False)
    
    # Plot and save confusion matrix
    cm = confusion_matrix(y_test, y_pred)
    plt.figure(figsize=(10, 8))
    sns.heatmap(cm, annot=True, fmt='d', cmap='Blues')
    plt.title('Confusion Matrix')
    plt.ylabel('Actual')
    plt.xlabel('Predicted')
    plt.tight_layout()
    plt.savefig('images/confusion_matrix.png')
    plt.close()
    
    # Plot and save ROC curve
    fpr, tpr, _ = roc_curve(y_test, y_pred_proba)
    auc = roc_auc_score(y_test, y_pred_proba)
    
    plt.figure(figsize=(10, 8))
    plt.plot(fpr, tpr, color='blue', lw=2, label=f'ROC curve (AUC = {auc:.4f})')
    plt.plot([0, 1], [0, 1], color='gray', lw=2, linestyle='--')
    plt.xlim([0.0, 1.0])
    plt.ylim([0.0, 1.05])
    plt.xlabel('False Positive Rate')
    plt.ylabel('True Positive Rate')
    plt.title('Receiver Operating Characteristic (ROC) Curve')
    plt.legend(loc='lower right')
    plt.tight_layout()
    plt.savefig('images/roc_curve.png')
    plt.close()
    
    # Save detailed classification report
    from sklearn.metrics import classification_report
    report = classification_report(y_test, y_pred, output_dict=True)
    report_df = pd.DataFrame(report).transpose()
    report_df.to_csv('models/classification_report.csv')
    
    return metrics

def save_model(model, filepath='models/decision_tree_model.pkl'):
    """Save the trained model to a file"""
    joblib.dump(model, filepath)
    print(f"Model saved to {filepath}")

def main():
    # Ensure directories exist
    os.makedirs('models', exist_ok=True)
    os.makedirs('images', exist_ok=True)
    
    # Load preprocessed data
    df = load_preprocessed_data()
    
    # Split data
    X_train, X_test, y_train, y_test = split_data(df)
    
    # Train model
    model = train_decision_tree(X_train, y_train)
    
    # Plot decision tree
    feature_names = X_train.columns.tolist()
    plot_decision_tree_visualization(model, X_train, feature_names)
    
    # Plot feature importance
    plot_feature_importance(model, feature_names)
    
    # Evaluate model
    metrics = evaluate_model(model, X_test, y_test)
    
    # Save model
    save_model(model)
    
    # Save test data for later use
    X_test.to_csv('data/X_test.csv', index=False)
    y_test.to_csv('data/y_test.csv', index=False)
    
    print("Model training and evaluation completed successfully!")

if __name__ == "__main__":
    main()
