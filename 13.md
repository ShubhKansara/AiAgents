## 🧑‍💼 **Agent #13: HR Companion Agent**

### 📝 Overview

This AI agent acts as an always-on virtual assistant for employees, answering HR-related questions about benefits, leave policy, payroll, and more. In this lab, you'll build a chatbot-style assistant that uses GPT to respond to natural language queries based on internal HR policies.

---

### 🧪 Lab Objectives

By the end of this lab, you will:

* Simulate HR policy documents
* Create a chat interface where employees ask HR questions
* Use GPT to retrieve and answer from the HR knowledge base
* Display responses in Streamlit as an interactive assistant

---

### 🧰 Tech Stack

* **Python**
* **LangChain + GPT-3.5 or GPT-4**
* **Streamlit**

---

### 🧭 Step-by-Step Instructions

#### ✅ Step 1: Environment Setup

If you haven’t already:

```bash
mkdir hr_companion_agent
cd hr_companion_agent
python -m venv venv
source venv/bin/activate
pip install openai langchain streamlit
```

---

#### ✅ Step 2: Simulate HR policy FAQ knowledge base (`hr_policies.py`)

```python
def get_hr_knowledge_base():
    return """
1. PTO Policy: Employees receive 15 paid vacation days per year and 10 paid holidays. PTO must be approved by your manager.

2. Parental Leave: New parents are eligible for 12 weeks of paid leave.

3. Health Benefits: Employees are enrolled in Aetna PPO plans. Dental and vision are optional add-ons.

4. Remote Work: Employees can work remotely up to 3 days per week.

5. Payroll: Salaries are paid on the 15th and last day of each month. Direct deposit is required.

6. Training Budget: Every employee receives $1000/year for approved training.
"""
```

---

#### ✅ Step 3: Create prompt template for GPT (`hr_prompt.py`)

```python
from langchain.prompts import PromptTemplate

hr_prompt = PromptTemplate.from_template("""
You are an HR Companion AI. Use the company policies below to answer the employee's question:

Company HR Policies:
{policies}

Employee’s Question:
{question}

Answer as clearly and politely as possible.
""")
```

---

#### ✅ Step 4: Define GPT-powered HR agent logic (`hr_agent.py`)

```python
from hr_policies import get_hr_knowledge_base
from hr_prompt import hr_prompt
from langchain.chat_models import ChatOpenAI

def get_hr_response(question: str):
    policies = get_hr_knowledge_base()
    llm = ChatOpenAI(temperature=0.3)
    prompt = hr_prompt.format(policies=policies, question=question)
    response = llm.predict(prompt)
    return response
```

---

#### ✅ Step 5: Build Streamlit interface (`app.py`)

```python
import streamlit as st
from hr_agent import get_hr_response

st.title("🧑‍💼 HR Companion Agent")

user_question = st.text_input("Ask an HR question (e.g., 'How many vacation days do I get?')")

if user_question:
    response = get_hr_response(user_question)
    st.subheader("💬 AI Response")
    st.write(response)
```

Run it:

```bash
streamlit run app.py
```

---

### 🧪 Example Output:

**User input:**
*“Am I allowed to work from home on Fridays?”*

**AI Response:**
“Yes, employees can work remotely up to 3 days per week. If Friday is within your remote schedule, you're allowed to work from home. Please coordinate with your manager.”

---