
## ⚙️ **Agent #89: Automated Risk Management Agent**

### 📝 Overview

The Automated Risk Management Agent continuously monitors business activities, evaluates risk exposure across departments, and suggests mitigation strategies based on historical incidents, operational thresholds, and external regulations. It acts as a digital risk officer by combining real-time data with AI-driven insights. In this lab, you’ll build an agent that takes structured input about business risks and returns GPT-based assessments and recommendations.

---

### 🧪 Lab Objectives

By the end of this lab, you will:

* Enter risk category, description, and business unit
* Use GPT to generate a severity rating and explanation
* Get mitigation strategies based on the input
* Export the risk report for internal compliance use

---

### 🧰 Tech Stack

* **Python**
* **Streamlit**
* **LangChain + GPT-4 or GPT-3.5**
* *(Optional: Database to store recurring risks and a risk scoring matrix)*

---

### 🧭 Step-by-Step Instructions

#### ✅ Step 1: Environment Setup

```bash
mkdir risk_mgmt_agent
cd risk_mgmt_agent
python -m venv venv
source venv/bin/activate
pip install streamlit langchain openai
```

---

#### ✅ Step 2: Prompt Template (`risk_prompt.py`)

```python
from langchain.prompts import PromptTemplate

risk_prompt = PromptTemplate.from_template("""
You are a business risk management AI assistant.

Based on the following details, assess the risk severity and suggest mitigation steps:

- Category: {category}  
- Description: {description}  
- Business Unit: {unit}

Your output should include:
1. Risk Severity (Low, Medium, High, Critical)
2. Likelihood of Occurrence
3. Impact Explanation
4. Recommended Mitigation Strategies
5. Compliance Considerations (if any)
6. Executive Summary (3 sentences)
""")
```

---

#### ✅ Step 3: GPT Risk Engine (`risk_evaluator.py`)

```python
from langchain.chat_models import ChatOpenAI
from risk_prompt import risk_prompt

def evaluate_risk(category, description, unit):
    llm = ChatOpenAI(temperature=0.4)
    prompt = risk_prompt.format(category=category, description=description, unit=unit)
    return llm.predict(prompt)
```

---

#### ✅ Step 4: Streamlit App (`app.py`)

```python
import streamlit as st
from risk_evaluator import evaluate_risk

st.title("⚙️ Automated Risk Management Agent")
st.caption("Analyze and manage risks across departments")

category = st.selectbox("Risk Category", ["Operational", "Financial", "Cybersecurity", "Compliance", "Reputational", "Strategic"])
unit = st.text_input("Business Unit (e.g., HR, Finance, IT)", "IT")
description = st.text_area("Risk Description", "Cloud vendor may discontinue service with 30-day notice")

if st.button("Evaluate Risk"):
    result = evaluate_risk(category, description, unit)
    st.subheader("📉 Risk Assessment Report")
    st.text_area("GPT Report", result, height=500)
    st.download_button("Download Report", data=result, file_name=f"{category}_Risk_Report_{unit}.md")
```

Run:

```bash
streamlit run app.py
```

---

### 🧪 Example Output

**Category:** Cybersecurity
**Description:** Cloud vendor may discontinue service with 30-day notice
**Unit:** IT

**GPT Response (Excerpt):**

```
1. Risk Severity: High  
2. Likelihood: Moderate  
3. Impact: Service disruption could halt major applications hosted on the cloud, affecting 70% of operations.  
4. Mitigation: Establish backup providers, initiate multi-cloud architecture, negotiate 60-day termination clauses.  
5. Compliance: Check data residency and backup access policies under GDPR.  
6. Executive Summary: This risk poses high operational and reputational threats. Mitigation should begin with alternative vendor assessment and resilience planning.
```

---
