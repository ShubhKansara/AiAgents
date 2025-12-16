
## 😊 **Agent #62: Sentiment Analysis Agent**

### 📝 Overview

This agent analyzes customer feedback, support conversations, or reviews to determine sentiment—positive, negative, or neutral. It summarizes emotions and provides actionable insights for product or service teams. In this lab, you’ll build a GPT-powered sentiment analysis tool with text input and batch CSV upload functionality.

---

### 🧪 Lab Objectives

By the end of this lab, you will:

* Accept single or batch text inputs
* Classify sentiment using GPT (positive, neutral, negative)
* Provide short explanations and suggestions
* Visualize sentiment distribution

---

### 🧰 Tech Stack

* **Python**
* **Streamlit**
* **LangChain + GPT-4 or GPT-3.5**
* **Pandas / Matplotlib**

---

### 🧭 Step-by-Step Instructions

#### ✅ Step 1: Environment Setup

```bash
mkdir sentiment_analysis_agent
cd sentiment_analysis_agent
python -m venv venv
source venv/bin/activate
pip install streamlit openai langchain pandas matplotlib
```

---

#### ✅ Step 2: Prompt Template (`sentiment_prompt.py`)

```python
from langchain.prompts import PromptTemplate

sentiment_prompt = PromptTemplate.from_template("""
You are a customer feedback analyst.

Feedback: "{feedback}"

Tasks:
1. Classify sentiment as: Positive, Neutral, or Negative
2. Provide a 1-sentence explanation
3. Recommend an action if appropriate

Respond clearly and concisely.
""")
```

---

#### ✅ Step 3: GPT Sentiment Engine (`sentiment_agent.py`)

```python
from langchain.chat_models import ChatOpenAI
from sentiment_prompt import sentiment_prompt

def analyze_sentiment(feedback: str):
    llm = ChatOpenAI(temperature=0.2)
    prompt = sentiment_prompt.format(feedback=feedback)
    return llm.predict(prompt)
```

---

#### ✅ Step 4: Streamlit App with Upload & Chart (`app.py`)

```python
import streamlit as st
import pandas as pd
import matplotlib.pyplot as plt
from sentiment_agent import analyze_sentiment

st.title("😊 Sentiment Analysis Agent")
st.caption("Understand customer feedback instantly")

# Single Input
feedback = st.text_area("Enter a feedback message:")

if st.button("Analyze Sentiment"):
    result = analyze_sentiment(feedback)
    st.subheader("🧠 GPT Analysis")
    st.text_area("Result", result, height=200)

# Batch Upload
st.divider()
st.subheader("📁 Upload CSV for Batch Sentiment")

file = st.file_uploader("Upload CSV with a 'Feedback' column", type=["csv"])
if file:
    df = pd.read_csv(file)
    sentiments = []
    for fb in df["Feedback"]:
        try:
            response = analyze_sentiment(fb)
            sentiments.append(response.split("\n")[0].split(":")[-1].strip())  # crude extraction
        except:
            sentiments.append("Error")

    df["Sentiment"] = sentiments
    st.dataframe(df)

    st.download_button("Download Results", df.to_csv(index=False), "sentiment_results.csv")

    # Plot
    st.subheader("📊 Sentiment Distribution")
    fig, ax = plt.subplots()
    df["Sentiment"].value_counts().plot(kind="bar", ax=ax, color=["green", "gray", "red"])
    st.pyplot(fig)
```

Run the app:

```bash
streamlit run app.py
```

---

### 🧪 Example Output

**Feedback:**
“I had to wait on hold for 45 minutes just to talk to someone!”
**GPT Response:**

* **Sentiment:** Negative
* **Explanation:** The customer expresses frustration about long wait times.
* **Recommended Action:** Investigate call center staffing or offer callbacks.

---
