## 💸 **Agent #26: Procurement Spend Analysis Agent**

### 📝 Overview

This AI agent analyzes historical procurement spend data to uncover trends, highlight anomalies, flag cost-saving opportunities, and recommend strategic sourcing actions. In this lab, you’ll simulate spend data, use GPT to summarize insights, and visualize key findings in a dashboard.

---

### 🧪 Lab Objectives

By the end of this lab, you will:

* Load or simulate procurement spend data
* Use GPT to generate natural language insights
* Visualize spend breakdowns by category, vendor, and time
* Display key metrics and recommendations in Streamlit

---

### 🧰 Tech Stack

* **Python**
* **Pandas**
* **Matplotlib / Plotly**
* **LangChain + GPT-4 or GPT-3.5**
* **Streamlit**

---

### 🧭 Step-by-Step Instructions

#### ✅ Step 1: Environment Setup

```bash
mkdir spend_analysis_agent
cd spend_analysis_agent
python -m venv venv
source venv/bin/activate
pip install pandas matplotlib plotly openai langchain streamlit
```

---

#### ✅ Step 2: Simulate Spend Data (`spend_data.py`)

```python
import pandas as pd

def get_spend_data():
    data = {
        "Month": ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        "Category": ["Office Supplies", "IT Hardware", "Logistics", "IT Hardware", "Office Supplies", "Logistics"],
        "Vendor": ["Staples", "TechNova", "LogiXpress", "TechNova", "Staples", "LogiXpress"],
        "Amount": [4500, 12000, 8000, 11000, 5000, 9500]
    }
    return pd.DataFrame(data)
```

---

#### ✅ Step 3: GPT Prompt Template (`spend_prompt.py`)

```python
from langchain.prompts import PromptTemplate

spend_template = PromptTemplate.from_template("""
You are a procurement data analyst AI.

Given this spend data:
{summary}

Provide:
1. Key spend trends and spikes
2. Vendor concentration concerns
3. Recommendations for cost savings
Limit to 5 bullet points.
""")
```

---

#### ✅ Step 4: GPT Analysis Logic (`spend_agent.py`)

```python
from spend_data import get_spend_data
from spend_prompt import spend_template
from langchain.chat_models import ChatOpenAI

def analyze_spend():
    df = get_spend_data()
    summary = df.groupby(["Category", "Vendor"]).sum().reset_index().to_string(index=False)
    
    prompt = spend_template.format(summary=summary)
    llm = ChatOpenAI(temperature=0.3)
    result = llm.predict(prompt)

    return df, result
```

---

#### ✅ Step 5: Streamlit Dashboard (`app.py`)

```python
import streamlit as st
import plotly.express as px
from spend_agent import analyze_spend

st.title("💸 Procurement Spend Analysis Agent")

if st.button("Run Analysis"):
    df, gpt_insight = analyze_spend()

    st.subheader("📊 Spend Breakdown")
    fig = px.bar(df, x="Vendor", y="Amount", color="Category", barmode="group")
    st.plotly_chart(fig)

    st.subheader("🧠 AI-Generated Insights")
    st.text_area("Summary", gpt_insight, height=250)
```

Run the app:

```bash
streamlit run app.py
```

---

### 🧪 Example GPT Output:

* IT Hardware spending dominated by TechNova over 2 months
* Logistics costs increased 18.75% between March and June
* Over-reliance on Staples for office supplies
* Consider negotiating bulk pricing with LogiXpress
* Review TechNova contracts for volume discounts

---
