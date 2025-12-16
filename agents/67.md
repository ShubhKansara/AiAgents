
## 🤖 **Agent #67: AI-powered Virtual Assistant**

### 📝 Overview

This agent acts as a general-purpose virtual assistant for employees or customers. It can schedule meetings, retrieve knowledge base articles, summarize emails, set reminders, or answer general inquiries using GPT. In this lab, you’ll build an interactive assistant that handles natural language queries with contextual responses, simulating productivity-focused support.

---

### 🧪 Lab Objectives

By the end of this lab, you will:

* Create an AI assistant interface
* Accept user queries and return context-aware answers
* Simulate actions like reminders or knowledge lookup
* Extend the assistant with plugins or tools

---

### 🧰 Tech Stack

* **Python**
* **Streamlit**
* **LangChain + GPT-4 or GPT-3.5**
* *(Optional: Integrate with APIs like Google Calendar, Notion, etc.)*

---

### 🧭 Step-by-Step Instructions

#### ✅ Step 1: Environment Setup

```bash
mkdir virtual_assistant_agent
cd virtual_assistant_agent
python -m venv venv
source venv/bin/activate
pip install streamlit openai langchain
```

---

#### ✅ Step 2: Assistant Prompt Template (`assistant_prompt.py`)

```python
from langchain.prompts import PromptTemplate

assistant_prompt = PromptTemplate.from_template("""
You are a helpful AI-powered virtual assistant.

User message:
"{user_input}"

Your job is to:
1. Understand the request (e.g., schedule meeting, find document, summarize email)
2. Respond clearly with the next step or information
3. Ask follow-up if needed

Keep responses polite, actionable, and under 120 words.
""")
```

---

#### ✅ Step 3: Assistant Engine Logic (`assistant_agent.py`)

```python
from langchain.chat_models import ChatOpenAI
from assistant_prompt import assistant_prompt

def respond_to_user(user_input: str):
    llm = ChatOpenAI(temperature=0.3)
    prompt = assistant_prompt.format(user_input=user_input)
    return llm.predict(prompt)
```

---

#### ✅ Step 4: Streamlit Assistant App (`app.py`)

```python
import streamlit as st
from assistant_agent import respond_to_user

st.title("🤖 AI-powered Virtual Assistant")
st.caption("Ask me anything to help with your work or planning!")

if "assistant_log" not in st.session_state:
    st.session_state.assistant_log = []

query = st.text_input("Your command or question:")

if st.button("Ask"):
    if query:
        response = respond_to_user(query)
        st.session_state.assistant_log.append(("You", query))
        st.session_state.assistant_log.append(("Assistant", response))

for speaker, message in reversed(st.session_state.assistant_log[-10:]):
    st.markdown(f"**{speaker}:** {message}")
```

Run the app:

```bash
streamlit run app.py
```

---

### 🧪 Example Interactions

**User:** Schedule a meeting with the product team next Thursday at 3 PM.
**Assistant:** I’ve noted the meeting for Thursday at 3 PM. Do you want me to send calendar invites or check availability?

**User:** Summarize this email: "Hi team, the Q2 report is due Friday. Please send your inputs by Wednesday."
**Assistant:** The email requests Q2 report inputs by Wednesday, ahead of the Friday deadline.

**User:** Set a reminder to check campaign results tomorrow morning.
**Assistant:** Got it! I’ll remind you tomorrow morning to check the campaign results.

---

