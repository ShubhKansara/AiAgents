
## 📚 **Agent #88: Ethics & Compliance Training Agent**

### 📝 Overview

The Ethics & Compliance Training Agent delivers personalized, AI-generated microlearning modules to educate employees on corporate ethics, data privacy, anti-corruption, harassment prevention, and regulatory obligations. It adapts to roles, learning styles, and risk exposure. In this lab, you’ll build an agent that creates a short, interactive training module based on a selected topic and employee role.

---

### 🧪 Lab Objectives

By the end of this lab, you will:

* Select a training topic and employee role
* Generate a structured microlearning module with GPT
* Include scenario-based questions and explanations
* Allow export of the training content for LMS or email distribution

---

### 🧰 Tech Stack

* **Python**
* **Streamlit**
* **LangChain + GPT-4 or GPT-3.5**
* *(Optional: LMS integration or SCORM export)*

---

### 🧭 Step-by-Step Instructions

#### ✅ Step 1: Environment Setup

```bash
mkdir ethics_training_agent
cd ethics_training_agent
python -m venv venv
source venv/bin/activate
pip install streamlit langchain openai
```

---

#### ✅ Step 2: Prompt Template (`training_prompt.py`)

```python
from langchain.prompts import PromptTemplate

training_prompt = PromptTemplate.from_template("""
You are a corporate ethics training assistant.

Create a short, interactive learning module on the topic: **{topic}**  
Target Audience: {role}

Your output should include:
1. Overview (3-4 sentence summary)
2. Key Guidelines (3–5 bullet points)
3. Scenario-Based Quiz (1 realistic scenario + 3 MCQ options + correct answer + explanation)
4. Reminder of Consequences or Real-world Relevance
""")
```

---

#### ✅ Step 3: GPT Training Generator (`generate_training.py`)

```python
from langchain.chat_models import ChatOpenAI
from training_prompt import training_prompt

def generate_training(topic, role):
    llm = ChatOpenAI(temperature=0.5)
    prompt = training_prompt.format(topic=topic, role=role)
    return llm.predict(prompt)
```

---

#### ✅ Step 4: Streamlit Interface (`app.py`)

```python
import streamlit as st
from generate_training import generate_training

st.title("📚 Ethics & Compliance Training Agent")
st.caption("Generate bite-sized, role-based training for your teams")

topic = st.selectbox("Select Topic", [
    "Anti-Corruption", "Data Privacy", "Harassment Prevention", 
    "Insider Trading", "Conflict of Interest", "Diversity & Inclusion"
])
role = st.selectbox("Select Role", [
    "Software Engineer", "Sales Executive", "HR Manager", "Finance Analyst", "Executive", "General Staff"
])

if st.button("Generate Training Module"):
    module = generate_training(topic, role)
    st.subheader("📘 Microlearning Module")
    st.text_area("Generated Content", module, height=500)
    st.download_button("Download Module", data=module, file_name=f"{topic}_Training_{role}.md")
```

Run:

```bash
streamlit run app.py
```

---

### 🧪 Example Output (Topic: Harassment Prevention – Role: Software Engineer)

**Overview:**
Harassment in the workplace can be verbal, physical, or psychological. Tech teams must maintain respectful interactions, whether in-person or remote.

**Key Guidelines:**

* Use respectful and inclusive language
* Avoid comments on personal appearance
* Speak up or report when you witness inappropriate behavior
* Understand your company’s escalation policy

**Scenario-Based Quiz:**
*A colleague repeatedly sends GIFs in the team Slack channel with suggestive jokes. What should you do?*
A. Laugh it off privately
B. Report the behavior to HR or a team lead ✔️
C. Confront them in the group channel
**Explanation:** B is correct—company policy requires reporting to HR or management, not confronting the person in public.

**Relevance Reminder:**
Even minor incidents can escalate or create a toxic environment. Companies have faced lawsuits over overlooked behavior.

---

