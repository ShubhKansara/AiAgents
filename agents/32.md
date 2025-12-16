## 🤝 **Agent #32: AI Sales Companion Agent**

### 📝 Overview

This agent acts as a real-time assistant for sales reps. It listens to conversations (or reviews meeting summaries), pulls context from CRM and documents, and suggests the next best actions, product info, or deal strategies. In this lab, you’ll simulate a sales meeting and use GPT to generate real-time suggestions based on the transcript.

---

### 🧪 Lab Objectives

By the end of this lab, you will:

* Simulate a sales call transcript
* Provide CRM-like context (deal size, persona, product)
* Use GPT to generate in-meeting suggestions
* Display suggestions in a Streamlit dashboard

---

### 🧰 Tech Stack

* **Python**
* **LangChain + GPT-4 or GPT-3.5**
* **Streamlit**
* *(Optional)*: Whisper for transcription

---

### 🧭 Step-by-Step Instructions

#### ✅ Step 1: Environment Setup

```bash
mkdir ai_sales_companion
cd ai_sales_companion
python -m venv venv
source venv/bin/activate
pip install openai langchain streamlit
```

---

#### ✅ Step 2: Simulate Call Transcript and Context (`sales_context.py`)

```python
call_transcript = """
Sales Rep: Great to meet you! Could you share more about your current cloud setup?
Client: Sure. We're currently on AWS but considering GCP for our data analytics workloads.
Sales Rep: Interesting. What's prompting the shift?
Client: Mainly cost efficiency and integration with Looker Studio.
"""

deal_context = {
    "Client Name": "NextData Inc.",
    "Deal Stage": "Discovery",
    "Persona": "CTO",
    "Product": "Cloud Cost Optimization Suite",
    "Industry": "Data & Analytics"
}

def get_call_data():
    return call_transcript, deal_context
```

---

#### ✅ Step 3: GPT Prompt Template (`sales_prompt.py`)

```python
from langchain.prompts import PromptTemplate

sales_prompt = PromptTemplate.from_template("""
You are an AI sales assistant in a live call.

Given:
- Client: {client}
- Deal Stage: {stage}
- Persona: {persona}
- Product: {product}
- Industry: {industry}
- Call Transcript: {transcript}

Suggest:
1. One recommended question to deepen the discussion
2. One product capability to highlight next
3. One follow-up action for the rep
Use bullet points.
""")
```

---

#### ✅ Step 4: Sales Suggestion Logic (`sales_agent.py`)

```python
from sales_context import get_call_data
from sales_prompt import sales_prompt
from langchain.chat_models import ChatOpenAI

def get_sales_assistance():
    transcript, context = get_call_data()
    llm = ChatOpenAI(temperature=0.4)

    prompt = sales_prompt.format(
        client=context["Client Name"],
        stage=context["Deal Stage"],
        persona=context["Persona"],
        product=context["Product"],
        industry=context["Industry"],
        transcript=transcript
    )
    result = llm.predict(prompt)
    return result
```

---

#### ✅ Step 5: Streamlit Interface (`app.py`)

```python
import streamlit as st
from sales_agent import get_sales_assistance

st.title("🤝 AI Sales Companion Agent")

if st.button("Get Suggestions"):
    suggestions = get_sales_assistance()
    st.subheader("💡 AI Suggestions for the Sales Rep")
    st.text_area("AI Assistant Output", suggestions, height=250)
```

Run the app:

```bash
streamlit run app.py
```

---

### 🧪 Example GPT Output:

* **Question**: “What KPIs are you tracking to evaluate this migration’s success?”
* **Capability**: “Highlight real-time cost anomaly detection and alerts.”
* **Follow-up**: “Send a tailored ROI calculator comparing AWS vs GCP.”

---
