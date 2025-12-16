## 🧠 **Agent #46: Brand Sentiment Monitoring Agent**

### 📝 Overview

This agent continuously tracks how people feel about your brand across channels like social media, reviews, and forums. It performs sentiment analysis, detects spikes in negative feedback, and summarizes brand reputation trends using AI. In this lab, you'll simulate brand mentions and build a real-time sentiment monitor.

---

### 🧪 Lab Objectives

By the end of this lab, you will:

* Simulate or input brand mentions with text content
* Perform sentiment analysis using a pre-trained model or GPT
* Visualize sentiment trends over time
* Summarize brand sentiment insights using GPT

---

### 🧰 Tech Stack

* **Python**
* **Pandas, Matplotlib or Plotly**
* **Transformers (HuggingFace)** or **OpenAI GPT**
* **Streamlit**

---

### 🧭 Step-by-Step Instructions

#### ✅ Step 1: Environment Setup

```bash
mkdir sentiment_monitoring_agent
cd sentiment_monitoring_agent
python -m venv venv
source venv/bin/activate
pip install pandas matplotlib openai langchain transformers streamlit
```

---

#### ✅ Step 2: Simulate Brand Mentions (`mentions.py`)

```python
import pandas as pd
from datetime import datetime, timedelta
import random

def generate_mentions():
    base_time = datetime.now()
    data = []
    sentiments = ["positive", "neutral", "negative"]
    templates = {
        "positive": ["I love this brand!", "Excellent customer service.", "Top quality!"],
        "neutral": ["Just tried it today.", "Okay product, nothing special."],
        "negative": ["Terrible support.", "Very disappointed with the quality.", "Wouldn’t recommend."]
    }

    for i in range(50):
        sentiment = random.choice(sentiments)
        text = random.choice(templates[sentiment])
        timestamp = base_time - timedelta(hours=random.randint(1, 72))
        data.append({"text": text, "timestamp": timestamp, "label": sentiment})

    return pd.DataFrame(data)
```

---

#### ✅ Step 3: Sentiment Analysis (Simple Rule-Based) (`sentiment_model.py`)

You can either:

* Use the HuggingFace pipeline (`transformers`) for pre-trained sentiment analysis, or
* Use GPT for interpretation.

**Option A – Using HuggingFace:**

```python
from transformers import pipeline

sentiment_pipeline = pipeline("sentiment-analysis")

def analyze_sentiment(text):
    result = sentiment_pipeline(text)[0]
    return result['label'].lower()
```

**Option B – Using GPT (optional):**

```python
from langchain.chat_models import ChatOpenAI

def analyze_sentiment_gpt(text):
    llm = ChatOpenAI(temperature=0.3)
    response = llm.predict(f"What is the sentiment of this brand mention: '{text}'? Respond with 'positive', 'neutral', or 'negative'.")
    return response.strip().lower()
```

---

#### ✅ Step 4: GPT Insight Summary (`summary_prompt.py`)

```python
from langchain.prompts import PromptTemplate

summary_prompt = PromptTemplate.from_template("""
You are a brand analyst AI.

Given this sentiment breakdown:
{sentiment_data}

1. What is the overall brand sentiment?
2. Are there warning signs (e.g., recent spikes in negativity)?
3. Recommend 2 actions for brand reputation improvement.

Respond in 3 short paragraphs.
""")
```

---

#### ✅ Step 5: Streamlit Dashboard (`app.py`)

```python
import streamlit as st
import matplotlib.pyplot as plt
from mentions import generate_mentions
from sentiment_model import analyze_sentiment
from summary_prompt import summary_prompt
from langchain.chat_models import ChatOpenAI

st.title("🧠 Brand Sentiment Monitoring Agent")

if st.button("Run Sentiment Analysis"):
    df = generate_mentions()
    df["Sentiment"] = df["text"].apply(analyze_sentiment)
    sentiment_counts = df["Sentiment"].value_counts()

    # Pie chart
    st.subheader("🔎 Sentiment Breakdown")
    fig, ax = plt.subplots()
    ax.pie(sentiment_counts, labels=sentiment_counts.index, autopct="%1.1f%%")
    st.pyplot(fig)

    # GPT Summary
    summary_text = df["Sentiment"].value_counts().to_string()
    llm = ChatOpenAI(temperature=0.4)
    gpt_summary = llm.predict(summary_prompt.format(sentiment_data=summary_text))

    st.subheader("🧠 GPT Summary & Recommendations")
    st.text_area("Insights", gpt_summary, height=300)
```

Run the app:

```bash
streamlit run app.py
```

---

### 🧪 Example GPT Output:

**Overall Sentiment:**
The majority of feedback (60%) is positive, showing strong brand appreciation. Users frequently praise quality and support.

**Warning Signs:**
A noticeable 22% of mentions are negative, clustered in the last 24 hours. This may indicate a service disruption or product issue.

**Recommended Actions:**

1. Quickly investigate the negative spike and issue a public response.
2. Encourage satisfied customers to leave public reviews to outweigh negativity.

---
