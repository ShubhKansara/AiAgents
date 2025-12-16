## 🧠 **Agent #1: Individualized Financial Advisory Agent**

### 📝 **Overview**

Build an AI agent that provides personalized financial advice to users based on their income, spending habits, financial goals, and risk profile. The agent will interact via a chat interface, summarize user financial data, and suggest savings, investment, or budget strategies.

---

### 🧪 Lab Objectives

By the end of this lab, you will:

* Build a chat-based financial advisor using OpenAI's GPT + LangChain
* Connect user input to mock financial data
* Generate personalized recommendations
* Output summaries using structured templates

---

### 🧰 **Tech Stack**

* **Python**
* **OpenAI GPT-4 / GPT-3.5**
* **LangChain**
* **Streamlit** (for UI)
* **Pandas** (mock financial data)

---

### 🧭 Step-by-Step Instructions

#### ✅ Step 1: Set up the environment

```bash
mkdir financial_advisor_agent
cd financial_advisor_agent
python -m venv venv
source venv/bin/activate   # or venv\Scripts\activate on Windows

pip install openai langchain streamlit pandas
```

---

#### ✅ Step 2: Create your mock financial dataset (`mock_data.py`)

```python
import pandas as pd

def get_user_financial_data(user_id="user123"):
    return {
        "income": 70000,
        "monthly_expenses": {
            "housing": 1500,
            "food": 600,
            "transport": 300,
            "entertainment": 200,
            "others": 150,
        },
        "financial_goals": ["save for a house", "retire at 60"],
        "risk_tolerance": "moderate"
    }
```

---

#### ✅ Step 3: Build your prompt template (`advisor_prompt.py`)

```python
from langchain.prompts import PromptTemplate

advisor_template = PromptTemplate.from_template("""
You are a financial advisor AI. Given the user's financial profile below, provide 3 personalized suggestions:
- Summarize their financial status
- Suggest a monthly savings goal
- Recommend an investment strategy based on their risk profile

User Profile:
Income: ${income}
Expenses: ${expenses}
Goals: ${goals}
Risk: ${risk}

Respond clearly and concisely.
""")
```

---

#### ✅ Step 4: Create your LangChain agent logic (`advisor_agent.py`)

```python
import openai
from langchain.chat_models import ChatOpenAI
from advisor_prompt import advisor_template
from mock_data import get_user_financial_data

def run_financial_advisor():
    user_data = get_user_financial_data()
    input_str = advisor_template.format(
        income=user_data["income"],
        expenses=user_data["monthly_expenses"],
        goals=", ".join(user_data["financial_goals"]),
        risk=user_data["risk_tolerance"]
    )

    llm = ChatOpenAI(temperature=0.4)
    response = llm.predict(input_str)
    return response
```

---

#### ✅ Step 5: Build the UI with Streamlit (`app.py`)

```python
import streamlit as st
from advisor_agent import run_financial_advisor

st.title("Individualized Financial Advisory Agent 💰")
if st.button("Get Advice"):
    result = run_financial_advisor()
    st.markdown("### Your Financial Plan")
    st.write(result)
```

Run the app:

```bash
streamlit run app.py
```

---

### 🧪 Example Output:

```
Your income is $70,000 per year with moderate expenses. You could save $1,200/month.
To meet your goal of buying a house, start a high-yield savings account.
For retirement, consider a 60% stock / 40% bond portfolio with automated contributions.
```

---

