
## 🛠️ **Agent #73: AI-powered Field Service Agent**

### 📝 Overview

This agent assists in managing field technicians, work orders, and service schedules. It intelligently assigns jobs based on technician availability, location, and task urgency, and provides real-time suggestions for troubleshooting or rerouting. In this lab, you’ll build an AI assistant to analyze incoming service jobs and assign them to optimal field agents with GPT-powered logic.

---

### 🧪 Lab Objectives

By the end of this lab, you will:

* Upload job and technician data
* Match jobs to technicians using logic + GPT reasoning
* Flag scheduling or routing inefficiencies
* Generate actionable assignments per job

---

### 🧰 Tech Stack

* **Python**
* **Streamlit**
* **Pandas**
* **LangChain + GPT-4 or GPT-3.5**
* *(Optional: Google Maps API or GeoJSON for routing)*

---

### 🧭 Step-by-Step Instructions

#### ✅ Step 1: Environment Setup

```bash
mkdir field_service_agent
cd field_service_agent
python -m venv venv
source venv/bin/activate
pip install streamlit pandas openai langchain
```

---

#### ✅ Step 2: Sample CSVs

**Technicians (`technicians.csv`)**

```csv
TechID,Name,Location,SkillLevel,Availability
T001,Alice,Dallas,Expert,Yes
T002,Bob,Houston,Intermediate,Yes
T003,Clara,Austin,Beginner,No
```

**Jobs (`jobs.csv`)**

```csv
JobID,Issue,Location,Priority,RequiredSkill
J001,WiFi setup,Dallas,High,Beginner
J002,Server repair,Houston,Medium,Expert
J003,Printer install,Austin,Low,Intermediate
```

---

#### ✅ Step 3: GPT Prompt Template (`field_prompt.py`)

```python
from langchain.prompts import PromptTemplate

field_prompt = PromptTemplate.from_template("""
You are an AI field service dispatcher.

Match this job to the most appropriate technician:
- JobID: {JobID}
- Location: {Location}
- Priority: {Priority}
- Required Skill: {RequiredSkill}

Available Technicians:
{tech_summary}

Return:
1. Technician name
2. Reason for match (1 sentence)
3. Risk factors (if any)

Keep it short and actionable.
""")
```

---

#### ✅ Step 4: Matching Logic (`field_agent.py`)

```python
from langchain.chat_models import ChatOpenAI
from field_prompt import field_prompt

def recommend_technician(job, tech_summary):
    llm = ChatOpenAI(temperature=0.2)
    prompt = field_prompt.format(
        JobID=job["JobID"],
        Location=job["Location"],
        Priority=job["Priority"],
        RequiredSkill=job["RequiredSkill"],
        tech_summary=tech_summary
    )
    return llm.predict(prompt)
```

---

#### ✅ Step 5: Streamlit Interface (`app.py`)

```python
import streamlit as st
import pandas as pd
from field_agent import recommend_technician

st.title("🛠️ AI-powered Field Service Agent")
st.caption("Assign technicians to jobs using AI")

tech_file = st.file_uploader("Upload Technicians CSV", type=["csv"])
job_file = st.file_uploader("Upload Jobs CSV", type=["csv"])

if tech_file and job_file:
    tech_df = pd.read_csv(tech_file)
    job_df = pd.read_csv(job_file)

    available_techs = tech_df[tech_df["Availability"] == "Yes"]
    tech_summary = available_techs.to_string(index=False)

    results = []
    for _, job in job_df.iterrows():
        result = recommend_technician(job, tech_summary)
        results.append(result)

    job_df["Assignment"] = results
    st.dataframe(job_df[["JobID", "Issue", "Location", "Assignment"]])
    st.download_button("Download Assignments", job_df.to_csv(index=False), "field_assignments.csv")
```

Run the app:

```bash
streamlit run app.py
```

---

### 🧪 Example GPT Output

**Job:** J002 – Server repair in Houston
**GPT Output:**

```
- Assigned to: Bob  
- Reason: Closest technician with availability and intermediate skill level; only expert nearby.  
- Risk: May require escalation if complexity is high.
```

---
