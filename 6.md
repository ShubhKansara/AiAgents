## 💳 **Agent #6: Expense Management Agent**

### 📝 Overview

This AI agent helps employees and finance teams manage expense reports by extracting data from receipts, categorizing spending, checking policy compliance, and preparing reimbursement summaries. In this lab, you’ll simulate receipt entries, categorize expenses, and use GPT to generate a compliance summary.

---

### 🧪 Lab Objectives

By the end of this lab, you will:

* Simulate a dataset of employee expenses
* Automatically categorize and validate expenses
* Use GPT to summarize policy compliance and suggest actions
* Display everything in an interactive Streamlit app

---

### 🧰 Tech Stack

* **Python**
* **Pandas**
* **OpenAI GPT-4 / GPT-3.5**
* **LangChain**
* **Streamlit**

---

### 🧭 Step-by-Step Instructions

#### ✅ Step 1: Set up your environment

If continuing from earlier labs, skip this. Otherwise:

```bash
mkdir expense_management_agent
cd expense_management_agent
python -m venv venv
source venv/bin/activate
pip install openai langchain pandas streamlit
```

---

#### ✅ Step 2: Simulate mock expense data (`expense_data.py`)

```python
import pandas as pd

def load_expenses():
    data = {
        "Date": ["2025-07-01", "2025-07-02", "2025-07-03", "2025-07-03", "2025-07-04"],
        "Description": ["Flight to NYC", "Hotel Stay", "Team Dinner", "Taxi", "Conference Fee"],
        "Category": ["Travel", "Lodging", "Meals", "Transport", "Training"],
        "Amount": [450, 600, 180, 45, 1200]
    }
    df = pd.DataFrame(data)
    return df
```

---

#### ✅ Step 3: Define a policy compliance prompt (`expense_prompt.py`)

```python
from langchain.prompts import PromptTemplate

expense_prompt = PromptTemplate.from_template("""
You are an AI expense compliance auditor.

Below is a list of expenses submitted by an employee:

{expense_table}

Tasks:
1. Check if any items exceed reasonable expense policy limits.
   - Travel > $500
   - Meals > $100
   - Training > $1000
2. Suggest which items should be reviewed or flagged.
3. Provide a summary for the finance team.
""")
```

---

#### ✅ Step 4: Analyze using GPT (`expense_agent.py`)

```python
import pandas as pd
from expense_data import load_expenses
from expense_prompt import expense_prompt
from langchain.chat_models import ChatOpenAI

def analyze_expenses():
    df = load_expenses()
    table = df.to_string(index=False)

    llm = ChatOpenAI(temperature=0.2)
    prompt = expense_prompt.format(expense_table=table)
    output = llm.predict(prompt)
    return df, output
```

---

#### ✅ Step 5: Build Streamlit app (`app.py`)

```python
import streamlit as st
from expense_agent import analyze_expenses

st.title("💳 Expense Management Agent")

if st.button("Audit My Expenses"):
    df, result = analyze_expenses()

    st.subheader("📂 Expense Report")
    st.dataframe(df)

    st.subheader("🔍 GPT Expense Review")
    st.write(result)
```

Run it:

```bash
streamlit run app.py
```

---

### 🧪 Example Output:

```
The submitted expense report contains two items that exceed standard policy limits:

- "Flight to NYC" at $450 is within limits.
- "Hotel Stay" at $600 is acceptable.
- "Team Dinner" at $180 exceeds the $100 meal limit and should be reviewed.
- "Conference Fee" at $1200 exceeds the $1000 training cap.

Recommendations:
- Request itemized receipt for dinner.
- Validate conference details for policy exceptions.
```

---