
## 🛡️ **Agent #82: Regulatory Compliance Agent**

### 📝 Overview

The Regulatory Compliance Agent scans internal policies, operational procedures, and documentation to assess alignment with external regulations (like GDPR, HIPAA, SOX). It flags missing elements, non-compliance risks, and recommends actionable improvements. In this lab, you’ll build an agent that reviews text-based documents and produces a GPT-generated compliance gap report.

---

### 🧪 Lab Objectives

By the end of this lab, you will:

* Upload internal policy or procedure documents
* Select a target regulation (e.g., GDPR)
* Analyze for coverage and alignment
* Receive a structured compliance summary with improvement suggestions

---

### 🧰 Tech Stack

* **Python**
* **Streamlit**
* **LangChain + GPT-4 or GPT-3.5**
* *(Optional: Regulatory clause templates for rule matching)*

---

### 🧭 Step-by-Step Instructions

#### ✅ Step 1: Environment Setup

```bash
mkdir compliance_agent
cd compliance_agent
python -m venv venv
source venv/bin/activate
pip install streamlit langchain openai tiktoken
```

---

#### ✅ Step 2: Sample Policy Document (`data_policy.txt`)

```
Our company collects customer data only with consent and uses it for internal purposes. 
Data is stored on secure servers, and employees are trained to handle it responsibly. 
Data is not shared with third parties unless required by law. Users may request deletion.
```

---

#### ✅ Step 3: GPT Prompt Template (`compliance_prompt.py`)

```python
from langchain.prompts import PromptTemplate

compliance_prompt = PromptTemplate.from_template("""
You are a regulatory compliance AI assistant.

Policy Document:
{policy_text}

Target Regulation: {regulation_name}

Analyze and return:
1. Compliance Level (Compliant / Partially Compliant / Non-Compliant)
2. Missing or weak areas
3. Recommended action steps
4. Overall risk score (Low/Medium/High)
5. One-sentence executive summary
""")
```

---

#### ✅ Step 4: GPT Logic (`compliance_agent.py`)

```python
from langchain.chat_models import ChatOpenAI
from compliance_prompt import compliance_prompt

def check_compliance(policy_text, regulation_name):
    llm = ChatOpenAI(temperature=0.3)
    prompt = compliance_prompt.format(
        policy_text=policy_text,
        regulation_name=regulation_name
    )
    return llm.predict(prompt)
```

---

#### ✅ Step 5: Streamlit Interface (`app.py`)

```python
import streamlit as st
from compliance_agent import check_compliance

st.title("🛡️ Regulatory Compliance Agent")
st.caption("Check your policy documents for compliance with major regulations")

file = st.file_uploader("Upload Policy Text (.txt)", type=["txt"])
regulation = st.selectbox("Select Regulation", ["GDPR", "HIPAA", "SOX", "CCPA", "PCI DSS"])

if file and regulation:
    text = file.read().decode("utf-8")
    result = check_compliance(text, regulation)
    
    st.subheader("📋 Compliance Summary")
    st.text_area("GPT Compliance Output", result, height=350)
```

Run the app:

```bash
streamlit run app.py
```

---

### 🧪 Example GPT Output

```
- Compliance Level: Partially Compliant  
- Weakness: No mention of user data breach notification timelines (GDPR Article 33)  
- Action: Add a breach response policy and 72-hour reporting clause  
- Risk Score: Medium  
- Summary: Document shows effort toward GDPR compliance but lacks specificity in breach handling and data portability clauses.
```

---
