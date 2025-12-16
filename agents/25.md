## 🤖 **Agent #25: AI-driven Negotiation Agent**

### 📝 Overview

This AI agent supports procurement teams by generating negotiation responses for pricing, delivery terms, and contractual clauses. It can counter vendor offers while maintaining a professional tone and strategic posture. In this lab, you’ll simulate vendor proposals and use GPT to craft negotiation replies with rationale.

---

### 🧪 Lab Objectives

By the end of this lab, you will:

* Simulate incoming vendor proposals
* Use GPT to generate counteroffers and negotiation messages
* Adjust tone (firm, collaborative, concessionary)
* Present output in a Streamlit negotiation interface

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
mkdir negotiation_agent
cd negotiation_agent
python -m venv venv
source venv/bin/activate
pip install openai langchain pandas streamlit
```

---

#### ✅ Step 2: Simulate Vendor Offers (`proposal_data.py`)

```python
import pandas as pd

def get_vendor_offers():
    return pd.DataFrame({
        "Vendor": ["LogiXpress", "TechNova Ltd", "PrintMax Solutions"],
        "Offer Summary": [
            "Proposes $120 per unit for 500 units. Delivery time 30 days. No bulk discount offered.",
            "Requests upfront payment for 12-month software license at $15,000. No cancellation policy.",
            "Quotes $10,000 for maintenance package. Delivery support only during weekdays. No penalty clause for SLA breaches."
        ],
        "Negotiation Goal": [
            "Seek 10% discount or faster delivery",
            "Request phased payment or cancellation clause",
            "Include penalty clause and weekend support"
        ],
        "Tone Preference": ["Firm", "Collaborative", "Diplomatic"]
    })
```

---

#### ✅ Step 3: GPT Prompt Template (`negotiation_prompt.py`)

```python
from langchain.prompts import PromptTemplate

negotiation_template = PromptTemplate.from_template("""
You are an AI procurement negotiator.

Given:
- Vendor: {vendor}
- Offer: {offer}
- Negotiation Objective: {goal}
- Tone: {tone}

Write a professional negotiation reply addressing the vendor. Ensure clarity, logic, and strategic positioning.
""")
```

---

#### ✅ Step 4: AI Negotiation Generator (`negotiation_agent.py`)

```python
from proposal_data import get_vendor_offers
from negotiation_prompt import negotiation_template
from langchain.chat_models import ChatOpenAI

def draft_negotiations():
    df = get_vendor_offers()
    llm = ChatOpenAI(temperature=0.4)
    responses = []

    for _, row in df.iterrows():
        prompt = negotiation_template.format(
            vendor=row["Vendor"],
            offer=row["Offer Summary"],
            goal=row["Negotiation Goal"],
            tone=row["Tone Preference"]
        )
        result = llm.predict(prompt)
        responses.append((row["Vendor"], result))

    return df, responses
```

---

#### ✅ Step 5: Streamlit Interface (`app.py`)

```python
import streamlit as st
from negotiation_agent import draft_negotiations

st.title("🤖 AI-Driven Negotiation Agent")

if st.button("Generate Negotiation Replies"):
    df, responses = draft_negotiations()

    for vendor, message in responses:
        st.subheader(f"📩 Response to {vendor}")
        st.text_area("Negotiation Draft", message, height=300)
        st.markdown("---")
```

Run the app:

```bash
streamlit run app.py
```

---

### 🧪 Example Output:

**To: LogiXpress**
*Subject: Response to Supply Proposal*

Dear LogiXpress Team,
Thank you for your proposal. While we appreciate your offer of \$120 per unit, we’d like to explore a bulk pricing discount or a faster delivery timeline to better align with our operational goals. Could you propose a revised package that accommodates either?

Best regards,
Procurement Lead

---
