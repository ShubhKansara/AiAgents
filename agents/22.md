## 📜 **Agent #22: Contract Analysis Agent**

### 📝 Overview

This AI agent reads and analyzes legal and procurement contracts to identify key terms, risks, renewal dates, and compliance clauses. In this lab, you’ll simulate contract text inputs and use GPT to extract structured summaries for decision-makers.

---

### 🧪 Lab Objectives

By the end of this lab, you will:

* Simulate sample contract excerpts
* Use GPT to identify key clauses (e.g., termination, renewal, liability)
* Classify potential risks or missing terms
* Display contract summaries and red flags in a Streamlit dashboard

---

### 🧰 Tech Stack

* **Python**
* **LangChain + GPT-4 or GPT-3.5**
* **Streamlit**

---

### 🧭 Step-by-Step Instructions

#### ✅ Step 1: Environment Setup

```bash
mkdir contract_analysis_agent
cd contract_analysis_agent
python -m venv venv
source venv/bin/activate
pip install openai langchain streamlit
```

---

#### ✅ Step 2: Create sample contracts (`contract_data.py`)

```python
contracts = {
    "Contract A": """
This agreement is valid for a period of 12 months from the date of signing. Either party may terminate the agreement with a 30-day written notice. Payment terms are Net 60. There is no indemnification clause specified.
""",
    "Contract B": """
The vendor shall deliver services per the agreed SLA. Contract renews automatically unless cancelled 60 days prior to the end date. Payment is due within 30 days of invoice. Liability is capped at the total contract value.
""",
    "Contract C": """
This contract is perpetual unless terminated due to breach of terms. The client reserves the right to audit vendor data. No specified dispute resolution mechanism exists in this agreement.
"""
}

def get_contracts():
    return contracts
```

---

#### ✅ Step 3: GPT Prompt Template (`contract_prompt.py`)

```python
from langchain.prompts import PromptTemplate

contract_template = PromptTemplate.from_template("""
You are an AI legal analyst reviewing contract text.

Given this contract:
"{contract_text}"

Please extract and summarize:
1. Contract duration and renewal terms
2. Termination conditions
3. Liability or indemnity clauses
4. Payment terms
5. Any missing or risky clauses (e.g., dispute resolution, audit rights)

Respond in bullet points.
""")
```

---

#### ✅ Step 4: Contract Analysis Logic (`contract_agent.py`)

```python
from contract_data import get_contracts
from contract_prompt import contract_template
from langchain.chat_models import ChatOpenAI

def analyze_contracts():
    contracts = get_contracts()
    llm = ChatOpenAI(temperature=0.3)
    results = []

    for name, text in contracts.items():
        prompt = contract_template.format(contract_text=text)
        result = llm.predict(prompt)
        results.append((name, result))

    return results
```

---

#### ✅ Step 5: Streamlit Interface (`app.py`)

```python
import streamlit as st
from contract_agent import analyze_contracts

st.title("📜 Contract Analysis Agent")

if st.button("Analyze Contracts"):
    results = analyze_contracts()

    for name, summary in results:
        st.subheader(f"📄 {name}")
        st.text_area("Contract Summary", summary, height=300)
        st.markdown("---")
```

Run the app:

```bash
streamlit run app.py
```

---

### 🧪 Example Output:

**Contract A Summary:**

* Duration: 12 months
* Termination: 30-day written notice
* Payment: Net 60
* Risk: No indemnification clause – potential exposure
* Missing: No mention of renewal policy

---
