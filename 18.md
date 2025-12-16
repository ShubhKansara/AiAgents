## 🔥 **Agent #18: Burnout Prediction Agent**

### 📝 Overview

This AI agent identifies early signs of employee burnout by analyzing behavioral signals such as working hours, PTO usage, communication tone, and productivity metrics. In this lab, you’ll simulate an employee dataset and use GPT to assess burnout risk and suggest interventions.

---

### 🧪 Lab Objectives

By the end of this lab, you will:

* Simulate behavioral and productivity data for employees
* Use GPT to evaluate burnout risk
* Generate a summary with suggested HR actions
* Visualize risk levels in a Streamlit interface

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
mkdir burnout_agent
cd burnout_agent
python -m venv venv
source venv/bin/activate
pip install openai langchain pandas streamlit
```

---

#### ✅ Step 2: Simulate employee behavioral data (`burnout_data.py`)

```python
import pandas as pd

def load_employee_metrics():
    return pd.DataFrame({
        "Employee ID": [201, 202, 203, 204],
        "Avg Weekly Hours": [42, 60, 37, 55],
        "PTO Taken (days last 90d)": [5, 0, 8, 1],
        "Slack Message Sentiment": ["Neutral", "Negative", "Positive", "Negative"],
        "Late-Night Emails/week": [2, 7, 0, 6]
    })
```

---

#### ✅ Step 3: GPT Prompt Template (`burnout_prompt.py`)

```python
from langchain.prompts import PromptTemplate

burnout_template = PromptTemplate.from_template("""
You are a workplace wellness AI.

Based on the data below, assess this employee’s burnout risk:

- Weekly Hours: {hours}
- PTO Taken: {pto} days in 90 days
- Message Sentiment: {sentiment}
- Late-Night Emails/Week: {emails}

Please:
1. Classify burnout risk as Low, Moderate, or High.
2. Justify your reasoning.
3. Recommend one specific HR intervention.
""")
```

---

#### ✅ Step 4: GPT Agent Logic (`burnout_agent.py`)

```python
from burnout_data import load_employee_metrics
from burnout_prompt import burnout_template
from langchain.chat_models import ChatOpenAI

def analyze_burnout():
    df = load_employee_metrics()
    results = []
    llm = ChatOpenAI(temperature=0.3)

    for _, row in df.iterrows():
        prompt = burnout_template.format(
            hours=row["Avg Weekly Hours"],
            pto=row["PTO Taken (days last 90d)"],
            sentiment=row["Slack Message Sentiment"],
            emails=row["Late-Night Emails/week"]
        )
        result = llm.predict(prompt)
        results.append(result)
    
    df["Burnout Analysis"] = results
    return df
```

---

#### ✅ Step 5: Streamlit Interface (`app.py`)

```python
import streamlit as st
from burnout_agent import analyze_burnout

st.title("🔥 Burnout Prediction Agent")

if st.button("Run Burnout Scan"):
    df = analyze_burnout()

    for _, row in df.iterrows():
        st.subheader(f"🧑 Employee {row['Employee ID']}")
        st.markdown(f"**Avg Weekly Hours:** {row['Avg Weekly Hours']}")
        st.markdown(f"**PTO Taken (90d):** {row['PTO Taken (days last 90d)']} days")
        st.markdown(f"**Sentiment:** {row['Slack Message Sentiment']}")
        st.markdown(f"**Late-Night Emails:** {row['Late-Night Emails/week']}/week")
        st.text_area("🧠 Burnout Risk Assessment", row["Burnout Analysis"], height=180)
        st.markdown("---")
```

Run the app:

```bash
streamlit run app.py
```

---

### 🧪 Example Output:

```
Burnout Risk: High

This employee is working 60 hours per week, has not taken any PTO in the past 90 days, and frequently sends emails late at night. Their Slack sentiment is also negative.

Recommendation:
Schedule a well-being check-in with their manager and encourage immediate PTO usage. Explore workload redistribution options.
```

---