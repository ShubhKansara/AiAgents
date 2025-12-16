## 😊 **Agent #17: Employee Sentiment Analysis Agent**

### 📝 Overview

This AI agent helps HR teams monitor employee morale by analyzing text feedback (from surveys, Slack messages, or emails) for emotion, tone, and satisfaction. In this lab, you’ll simulate anonymous feedback, analyze it using GPT for sentiment and themes, and generate a summary report.

---

### 🧪 Lab Objectives

By the end of this lab, you will:

* Simulate open-ended employee feedback data
* Use GPT to extract sentiment (positive, negative, neutral) and key topics
* Generate an HR-friendly summary with recommended actions
* Display analysis results in a clean Streamlit dashboard

---

### 🧰 Tech Stack

* **Python**
* **Pandas**
* **LangChain + GPT-4 or GPT-3.5**
* **Streamlit**

---

### 🧭 Step-by-Step Instructions

#### ✅ Step 1: Environment Setup

If you haven’t already:

```bash
mkdir sentiment_analysis_agent
cd sentiment_analysis_agent
python -m venv venv
source venv/bin/activate
pip install openai langchain pandas streamlit
```

---

#### ✅ Step 2: Simulate feedback dataset (`feedback_data.py`)

```python
import pandas as pd

def get_feedback():
    return pd.DataFrame({
        "Employee ID": [101, 102, 103, 104],
        "Feedback": [
            "I feel very supported by my team and manager.",
            "The workload has been overwhelming lately and communication is lacking.",
            "Appreciate the new remote work policy, it's a big help.",
            "I’m confused about our goals and wish leadership communicated more clearly."
        ]
    })
```

---

#### ✅ Step 3: GPT Prompt Template (`sentiment_prompt.py`)

```python
from langchain.prompts import PromptTemplate

sentiment_template = PromptTemplate.from_template("""
You are an AI sentiment analyst.

Given this employee feedback:
"{feedback}"

1. Classify sentiment as Positive, Negative, or Neutral.
2. Identify the main theme (e.g., management, workload, culture).
3. Suggest one HR action if needed.

Format:
- Sentiment: ...
- Theme: ...
- Action: ...
""")
```

---

#### ✅ Step 4: Analyze sentiment (`sentiment_agent.py`)

```python
from feedback_data import get_feedback
from sentiment_prompt import sentiment_template
from langchain.chat_models import ChatOpenAI

def analyze_feedback():
    df = get_feedback()
    results = []
    llm = ChatOpenAI(temperature=0.3)

    for _, row in df.iterrows():
        prompt = sentiment_template.format(feedback=row["Feedback"])
        result = llm.predict(prompt)
        results.append(result)
    
    df["Analysis"] = results
    return df
```

---

#### ✅ Step 5: Streamlit Interface (`app.py`)

```python
import streamlit as st
from sentiment_agent import analyze_feedback

st.title("😊 Employee Sentiment Analysis Agent")

if st.button("Analyze Feedback"):
    df = analyze_feedback()

    st.subheader("🗣️ Raw Feedback + AI Analysis")
    for i, row in df.iterrows():
        st.markdown(f"**Employee {row['Employee ID']}**")
        st.text(f"Feedback: {row['Feedback']}")
        st.text(f"AI Analysis:\n{row['Analysis']}")
        st.markdown("---")
```

Run it:

```bash
streamlit run app.py
```

---

### 🧪 Example Output:

```
Employee 102

Feedback: "The workload has been overwhelming lately and communication is lacking."

- Sentiment: Negative  
- Theme: Workload & Communication  
- Action: HR should schedule a check-in and assess workload distribution with the team.
```

---