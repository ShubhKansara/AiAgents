## 🤝 **Agent #24: Vendor Engagement Agent**

### 📝 Overview

This AI agent streamlines communication with vendors by generating personalized follow-ups, reminders, onboarding instructions, or feedback requests. In this lab, you’ll simulate vendor profiles and interactions, and use GPT to draft dynamic, context-aware engagement emails.

---

### 🧪 Lab Objectives

By the end of this lab, you will:

* Simulate vendor profiles with engagement context
* Use GPT to generate follow-up or onboarding messages
* Personalize tone based on relationship type and status
* Display drafts in a vendor communication dashboard (Streamlit)

---

### 🧰 Tech Stack

* **Python**
* **Pandas**
* **LangChain + GPT-4 or GPT-3.5**
* **Streamlit**

---

### 🧭 Step-by-Step Instructions

#### ✅ Step 1: Environment Setup

```bash
mkdir vendor_engagement_agent
cd vendor_engagement_agent
python -m venv venv
source venv/bin/activate
pip install openai langchain pandas streamlit
```

---

#### ✅ Step 2: Vendor Profile Simulation (`vendor_data.py`)

```python
import pandas as pd

def get_vendors():
    return pd.DataFrame({
        "Vendor": ["Acme Logistics", "GreenSource Supplies", "DataGuard Inc."],
        "Engagement Type": ["Follow-up on proposal", "Onboarding instructions", "Request for performance feedback"],
        "Relationship Status": ["New", "Long-term", "Preferred"],
        "Last Interaction": [
            "Submitted proposal 2 weeks ago, no response.",
            "Contract signed, waiting on kickoff documents.",
            "Completed Q2 delivery, request post-project feedback."
        ]
    })
```

---

#### ✅ Step 3: GPT Prompt Template (`vendor_prompt.py`)

```python
from langchain.prompts import PromptTemplate

vendor_template = PromptTemplate.from_template("""
You are a Vendor Relationship Manager AI.

Given:
- Vendor: {vendor}
- Engagement Type: {engagement}
- Relationship Status: {status}
- Last Interaction Notes: {interaction}

Generate a professional and polite email message for the engagement context.
""")
```

---

#### ✅ Step 4: Engagement Generator (`vendor_agent.py`)

```python
from vendor_data import get_vendors
from vendor_prompt import vendor_template
from langchain.chat_models import ChatOpenAI

def generate_messages():
    df = get_vendors()
    llm = ChatOpenAI(temperature=0.3)
    results = []

    for _, row in df.iterrows():
        prompt = vendor_template.format(
            vendor=row["Vendor"],
            engagement=row["Engagement Type"],
            status=row["Relationship Status"],
            interaction=row["Last Interaction"]
        )
        result = llm.predict(prompt)
        results.append((row["Vendor"], result))

    return df, results
```

---

#### ✅ Step 5: Streamlit Interface (`app.py`)

```python
import streamlit as st
from vendor_agent import generate_messages

st.title("🤝 Vendor Engagement Agent")

if st.button("Generate Vendor Messages"):
    df, results = generate_messages()

    for vendor, message in results:
        st.subheader(f"📨 Message to {vendor}")
        st.text_area("Generated Email", message, height=300)
        st.markdown("---")
```

Run the app:

```bash
streamlit run app.py
```

---

### 🧪 Example Output:

**To: GreenSource Supplies**
*Subject: Welcome to our Procurement Network*

Hi GreenSource Team,
Welcome aboard! We’re excited to kick off our partnership. Please find attached the onboarding documents to help you get started. Feel free to reach out with any questions, and let us know your availability for a kickoff call next week.

Best regards,
\[Your Name]
Procurement Operations

---
