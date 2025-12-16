
## 🛠️ **Agent #66: AI-driven Complaint Resolution Agent**

### 📝 Overview

This agent reads customer complaints—via form, chat, or email—and generates structured responses, prioritizes cases, and recommends resolutions. It uses GPT to draft empathetic, professional replies and suggest next steps. In this lab, you’ll build a complaint resolution assistant that ingests complaint text and outputs an apology, a proposed resolution, and whether escalation is needed.

---

### 🧪 Lab Objectives

By the end of this lab, you will:

* Accept free-text customer complaints
* Use GPT to extract issue type and urgency
* Generate a resolution email or message
* Recommend whether to escalate or resolve immediately

---

### 🧰 Tech Stack

* **Python**
* **Streamlit**
* **LangChain + GPT-4 or GPT-3.5**

---

### 🧭 Step-by-Step Instructions

#### ✅ Step 1: Environment Setup

```bash
mkdir complaint_resolution_agent
cd complaint_resolution_agent
python -m venv venv
source venv/bin/activate
pip install streamlit openai langchain
```

---

#### ✅ Step 2: Prompt Template (`complaint_prompt.py`)

```python
from langchain.prompts import PromptTemplate

complaint_prompt = PromptTemplate.from_template("""
You are an AI customer service resolution agent.

Here is a customer complaint:
"{complaint}"

Tasks:
1. Summarize the core issue in one line
2. Classify urgency as High, Medium, or Low
3. Generate a professional response email
4. Indicate whether escalation is needed (Yes/No)

Keep the tone empathetic and solution-oriented.
""")
```

---

#### ✅ Step 3: GPT Resolution Engine (`resolution_agent.py`)

```python
from langchain.chat_models import ChatOpenAI
from complaint_prompt import complaint_prompt

def resolve_complaint(complaint: str):
    llm = ChatOpenAI(temperature=0.3)
    prompt = complaint_prompt.format(complaint=complaint)
    return llm.predict(prompt)
```

---

#### ✅ Step 4: Streamlit Interface (`app.py`)

```python
import streamlit as st
from resolution_agent import resolve_complaint

st.title("🛠️ AI-driven Complaint Resolution Agent")
st.caption("Draft polite and prompt replies to customer complaints")

complaint = st.text_area("Paste customer complaint:")

if st.button("Resolve"):
    with st.spinner("Analyzing..."):
        result = resolve_complaint(complaint)
    st.subheader("🧠 GPT Response")
    st.text_area("Resolution Plan", result, height=350)
```

Run the app:

```bash
streamlit run app.py
```

---

### 🧪 Example Output

**Complaint Input:**
*"I ordered a laptop 2 weeks ago and it still hasn’t arrived. The tracking number doesn’t work and your support team hasn’t responded to my emails."*

**GPT Output:**

```
1. Core Issue: Delayed shipment and lack of support response  
2. Urgency: High  
3. Response Email:  
Dear [Customer Name],  
We sincerely apologize for the delay in your laptop delivery and the inconvenience caused by our lack of response. We’re investigating the shipping issue and will update you within 24 hours. Please accept a $25 credit as a goodwill gesture.  
Thank you for your patience.  
Best regards,  
Customer Support Team  
4. Escalation: Yes
```

---
