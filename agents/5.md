## 🧾 **Agent #5: Automated Invoicing Agent**

### 📝 Overview

This AI agent automatically generates invoices by pulling data from mock orders or timesheets, calculates totals, applies taxes or discounts, and formats the invoice as a human-readable document. You’ll build a GPT-based agent that turns structured data into invoice summaries and optionally outputs them as PDFs.

---

### 🧪 Lab Objectives

By the end of this lab, you will:

* Simulate invoice data from timesheets or purchase orders
* Automatically generate invoice details and summaries
* Use GPT to format invoice explanations
* Output a clean invoice via Streamlit UI

---

### 🧰 Tech Stack

* **Python**
* **Pandas**
* **LangChain + OpenAI**
* **Streamlit**
* **FPDF or WeasyPrint** (optional for PDF export)

---

### 🧭 Step-by-Step Instructions

#### ✅ Step 1: Set up your environment

If you’ve been working on previous agents, continue. If not:

```bash
mkdir invoicing_agent
cd invoicing_agent
python -m venv venv
source venv/bin/activate
pip install openai langchain pandas streamlit
```

To export invoices as PDFs:

```bash
pip install fpdf
```

---

#### ✅ Step 2: Create mock invoice data (`invoice_data.py`)

```python
import pandas as pd

def get_invoice_items():
    return pd.DataFrame({
        "Description": ["Consulting - Project A", "Design Work", "Training Session"],
        "Hours": [10, 5, 3],
        "Rate": [150, 120, 200]
    })
```

---

#### ✅ Step 3: Format with GPT (`invoice_agent.py`)

```python
from langchain.prompts import PromptTemplate
from langchain.chat_models import ChatOpenAI
from invoice_data import get_invoice_items

invoice_prompt = PromptTemplate.from_template("""
You're an invoicing assistant AI. Based on the following billing data, generate:
1. A short summary of services rendered
2. A line-item breakdown
3. A polite closing message

Data:
{invoice_table}
""")

def generate_invoice_text():
    df = get_invoice_items()
    df["Total"] = df["Hours"] * df["Rate"]
    invoice_table = df.to_string(index=False)

    llm = ChatOpenAI(temperature=0.3)
    prompt = invoice_prompt.format(invoice_table=invoice_table)
    output = llm.predict(prompt)

    total_amount = df["Total"].sum()
    return df, output, total_amount
```

---

#### ✅ Step 4: Streamlit Interface (`app.py`)

```python
import streamlit as st
from invoice_agent import generate_invoice_text

st.title("🧾 Automated Invoicing Agent")

if st.button("Generate Invoice"):
    df, summary, total = generate_invoice_text()

    st.subheader("📋 Invoice Items")
    st.dataframe(df)

    st.subheader("🧠 AI-Generated Summary")
    st.write(summary)

    st.subheader("💰 Total Amount Due")
    st.write(f"${total:.2f}")
```

---

#### ✅ Optional: PDF Export (`pdf_generator.py`)

```python
from fpdf import FPDF

def export_invoice_to_pdf(invoice_df, summary, total, filename="invoice.pdf"):
    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("Arial", size=12)

    pdf.cell(200, 10, txt="INVOICE", ln=True, align="C")

    pdf.ln(10)
    for i, row in invoice_df.iterrows():
        pdf.cell(200, 10, txt=f"{row['Description']}: {row['Hours']} hrs x ${row['Rate']} = ${row['Total']}", ln=True)

    pdf.ln(5)
    pdf.multi_cell(0, 10, txt=summary)

    pdf.ln(10)
    pdf.cell(200, 10, txt=f"Total Due: ${total}", ln=True)
    pdf.output(filename)
```

---

### 🧪 Example Output:

```
Summary:
The client was provided with 10 hours of consulting, 5 hours of design work, and 3 hours of training. All services were delivered remotely during the first week of July.

Line Items:
- Consulting: $1,500
- Design: $600
- Training: $600

Thank you for your business. Please remit payment within 14 days.
```

---
