## ⚖️ **Agent #38: AI Contract Negotiation Agent**

### 📝 Overview

This agent supports contract negotiation by reviewing draft terms, highlighting risks, and suggesting improved clauses. It helps sales and legal teams reduce deal friction and turnaround time. In this lab, you’ll simulate a contract draft and use GPT to analyze, summarize concerns, and rewrite risky sections.

---

### 🧪 Lab Objectives

By the end of this lab, you will:

* Load a draft contract or terms document
* Use GPT to identify negotiable clauses, risks, and inconsistencies
* Suggest revised terms for risk mitigation
* Highlight critical areas in a Streamlit interface

---

### 🧰 Tech Stack

* **Python**
* **LangChain + GPT-4**
* **Streamlit**
* *(Optional)*: `pdfplumber` or `PyMuPDF` to parse actual contracts

---

### 🧭 Step-by-Step Instructions

#### ✅ Step 1: Environment Setup

```bash
mkdir contract_negotiation_agent
cd contract_negotiation_agent
python -m venv venv
source venv/bin/activate
pip install openai langchain streamlit
```

---

#### ✅ Step 2: Sample Contract Text (`contract_text.py`)

```python
contract_draft = """
This Service Agreement grants the vendor full data access for performance monitoring. The client waives liability in the case of indirect losses. Service Level Agreements (SLAs) are not guaranteed. Either party may terminate with 10 days' notice, without reason. Data will be retained indefinitely.
"""

def get_contract():
    return contract_draft
```

---

#### ✅ Step 3: GPT Prompt Template (`contract_prompt.py`)

```python
from langchain.prompts import PromptTemplate

contract_prompt = PromptTemplate.from_template("""
You are an AI contract reviewer.

Review this contract draft:
{contract_text}

Identify:
1. Clauses that may pose legal or business risk
2. Suggested improved versions of those clauses
3. A summary of the top 3 negotiation priorities

Output as clearly labeled sections.
""")
```

---

#### ✅ Step 4: Contract Negotiation Logic (`contract_agent.py`)

```python
from contract_text import get_contract
from contract_prompt import contract_prompt
from langchain.chat_models import ChatOpenAI

def analyze_contract():
    contract_text = get_contract()
    llm = ChatOpenAI(temperature=0.3)
    prompt = contract_prompt.format(contract_text=contract_text)
    return llm.predict(prompt)
```

---

#### ✅ Step 5: Streamlit Interface (`app.py`)

```python
import streamlit as st
from contract_agent import analyze_contract

st.title("⚖️ AI Contract Negotiation Agent")

if st.button("Review Contract"):
    review = analyze_contract()
    st.text_area("📄 Contract Analysis", review, height=500)
    st.download_button("Download Review", review, file_name="contract_review.txt")
```

Run the app:

```bash
streamlit run app.py
```

---

### 🧪 Example GPT Output:

**⚠️ Risky Clauses Identified:**

* Indefinite data retention may violate GDPR.
* Termination with 10-day notice lacks cause requirement.
* Liability waiver is overly broad.

**✅ Suggested Rewrites:**

* "Data will be retained for no longer than 90 days post-termination."
* "Termination requires 30-day notice and written justification."

**📌 Top 3 Priorities:**

1. Clarify data retention and compliance
2. Strengthen SLA guarantees
3. Require mutual accountability on liability

---

