## 📊 **Agent #9: Budget Optimization Agent**

### 📝 Overview

This AI agent reviews historical budget allocations, identifies inefficient spending, and suggests optimized distributions aligned with strategic priorities. In this lab, you'll simulate department-level spending and use GPT to recommend budget reallocations and cost-saving measures.

---

### 🧪 Lab Objectives

By the end of this lab, you will:

* Simulate departmental budget vs. actual spending data
* Identify overspending and underutilization
* Use GPT to generate reallocation recommendations
* Visualize results with Streamlit and a summary report

---

### 🧰 Tech Stack

* **Python**
* **Pandas + Matplotlib**
* **LangChain + OpenAI (GPT-3.5 or GPT-4)**
* **Streamlit**

---

### 🧭 Step-by-Step Instructions

#### ✅ Step 1: Set up your environment

If you’ve completed earlier labs, you can skip this:

```bash
mkdir budget_optimizer_agent
cd budget_optimizer_agent
python -m venv venv
source venv/bin/activate
pip install openai langchain pandas matplotlib streamlit
```

---

#### ✅ Step 2: Create mock budget data (`budget_data.py`)

```python
import pandas as pd

def load_budget_data():
    data = {
        "Department": ["Marketing", "Sales", "Engineering", "HR", "IT", "Operations"],
        "Allocated Budget": [80000, 60000, 150000, 40000, 50000, 70000],
        "Actual Spending": [95000, 58000, 140000, 30000, 60000, 85000]
    }
    return pd.DataFrame(data)
```

---

#### ✅ Step 3: Create GPT prompt template (`budget_prompt.py`)

```python
from langchain.prompts import PromptTemplate

budget_template = PromptTemplate.from_template("""
You are a financial planning assistant.

Given the following department-level budget data:

{budget_table}

Tasks:
1. Identify departments that overspent or underspent.
2. Suggest budget reallocation for next quarter.
3. Recommend cost-saving strategies.

Present your suggestions in bullet points.
""")
```

---

#### ✅ Step 4: Budget analysis logic using GPT (`budget_agent.py`)

```python
from budget_data import load_budget_data
from budget_prompt import budget_template
from langchain.chat_models import ChatOpenAI

def analyze_budget():
    df = load_budget_data()
    table = df.to_string(index=False)

    llm = ChatOpenAI(temperature=0.3)
    prompt = budget_template.format(budget_table=table)
    summary = llm.predict(prompt)

    return df, summary
```

---

#### ✅ Step 5: Build Streamlit app (`app.py`)

```python
import streamlit as st
import matplotlib.pyplot as plt
from budget_agent import analyze_budget

st.title("📊 Budget Optimization Agent")

if st.button("Analyze Budget"):
    df, result = analyze_budget()

    st.subheader("💵 Budget Overview")
    st.dataframe(df)

    st.subheader("📈 Budget Performance Chart")
    fig, ax = plt.subplots()
    ax.bar(df["Department"], df["Allocated Budget"], label="Budget", alpha=0.6)
    ax.bar(df["Department"], df["Actual Spending"], label="Spent", alpha=0.6)
    ax.set_ylabel("USD")
    ax.legend()
    st.pyplot(fig)

    st.subheader("🧠 AI Recommendations")
    st.write(result)
```

Run the app:

```bash
streamlit run app.py
```

---

### 🧪 Example Output:

```
Overspending detected in Marketing (+$15,000), IT (+$10,000), and Operations (+$15,000).
Underspending in HR (only $30,000 of $40,000) and Engineering ($10,000 below budget).

Recommendations:
- Reallocate $10,000 from Engineering to Marketing and IT.
- Investigate cost drivers in Operations; consider contract renegotiation.
- Optimize HR headcount planning to absorb more budget.
- Encourage zero-based budgeting across departments.
```

---