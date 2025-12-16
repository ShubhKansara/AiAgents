
## 🧑‍💻 **Agent #55: AI-driven Help Desk Agent**

### 📝 Overview

This agent serves as a 24/7 virtual help desk assistant that responds to IT or HR-related questions, guides users through troubleshooting, and escalates unresolved issues. It uses natural language inputs and GPT-powered answers. In this lab, you’ll build a chatbot-style help desk interface for common internal support questions.

---

### 🧪 Lab Objectives

By the end of this lab, you will:

* Create a chatbot interface for employee support
* Accept user queries and respond using GPT
* Route unresolved issues to human support escalation
* Maintain a chat history per session

---

### 🧰 Tech Stack

* **Python**
* **Streamlit**
* **LangChain + GPT-4 or GPT-3.5**
* *(Optional: Add Twilio, Zendesk, or Slack API later)*

---

### 🧭 Step-by-Step Instructions

#### ✅ Step 1: Environment Setup

```bash
mkdir help_desk_agent
cd help_desk_agent
python -m venv venv
source venv/bin/activate
pip install streamlit openai langchain
```

---

#### ✅ Step 2: Prompt Template for Help Desk (`help_prompt.py`)

```python
from langchain.prompts import PromptTemplate

help_prompt = PromptTemplate.from_template("""
You are a friendly and professional help desk assistant.

User query: "{query}"

1. Answer clearly and directly
2. If unsure or critical, recommend escalation
3. Keep responses under 120 words
""")
```

---

#### ✅ Step 3: GPT Response Generator (`help_agent.py`)

```python
from help_prompt import help_prompt
from langchain.chat_models import ChatOpenAI

def help_desk_reply(query):
    llm = ChatOpenAI(temperature=0.4)
    prompt = help_prompt.format(query=query)
    return llm.predict(prompt)
```

---

#### ✅ Step 4: Streamlit Chat Interface (`app.py`)

```python
import streamlit as st
from help_agent import help_desk_reply

st.title("🧑‍💻 AI-driven Help Desk Agent")
st.caption("Ask anything related to IT or HR support")

if "chat" not in st.session_state:
    st.session_state.chat = []

query = st.text_input("Enter your question here:")

if st.button("Ask"):
    if query:
        response = help_desk_reply(query)
        st.session_state.chat.append((query, response))

for i, (q, r) in enumerate(reversed(st.session_state.chat)):
    st.markdown(f"**You:** {q}")
    st.markdown(f"**Help Desk:** {r}")
    st.markdown("---")
```

Run the app:

```bash
streamlit run app.py
```

---

### 🧪 Example Dialog

**User:** How do I reset my email password?
**Help Desk:** You can reset your email password via the \[Company Portal > Account Settings > Change Password]. If you’re locked out, please submit a ticket to IT support for manual reset.

**User:** My laptop won’t start even after charging.
**Help Desk:** Please try holding the power button for 10 seconds. If the issue persists, escalate to IT support for hardware inspection.

---

