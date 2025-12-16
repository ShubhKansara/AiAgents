## 🎯 **Agent #31: Lead Scoring Agent**

### 📝 Overview

This AI agent evaluates inbound leads based on criteria like industry, budget, engagement, and firmographics to assign a score indicating sales potential. It helps sales teams prioritize high-quality leads. In this lab, you'll simulate lead data and use GPT to assign scores with rationale.

---

### 🧪 Lab Objectives

By the end of this lab, you will:

* Simulate lead attributes (size, activity, budget, etc.)
* Use GPT to assign lead scores and justify them
* Classify leads as hot, warm, or cold
* Display the output in a sales dashboard

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
mkdir lead_scoring_agent
cd lead_scoring_agent
python -m venv venv
source venv/bin/activate
pip install pandas openai langchain streamlit
```

---

#### ✅ Step 2: Simulate Lead Data (`lead_data.py`)

```python
import pandas as pd

def get_leads():
    return pd.DataFrame({
        "Company": ["AlphaTech", "BlueWave Inc.", "NovaHealth", "CloudUnity"],
        "Industry": ["SaaS", "Manufacturing", "Healthcare", "Cloud Services"],
        "Company Size": ["50-100", "500+", "100-250", "10-50"],
        "Recent Activity": ["Visited pricing page, downloaded whitepaper", 
                            "Attended webinar, requested demo", 
                            "Clicked newsletter link", 
                            "No recent activity"],
        "Stated Budget": ["$20,000", "$100,000+", "$50,000", "$5,000"]
    })
```

---

#### ✅ Step 3: GPT Prompt Template (`lead_prompt.py`)

```python
from langchain.prompts import PromptTemplate

lead_template = PromptTemplate.from_template("""
You are a B2B lead scoring AI.

Given this lead profile:
- Company: {company}
- Industry: {industry}
- Size: {size}
- Activity: {activity}
- Budget: {budget}

Score the lead from 1–100. Classify it as:
- Hot (>80)
- Warm (50–80)
- Cold (<50)

Then explain your rationale in 2–3 sentences.
""")
```

---

#### ✅ Step 4: Lead Evaluation Logic (`lead_agent.py`)

```python
from lead_data import get_leads
from lead_prompt import lead_template
from langchain.chat_models import ChatOpenAI

def score_leads():
    df = get_leads()
    llm = ChatOpenAI(temperature=0.3)
    results = []

    for _, row in df.iterrows():
        prompt = lead_template.format(
            company=row["Company"],
            industry=row["Industry"],
            size=row["Company Size"],
            activity=row["Recent Activity"],
            budget=row["Stated Budget"]
        )
        result = llm.predict(prompt)
        results.append((row["Company"], result))

    return df, results
```

---

#### ✅ Step 5: Streamlit Interface (`app.py`)

```python
import streamlit as st
from lead_agent import score_leads

st.title("🎯 Lead Scoring Agent")

if st.button("Score Leads"):
    df, results = score_leads()

    for company, summary in results:
        st.subheader(f"🏢 {company}")
        st.text_area("AI Scoring Summary", summary, height=200)
        st.markdown("---")
```

Run the app:

```bash
streamlit run app.py
```

---

### 🧪 Example GPT Output:

**BlueWave Inc.**

* Score: 87 (Hot)
* Rationale: Large manufacturer with strong recent activity and high budget. Demo request shows intent to buy.

**CloudUnity**

* Score: 42 (Cold)
* Rationale: Small company with no recent engagement and limited budget. Not a priority lead.

---
