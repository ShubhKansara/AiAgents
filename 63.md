
## 📞 **Agent #63: Automated Call Center Agent**

### 📝 Overview

This agent simulates a voice-based call center representative capable of handling customer queries, booking appointments, answering FAQs, or routing calls using voice inputs and GPT-generated responses. In this lab, you’ll build a prototype that mimics an automated call flow using text input, but can be expanded to voice integration with tools like Twilio or SpeechRecognition.

---

### 🧪 Lab Objectives

By the end of this lab, you will:

* Simulate an automated call experience using a conversation flow
* Use GPT to respond to user queries in plain language
* Handle call routing or escalation instructions
* (Optionally) Prepare the base for voice-to-text integration

---

### 🧰 Tech Stack

* **Python**
* **Streamlit**
* **LangChain + GPT-4 or GPT-3.5**
* *(Optional: Twilio, Google Speech-to-Text, Whisper API)*

---

### 🧭 Step-by-Step Instructions

#### ✅ Step 1: Environment Setup

```bash
mkdir automated_call_center_agent
cd automated_call_center_agent
python -m venv venv
source venv/bin/activate
pip install streamlit openai langchain
```

---

#### ✅ Step 2: Prompt Template (`call_prompt.py`)

```python
from langchain.prompts import PromptTemplate

call_prompt = PromptTemplate.from_template("""
You are an AI-powered automated phone support agent.

Customer said: "{user_input}"

Respond with:
1. A polite greeting or next step
2. Simple, clear instructions
3. Offer to connect to a human agent if the request is too complex

Limit to 100 words and simulate a voice assistant tone.
""")
```

---

#### ✅ Step 3: GPT Agent Logic (`call_agent.py`)

```python
from langchain.chat_models import ChatOpenAI
from call_prompt import call_prompt

def handle_call_input(user_input: str):
    llm = ChatOpenAI(temperature=0.4)
    prompt = call_prompt.format(user_input=user_input)
    return llm.predict(prompt)
```

---

#### ✅ Step 4: Streamlit Call Simulation Interface (`app.py`)

```python
import streamlit as st
from call_agent import handle_call_input

st.title("📞 Automated Call Center Agent")
st.caption("Simulate a phone-based AI conversation")

if "call_log" not in st.session_state:
    st.session_state.call_log = []

user_input = st.text_input("Customer says:")

if st.button("Respond"):
    response = handle_call_input(user_input)
    st.session_state.call_log.append(("Customer", user_input))
    st.session_state.call_log.append(("AI Agent", response))

for speaker, message in reversed(st.session_state.call_log[-10:]):
    st.markdown(f"**{speaker}:** {message}")
```

Run the app:

```bash
streamlit run app.py
```

---

### 🧪 Example Call Simulation

**Customer:** I want to know my account balance.
**AI Agent:** Sure! Please say or type your account number. If you'd prefer to speak with a support representative, I can connect you now.

**Customer:** I need to cancel my flight reservation.
**AI Agent:** I can help with that. May I have your booking ID? If you need assistance beyond cancellation, I’ll route you to a human agent.

---
