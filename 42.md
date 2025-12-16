## 📈 **Agent #42: Campaign Optimization Agent**

### 📝 Overview

This agent analyzes past marketing campaigns and recommends optimizations based on performance data—suggesting budget shifts, audience tweaks, A/B test ideas, and content changes. In this lab, you'll simulate campaign metrics and use GPT to generate insights and improvement strategies.

---

### 🧪 Lab Objectives

By the end of this lab, you will:

* Simulate campaign performance data (CTR, CPC, ROAS, etc.)
* Visualize key metrics and trends
* Use GPT to generate optimization recommendations
* Highlight underperforming areas and suggest A/B tests

---

### 🧰 Tech Stack

* **Python**
* **Pandas, Plotly**
* **LangChain + GPT-4 or GPT-3.5**
* **Streamlit**

---

### 🧭 Step-by-Step Instructions

#### ✅ Step 1: Environment Setup

```bash
mkdir campaign_optimization_agent
cd campaign_optimization_agent
python -m venv venv
source venv/bin/activate
pip install pandas plotly openai langchain streamlit
```

---

#### ✅ Step 2: Simulate Campaign Data (`campaign_data.py`)

```python
import pandas as pd

def get_campaign_data():
    return pd.DataFrame([
        {"Campaign": "Summer Promo", "Channel": "Google Ads", "CTR": 0.045, "CPC": 1.2, "ROAS": 2.8, "Spend": 1500},
        {"Campaign": "Webinar Push", "Channel": "LinkedIn", "CTR": 0.022, "CPC": 3.0, "ROAS": 1.5, "Spend": 2000},
        {"Campaign": "Holiday Sale", "Channel": "Facebook", "CTR": 0.065, "CPC": 0.8, "ROAS": 4.0, "Spend": 1800},
        {"Campaign": "Launch Teaser", "Channel": "Email", "CTR": 0.12, "CPC": 0.0, "ROAS": 5.1, "Spend": 500},
        {"Campaign": "Nurture Sequence", "Channel": "Email", "CTR": 0.06, "CPC": 0.0, "ROAS": 2.2, "Spend": 700}
    ])
```

---

#### ✅ Step 3: GPT Prompt Template (`campaign_prompt.py`)

```python
from langchain.prompts import PromptTemplate

campaign_prompt = PromptTemplate.from_template("""
You are a digital marketing analyst.

Analyze the following campaign performance data:
{campaign_table}

Identify:
1. Campaigns with low performance (based on CTR, CPC, ROAS)
2. Suggested changes (budget reallocation, creative type, A/B testing)
3. Optimized strategy for next month

Format the response as a bulleted report.
""")
```

---

#### ✅ Step 4: GPT Insight Engine (`campaign_agent.py`)

```python
from campaign_data import get_campaign_data
from campaign_prompt import campaign_prompt
from langchain.chat_models import ChatOpenAI

def generate_campaign_insights():
    df = get_campaign_data()
    formatted_table = df.to_string(index=False)

    llm = ChatOpenAI(temperature=0.3)
    prompt = campaign_prompt.format(campaign_table=formatted_table)
    insights = llm.predict(prompt)

    return df, insights
```

---

#### ✅ Step 5: Streamlit Dashboard (`app.py`)

```python
import streamlit as st
import plotly.express as px
from campaign_agent import generate_campaign_insights

st.title("📈 Campaign Optimization Agent")

if st.button("Analyze Campaigns"):
    df, insights = generate_campaign_insights()

    st.subheader("📊 Performance Metrics")
    st.dataframe(df)

    fig = px.bar(df, x="Campaign", y="ROAS", color="Channel", title="ROAS by Campaign")
    st.plotly_chart(fig)

    st.subheader("🧠 GPT Optimization Suggestions")
    st.text_area("AI Recommendations", insights, height=350)
```

Run the app:

```bash
streamlit run app.py
```

---

### 🧪 Example GPT Output:

**Underperformers:**

* *Webinar Push (LinkedIn)*: High CPC and low CTR
* *Summer Promo (Google Ads)*: Below average ROAS

**Suggestions:**

* Shift 20% of spend from LinkedIn to Facebook
* A/B test ad copy for Summer Promo
* Double down on Email campaigns (high ROI, low spend)

**Next Month Strategy:**
Focus on Email + Facebook. Add urgency banners to increase CTR on Google Ads.

---
