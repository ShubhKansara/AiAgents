## 🤖 **Agent #15: AI Recruitment Coordinator**

### 📝 Overview

This AI agent automates coordination tasks in the recruitment process: scheduling interviews, sending reminders, updating candidate statuses, and responding to common questions. In this lab, you'll simulate an end-to-end coordination flow and use GPT to generate professional messages and reminders.

---

### 🧪 Lab Objectives

By the end of this lab, you will:

* Simulate candidate pipeline stages and interview slots
* Use GPT to auto-generate scheduling emails and reminders
* Display an interactive interface to manage candidates
* Prepare communication outputs for HR and hiring managers

---

### 🧰 Tech Stack

* **Python**
* **Pandas**
* **LangChain + GPT-4 or GPT-3.5**
* **Streamlit**

---

### 🧭 Step-by-Step Instructions

#### ✅ Step 1: Set up your environment

```bash
mkdir recruitment_coordinator_agent
cd recruitment_coordinator_agent
python -m venv venv
source venv/bin/activate
pip install openai langchain pandas streamlit
```

---

#### ✅ Step 2: Create mock candidate data (`candidate_data.py`)

```python
import pandas as pd

def get_candidates():
    return pd.DataFrame({
        "Candidate": ["Alice", "Bob", "Clara"],
        "Role": ["Data Analyst", "UX Designer", "ML Engineer"],
        "Stage": ["Phone Screen", "Technical Interview", "HR Interview"],
        "Preferred Time": ["2025-08-01 10:00", "2025-08-01 14:00", "2025-08-02 09:00"]
    })
```

---

#### ✅ Step 3: Create GPT prompt for scheduling (`recruitment_prompt.py`)

```python
from langchain.prompts import PromptTemplate

recruitment_template = PromptTemplate.from_template("""
You are an AI recruitment coordinator.

For the following candidate:
- Name: {name}
- Role: {role}
- Interview Stage: {stage}
- Preferred Time: {time}

Please:
1. Write a professional email to the candidate confirming the interview.
2. Suggest 2 alternate times in case of conflict.
3. Include a friendly tone and a reminder to bring any required materials.
""")
```

---

#### ✅ Step 4: Generate GPT output (`recruitment_agent.py`)

```python
from candidate_data import get_candidates
from recruitment_prompt import recruitment_template
from langchain.chat_models import ChatOpenAI

def generate_emails():
    llm = ChatOpenAI(temperature=0.4)
    df = get_candidates()
    responses = []

    for _, row in df.iterrows():
        prompt = recruitment_template.format(
            name=row["Candidate"],
            role=row["Role"],
            stage=row["Stage"],
            time=row["Preferred Time"]
        )
        response = llm.predict(prompt)
        responses.append((row["Candidate"], response))
    
    return df, responses
```

---

#### ✅ Step 5: Streamlit interface (`app.py`)

```python
import streamlit as st
from recruitment_agent import generate_emails

st.title("📅 AI Recruitment Coordinator")

if st.button("Generate Interview Emails"):
    df, responses = generate_emails()

    st.subheader("📋 Candidate Pipeline")
    st.dataframe(df)

    for name, email_text in responses:
        st.subheader(f"📧 Email for {name}")
        st.write(email_text)
```

Run the app:

```bash
streamlit run app.py
```

---

### 🧪 Example Output:

**Email to Bob:**
Hi Bob,

Thank you for your continued interest in the UX Designer position. We’ve scheduled your technical interview for **August 1st at 2:00 PM** via Zoom.

If this time does not work for you, we can offer:

* August 1st at 3:30 PM
* August 2nd at 11:00 AM

Please bring your design portfolio and be ready to walk through a case study. We’re looking forward to connecting!

Best,
Recruitment Team

---