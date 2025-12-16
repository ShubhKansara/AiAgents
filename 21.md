## 🧾 **Agent #21: Supplier Risk Assessment Agent**

### 📝 Overview

This AI agent helps procurement teams evaluate and monitor supplier risk by analyzing data such as financials, delivery history, ESG scores, news sentiment, and compliance records. In this lab, you’ll simulate supplier profiles, use GPT to generate risk assessments, and provide action-oriented summaries.

---

### 🧪 Lab Objectives

By the end of this lab, you will:

* Simulate supplier profiles with risk-related data
* Use GPT to classify suppliers as Low, Medium, or High risk
* Extract reasons for risk and recommend mitigation actions
* Display results in a Streamlit dashboard

---

### 🧰 Tech Stack

* **Python**
* **Pandas**
* **LangChain + GPT-4 or GPT-3.5**
* **Streamlit**

---

### 🧭 Step-by-Step Instructions

#### ✅ Step 1: Environment Setup

```bash
mkdir supplier_risk_agent
cd supplier_risk_agent
python -m venv venv
source venv/bin/activate
pip install openai langchain pandas streamlit
```

---

#### ✅ Step 2: Supplier Profile Simulation (`supplier_data.py`)

```python
import pandas as pd

def get_suppliers():
    return pd.DataFrame({
        "Supplier": ["AlphaTech", "GreenSource", "LogiXpress", "SteelCore"],
        "Delivery Delays (last 6 mo)": [2, 8, 1, 5],
        "Compliance Issues": ["None", "Minor violations", "None", "Pending litigation"],
        "ESG Score": [85, 68, 90, 50],
        "Financial Stability": ["Strong", "Average", "Strong", "Weak"],
        "Recent News Sentiment": ["Positive", "Neutral", "Positive", "Negative"]
    })
```

---

#### ✅ Step 3: GPT Prompt Template (`risk_prompt.py`)

```python
from langchain.prompts import PromptTemplate

risk_template = PromptTemplate.from_template("""
You are a Supplier Risk Analyst AI.

Given this supplier data:
- Delivery Delays: {delays}
- Compliance: {compliance}
- ESG Score: {esg}
- Financial Status: {finance}
- News Sentiment: {sentiment}

Please:
1. Classify risk level (Low / Medium / High)
2. Justify your assessment with 2 key reasons
3. Recommend one action for procurement to take
""")
```

---

#### ✅ Step 4: Risk Evaluation Logic (`risk_agent.py`)

```python
from supplier_data import get_suppliers
from risk_prompt import risk_template
from langchain.chat_models import ChatOpenAI

def assess_supplier_risks():
    df = get_suppliers()
    llm = ChatOpenAI(temperature=0.3)
    results = []

    for _, row in df.iterrows():
        prompt = risk_template.format(
            delays=row["Delivery Delays (last 6 mo)"],
            compliance=row["Compliance Issues"],
            esg=row["ESG Score"],
            finance=row["Financial Stability"],
            sentiment=row["Recent News Sentiment"]
        )
        result = llm.predict(prompt)
        results.append(result)
    
    df["AI Risk Assessment"] = results
    return df
```

---

#### ✅ Step 5: Streamlit Interface (`app.py`)

```python
import streamlit as st
from risk_agent import assess_supplier_risks

st.title("📉 Supplier Risk Assessment Agent")

if st.button("Run Risk Evaluation"):
    df = assess_supplier_risks()

    for _, row in df.iterrows():
        st.subheader(f"🏢 {row['Supplier']}")
        st.markdown(f"- **Delivery Delays:** {row['Delivery Delays (last 6 mo)']}")
        st.markdown(f"- **Compliance Issues:** {row['Compliance Issues']}")
        st.markdown(f"- **ESG Score:** {row['ESG Score']}")
        st.markdown(f"- **Financial Stability:** {row['Financial Stability']}")
        st.markdown(f"- **News Sentiment:** {row['Recent News Sentiment']}")
        st.text_area("📋 Risk Summary", row["AI Risk Assessment"], height=200)
        st.markdown("---")
```

Run the app:

```bash
streamlit run app.py
```

---

### 🧪 Example Output:

**Supplier: SteelCore**

**Risk Level:** High
**Reasoning:**

* Weak financial stability and ongoing litigation signal operational risk.
* Negative news sentiment may indicate reputational challenges.

**Action:**
Avoid long-term contracts until legal clarity is obtained and consider alternative sourcing.

---