## 📈 **Agent #27: Supplier Performance Monitoring Agent**

### 📝 Overview

This AI agent tracks and evaluates supplier performance using delivery timeliness, quality metrics, incident reports, and feedback scores. It flags underperforming vendors and suggests corrective actions. In this lab, you’ll simulate supplier KPIs and use GPT to generate performance summaries and alerts.

---

### 🧪 Lab Objectives

By the end of this lab, you will:

* Simulate performance metrics for suppliers
* Use GPT to evaluate and categorize supplier performance
* Generate improvement suggestions for flagged vendors
* Visualize performance dashboards using Streamlit

---

### 🧰 Tech Stack

* **Python**
* **Pandas**
* **LangChain + GPT-4 or GPT-3.5**
* **Streamlit**
* **Plotly**

---

### 🧭 Step-by-Step Instructions

#### ✅ Step 1: Environment Setup

```bash
mkdir supplier_monitoring_agent
cd supplier_monitoring_agent
python -m venv venv
source venv/bin/activate
pip install pandas openai langchain plotly streamlit
```

---

#### ✅ Step 2: Simulate Supplier KPI Data (`supplier_data.py`)

```python
import pandas as pd

def get_supplier_kpis():
    return pd.DataFrame({
        "Supplier": ["SteelCore", "EcoLogix", "ByteCom", "GreenWare"],
        "On-time Delivery (%)": [92, 76, 88, 95],
        "Defect Rate (%)": [1.2, 4.8, 2.1, 0.5],
        "Support Responsiveness (1–5)": [4.5, 3.0, 3.8, 4.9],
        "Avg Feedback Score (1–5)": [4.2, 2.8, 3.9, 4.6]
    })
```

---

#### ✅ Step 3: GPT Prompt Template (`performance_prompt.py`)

```python
from langchain.prompts import PromptTemplate

performance_template = PromptTemplate.from_template("""
You are a Supplier Performance Analyst AI.

Given the following metrics for {supplier}:
- On-time Delivery: {delivery}%
- Defect Rate: {defect}%
- Support Responsiveness: {support}/5
- Feedback Score: {feedback}/5

Please:
1. Assess performance level (Excellent, Good, Needs Improvement)
2. Justify your assessment
3. Suggest 1 corrective or engagement action if needed
Respond in 3 short bullet points.
""")
```

---

#### ✅ Step 4: GPT Evaluation Logic (`monitoring_agent.py`)

```python
from supplier_data import get_supplier_kpis
from performance_prompt import performance_template
from langchain.chat_models import ChatOpenAI

def evaluate_suppliers():
    df = get_supplier_kpis()
    llm = ChatOpenAI(temperature=0.3)
    evaluations = []

    for _, row in df.iterrows():
        prompt = performance_template.format(
            supplier=row["Supplier"],
            delivery=row["On-time Delivery (%)"],
            defect=row["Defect Rate (%)"],
            support=row["Support Responsiveness (1–5)"],
            feedback=row["Avg Feedback Score (1–5)"]
        )
        result = llm.predict(prompt)
        evaluations.append((row["Supplier"], result))

    return df, evaluations
```

---

#### ✅ Step 5: Streamlit Interface (`app.py`)

```python
import streamlit as st
import plotly.express as px
from monitoring_agent import evaluate_suppliers

st.title("📈 Supplier Performance Monitoring Agent")

if st.button("Evaluate Suppliers"):
    df, evaluations = evaluate_suppliers()

    st.subheader("📊 Performance Overview")
    fig = px.bar(df, x="Supplier", y="On-time Delivery (%)", color="Avg Feedback Score (1–5)")
    st.plotly_chart(fig)

    st.subheader("🧠 AI Assessments")
    for supplier, assessment in evaluations:
        st.subheader(f"{supplier}")
        st.text_area("Performance Summary", assessment, height=200)
        st.markdown("---")
```

Run the app:

```bash
streamlit run app.py
```

---

### 🧪 Example Output (SteelCore):

* Performance: **Excellent**
* Justification: High delivery rate (92%), low defects (1.2%), strong feedback
* Suggestion: Maintain consistent communication to preserve performance

**EcoLogix**:

* Performance: **Needs Improvement**
* Justification: Delivery delays (76%) and high defect rate (4.8%)
* Suggestion: Schedule a quarterly review to address quality control

---
