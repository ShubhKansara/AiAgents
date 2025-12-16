## 🧾 **Agent #14: HR Support Agent**

### 📝 Overview

This AI agent supports HR operations by handling repetitive tasks like answering employee questions, generating HR reports, sending reminders, and logging leave requests. In this lab, you’ll simulate an HR helpdesk agent that routes queries and automates typical HR tasks using GPT.

---

### 🧪 Lab Objectives

By the end of this lab, you will:

* Simulate HR task categories (e.g., leave requests, reporting, reminders)
* Use GPT to classify and route incoming queries
* Automate basic HR task responses
* Provide a simple form-driven Streamlit interface

---

### 🧰 Tech Stack

* **Python**
* **LangChain + GPT-4 / GPT-3.5**
* **Streamlit**
* **Pandas** (for mock reporting)

---

### 🧭 Step-by-Step Instructions

#### ✅ Step 1: Set up your environment

If not already done:

```bash
mkdir hr_support_agent
cd hr_support_agent
python -m venv venv
source venv/bin/activate
pip install openai langchain pandas streamlit
```

---

#### ✅ Step 2: Simulate query types (`hr_tasks.py`)

```python
TASKS = {
    "Leave Request": "Record PTO request and notify manager",
    "Policy Inquiry": "Respond to question using the HR policy database",
    "Payroll Issue": "Log issue with payroll and forward to HR ops",
    "Report Generation": "Generate headcount or leave balance reports",
    "Reminder Request": "Send reminder email for training or compliance",
}
```

---

#### ✅ Step 3: GPT prompt to classify and respond (`hr_support_prompt.py`)

```python
from langchain.prompts import PromptTemplate

hr_support_template = PromptTemplate.from_template("""
You are an AI assistant in an HR support team.

Here are known categories of requests:
{task_list}

Given the employee's message:
"{message}"

1. Classify the request into one of the task categories.
2. Generate an appropriate response.
""")
```

---

#### ✅ Step 4: Core HR agent logic (`hr_support_agent.py`)

```python
from langchain.chat_models import ChatOpenAI
from hr_support_prompt import hr_support_template
from hr_tasks import TASKS

def handle_hr_query(user_message):
    task_list = "\n".join(f"- {key}: {value}" for key, value in TASKS.items())

    llm = ChatOpenAI(temperature=0.3)
    prompt = hr_support_template.format(
        task_list=task_list,
        message=user_message
    )
    return llm.predict(prompt)
```

---

#### ✅ Step 5: Streamlit interface (`app.py`)

```python
import streamlit as st
from hr_support_agent import handle_hr_query

st.title("🤖 HR Support Agent")

user_msg = st.text_area("Enter your request (e.g., 'I need to take off next Friday')")

if st.button("Submit"):
    if user_msg:
        response = handle_hr_query(user_msg)
        st.subheader("📋 AI Response")
        st.write(response)
```

Run the app:

```bash
streamlit run app.py
```

---

### 🧪 Example Output:

**User Input:**
“Can I take PTO from Sept 10 to Sept 12?”

**AI Output:**
**Classification:** Leave Request
**Response:**
“Your PTO request from Sept 10 to Sept 12 has been recorded. Please ensure your manager is notified for final approval. Let me know if you'd like a calendar block created.”

---