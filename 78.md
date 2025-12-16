
## 🔄 **Agent #78: Workflow Automation Agent**

### 📝 Overview

This agent automates repetitive business tasks by analyzing patterns in operations data. It identifies manual steps, repetitive approvals, bottlenecks, and suggests workflow automations—like email triggers, form processing, document routing, and notifications. In this lab, you’ll build an AI agent that reads workflow data and uses GPT to recommend automation opportunities.

---

### 🧪 Lab Objectives

By the end of this lab, you will:

* Upload workflow task logs or sequences
* Identify repetitive or manual tasks
* Use GPT to suggest automation strategies
* Output a summarized automation plan

---

### 🧰 Tech Stack

* **Python**
* **Streamlit**
* **Pandas**
* **LangChain + GPT-4 or GPT-3.5**
* *(Optional: Integrate with n8n, Zapier, or Make.com)*

---

### 🧭 Step-by-Step Instructions

#### ✅ Step 1: Environment Setup

```bash
mkdir workflow_automation_agent
cd workflow_automation_agent
python -m venv venv
source venv/bin/activate
pip install streamlit pandas openai langchain
```

---

#### ✅ Step 2: Sample CSV (`workflow_log.csv`)

```csv
TaskID,Department,StepName,AssignedTo,StepType,AvgCompletionTimeMins,IsManual
T001,Finance,Invoice Approval,Alice,Approval,5,Yes
T002,HR,Onboarding Email,Bob,Email Trigger,2,Yes
T003,IT,Ticket Routing,System,Routing,1,No
T004,Marketing,Campaign Approval,Clara,Approval,10,Yes
T005,Sales,Proposal Generation,System,Document,3,No
```

---

#### ✅ Step 3: GPT Prompt Template (`workflow_prompt.py`)

```python
from langchain.prompts import PromptTemplate

workflow_prompt = PromptTemplate.from_template("""
You are an AI business process consultant.

Workflow Data:
{workflow_summary}

For each task, recommend:
1. Can it be automated? (Yes/No)
2. Suggested tool (e.g., Zapier, Script, RPA)
3. Time savings potential (High/Medium/Low)
4. One-line justification

Use bullet points per task.
""")
```

---

#### ✅ Step 4: GPT Logic (`workflow_agent.py`)

```python
from langchain.chat_models import ChatOpenAI
from workflow_prompt import workflow_prompt

def get_automation_advice(summary: str):
    llm = ChatOpenAI(temperature=0.3)
    prompt = workflow_prompt.format(workflow_summary=summary)
    return llm.predict(prompt)
```

---

#### ✅ Step 5: Streamlit Interface (`app.py`)

```python
import streamlit as st
import pandas as pd
from workflow_agent import get_automation_advice

st.title("🔄 Workflow Automation Agent")
st.caption("Identify repetitive tasks and recommend automation tools")

file = st.file_uploader("Upload Workflow CSV", type=["csv"])

if file:
    df = pd.read_csv(file)
    summary = df.to_string(index=False)

    st.subheader("🧠 GPT Recommendations")
    recommendation = get_automation_advice(summary)
    st.text_area("Automation Suggestions", recommendation, height=300)

    st.dataframe(df)
```

Run the app:

```bash
streamlit run app.py
```

---

### 🧪 Example GPT Output

```
- Invoice Approval: Yes → Use Approval workflows in Power Automate; High time savings; frequent manual action.  
- Onboarding Email: Yes → Use Zapier or n8n email trigger; Medium time savings; can be templated.  
- Ticket Routing: No → Already automated.  
- Campaign Approval: Yes → Route via Slack + Google Forms; Medium time savings; often delays execution.  
- Proposal Generation: No → System-handled.
```

---

