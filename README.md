# 🏢 HR Attrition Predictor

🎯 Predict employee attrition, understand workforce trends, and support HR strategies with an intuitive and interactive ML-powered dashboard.

---

## 🚀 Overview

This project uses a **Decision Tree Classifier** to:

- ✅ Predict if an employee is likely to leave
- 📊 Analyze the top features influencing attrition
- 📈 Visualize workforce patterns and model performance
- 💡 Deliver actionable insights through a **Streamlit web app**

---

## 📂 Dataset Snapshot

- 📌 **Source**: [Kaggle - HR Analytics Dataset](https://www.kaggle.com/datasets/giripujar/hr-analytics)
- 🧑‍💼 **Records**: 14,999 employees
- 🎯 **Target**: Binary (left: 0/1)

| Feature                  | Description                                  |
|--------------------------|----------------------------------------------|
| satisfaction_level       | Employee satisfaction (0-1)                  |
| last_evaluation          | Last evaluation score (0-1)                  |
| number_project           | Projects completed                           |
| average_monthly_hours    | Monthly working hours                        |
| time_spend_company       | Years in the company                         |
| Work_accident            | Whether had a work accident                  |
| promotion_last_5years    | Promotion in the last 5 years                |
| Department               | Employee department                          |
| salary                   | Categorical salary level (low/medium/high)   |

---

## 🛠️ Tech Stack

| Domain          | Tools Used                              |
|------------------|------------------------------------------|
| Language         | Python 3.8+                              |
| ML & Preprocessing | Scikit-learn, Pandas, NumPy              |
| Visualization    | Seaborn, Matplotlib                      |
| Web App          | Streamlit                               |
| Deployment       | Joblib                                  |

---

## 📈 Model Performance

- 🎯 **Model**: Decision Tree Classifier

| Metric     | Score    |
|------------|----------|
| Accuracy   | 97.97%   |
| Precision  | 97.25%   |
| Recall     | 94.12%   |
| F1-Score   | 95.66%   |

### 🔍 Classification Summary

| Class      | Precision | Recall  | F1-Score | Support |
|------------|-----------|---------|----------|---------|
| Not Left (0) | 98.18%    | 99.17%  | 98.67%   | 2,286   |
| Left (1)     | 97.25%    | 94.12%  | 95.66%   | 714     |
| **Overall**  | 97.96%    |         | 97.96%   | 3,000   |

---

## 🔎 Clustering Insights

Unsupervised clustering revealed **2 workforce segments**:

| Segment    | Size      | Satisfaction | Projects | Avg. Hours | Time at Company | Accidents | Promotion |
|------------|-----------|--------------|----------|-------------|------------------|-----------|-----------|
| Cluster 0  | 72.33%    | 0.61         | 3.80     | 201.08      | 3.47 yrs         | 15%       | 2%        |
| Cluster 1  | 27.67%    | 0.61         | 3.80     | 200.98      | 3.57 yrs         | 14%       | 3%        |

💡 *Both clusters show similar behavior, indicating a relatively homogeneous workforce.*

---

## 💻 App Features (Streamlit)

- 🔮 Real-time attrition prediction  
- 📊 Visualize satisfaction, projects, and attrition patterns  
- 📈 Display feature importance and model metrics  
- ⚙️ Simple, interactive, and responsive UI  

---

## ⚙️ Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/abubakarp789/HR-Attrition-Predictor.git
cd HR-Attrition-Predictor

# 2. Create and activate a virtual environment
python -m venv venv
# For Windows:
venv\Scripts\activate
# For Linux/Mac:
source venv/bin/activate

# 3. Install dependencies
pip install -r requirements.txt

# 4. Run the Streamlit app
streamlit run app.py
```

## 🤝 Contributing

We welcome contributions! Here's how to get started:

```bash
# 1. Fork the repo
# 2. Create your branch
git checkout -b feature/YourFeatureName

# 3. Make changes, then commit
git commit -m "Added feature"

# 4. Push changes
git push origin feature/YourFeatureName

# 5. Create a Pull Request 🎉
```

---

## 👨‍💻 Author

- **Name**: Abubakar 
- **Role**: Machine Learning Developer
- **Links**: [LinkedIn](https://linkedin.com/in/abubakar56) | [GitHub](https://github.com/abubakarp789)
- **Email**: abubakarp789@gmail.com