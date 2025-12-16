## 🧾 **Agent #23: Purchase Order Automation Agent**

### 📝 Overview

This AI agent automates the creation and validation of purchase orders (POs) by extracting product, vendor, and pricing details from procurement requests or contracts. In this lab, you’ll simulate incoming procurement requests and use GPT to auto-generate structured purchase orders for approval.

---

### 🧪 Lab Objectives

By the end of this lab, you will:

* Simulate unstructured procurement requests
* Use GPT to extract order details and generate PO drafts
* Validate required fields and vendor match
* Display formatted POs via Streamlit

---

### 🧰 Tech Stack

* **Python**
* **LangChain + GPT-4 or GPT-3.5**
* **Pandas**
* **Streamlit**

---

### 🧭 Step-by-Step Instructions

#### ✅ Step 1: Environment Setup

```bash
mkdir po_automation_agent
cd po_automation_agent
python -m venv venv
source venv/bin/activate
pip install openai langchain pandas streamlit
```

---

#### ✅ Step 2: Simulate procurement requests (`request_data.py`)

```python
requests = {
    "Request A": """
Please order 50 ergonomic chairs from ErgoFurnish Ltd at $120 per chair. Need delivery by end of the month. Include taxes and shipping in total.
""",
    "Request B": """
We need 10 high-speed printers from PrintMax Inc., model PX900, cost $450 each. Please initiate the purchase with 5-day delivery terms.
""",
    "Request C": """
Requesting 25 licenses of AcmeDesign Pro software (annual plan) at $99/license. Vendor is AcmeDesign Software. Immediate delivery preferred.
"""
}

def get_requests():
    return requests
```

---

#### ✅ Step 3: GPT Prompt Template (`po_prompt.py`)

```python
from langchain.prompts import PromptTemplate

po_template = PromptTemplate.from_template("""
You are an AI purchase order generator.

Given this procurement request:
"{request_text}"

Extract and generate a structured purchase order with:
- Vendor Name
- Item(s) Description
- Quantity
- Unit Price
- Total Cost
- Delivery Terms
- Notes/Additional Instructions
Respond in JSON format.
""")
```

---

#### ✅ Step 4: GPT Automation Logic (`po_agent.py`)

```python
from request_data import get_requests
from po_prompt import po_template
from langchain.chat_models import ChatOpenAI

def generate_pos():
    requests = get_requests()
    llm = ChatOpenAI(temperature=0.2)
    results = []

    for name, text in requests.items():
        prompt = po_template.format(request_text=text)
        result = llm.predict(prompt)
        results.append((name, result))

    return results
```

---

#### ✅ Step 5: Streamlit Interface (`app.py`)

```python
import streamlit as st
from po_agent import generate_pos

st.title("🧾 Purchase Order Automation Agent")

if st.button("Generate Purchase Orders"):
    results = generate_pos()

    for name, po_json in results:
        st.subheader(f"📄 {name}")
        st.text_area("Generated Purchase Order", po_json, height=300)
        st.markdown("---")
```

Run the app:

```bash
streamlit run app.py
```

---

### 🧪 Example Output:

```json
{
  "Vendor Name": "ErgoFurnish Ltd",
  "Item(s)": "Ergonomic Chair",
  "Quantity": 50,
  "Unit Price": 120,
  "Total Cost": 6000,
  "Delivery Terms": "End of the month",
  "Notes": "Include taxes and shipping"
}
```

---