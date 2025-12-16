## 🧩 **Agent #43: Customer Segmentation Agent**

### 📝 Overview

This agent groups customers into meaningful segments based on behavior, demographics, or engagement metrics. It enables targeted marketing, product personalization, and lifecycle planning. In this lab, you'll cluster customer data and use GPT to explain each segment's traits and value.

---

### 🧪 Lab Objectives

By the end of this lab, you will:

* Simulate customer behavior data (spend, visits, region, loyalty)
* Use clustering (K-Means) to segment customers
* Visualize clusters with color-coded plots
* Use GPT to describe each segment’s behavior and suggest targeted actions

---

### 🧰 Tech Stack

* **Python**
* **Pandas, scikit-learn, Plotly**
* **LangChain + GPT-4 or GPT-3.5**
* **Streamlit**

---

### 🧭 Step-by-Step Instructions

#### ✅ Step 1: Environment Setup

```bash
mkdir customer_segmentation_agent
cd customer_segmentation_agent
python -m venv venv
source venv/bin/activate
pip install pandas scikit-learn plotly openai langchain streamlit
```

---

#### ✅ Step 2: Generate Customer Data (`customer_data.py`)

```python
import pandas as pd
import numpy as np

def get_customer_df():
    np.random.seed(42)
    data = pd.DataFrame({
        "CustomerID": range(1, 101),
        "AvgSpend": np.random.uniform(50, 500, 100),
        "VisitsPerMonth": np.random.randint(1, 15, 100),
        "Region": np.random.choice(["North", "South", "East", "West"], 100),
        "LoyaltyScore": np.random.randint(1, 11, 100)
    })
    return data
```

---

#### ✅ Step 3: Apply K-Means Clustering (`segmentation_model.py`)

```python
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import KMeans
from customer_data import get_customer_df

def segment_customers(n_clusters=3):
    df = get_customer_df()
    features = df[["AvgSpend", "VisitsPerMonth", "LoyaltyScore"]]
    scaled = StandardScaler().fit_transform(features)

    model = KMeans(n_clusters=n_clusters, random_state=42)
    df["Segment"] = model.fit_predict(scaled)

    return df
```

---

#### ✅ Step 4: GPT Description of Segments (`segmentation_prompt.py`)

```python
from langchain.prompts import PromptTemplate

segment_prompt = PromptTemplate.from_template("""
You are a customer segmentation expert.

Based on the customer summary below:
{segment_summary}

Describe each segment:
- What defines it
- What marketing strategies would work best

Label each segment clearly.
""")
```

---

#### ✅ Step 5: GPT Analysis (`segmentation_agent.py`)

```python
from segmentation_model import segment_customers
from segmentation_prompt import segment_prompt
from langchain.chat_models import ChatOpenAI

def analyze_segments():
    df = segment_customers()
    summary = df.groupby("Segment")[["AvgSpend", "VisitsPerMonth", "LoyaltyScore"]].mean().to_string()

    llm = ChatOpenAI(temperature=0.4)
    prompt = segment_prompt.format(segment_summary=summary)
    response = llm.predict(prompt)

    return df, response
```

---

#### ✅ Step 6: Streamlit Interface (`app.py`)

```python
import streamlit as st
import plotly.express as px
from segmentation_agent import analyze_segments

st.title("🧩 Customer Segmentation Agent")

if st.button("Segment Customers"):
    df, gpt_desc = analyze_segments()

    st.subheader("🔍 Customer Segments")
    st.dataframe(df)

    fig = px.scatter(df, x="AvgSpend", y="VisitsPerMonth", color="Segment",
                     size="LoyaltyScore", hover_data=["CustomerID", "Region"])
    st.plotly_chart(fig)

    st.subheader("🧠 GPT Segment Descriptions")
    st.text_area("Insights", gpt_desc, height=400)
```

Run the app:

```bash
streamlit run app.py
```

---

### 🧪 Example GPT Output:

**Segment 0: Budget Loyalists**

* Moderate visits, low spend, high loyalty
* Use rewards programs, exclusive points offers

**Segment 1: High-Value Frequent Buyers**

* High spend and high visit frequency
* Premium upsells and personalized bundles recommended

**Segment 2: One-Time Shoppers**

* Low spend, low loyalty
* Target re-engagement via discount emails and seasonal flash sales

---
