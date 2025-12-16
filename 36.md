## 🧠 **Agent #36: AI-powered CRM Assistant**

### 📝 Overview

This AI agent automates CRM workflows by summarizing meetings, updating deal notes, suggesting follow-ups, and surfacing key insights. It increases CRM hygiene and ensures sales reps spend more time selling, not typing. In this lab, you’ll simulate CRM data and GPT-generated activity summaries.

---

### 🧪 Lab Objectives

By the end of this lab, you will:

* Simulate CRM deal and meeting records
* Use GPT to generate follow-up suggestions and update summaries
* Display and optionally export the updates to CSV or JSON
* Build a clean Streamlit dashboard

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
mkdir crm_assistant_agent
cd crm_assistant_agent
python -m venv venv
source venv/bin/activate
pip install pandas openai langchain streamlit
```

---

#### ✅ Step 2: Simulate CRM Data (`crm_data.py`)

```python
import pandas as pd

def get_deals():
    return pd.DataFrame([
        {
            "Deal ID": "D101",
            "Client": "NextData Inc.",
            "Stage": "Demo Completed",
            "Last Interaction": "2025-07-15",
            "Meeting Notes": "Client interested in pricing details and case studies. Mentioned Q3 rollout goal."
        },
        {
            "Deal ID": "D102",
            "Client": "HealthFlow",
            "Stage": "Negotiation",
            "Last Interaction": "2025-07-10",
            "Meeting Notes": "Asked for deeper security compliance details. CTO joined unexpectedly."
        }
    ])
```

---

#### ✅ Step 3: GPT Prompt Template (`crm_prompt.py`)

```python
from langchain.prompts import PromptTemplate

crm_template = PromptTemplate.from_template("""
You are an AI CRM assistant.

Given this client interaction:
- Client: {client}
- Deal Stage: {stage}
- Notes: {notes}

Generate:
1. A one-line deal summary
2. Suggested follow-up action
3. Tags (comma-separated) for CRM

Respond in 3 labeled bullet points.
""")
```

---

#### ✅ Step 4: CRM Logic (`crm_agent.py`)

```python
from crm_data import get_deals
from crm_prompt import crm_template
from langchain.chat_models import ChatOpenAI

def process_crm_updates():
    df = get_deals()
    llm = ChatOpenAI(temperature=0.3)
    results = []

    for _, row in df.iterrows():
        prompt = crm_template.format(
            client=row["Client"],
            stage=row["Stage"],
            notes=row["Meeting Notes"]
        )
        result = llm.predict(prompt)
        results.append((row["Deal ID"], row["Client"], result))

    return df, results
```

---

#### ✅ Step 5: Streamlit CRM Dashboard (`app.py`)

```python
import streamlit as st
from crm_agent import process_crm_updates

st.title("🧠 AI-powered CRM Assistant")

if st.button("Update CRM"):
    df, results = process_crm_updates()

    for deal_id, client, summary in results:
        st.subheader(f"🔹 Deal: {deal_id} | {client}")
        st.text_area("CRM Update Summary", summary, height=200)
        st.markdown("---")
```

Run the app:

```bash
streamlit run app.py
```

---

### 🧪 Example GPT Output:

**D101 – NextData Inc.**

* **Summary**: Client ready for Q3 rollout, exploring pricing and validation.
* **Follow-up**: Share pricing sheet and customer success story PDF.
* **Tags**: pricing, Q3, case-study, demo-complete

---
