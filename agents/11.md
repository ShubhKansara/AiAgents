## 👔 **Agent #11: Employee Hiring Advisor**

### 📝 Overview

This AI agent assists HR teams in screening candidates by analyzing resumes, matching them with job descriptions, and ranking applicants based on fit. In this lab, you’ll simulate a candidate pool, job requirements, and use GPT to evaluate candidate-job fit and generate interview shortlists.

---

### 🧪 Lab Objectives

By the end of this lab, you will:

* Simulate candidate profiles and a sample job description
* Use GPT to analyze and rank candidate fit
* Generate shortlisting justifications and interview recommendations
* Display everything in a clean Streamlit interface

---

### 🧰 Tech Stack

* **Python**
* **Pandas**
* **LangChain + GPT-4 or GPT-3.5**
* **Streamlit**

---

### 🧭 Step-by-Step Instructions

#### ✅ Step 1: Set up your environment

If you haven’t already:

```bash
mkdir hiring_advisor_agent
cd hiring_advisor_agent
python -m venv venv
source venv/bin/activate
pip install openai langchain pandas streamlit
```

---

#### ✅ Step 2: Simulate job and candidate data (`hiring_data.py`)

```python
import pandas as pd

def get_job_description():
    return """We are hiring a Data Analyst with:
- 2+ years experience in Python and SQL
- Familiarity with BI tools like Tableau or Power BI
- Understanding of statistics and A/B testing
- Strong communication and collaboration skills
"""

def get_candidates():
    return pd.DataFrame({
        "Name": ["Alice", "Bob", "Clara", "David", "Elena"],
        "Experience (yrs)": [3, 1, 5, 2, 4],
        "Skills": [
            "Python, SQL, Tableau, Excel",
            "Excel, SQL, Google Sheets",
            "Python, R, Power BI, Statistics, A/B Testing",
            "Python, SQL, Tableau, Statistics",
            "Power BI, SQL, Excel, Communication"
        ]
    })
```

---

#### ✅ Step 3: Create GPT prompt template (`hiring_prompt.py`)

```python
from langchain.prompts import PromptTemplate

hiring_template = PromptTemplate.from_template("""
You are an AI hiring advisor. Given this job description:

{job_description}

And the following candidates:

{candidate_table}

Please:
1. Rank the candidates from best to least fit (1 to 5).
2. Justify your rankings based on skills and experience match.
3. Recommend top 2 candidates for interview with reasons.
""")
```

---

#### ✅ Step 4: Generate evaluation using GPT (`hiring_agent.py`)

```python
from hiring_data import get_job_description, get_candidates
from hiring_prompt import hiring_template
from langchain.chat_models import ChatOpenAI

def evaluate_candidates():
    jd = get_job_description()
    df = get_candidates()
    table = df.to_string(index=False)

    llm = ChatOpenAI(temperature=0.2)
    prompt = hiring_template.format(job_description=jd, candidate_table=table)
    result = llm.predict(prompt)

    return jd, df, result
```

---

#### ✅ Step 5: Build the Streamlit interface (`app.py`)

```python
import streamlit as st
from hiring_agent import evaluate_candidates

st.title("👔 Employee Hiring Advisor")

if st.button("Evaluate Candidates"):
    jd, df, summary = evaluate_candidates()

    st.subheader("📄 Job Description")
    st.code(jd)

    st.subheader("👥 Candidate Pool")
    st.dataframe(df)

    st.subheader("🧠 AI Shortlisting & Justification")
    st.write(summary)
```

Run the app:

```bash
streamlit run app.py
```

---

### 🧪 Example Output:

```
Candidate Ranking:
1. Clara – Excellent skills match with Python, Power BI, Statistics, and A/B Testing.
2. Alice – Strong fit with Python, SQL, and Tableau.
3. David – Good match, lacks business tools like Power BI.
4. Elena – Moderate fit, missing statistical background.
5. Bob – Lacks Python and BI tools.

Recommend interviewing Clara and Alice for strong alignment with job requirements.
```

---