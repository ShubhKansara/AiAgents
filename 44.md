## 📬 **Agent #44: Automated Outreach Agent**

### 📝 Overview

This agent automates the creation and scheduling of outreach emails or messages to different customer segments. It generates personalized outreach based on segment traits, lifecycle stage, and past behavior. In this lab, you’ll simulate an outreach pipeline using GPT and generate custom emails for each segment.

---

### 🧪 Lab Objectives

By the end of this lab, you will:

* Use GPT to generate personalized outreach messages
* Simulate multiple customer segments and outreach goals
* Customize email tone, intent (nurture, re-engage, upsell)
* Provide a Streamlit UI to generate and review messages

---

### 🧰 Tech Stack

* **Python**
* **LangChain + GPT-4 or GPT-3.5**
* **Streamlit**

---

### 🧭 Step-by-Step Instructions

#### ✅ Step 1: Environment Setup

```bash
mkdir automated_outreach_agent
cd automated_outreach_agent
python -m venv venv
source venv/bin/activate
pip install streamlit openai langchain pandas
```

---

#### ✅ Step 2: Simulate Segment Data (`segments.py`)

```python
import pandas as pd

def get_segments():
    return pd.DataFrame([
        {"Segment": "New Leads", "Behavior": "Visited pricing page but didn’t sign up"},
        {"Segment": "High-Value Customers", "Behavior": "Subscribed > 6 months, high usage"},
        {"Segment": "Dormant Users", "Behavior": "Last login > 90 days"},
        {"Segment": "Free Trial Users", "Behavior": "Trial ending in 3 days"}
    ])
```

---

#### ✅ Step 3: GPT Prompt Template (`outreach_prompt.py`)

```python
from langchain.prompts import PromptTemplate

outreach_prompt = PromptTemplate.from_template("""
You are a marketing automation agent.

Create a personalized {type} outreach message for the following segment:
- Segment: {segment}
- Behavior: {behavior}
- Tone: {tone}

Make the message persuasive and action-oriented.
""")
```

---

#### ✅ Step 4: Message Generator Logic (`outreach_agent.py`)

```python
from outreach_prompt import outreach_prompt
from langchain.chat_models import ChatOpenAI

def generate_outreach(segment, behavior, type, tone):
    prompt = outreach_prompt.format(
        segment=segment,
        behavior=behavior,
        type=type,
        tone=tone
    )
    llm = ChatOpenAI(temperature=0.5)
    return llm.predict(prompt)
```

---

#### ✅ Step 5: Streamlit Interface (`app.py`)

```python
import streamlit as st
import pandas as pd
from segments import get_segments
from outreach_agent import generate_outreach

st.title("📬 Automated Outreach Agent")

segments_df = get_segments()
selected = st.selectbox("Choose Segment", segments_df["Segment"])
behavior = segments_df.loc[segments_df["Segment"] == selected, "Behavior"].values[0]

outreach_type = st.selectbox("Outreach Type", ["Email", "LinkedIn Message", "SMS"])
tone = st.selectbox("Tone", ["Friendly", "Professional", "Urgent"])

if st.button("Generate Outreach"):
    message = generate_outreach(selected, behavior, outreach_type, tone)
    st.subheader("📝 Generated Message")
    st.text_area("Message", message, height=300)
    st.download_button("Download Message", message, file_name="outreach_message.txt")
```

Run the app:

```bash
streamlit run app.py
```

---

### 🧪 Example GPT Output (for Dormant Users):

**Subject:** We Miss You! Here’s 25% Off to Reignite Your Journey 💡

**Body:**
Hi there,
It’s been a while since we last saw you. We’d love to have you back with exclusive access to our newest features. Here’s 25% off your next subscription if you reactivate this week.
Let’s pick up where we left off 🚀
\[Reactivate Now]

---
