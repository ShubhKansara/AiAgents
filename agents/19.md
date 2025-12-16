## 📈 **Agent #19: Performance Review Agent**

### 📝 Overview

This AI agent streamlines performance reviews by generating summaries based on employee goals, feedback, peer reviews, and manager notes. In this lab, you'll simulate performance input data and use GPT to produce well-structured performance review drafts.

---

### 🧪 Lab Objectives

By the end of this lab, you will:

* Simulate employee performance data (KPIs, feedback, goals)
* Use GPT to draft personalized review narratives
* Summarize strengths, areas of growth, and ratings
* Display in a review-ready Streamlit dashboard

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
mkdir performance_review_agent
cd performance_review_agent
python -m venv venv
source venv/bin/activate
pip install openai langchain pandas streamlit
```

---

#### ✅ Step 2: Simulate performance data (`review_data.py`)

```python
import pandas as pd

def get_employee_reviews():
    return pd.DataFrame({
        "Employee": ["Jordan", "Maya", "Alex"],
        "Role": ["Data Analyst", "UX Designer", "Product Manager"],
        "KPI Summary": [
            "Completed 5 dashboards, reduced report time by 40%",
            "Led 2 usability studies, improved UX metrics by 15%",
            "Launched 2 products, managed cross-functional team of 12"
        ],
        "Peer Feedback": [
            "Great attention to detail and collaboration",
            "Very empathetic and user-focused",
            "Strong leadership and great communicator"
        ],
        "Manager Comments": [
            "Reliable and consistently meets deadlines",
            "Creative thinker with strong execution",
            "Excellent at driving outcomes under pressure"
        ]
    })
```

---

#### ✅ Step 3: Create GPT Prompt Template (`review_prompt.py`)

```python
from langchain.prompts import PromptTemplate

review_template = PromptTemplate.from_template("""
You are an AI HR assistant drafting employee performance reviews.

Given this employee data:
- Name: {name}
- Role: {role}
- KPI Summary: {kpi}
- Peer Feedback: {peer}
- Manager Comments: {manager}

Generate a performance review with:
1. Strengths summary
2. Development areas (if any)
3. Overall performance rating (Excellent / Good / Needs Improvement)
4. A friendly, professional tone
""")
```

---

#### ✅ Step 4: Generate GPT Review Drafts (`review_agent.py`)

```python
from review_data import get_employee_reviews
from review_prompt import review_template
from langchain.chat_models import ChatOpenAI

def draft_reviews():
    df = get_employee_reviews()
    llm = ChatOpenAI(temperature=0.3)
    outputs = []

    for _, row in df.iterrows():
        prompt = review_template.format(
            name=row["Employee"],
            role=row["Role"],
            kpi=row["KPI Summary"],
            peer=row["Peer Feedback"],
            manager=row["Manager Comments"]
        )
        result = llm.predict(prompt)
        outputs.append((row["Employee"], result))

    return df, outputs
```

---

#### ✅ Step 5: Streamlit Interface (`app.py`)

```python
import streamlit as st
from review_agent import draft_reviews

st.title("📈 Performance Review Agent")

if st.button("Generate Reviews"):
    df, outputs = draft_reviews()

    st.subheader("🧑 Employee Performance Drafts")
    for name, review in outputs:
        st.markdown(f"### {name}")
        st.text_area("Review", review, height=300)
        st.markdown("---")
```

Run the app:

```bash
streamlit run app.py
```

---

### 🧪 Example Output:

**Jordan – Data Analyst**
Jordan has consistently delivered high-quality dashboards and streamlined reporting processes, reducing time to insight by 40%. Peer and manager feedback highlight his reliability and attention to detail.

**Strengths:** Analytical rigor, dependable delivery, team collaboration
**Development Areas:** Consider leading initiatives for broader impact
**Rating:** Excellent

---