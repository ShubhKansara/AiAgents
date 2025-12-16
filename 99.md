
## 📄 **Agent #99: Contract Review Automation Agent**

### 📝 Overview

The Contract Review Automation Agent helps legal and procurement teams review lengthy contracts for risk, compliance, and obligations. It uses AI to parse, summarize, and flag key clauses (e.g., termination, payment, liability). In this lab, you'll build a prototype that allows users to upload a contract and receive AI-generated insights and clause highlights.

---

### 🧪 Lab Objectives

By the end of this lab, you will:

* Upload a legal contract (PDF or text)
* Extract key clauses (termination, indemnity, etc.)
* Generate GPT-powered summaries and risk flags
* Present findings in a clear, organized format

---

### 🧰 Tech Stack

* **Python**
* **Streamlit**
* **PyPDF2 or pdfplumber**
* **LangChain + GPT-4 or GPT-3.5**
* *(Optional: Use regex or clause dictionaries for better tagging)*

---

### 🧭 Step-by-Step Instructions

#### ✅ Step 1: Environment Setup

```bash
mkdir contract_review_agent
cd contract_review_agent
python -m venv venv
source venv/bin/activate
pip install streamlit openai pdfplumber langchain
```

---

#### ✅ Step 2: PDF Extractor (`extractor.py`)

```python
import pdfplumber

def extract_text_from_pdf(uploaded_file):
    with pdfplumber.open(uploaded_file) as pdf:
        return "\n".join([page.extract_text() for page in pdf.pages if page.extract_text()])
```

---

#### ✅ Step 3: Clause Analyzer (`reviewer.py`)

```python
from langchain.chat_models import ChatOpenAI

llm = ChatOpenAI(temperature=0.3)

def review_contract(text):
    prompt = f"""
    You are a legal AI agent. Review the following contract and extract:
    1. Key clauses (termination, liability, payment, indemnity)
    2. Any risky or unusual terms
    3. Suggestions to improve the contract or request clarification

    Contract:
    {text[:5000]}  # Limit to first 5000 chars for efficiency
    """
    return llm.predict(prompt)
```

---

#### ✅ Step 4: Streamlit UI (`app.py`)

```python
import streamlit as st
from extractor import extract_text_from_pdf
from reviewer import review_contract

st.title("📄 Contract Review Automation Agent")
st.caption("Upload and review contracts using GPT-powered legal insights")

uploaded_file = st.file_uploader("Upload Contract PDF", type=["pdf"])
if uploaded_file:
    with st.spinner("Extracting and analyzing..."):
        raw_text = extract_text_from_pdf(uploaded_file)
        st.subheader("📃 Extracted Contract Text")
        st.text_area("Contract Content (Preview)", raw_text[:1000], height=200)

        if st.button("Review Contract"):
            summary = review_contract(raw_text)
            st.subheader("🧠 AI Review Output")
            st.text_area("Insights", summary, height=400)
```

Run the app:

```bash
streamlit run app.py
```

---

### 🧪 Example Output (Excerpt)

**Input Contract (Partial):**
Contains clauses for payment due within 30 days, unilateral termination, limitation of liability.

**GPT Review Output:**

* **Key Clauses Identified**:

  * Termination: Allows unilateral termination by Provider
  * Payment: Net 30 days from invoice
  * Liability: Limited to service fees paid
  * Indemnity: Customer holds provider harmless

* **Risk Flags**:

  * Unilateral termination may create power imbalance
  * Indemnity clause is one-sided

* **Recommendations**:

  * Negotiate mutual indemnity
  * Add early termination notice period

---

