## 🔄 **Agent #39: Customer Churn Prediction Agent**

### 📝 Overview

This agent analyzes customer behavior and signals to predict the likelihood of churn. It enables proactive retention by surfacing at-risk accounts. In this lab, you’ll simulate customer data, train a basic ML model, and use GPT to generate retention strategy suggestions.

---

### 🧪 Lab Objectives

By the end of this lab, you will:

* Simulate historical customer data (activity, satisfaction, revenue)
* Train a churn prediction model
* Use GPT to interpret results and suggest retention actions
* Visualize churn risk in Streamlit

---

### 🧰 Tech Stack

* **Python**
* **Pandas, scikit-learn**
* **LangChain + GPT-4 or GPT-3.5**
* **Streamlit**

---

### 🧭 Step-by-Step Instructions

#### ✅ Step 1: Environment Setup

```bash
mkdir churn_prediction_agent
cd churn_prediction_agent
python -m venv venv
source venv/bin/activate
pip install pandas scikit-learn openai langchain streamlit
```

---

#### ✅ Step 2: Simulate Customer Data (`customer_data.py`)

```python
import pandas as pd
import numpy as np

def get_customer_data():
    np.random.seed(42)
    data = pd.DataFrame({
        "CustomerID": range(1, 101),
        "UsageFrequency": np.random.randint(1, 10, 100),
        "SupportTickets": np.random.randint(0, 5, 100),
        "SatisfactionScore": np.random.randint(1, 6, 100),
        "ContractLengthMonths": np.random.randint(3, 24, 100),
        "Churned": np.random.choice([0, 1], size=100, p=[0.8, 0.2])
    })
    return data
```

---

#### ✅ Step 3: Train Prediction Model (`churn_model.py`)

```python
from customer_data import get_customer_data
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier

def train_churn_model():
    df = get_customer_data()
    X = df[["UsageFrequency", "SupportTickets", "SatisfactionScore", "ContractLengthMonths"]]
    y = df["Churned"]

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)
    model = RandomForestClassifier()
    model.fit(X_train, y_train)

    df["ChurnRisk"] = model.predict_proba(X)[:, 1]
    return df.sort_values("ChurnRisk", ascending=False).reset_index(drop=True)
```

---

#### ✅ Step 4: GPT Insight Generator (`churn_prompt.py`)

```python
from langchain.prompts import PromptTemplate

churn_prompt = PromptTemplate.from_template("""
You are a customer success analyst.

Based on this churn risk summary:
{summary}

Suggest 3 retention strategies:
- One for high-risk customers
- One for mid-risk
- One for low-risk

Use practical SaaS examples.
""")
```

---

#### ✅ Step 5: Run GPT Analysis (`churn_agent.py`)

```python
from churn_model import train_churn_model
from churn_prompt import churn_prompt
from langchain.chat_models import ChatOpenAI

def generate_retention_strategies():
    df = train_churn_model().head(10)
    summary = df[["CustomerID", "ChurnRisk"]].to_string(index=False)
    
    llm = ChatOpenAI(temperature=0.4)
    prompt = churn_prompt.format(summary=summary)
    suggestions = llm.predict(prompt)
    
    return df, suggestions
```

---

#### ✅ Step 6: Streamlit Dashboard (`app.py`)

```python
import streamlit as st
from churn_agent import generate_retention_strategies

st.title("🔄 Customer Churn Prediction Agent")

if st.button("Run Churn Analysis"):
    df, suggestions = generate_retention_strategies()

    st.subheader("Top 10 Customers by Churn Risk")
    st.dataframe(df[["CustomerID", "ChurnRisk"]])

    st.subheader("🧠 GPT Retention Suggestions")
    st.text_area("Strategy Summary", suggestions, height=300)
```

Run the app:

```bash
streamlit run app.py
```

---

### 🧪 Example GPT Output:

**Retention Strategies:**

* **High Risk**: Assign CSM, offer 20% discount to renew early
* **Mid Risk**: Invite to webinar on advanced features
* **Low Risk**: Send satisfaction survey and loyalty points

---
