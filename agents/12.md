## 👋 **Agent #12: Employee Onboarding Agent**

### 📝 Overview

This AI agent automates and personalizes the onboarding process for new hires by delivering checklists, policy docs, welcome messages, and role-specific guidance. In this lab, you’ll simulate a new employee onboarding scenario and build a chatbot-like experience that guides them through tasks.

---

### 🧪 Lab Objectives

By the end of this lab, you will:

* Simulate an onboarding checklist and employee profile
* Use GPT to provide a dynamic, personalized onboarding assistant
* Display onboarding steps in a conversational Streamlit interface
* Track completion and generate a welcome summary

---

### 🧰 Tech Stack

* **Python**
* **Pandas**
* **LangChain + GPT-4 or GPT-3.5**
* **Streamlit**

---

### 🧭 Step-by-Step Instructions

#### ✅ Step 1: Set up your environment

If continuing from earlier labs, skip this. Otherwise:

```bash
mkdir onboarding_agent
cd onboarding_agent
python -m venv venv
source venv/bin/activate
pip install openai langchain pandas streamlit
```

---

#### ✅ Step 2: Simulate onboarding checklist and employee profile (`onboarding_data.py`)

```python
def get_employee_profile():
    return {
        "name": "Jordan Lee",
        "role": "Data Analyst",
        "department": "Business Intelligence",
        "start_date": "2025-08-01"
    }

def get_onboarding_tasks():
    return [
        "Complete HR paperwork",
        "Review data security policy",
        "Attend team introduction call",
        "Set up company email & tools",
        "Schedule 1:1 with manager",
        "Complete Tableau training module"
    ]
```

---

#### ✅ Step 3: GPT prompt for personalized onboarding guide (`onboarding_prompt.py`)

```python
from langchain.prompts import PromptTemplate

onboarding_template = PromptTemplate.from_template("""
You are an AI onboarding assistant. A new employee is starting soon:

Name: {name}
Role: {role}
Department: {department}
Start Date: {start_date}

Onboarding Tasks:
{tasks_list}

Create a welcome message with:
1. Personalized greeting
2. Overview of first-week priorities
3. Encouraging tone to build excitement
""")
```

---

#### ✅ Step 4: Generate onboarding plan (`onboarding_agent.py`)

```python
from onboarding_data import get_employee_profile, get_onboarding_tasks
from onboarding_prompt import onboarding_template
from langchain.chat_models import ChatOpenAI

def generate_onboarding_message():
    profile = get_employee_profile()
    tasks = get_onboarding_tasks()
    tasks_str = "\n- " + "\n- ".join(tasks)

    llm = ChatOpenAI(temperature=0.4)
    prompt = onboarding_template.format(
        name=profile["name"],
        role=profile["role"],
        department=profile["department"],
        start_date=profile["start_date"],
        tasks_list=tasks_str
    )
    message = llm.predict(prompt)
    return profile, tasks, message
```

---

#### ✅ Step 5: Streamlit interface (`app.py`)

```python
import streamlit as st
from onboarding_agent import generate_onboarding_message

st.title("👋 AI Employee Onboarding Agent")

if st.button("Generate Welcome Plan"):
    profile, tasks, message = generate_onboarding_message()

    st.subheader("🧑‍💼 New Hire Profile")
    st.write(profile)

    st.subheader("📋 Onboarding Checklist")
    for task in tasks:
        st.checkbox(task)

    st.subheader("💬 Personalized Welcome Message")
    st.write(message)
```

Run it:

```bash
streamlit run app.py
```

---

### 🧪 Example Output:

```
Welcome, Jordan!

We’re thrilled to have you join the Business Intelligence team as a Data Analyst starting August 1st. Your first week will focus on essential setup, meeting your team, and diving into core tools like Tableau.

Priorities:
- HR paperwork and policy reviews
- Getting your systems and accounts ready
- Meeting your manager and colleagues

We’re here to support you every step of the way. Let’s make your onboarding experience great!
```

---
