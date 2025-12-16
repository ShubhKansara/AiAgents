
## 🚨 **Agent #58: AI-driven Incident Response Agent**

### 📝 Overview

This agent monitors for IT incidents, helps triage them based on severity and impact, and generates an action plan using GPT. It can summarize logs, recommend responses, and escalate issues if needed. In this lab, you’ll simulate incident reports, assess risk levels, and generate GPT-powered incident response plans.

---

### 🧪 Lab Objectives

By the end of this lab, you will:

* Input or simulate incidents (e.g., downtime, security alerts)
* Use GPT to analyze severity, suggest actions, and escalate
* Generate a structured incident response memo
* Visualize the incident timeline and recommended actions

---

### 🧰 Tech Stack

* **Python**
* **Streamlit**
* **LangChain + GPT-4 or GPT-3.5**
* *(Optional: Integrate PagerDuty/Zendesk for escalation)*

---

### 🧭 Step-by-Step Instructions

#### ✅ Step 1: Environment Setup

```bash
mkdir incident_response_agent
cd incident_response_agent
python -m venv venv
source venv/bin/activate
pip install streamlit openai langchain pandas
```

---

#### ✅ Step 2: Simulate Incidents (`incidents.py`)

```python
import pandas as pd
from datetime import datetime, timedelta
import random

def generate_incidents():
    now = datetime.now()
    incidents = [
        {
            "Incident ID": "INC-001",
            "Timestamp": now - timedelta(minutes=15),
            "Category": "Downtime",
            "Description": "Website unresponsive for 10 minutes"
        },
        {
            "Incident ID": "INC-002",
            "Timestamp": now - timedelta(hours=1),
            "Category": "Security",
            "Description": "Multiple failed login attempts on admin portal"
        },
        {
            "Incident ID": "INC-003",
            "Timestamp": now - timedelta(days=1),
            "Category": "Performance",
            "Description": "API latency increased beyond SLA threshold"
        },
        {
            "Incident ID": "INC-004",
            "Timestamp": now - timedelta(minutes=30),
            "Category": "Data Loss",
            "Description": "Lost customer data from form submission due to backend crash"
        }
    ]
    return pd.DataFrame(incidents)
```

---

#### ✅ Step 3: GPT Prompt Template (`incident_prompt.py`)

```python
from langchain.prompts import PromptTemplate

incident_prompt = PromptTemplate.from_template("""
You are an incident response manager.

Incident Details:
Category: {category}
Description: {description}

Tasks:
1. Determine severity (Low, Medium, High, Critical)
2. Recommend immediate actions
3. Draft a response memo (1–2 paragraphs)

Respond in a structured format.
""")
```

---

#### ✅ Step 4: GPT-based Incident Responder (`incident_agent.py`)

```python
from langchain.chat_models import ChatOpenAI
from incident_prompt import incident_prompt

def respond_to_incident(category: str, description: str):
    llm = ChatOpenAI(temperature=0.3)
    prompt = incident_prompt.format(category=category, description=description)
    return llm.predict(prompt)
```

---

#### ✅ Step 5: Streamlit Interface (`app.py`)

```python
import streamlit as st
from incidents import generate_incidents
from incident_agent import respond_to_incident

st.title("🚨 AI-driven Incident Response Agent")

df = generate_incidents()
st.subheader("📌 Reported Incidents")
st.dataframe(df)

incident_ids = df["Incident ID"].tolist()
selected = st.selectbox("Select an Incident", incident_ids)
incident = df[df["Incident ID"] == selected].iloc[0]

if st.button("Generate Response Plan"):
    output = respond_to_incident(
        incident["Category"], incident["Description"]
    )
    st.subheader("🧠 GPT Incident Response")
    st.text_area("Response Plan", output, height=400)
    st.download_button("Download Plan", output, file_name=f"{selected}_response.txt")
```

Run the app:

```bash
streamlit run app.py
```

---

### 🧪 Example Output

**Category:** Security
**Description:** Multiple failed login attempts on admin portal

**GPT Response:**

```
Severity: High  
Immediate Action:  
- Block suspicious IPs  
- Reset admin passwords  
- Notify security team

Memo:  
At 10:32 AM, the system detected 17 failed login attempts to the admin portal from a suspicious IP range. This may indicate a brute-force attempt. IPs have been blocked and access logs escalated to the security team. Further monitoring has been enabled for the next 24 hours.
```

---
