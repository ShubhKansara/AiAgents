
## ⚖️ **Agent #81: Contract Review Agent**

### 📝 Overview

The Contract Review Agent analyzes legal contracts to identify risky clauses, missing terms, deadlines, and compliance red flags. It assists legal teams by flagging language inconsistencies, summarizing obligations, and suggesting improvements. In this lab, you'll build a GPT-powered contract analyzer that reviews uploaded contracts and provides structured legal insights.

---

### 🧪 Lab Objectives

By the end of this lab, you will:

* Upload contract documents (plain text or PDF)
* Extract and chunk clauses for analysis
* Use GPT to review and highlight key insights
* Display a summary of risks, missing elements, and obligations

---

### 🧰 Tech Stack

* **Python**
* **Streamlit**
* **LangChain + GPT-4 or GPT-3.5**
* **PyMuPDF (`fitz`) for PDF reading**
* *(Optional: Use OCR for scanned PDFs)*

---

### 🧭 Step-by-Step Instructions

#### ✅ Step 1: Environment Setup

```bash
mkdir contract_review_agent
cd contract_review_agent
python -m venv venv
source venv/bin/activate
pip install streamlit langchain openai pymupdf tiktoken
```

---

#### ✅ Step 2: Sample Contract (`sample_contract.txt`)

```
This agreement is entered into on July 15, 2025, between Acme Corp and Beta Inc.

1. Payment Terms: Payments shall be made within 45 days of invoice.
2. Termination Clause: Either party may terminate with 30 days' notice.
3. Confidentiality: All terms and communications must remain confidential.
4. Indemnity: Beta Inc agrees to indemnify Acme Corp for losses arising from misuse.
5. Governing Law: This agreement is governed by the laws of California.
```

---

#### ✅ Step 3: GPT Prompt Template (`contract_prompt.py`)

```python
from langchain.prompts import PromptTemplate

contract_prompt = PromptTemplate.from_template("""
You are a contract analysis AI.

Clause:
{clause}

Review the clause and return:
1. Clause Type (e.g., Payment, Termination, Indemnity)
2. Risk Level (Low/Medium/High)
3. Summary of Obligation
4. Suggestion to improve clarity or compliance
""")
```

---

#### ✅ Step 4: GPT Logic (`review_agent.py`)

```python
from langchain.chat_models import ChatOpenAI
from contract_prompt import contract_prompt

def analyze_clause(clause):
    llm = ChatOpenAI(temperature=0.3)
    prompt = contract_prompt.format(clause=clause)
    return llm.predict(prompt)
```

---

#### ✅ Step 5: Streamlit Interface (`app.py`)

```python
import streamlit as st
from review_agent import analyze_clause

st.title("⚖️ Contract Review Agent")
st.caption("Upload and analyze legal clauses for risk and compliance")

file = st.file_uploader("Upload Contract (.txt)", type=["txt"])

if file:
    clauses = file.read().decode("utf-8").split("\n")
    clauses = [c.strip() for c in clauses if c.strip()]

    for clause in clauses:
        st.markdown(f"**📄 Clause:** `{clause}`")
        output = analyze_clause(clause)
        st.text_area("🧠 GPT Analysis", output, height=200)
```

Run the app:

```bash
streamlit run app.py
```

---

### 🧪 Example GPT Output

**Clause:** Termination Clause: Either party may terminate with 30 days' notice.

```
- Clause Type: Termination  
- Risk Level: Low  
- Obligation: Either party can end the agreement with 30 days' notice.  
- Suggestion: Specify acceptable notice methods (email, certified mail) to avoid disputes.
```

---
