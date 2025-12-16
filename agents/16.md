## 💼 **Agent #16: Benefits Analyst Agent**

### 📝 Overview

This AI agent helps employees compare and choose from available benefit plans (health, dental, vision, retirement, etc.) based on eligibility, family situation, and preferences. In this lab, you'll simulate benefit options and employee profiles, and use GPT to recommend the most suitable package.

---

### 🧪 Lab Objectives

By the end of this lab, you will:

* Simulate employee benefit options and eligibility factors
* Build a form to collect employee inputs (e.g., family size, health priorities)
* Use GPT to analyze and recommend plans
* Provide a benefits summary in a Streamlit interface

---

### 🧰 Tech Stack

* **Python**
* **Pandas**
* **LangChain + GPT-4 or GPT-3.5**
* **Streamlit**

---

### 🧭 Step-by-Step Instructions

#### ✅ Step 1: Environment Setup

If you haven't yet:

```bash
mkdir benefits_analyst_agent
cd benefits_analyst_agent
python -m venv venv
source venv/bin/activate
pip install openai langchain pandas streamlit
```

---

#### ✅ Step 2: Define benefits options (`benefit_data.py`)

```python
def get_benefits_catalog():
    return """
1. Health Plan A: Low premium, high deductible. Best for healthy individuals.
2. Health Plan B: Higher premium, low deductible. Covers most routine care.
3. Dental Plan A: Covers preventive and basic care.
4. Vision Plan A: Covers eye exams, basic lenses.
5. Retirement 401(k): Company match up to 5%.
6. HSA Account: Available with Health Plan A for tax-free savings.
"""
```

---

#### ✅ Step 3: GPT Prompt Template (`benefit_prompt.py`)

```python
from langchain.prompts import PromptTemplate

benefit_prompt = PromptTemplate.from_template("""
You are a benefits advisor AI.

Given the benefits catalog:
{catalog}

And the employee details:
- Age: {age}
- Family Status: {family}
- Health Priorities: {priority}
- Risk Tolerance: {risk}

Suggest:
1. The best combination of health, dental, and vision plans.
2. Whether to use an HSA or 401(k).
3. One-paragraph explanation tailored to the profile.
""")
```

---

#### ✅ Step 4: Build GPT Logic (`benefit_agent.py`)

```python
from benefit_data import get_benefits_catalog
from benefit_prompt import benefit_prompt
from langchain.chat_models import ChatOpenAI

def recommend_benefits(age, family, priority, risk):
    catalog = get_benefits_catalog()
    llm = ChatOpenAI(temperature=0.4)

    prompt = benefit_prompt.format(
        catalog=catalog,
        age=age,
        family=family,
        priority=priority,
        risk=risk
    )

    return llm.predict(prompt)
```

---

#### ✅ Step 5: Streamlit Interface (`app.py`)

```python
import streamlit as st
from benefit_agent import recommend_benefits

st.title("💼 Benefits Analyst Agent")

with st.form("benefits_form"):
    age = st.number_input("Your Age", min_value=18, max_value=70, value=30)
    family = st.selectbox("Family Status", ["Single", "Married", "Married with Kids"])
    priority = st.selectbox("Primary Health Concern", ["Routine Care", "Major Illness Coverage", "Low Cost"])
    risk = st.selectbox("Financial Risk Tolerance", ["Low", "Moderate", "High"])
    submitted = st.form_submit_button("Get Recommendation")

if submitted:
    response = recommend_benefits(age, family, priority, risk)
    st.subheader("🧠 Personalized Benefits Recommendation")
    st.write(response)
```

Run the app:

```bash
streamlit run app.py
```

---

### 🧪 Example Output:

```
Recommended Plans:
- Health Plan B for low deductible and routine coverage
- Dental Plan A
- Vision Plan A
- Enroll in 401(k) for employer match

Since you’re 30, married with kids, and value predictable healthcare costs, Plan B will cover your needs with less out-of-pocket risk. The 401(k) match ensures long-term savings. Avoid the HSA since Plan B doesn’t qualify.
```

---