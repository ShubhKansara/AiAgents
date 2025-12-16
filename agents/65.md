
## 💎 **Agent #65: Customer Loyalty Program Agent**

### 📝 Overview

This agent designs, recommends, or personalizes customer loyalty programs using behavioral data, past purchases, and sentiment. It uses GPT to suggest rewards, tiering, and retention strategies tailored to each customer segment. In this lab, you'll build a loyalty program assistant that analyzes customer profiles and outputs loyalty strategy suggestions.

---

### 🧪 Lab Objectives

By the end of this lab, you will:

* Upload or input customer data (CSV or manual)
* Generate loyalty strategies using GPT
* Output reward suggestions and engagement tactics
* Download a personalized loyalty plan per customer

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
mkdir loyalty_program_agent
cd loyalty_program_agent
python -m venv venv
source venv/bin/activate
pip install streamlit openai langchain pandas
```

---

#### ✅ Step 2: Sample Customer Dataset (`sample_data.csv`)

```csv
CustomerID,Name,TotalSpend,LoyaltyTier,LastPurchaseDays,FeedbackSentiment
C001,Alice,2400,Gold,10,Positive
C002,Bob,600,Silver,45,Neutral
C003,Charlie,300,Bronze,80,Negative
```

---

#### ✅ Step 3: GPT Prompt Template (`loyalty_prompt.py`)

```python
from langchain.prompts import PromptTemplate

loyalty_prompt = PromptTemplate.from_template("""
You are an AI loyalty program designer.

Here is a customer profile:
Name: {Name}
Total Spend: {TotalSpend}
Current Tier: {LoyaltyTier}
Last Purchase: {LastPurchaseDays} days ago
Sentiment: {FeedbackSentiment}

Recommend:
1. New loyalty tier (if applicable)
2. Personalized reward or promotion
3. Retention strategy or message

Keep it concise and brand-friendly.
""")
```

---

#### ✅ Step 4: GPT Analysis Logic (`loyalty_agent.py`)

```python
from langchain.chat_models import ChatOpenAI
from loyalty_prompt import loyalty_prompt

def generate_loyalty_strategy(customer_dict):
    llm = ChatOpenAI(temperature=0.3)
    prompt = loyalty_prompt.format(**customer_dict)
    return llm.predict(prompt)
```

---

#### ✅ Step 5: Streamlit App (`app.py`)

```python
import streamlit as st
import pandas as pd
from loyalty_agent import generate_loyalty_strategy

st.title("💎 Customer Loyalty Program Agent")
st.caption("Create personalized loyalty plans")

file = st.file_uploader("Upload CSV (with headers: Name, TotalSpend, LoyaltyTier, LastPurchaseDays, FeedbackSentiment)", type=["csv"])

if file:
    df = pd.read_csv(file)
    results = []

    for _, row in df.iterrows():
        strategy = generate_loyalty_strategy(row.to_dict())
        results.append(strategy)

    df["GPT_Loyalty_Strategy"] = results
    st.dataframe(df)
    st.download_button("Download Plan", df.to_csv(index=False), file_name="loyalty_program_output.csv")
```

Run the app:

```bash
streamlit run app.py
```

---

### 🧪 Example Output (For Alice)

```text
- Loyalty Tier: Remain Gold
- Reward: 15% off coupon for next order + early access to new products
- Message: "Thanks for being a top customer! Enjoy exclusive early access this month."
```

---

