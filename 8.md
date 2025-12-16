## 🧾 **Agent #8: Tax Compliance Agent**

### 📝 Overview

This AI agent checks whether a company’s financial records comply with tax rules — including sales tax, VAT, corporate income tax thresholds, and payroll obligations. In this lab, we’ll simulate financial records and build a GPT-powered assistant that flags potential compliance issues and recommends corrections.

---

### 🧪 Lab Objectives

By the end of this lab, you will:

* Simulate income, expenses, and tax liabilities
* Identify potential non-compliance (e.g., underpayment, missing VAT)
* Use GPT to generate a tax audit-style summary
* Present everything via a Streamlit interface

---

### 🧰 Tech Stack

* **Python**
* **Pandas**
* **LangChain + GPT-4 or GPT-3.5**
* **Streamlit**

---

### 🧭 Step-by-Step Instructions

#### ✅ Step 1: Set up your environment

If continuing from earlier labs, skip this. Otherwise:

```bash
mkdir tax_compliance_agent
cd tax_compliance_agent
python -m venv venv
source venv/bin/activate
pip install openai langchain pandas streamlit
```

---

#### ✅ Step 2: Simulate financial records (`tax_data.py`)

```python
import pandas as pd

def get_tax_records():
    data = {
        "Category": ["Revenue", "COGS", "Operating Expenses", "VAT Collected", "VAT Paid", "Payroll Tax", "Corporate Income Tax Paid"],
        "Amount": [120000, 40000, 25000, 8000, 3500, 7000, 5000]
    }
    return pd.DataFrame(data)
```

---

#### ✅ Step 3: Create the GPT prompt (`tax_prompt.py`)

```python
from langchain.prompts import PromptTemplate

tax_template = PromptTemplate.from_template("""
You are a tax compliance auditor AI.

Here is a company’s financial summary:

{tax_table}

Please:
1. Identify any discrepancies in VAT reporting (collected vs paid).
2. Estimate whether income tax paid is reasonable based on net profit.
3. Flag any areas of non-compliance or audit risk.
4. Recommend corrective actions.

Be concise and audit-ready in tone.
""")
```

---

#### ✅ Step 4: Run GPT-based tax check (`tax_agent.py`)

```python
from tax_data import get_tax_records
from tax_prompt import tax_template
from langchain.chat_models import ChatOpenAI

def analyze_tax():
    df = get_tax_records()
    table = df.to_string(index=False)

    llm = ChatOpenAI(temperature=0.2)
    prompt = tax_template.format(tax_table=table)
    result = llm.predict(prompt)
    return df, result
```

---

#### ✅ Step 5: Build the Streamlit interface (`app.py`)

```python
import streamlit as st
from tax_agent import analyze_tax

st.title("🧾 Tax Compliance Agent")

if st.button("Audit Tax Records"):
    df, result = analyze_tax()

    st.subheader("📂 Financial Summary")
    st.dataframe(df)

    st.subheader("🧠 AI Tax Compliance Report")
    st.write(result)
```

Run the app:

```bash
streamlit run app.py
```

---

### 🧪 Example Output:

```
1. VAT collected is $8,000 while VAT paid is $3,500 — net VAT owed is $4,500. Ensure timely remittance.

2. Net income (Revenue - COGS - Expenses) is $55,000. Corporate tax paid is $5,000, implying an effective tax rate of ~9%, which may be under-reported if local rate is 15–20%.

3. Payroll tax appears proportionate, but further employee count validation is advised.

Recommendation:
- File updated VAT returns.
- Reassess income tax estimation methodology.
- Keep documentation ready for audit readiness.
```

---
