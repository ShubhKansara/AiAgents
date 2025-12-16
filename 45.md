## 🎯 **Agent #45: AI-driven Ad Bidding Agent**

### 📝 Overview

This agent dynamically adjusts bids for digital advertising campaigns using real-time signals like CTR, conversion rates, and budget constraints. In this lab, you’ll simulate ad performance data and use a simple AI model to optimize bid suggestions per keyword or segment.

---

### 🧪 Lab Objectives

By the end of this lab, you will:

* Simulate a dataset with ad groups, CTR, conversions, and current bids
* Use a basic model to compute optimal bid adjustments
* Use GPT to explain bidding strategies in plain language
* Visualize adjustments using Streamlit

---

### 🧰 Tech Stack

* **Python**
* **Pandas, NumPy**
* **LangChain + GPT-4 or GPT-3.5**
* **Streamlit**

---

### 🧭 Step-by-Step Instructions

#### ✅ Step 1: Environment Setup

```bash
mkdir ad_bidding_agent
cd ad_bidding_agent
python -m venv venv
source venv/bin/activate
pip install pandas numpy openai langchain streamlit
```

---

#### ✅ Step 2: Simulate Ad Performance Data (`ad_data.py`)

```python
import pandas as pd
import numpy as np

def get_ad_data():
    np.random.seed(42)
    return pd.DataFrame([
        {"Keyword": "ai software", "CTR": 0.04, "ConversionRate": 0.05, "Bid": 1.20},
        {"Keyword": "crm tool", "CTR": 0.06, "ConversionRate": 0.09, "Bid": 1.80},
        {"Keyword": "marketing automation", "CTR": 0.03, "ConversionRate": 0.04, "Bid": 1.00},
        {"Keyword": "customer data platform", "CTR": 0.07, "ConversionRate": 0.12, "Bid": 2.00},
        {"Keyword": "email outreach", "CTR": 0.05, "ConversionRate": 0.06, "Bid": 1.50}
    ])
```

---

#### ✅ Step 3: Optimization Logic (`bid_optimizer.py`)

```python
from ad_data import get_ad_data

def adjust_bids():
    df = get_ad_data()
    df["Efficiency"] = df["ConversionRate"] / df["Bid"]
    
    avg_eff = df["Efficiency"].mean()
    df["BidChange"] = df["Efficiency"].apply(lambda x: 0.1 if x > avg_eff else -0.1)
    df["OptimizedBid"] = (df["Bid"] + df["BidChange"]).round(2)

    return df
```

---

#### ✅ Step 4: GPT Prompt Template (`bidding_prompt.py`)

```python
from langchain.prompts import PromptTemplate

bidding_prompt = PromptTemplate.from_template("""
You are a digital ads strategist.

Based on the following keyword bidding data:
{bidding_summary}

Explain:
1. Which keywords should increase bids
2. Which should decrease
3. The reasoning behind each decision

Format the output as a recommendation memo.
""")
```

---

#### ✅ Step 5: GPT Explanation Engine (`bidding_agent.py`)

```python
from bid_optimizer import adjust_bids
from bidding_prompt import bidding_prompt
from langchain.chat_models import ChatOpenAI

def generate_bid_recommendations():
    df = adjust_bids()
    summary = df[["Keyword", "CTR", "ConversionRate", "Bid", "OptimizedBid"]].to_string(index=False)

    llm = ChatOpenAI(temperature=0.3)
    prompt = bidding_prompt.format(bidding_summary=summary)
    memo = llm.predict(prompt)

    return df, memo
```

---

#### ✅ Step 6: Streamlit Dashboard (`app.py`)

```python
import streamlit as st
from bidding_agent import generate_bid_recommendations

st.title("🎯 AI-driven Ad Bidding Agent")

if st.button("Optimize Ad Bids"):
    df, memo = generate_bid_recommendations()

    st.subheader("🔍 Ad Bidding Overview")
    st.dataframe(df)

    st.subheader("🧠 GPT Bid Recommendations")
    st.text_area("Strategy Memo", memo, height=400)
```

Run the app:

```bash
streamlit run app.py
```

---

### 🧪 Example GPT Output:

**Increase Bids:**

* “customer data platform”: High CTR and Conversion Rate. Scaling opportunity.
* “crm tool”: Efficient ROI, can support a bid bump.

**Decrease Bids:**

* “marketing automation”: Low conversions, not cost-effective. Reduce bid by \$0.10.

**Rationale:**
Focus budget on high-performing keywords while trimming inefficient ones. Use conversion per dollar as guide.

---
