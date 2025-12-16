## 🗣️ **Agent #68: AI-powered Feedback Management Agent**

### 📝 Overview

This agent collects, categorizes, and summarizes customer or employee feedback from various channels (surveys, reviews, emails, chats). It uses GPT to analyze sentiment, tag themes (e.g., “delivery delay”, “product quality”), and recommend actions. In this lab, you’ll build a feedback analyzer that accepts CSV feedback data and returns structured insights.

---

### 🧪 Lab Objectives

By the end of this lab, you will:

* Upload a feedback dataset (CSV)
* Use GPT to tag themes and sentiment
* Summarize feedback across customers
* Generate a report with insights and actionables

---

### 🧰 Tech Stack

* **Python**
* **Streamlit**
* **LangChain + GPT-4 or GPT-3.5**
* **Pandas**

---

### 🧭 Step-by-Step Instructions

#### ✅ Step 1: Environment Setup

```bash
mkdir feedback_management_agent
cd feedback_management_agent
python -m venv venv
source venv/bin/activate
pip install streamlit openai langchain pandas
```

---

#### ✅ Step 2: Sample CSV (`feedback.csv`)

```csv
CustomerID,Feedback
C001,"The delivery was 3 days late and the support didn’t help."
C002,"Absolutely love the product quality and the speed of shipping!"
C003,"I found the onboarding process confusing and slow."
```

---

#### ✅ Step 3: GPT Prompt Template (`feedback_prompt.py`)

```python
from langchain.prompts import PromptTemplate

feedback_prompt = PromptTemplate.from_template("""
You are an AI feedback analyst.

Feedback: "{feedback}"

Respond with:
1. Sentiment (Positive, Neutral, Negative)
2. Main Theme (e.g., shipping, product, service, UX)
3. Actionable Suggestion (1 sentence)

Output in structured bullet points.
""")
```

---

#### ✅ Step 4: Feedback Analyzer (`feedback_agent.py`)

```python
from langchain.chat_models import ChatOpenAI
from feedback_prompt import feedback_prompt

def analyze_feedback(feedback: str):
    llm = ChatOpenAI(temperature=0.3)
    prompt = feedback_prompt.format(feedback=feedback)
    return llm.predict(prompt)
```

---

#### ✅ Step 5: Streamlit App (`app.py`)

```python
import streamlit as st
import pandas as pd
from feedback_agent import analyze_feedback

st.title("🗣️ AI-powered Feedback Management Agent")
st.caption("Analyze, tag, and summarize feedback at scale")

uploaded_file = st.file_uploader("Upload CSV with 'Feedback' column", type=["csv"])

if uploaded_file:
    df = pd.read_csv(uploaded_file)
    responses = []
    for fb in df["Feedback"]:
        try:
            result = analyze_feedback(fb)
            responses.append(result)
        except:
            responses.append("Error")

    df["GPT_Analysis"] = responses
    st.dataframe(df)
    st.download_button("Download Analysis", df.to_csv(index=False), "feedback_analysis.csv")
```

Run the app:

```bash
streamlit run app.py
```

---

### 🧪 Example Output (from CSV)

**Feedback:**
"The delivery was 3 days late and the support didn’t help."
**GPT Output:**

* Sentiment: Negative
* Theme: Shipping & Customer Support
* Suggestion: Improve response times and offer proactive delivery updates.

---
