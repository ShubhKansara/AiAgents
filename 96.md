
## 🧑‍💼 **Agent #96: Virtual Executive Assistant**

### 📝 Overview

The Virtual Executive Assistant Agent helps leaders manage their calendar, schedule meetings, summarize documents, draft emails, and track action items. This agent blends time management, communication support, and organizational memory using natural language interfaces. In this lab, you’ll build a prototype that performs three core functions: scheduling support, email drafting, and task summarization.

---

### 🧪 Lab Objectives

By the end of this lab, you will:

* Accept natural language requests from a busy executive
* Use GPT to interpret intent and generate responses
* Handle scheduling prompts, email writing, and summary generation
* Simulate assistant behavior via a unified UI

---

### 🧰 Tech Stack

* **Python**
* **Streamlit**
* **LangChain + GPT-4 or GPT-3.5**
* *(Optional: Integrate with Google Calendar API, Gmail API, Notion API)*

---

### 🧭 Step-by-Step Instructions

#### ✅ Step 1: Environment Setup

```bash
mkdir virtual_exec_assistant
cd virtual_exec_assistant
python -m venv venv
source venv/bin/activate
pip install streamlit langchain openai
```

---

#### ✅ Step 2: Prompt Logic (`assistant_tools.py`)

```python
from langchain.chat_models import ChatOpenAI

llm = ChatOpenAI(temperature=0.3)

def handle_scheduling(request):
    prompt = f"""
    You're a virtual executive assistant. A user said:
    "{request}"
    Reply with a scheduling suggestion, confirming time zones, conflicts, and offering next best options.
    """
    return llm.predict(prompt)

def handle_email_drafting(request):
    prompt = f"""
    You're drafting an email based on this request:
    "{request}"
    Write a professional email in 150 words or less.
    """
    return llm.predict(prompt)

def handle_summary(text):
    prompt = f"""
    Summarize the following content in bullet points with action items:
    {text}
    """
    return llm.predict(prompt)
```

---

#### ✅ Step 3: Streamlit UI (`app.py`)

```python
import streamlit as st
from assistant_tools import handle_scheduling, handle_email_drafting, handle_summary

st.title("🧑‍💼 Virtual Executive Assistant Agent")

tab1, tab2, tab3 = st.tabs(["🗓️ Schedule Assistant", "✉️ Email Writer", "📋 Summarize Notes"])

with tab1:
    st.subheader("Smart Scheduling Support")
    req1 = st.text_area("Describe the meeting or schedule issue:")
    if st.button("Get Scheduling Suggestion"):
        st.text_area("Assistant Reply", handle_scheduling(req1), height=200)

with tab2:
    st.subheader("AI-Powered Email Composer")
    req2 = st.text_area("Describe the email you want drafted:")
    if st.button("Generate Email"):
        st.text_area("Drafted Email", handle_email_drafting(req2), height=200)

with tab3:
    st.subheader("Meeting / Document Summary")
    req3 = st.text_area("Paste notes or content to summarize:")
    if st.button("Summarize"):
        st.text_area("AI Summary", handle_summary(req3), height=250)
```

Run:

```bash
streamlit run app.py
```

---

### 🧪 Example Use Cases

#### ✅ Scheduling Prompt:

**Input:** “Reschedule my Thursday 3PM call with the CFO to next week, and add a follow-up reminder.”

**GPT Output:**
“Rescheduling the CFO call to next Tuesday at 3PM EST. Adding a follow-up reminder for the prior day. Let me know if you’d like to send a calendar invite.”

---

#### ✅ Email Writing Prompt:

**Input:** “Send an apology email to the client about the delay and promise revised delivery.”

**GPT Output:**
“Dear \[Client Name], I sincerely apologize for the delay in our recent deliverable. We’ve identified the issue and are committed to delivering the revised version by \[Date]. Thank you for your patience.”

---

#### ✅ Summarization Prompt:

**Input:** Notes from a leadership meeting.

**GPT Output (bullet points):**

* Launch moved to Sept 15
* Dev team needs final specs by Friday
* Schedule a press release draft by Aug 20
* Review product roadmap in next exec sync

---
