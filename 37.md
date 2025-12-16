## 🔁 **Agent #37: Sales Follow-up Agent**

### 📝 Overview

This agent ensures timely and personalized follow-ups after a sales interaction. It crafts tailored emails or messages based on meeting notes, buyer persona, and deal stage. In this lab, you’ll simulate recent sales conversations and use GPT to generate custom follow-up messages.

---

### 🧪 Lab Objectives

By the end of this lab, you will:

* Simulate deal context and meeting outcomes
* Use GPT to create 3 follow-up styles (email, LinkedIn message, or internal note)
* Personalize messages by buyer persona and stage
* Display and copy the follow-up text from a dashboard

---

### 🧰 Tech Stack

* **Python**
* **LangChain + GPT-4 or GPT-3.5**
* **Streamlit**

---

### 🧭 Step-by-Step Instructions

#### ✅ Step 1: Environment Setup

```bash
mkdir sales_followup_agent
cd sales_followup_agent
python -m venv venv
source venv/bin/activate
pip install openai langchain streamlit
```

---

#### ✅ Step 2: Simulate Sales Context (`followup_data.py`)

```python
deal_context = {
    "Client": "NovaHealth",
    "Persona": "COO",
    "Deal Stage": "Post-demo",
    "Meeting Notes": "The client is interested in rollout timing and integration with their patient portal. Asked for a timeline breakdown and compliance documents."
}

def get_deal_context():
    return deal_context
```

---

#### ✅ Step 3: GPT Prompt Template (`followup_prompt.py`)

```python
from langchain.prompts import PromptTemplate

followup_prompt = PromptTemplate.from_template("""
You are an AI sales assistant.

Write a follow-up message after a sales call using the info below:
- Client: {client}
- Persona: {persona}
- Stage: {stage}
- Notes: {notes}

Generate:
1. A professional email (150–200 words)
2. A LinkedIn-style follow-up message (max 300 characters)
3. An internal Slack note for the sales team

Label each section clearly.
""")
```

---

#### ✅ Step 4: Generate Follow-ups (`followup_agent.py`)

```python
from followup_data import get_deal_context
from followup_prompt import followup_prompt
from langchain.chat_models import ChatOpenAI

def generate_followups():
    context = get_deal_context()
    prompt = followup_prompt.format(
        client=context["Client"],
        persona=context["Persona"],
        stage=context["Deal Stage"],
        notes=context["Meeting Notes"]
    )
    llm = ChatOpenAI(temperature=0.4)
    return llm.predict(prompt)
```

---

#### ✅ Step 5: Streamlit App (`app.py`)

```python
import streamlit as st
from followup_agent import generate_followups

st.title("🔁 Sales Follow-up Agent")

if st.button("Generate Follow-up"):
    result = generate_followups()
    st.text_area("📩 AI-Generated Follow-up", result, height=400)
    st.download_button("Download as .txt", result, file_name="followup.txt")
```

Run the app:

```bash
streamlit run app.py
```

---

### 🧪 Example GPT Output:

**Email:**
Hi \[Client Name],
Thank you for your time during our recent demo. I’ve attached a detailed timeline for rollout along with HIPAA compliance documents. We’re excited about the potential of integrating with your patient portal and look forward to discussing next steps...

**LinkedIn Message:**
Thanks for the great discussion! Sent over the rollout details and compliance docs—let me know when you're ready to align.

**Slack Note:**
👋 Just finished demo with NovaHealth COO. They’re serious. Shared compliance docs. Need to prep a rollout plan by EOW.

---
