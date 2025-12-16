
## 📋 **Agent #79: Automated Audit Agent**

### 📝 Overview

The Automated Audit Agent reviews business process logs, financial transactions, or access records to identify anomalies, compliance issues, and irregularities. It flags suspicious entries, performs rule-based and AI-enhanced checks, and provides GPT-generated summaries. In this lab, you’ll build an agent that scans data for audit anomalies and produces a concise audit report.

---

### 🧪 Lab Objectives

By the end of this lab, you will:

* Upload a mock audit dataset
* Identify rule violations and red flags
* Use GPT to generate an audit summary and risk analysis
* Export a structured audit report

---

### 🧰 Tech Stack

* **Python**
* **Streamlit**
* **Pandas**
* **LangChain + GPT-4 or GPT-3.5**
* *(Optional: Integrate rule engine like Great Expectations or Python `assert` rules)*

---

### 🧭 Step-by-Step Instructions

#### ✅ Step 1: Environment Setup

```bash
mkdir automated_audit_agent
cd automated_audit_agent
python -m venv venv
source venv/bin/activate
pip install streamlit pandas openai langchain
```

---

#### ✅ Step 2: Sample Audit Log CSV (`audit_data.csv`)

```csv
EntryID,Employee,Action,Amount,Department,Timestamp,PolicyViolation
E001,Alice,Expense Reimbursement,2500,Finance,2024-06-01 09:20,No
E002,Bob,Purchase Order,15000,Procurement,2024-06-02 10:15,Yes
E003,Clara,Data Access,0,IT,2024-06-03 11:00,Yes
E004,David,Travel Reimbursement,800,Sales,2024-06-03 15:10,No
E005,Eva,Bonus Allocation,5000,HR,2024-06-04 12:30,Yes
```

---

#### ✅ Step 3: GPT Prompt Template (`audit_prompt.py`)

```python
from langchain.prompts import PromptTemplate

audit_prompt = PromptTemplate.from_template("""
You are an internal audit AI assistant.

Analyze the following audit log:
{audit_summary}

For each entry with a policy violation:
1. Describe the issue
2. Assess risk level (Low, Medium, High)
3. Suggest action (e.g., flag for review, escalate, document)
4. One-sentence reasoning

End with a 3-bullet summary of the audit health.
""")
```

---

#### ✅ Step 4: GPT Logic (`audit_agent.py`)

```python
from langchain.chat_models import ChatOpenAI
from audit_prompt import audit_prompt

def analyze_audit_data(summary: str):
    llm = ChatOpenAI(temperature=0.3)
    prompt = audit_prompt.format(audit_summary=summary)
    return llm.predict(prompt)
```

---

#### ✅ Step 5: Streamlit Interface (`app.py`)

```python
import streamlit as st
import pandas as pd
from audit_agent import analyze_audit_data

st.title("📋 Automated Audit Agent")
st.caption("Scan logs and get AI-powered audit insights")

file = st.file_uploader("Upload Audit Log CSV", type=["csv"])

if file:
    df = pd.read_csv(file)
    summary = df[df["PolicyViolation"] == "Yes"].to_string(index=False)

    st.subheader("🚨 GPT Audit Report")
    report = analyze_audit_data(summary)
    st.text_area("Audit Summary", report, height=350)

    st.dataframe(df)
    st.download_button("Download Audit Log", df.to_csv(index=False), "audit_report.csv")
```

Run the app:

```bash
streamlit run app.py
```

---

### 🧪 Example GPT Output

```
- Bob: High risk. Unauthorized PO of $15,000. Action: Flag and escalate. Reason: Large amount and policy breach.  
- Clara: Medium risk. Accessed sensitive IT data without reason. Action: Review access logs.  
- Eva: High risk. Bonus allocation without documented approval. Action: Escalate to HR lead.

Summary:
• 3 policy violations detected  
• 2 high-risk events flagged  
• Recommend immediate review and access audit in IT
```

---

