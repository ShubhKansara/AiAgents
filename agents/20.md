## 🎓 **Agent #20: Learning & Development Recommendation Agent**

### 📝 Overview

This AI agent recommends personalized training resources, courses, or skill-building paths based on an employee’s current role, career goals, and skill gaps. In this lab, you'll simulate employee profiles and use GPT to generate customized L\&D suggestions with justifications.

---

### 🧪 Lab Objectives

By the end of this lab, you will:

* Simulate employee roles, current skills, and future goals
* Use GPT to generate personalized training plans
* Categorize resources by technical, soft skills, and leadership
* Display a custom L\&D dashboard via Streamlit

---

### 🧰 Tech Stack

* **Python**
* **Pandas**
* **LangChain + GPT-4 or GPT-3.5**
* **Streamlit**

---

### 🧭 Step-by-Step Instructions

#### ✅ Step 1: Environment Setup

```bash
mkdir learning_agent
cd learning_agent
python -m venv venv
source venv/bin/activate
pip install openai langchain pandas streamlit
```

---

#### ✅ Step 2: Simulate employee L\&D profile (`employee_ld_data.py`)

```python
import pandas as pd

def get_ld_profiles():
    return pd.DataFrame({
        "Employee": ["Jordan", "Mei", "Raj"],
        "Role": ["Data Analyst", "UX Designer", "Engineering Manager"],
        "Current Skills": [
            "Excel, SQL, basic Python",
            "Figma, User Research, Wireframing",
            "Team management, Agile, system architecture"
        ],
        "Career Goal": [
            "Become a Machine Learning Engineer",
            "Lead a UX research team",
            "Move into Director of Engineering role"
        ]
    })
```

---

#### ✅ Step 3: GPT Prompt Template (`ld_prompt.py`)

```python
from langchain.prompts import PromptTemplate

ld_template = PromptTemplate.from_template("""
You are an AI Learning & Development advisor.

Given this employee:
- Role: {role}
- Current Skills: {skills}
- Career Goal: {goal}

Recommend a personalized learning plan that includes:
1. Technical skills to acquire
2. Soft skills to strengthen
3. Suggested learning resources (courses or topics)
4. Short summary of how this supports their career growth
""")
```

---

#### ✅ Step 4: GPT-Powered L\&D Generator (`ld_agent.py`)

```python
from employee_ld_data import get_ld_profiles
from ld_prompt import ld_template
from langchain.chat_models import ChatOpenAI

def recommend_ld_plans():
    df = get_ld_profiles()
    llm = ChatOpenAI(temperature=0.4)
    results = []

    for _, row in df.iterrows():
        prompt = ld_template.format(
            role=row["Role"],
            skills=row["Current Skills"],
            goal=row["Career Goal"]
        )
        response = llm.predict(prompt)
        results.append((row["Employee"], response))

    return df, results
```

---

#### ✅ Step 5: Streamlit Interface (`app.py`)

```python
import streamlit as st
from ld_agent import recommend_ld_plans

st.title("🎓 L&D Recommendation Agent")

if st.button("Generate Learning Plans"):
    df, results = recommend_ld_plans()

    for name, plan in results:
        st.subheader(f"📘 Learning Plan for {name}")
        st.text_area("Recommendations", plan, height=350)
        st.markdown("---")
```

Run the app:

```bash
streamlit run app.py
```

---

### 🧪 Example Output:

**Jordan – Data Analyst**
**Goal:** Become a Machine Learning Engineer

* **Technical:** Learn Python for ML, scikit-learn, TensorFlow
* **Soft Skills:** Critical thinking, storytelling with data
* **Resources:** Coursera’s "Machine Learning" by Andrew Ng, "DataCamp Python Track", Google ML crash course
  **Summary:** These skills will help Jordan transition into ML roles by layering on core AI capabilities to their strong data foundation.

---