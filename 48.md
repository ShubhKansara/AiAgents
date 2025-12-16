## 📧 **Agent #48: Personalized Email Marketing Agent**

### 📝 Overview

This agent generates customized marketing emails tailored to customer segments, behavior, and product preferences. In this lab, you'll simulate user data, let the user pick a segment and goal (upsell, onboarding, reactivation), and use GPT to create highly personalized emails with adaptive tone and content.

---

### 🧪 Lab Objectives

By the end of this lab, you will:

* Simulate or select a user persona or segment
* Choose a campaign goal (e.g., upsell, reactivation)
* Generate a personalized marketing email using GPT
* Customize subject line, tone, CTA, and dynamic content

---

### 🧰 Tech Stack

* **Python**
* **Streamlit**
* **LangChain + GPT-4 or GPT-3.5**

---

### 🧭 Step-by-Step Instructions

#### ✅ Step 1: Environment Setup

```bash
mkdir personalized_email_agent
cd personalized_email_agent
python -m venv venv
source venv/bin/activate
pip install streamlit openai langchain pandas
```

---

#### ✅ Step 2: Create Customer Segments (`segments.py`)

```python
import pandas as pd

def get_segments():
    return pd.DataFrame([
        {
            "Segment": "New Users",
            "Behavior": "Signed up recently, has not used the product much",
            "Preferences": "Interested in tutorials and getting started tips"
        },
        {
            "Segment": "Power Users",
            "Behavior": "Use the product daily, explore advanced features",
            "Preferences": "Want productivity hacks and power-user features"
        },
        {
            "Segment": "Lapsed Users",
            "Behavior": "Hasn’t logged in for 60+ days",
            "Preferences": "Need reminders, offers to return, success stories"
        },
        {
            "Segment": "Premium Subscribers",
            "Behavior": "Paying customers using premium features",
            "Preferences": "Upsell cross-platform tools, loyalty perks"
        }
    ])
```

---

#### ✅ Step 3: Email Prompt Template (`email_prompt.py`)

```python
from langchain.prompts import PromptTemplate

email_prompt = PromptTemplate.from_template("""
You are an expert email copywriter.

Write a personalized marketing email for the following customer:

- Segment: {segment}
- Behavior: {behavior}
- Preferences: {preferences}
- Campaign Goal: {goal}
- Tone: {tone}

Include:
1. A compelling subject line
2. A warm greeting
3. Main message tailored to the user type
4. A call to action (CTA)

Keep it friendly, natural, and conversion-oriented.
""")
```

---

#### ✅ Step 4: GPT Message Generator (`email_agent.py`)

```python
from segments import get_segments
from email_prompt import email_prompt
from langchain.chat_models import ChatOpenAI

def generate_email(segment, behavior, preferences, goal, tone):
    prompt = email_prompt.format(
        segment=segment,
        behavior=behavior,
        preferences=preferences,
        goal=goal,
        tone=tone
    )
    llm = ChatOpenAI(temperature=0.5)
    return llm.predict(prompt)
```

---

#### ✅ Step 5: Streamlit UI (`app.py`)

```python
import streamlit as st
from segments import get_segments
from email_agent import generate_email

st.title("📧 Personalized Email Marketing Agent")

segments_df = get_segments()
segment_names = segments_df["Segment"].tolist()
selected_segment = st.selectbox("Choose Segment", segment_names)
segment_info = segments_df[segments_df["Segment"] == selected_segment].iloc[0]

goal = st.selectbox("Campaign Goal", ["Onboarding", "Reactivation", "Upsell", "Announcement"])
tone = st.selectbox("Tone", ["Friendly", "Professional", "Urgent", "Playful"])

if st.button("Generate Email"):
    email = generate_email(
        segment_info["Segment"],
        segment_info["Behavior"],
        segment_info["Preferences"],
        goal,
        tone
    )
    st.subheader("📝 Generated Email")
    st.text_area("Email Content", email, height=400)
    st.download_button("Download Email", email, file_name="personalized_email.txt")
```

Run the app:

```bash
streamlit run app.py
```

---

### 🧪 Example Output (for “Lapsed Users”, goal = “Reactivation”):

**Subject:** We Miss You—Here’s 25% Off to Come Back!

Hi there,
It’s been a while since your last visit, and we’re saving your seat! Our latest features and success stories are waiting for you—and for this week only, here’s 25% off to welcome you back.
Ready to dive in again?
👉 \[Reactivate Your Account]

Warmly,
The \[Your Company] Team

---
