## ⚖️ **Agent #28: Compliance and Regulatory Agent**

### 📝 Overview

This AI agent analyzes internal documents, vendor contracts, or audit reports to flag compliance gaps, check for alignment with regulations, and summarize risk exposure. In this lab, you’ll simulate policy excerpts and vendor data, then use GPT to identify compliance issues and generate regulatory summaries.

---

### 🧪 Lab Objectives

By the end of this lab, you will:

* Simulate compliance-related documents and vendor records
* Use GPT to check regulatory alignment (e.g., GDPR, SOX, HIPAA)
* Flag missing clauses or risky patterns
* Summarize findings and suggest remediation actions

---

### 🧰 Tech Stack

* **Python**
* **LangChain + GPT-4 or GPT-3.5**
* **Streamlit**

---

### 🧭 Step-by-Step Instructions

#### ✅ Step 1: Environment Setup

```bash
mkdir compliance_agent
cd compliance_agent
python -m venv venv
source venv/bin/activate
pip install openai langchain streamlit
```

---

#### ✅ Step 2: Simulate Compliance Data (`compliance_data.py`)

```python
compliance_documents = {
    "Vendor A": """
The vendor collects customer PII but does not provide clear opt-out options. Retention policy is loosely defined, with no mention of data deletion timelines. No reference to third-party data processors.
""",
    "Vendor B": """
The vendor ensures end-to-end encryption, maintains audit logs for 3 years, and aligns with GDPR guidelines on data minimization and consent. DPA is signed and in effect.
""",
    "Vendor C": """
Data storage is offshore, with no clarity on breach notification procedures. Policies reference SOX but lack concrete enforcement language. Incident response SLA is undefined.
"""
}

def get_documents():
    return compliance_documents
```

---

#### ✅ Step 3: GPT Prompt Template (`compliance_prompt.py`)

```python
from langchain.prompts import PromptTemplate

compliance_template = PromptTemplate.from_template("""
You are an AI compliance auditor.

Given the following document:
"{text}"

Check against general regulatory best practices (GDPR, SOX, HIPAA), and identify:
1. Compliance gaps or violations
2. Missing clauses or weak policies
3. Suggested actions to become compliant

Summarize your findings in 3–5 bullet points.
""")
```

---

#### ✅ Step 4: Compliance Evaluation Logic (`compliance_agent.py`)

```python
from compliance_data import get_documents
from compliance_prompt import compliance_template
from langchain.chat_models import ChatOpenAI

def evaluate_compliance():
    docs = get_documents()
    llm = ChatOpenAI(temperature=0.3)
    results = []

    for vendor, text in docs.items():
        prompt = compliance_template.format(text=text)
        result = llm.predict(prompt)
        results.append((vendor, result))

    return results
```

---

#### ✅ Step 5: Streamlit Interface (`app.py`)

```python
import streamlit as st
from compliance_agent import evaluate_compliance

st.title("⚖️ Compliance and Regulatory Agent")

if st.button("Run Compliance Check"):
    results = evaluate_compliance()

    for vendor, summary in results:
        st.subheader(f"📄 {vendor}")
        st.text_area("Compliance Summary", summary, height=250)
        st.markdown("---")
```

Run the app:

```bash
streamlit run app.py
```

---

### 🧪 Example Output:

**Vendor A:**

* Lacks clear opt-out for PII processing — potential GDPR violation
* No data retention or deletion standards
* Suggest including DPA, opt-out procedures, and breach reporting SLA

**Vendor C:**

* Offshore storage without compliance guarantees
* SOX references present but weak enforcement
* Recommend defining breach response SLAs and regulatory audit coverage

---