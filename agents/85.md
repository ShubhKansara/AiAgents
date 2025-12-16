
## 📝 **Agent #85: Policy Drafting Agent**

### 🧭 Overview

The Policy Drafting Agent helps organizations generate clear, compliant, and customized internal policies—such as security, privacy, HR, and IT policies—using structured templates and regulatory references. In this lab, you’ll build an agent that collects user inputs about policy goals and outputs a polished, GPT-written policy document ready for review and implementation.

---

### 🧪 Lab Objectives

By the end of this lab, you will:

* Choose a type of policy to generate (e.g., Remote Work, Data Privacy)
* Enter company-specific variables (e.g., office hours, compliance requirements)
* Use GPT to draft the full policy
* Allow download of the drafted policy as text or Markdown

---

### 🧰 Tech Stack

* **Python**
* **Streamlit**
* **LangChain + GPT-4 or GPT-3.5**
* *(Optional: Add a policy database for referencing real-world examples)*

---

### 🧭 Step-by-Step Instructions

#### ✅ Step 1: Environment Setup

```bash
mkdir policy_drafting_agent
cd policy_drafting_agent
python -m venv venv
source venv/bin/activate
pip install streamlit langchain openai
```

---

#### ✅ Step 2: Policy Prompt Template (`policy_prompt.py`)

```python
from langchain.prompts import PromptTemplate

policy_prompt = PromptTemplate.from_template("""
You are a policy drafting assistant. Based on the details below, write a clear and professional {policy_type} policy.

Company Name: {company_name}  
Industry: {industry}  
Policy Requirements: {requirements}  
Tone: Professional, clear, formal  
Format: Markdown

Include sections like:
1. Purpose
2. Scope
3. Policy Statement
4. Roles and Responsibilities
5. Compliance
6. Review Schedule
""")
```

---

#### ✅ Step 3: GPT Logic (`policy_writer.py`)

```python
from langchain.chat_models import ChatOpenAI
from policy_prompt import policy_prompt

def generate_policy(policy_type, company_name, industry, requirements):
    llm = ChatOpenAI(temperature=0.4)
    prompt = policy_prompt.format(
        policy_type=policy_type,
        company_name=company_name,
        industry=industry,
        requirements=requirements
    )
    return llm.predict(prompt)
```

---

#### ✅ Step 4: Streamlit Interface (`app.py`)

```python
import streamlit as st
from policy_writer import generate_policy

st.title("📝 Policy Drafting Agent")
st.caption("Generate professional internal policies in minutes")

company = st.text_input("Company Name", "Acme Corp")
industry = st.selectbox("Industry", ["Tech", "Healthcare", "Finance", "Education", "Other"])
policy_type = st.selectbox("Policy Type", ["Remote Work", "Data Privacy", "Code of Conduct", "BYOD", "Security"])
requirements = st.text_area("Policy Requirements (optional)", "Should comply with GDPR and include work hours and device usage rules.")

if st.button("Generate Policy"):
    policy = generate_policy(policy_type, company, industry, requirements)
    st.subheader("📄 Drafted Policy")
    st.text_area("Output", policy, height=500)
    st.download_button("Download Policy", data=policy, file_name=f"{policy_type}_Policy.md")
```

Run:

```bash
streamlit run app.py
```

---

### 🧪 Example Output

**Policy Type:** Remote Work
**Requirements:** “Employees must be reachable 9am–5pm EST, and use only company-approved VPN for remote access.”

GPT Output (Excerpt):

```
### 1. Purpose  
This Remote Work Policy establishes guidelines to ensure effective and secure remote operations for Acme Corp employees.

### 3. Policy Statement  
All remote employees must be available during standard business hours (9am–5pm EST). Remote access is only allowed via approved VPN clients to ensure data security...
```

---
