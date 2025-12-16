## 📈 **Agent #10: AI Portfolio Manager**

### 📝 Overview

This AI agent assists in managing investment portfolios by evaluating asset performance, balancing risk, and recommending reallocation strategies. In this lab, you'll simulate an investment portfolio and use GPT to assess allocation health, risk diversification, and next-step actions.

---

### 🧪 Lab Objectives

By the end of this lab, you will:

* Simulate a multi-asset investment portfolio
* Analyze allocation vs. expected returns and risk
* Use GPT to provide a portfolio health summary and rebalancing strategy
* Visualize portfolio distribution and performance

---

### 🧰 Tech Stack

* **Python**
* **Pandas + Matplotlib**
* **LangChain + GPT-4 / GPT-3.5**
* **Streamlit**

---

### 🧭 Step-by-Step Instructions

#### ✅ Step 1: Environment Setup

If continuing from earlier labs, skip this. Otherwise:

```bash
mkdir portfolio_manager_agent
cd portfolio_manager_agent
python -m venv venv
source venv/bin/activate
pip install openai langchain pandas matplotlib streamlit
```

---

#### ✅ Step 2: Simulate portfolio data (`portfolio_data.py`)

```python
import pandas as pd

def load_portfolio():
    data = {
        "Asset": ["US Stocks", "International Stocks", "Bonds", "Real Estate", "Crypto"],
        "Allocation (%)": [40, 25, 20, 10, 5],
        "Annual Return (%)": [8.0, 6.5, 3.5, 5.0, 20.0],
        "Risk Score (1–10)": [6, 7, 2, 5, 9]
    }
    return pd.DataFrame(data)
```

---

#### ✅ Step 3: Create GPT prompt template (`portfolio_prompt.py`)

```python
from langchain.prompts import PromptTemplate

portfolio_template = PromptTemplate.from_template("""
You are an AI investment advisor.

Given the portfolio below:

{portfolio_table}

Please:
1. Evaluate the portfolio’s risk vs. return balance.
2. Suggest any rebalancing if overexposed to high-risk or low-return assets.
3. Recommend a strategy for the next quarter (e.g., shift, diversify, hedge).

Respond in a concise, professional tone.
""")
```

---

#### ✅ Step 4: GPT analysis logic (`portfolio_agent.py`)

```python
from portfolio_data import load_portfolio
from portfolio_prompt import portfolio_template
from langchain.chat_models import ChatOpenAI

def analyze_portfolio():
    df = load_portfolio()
    table = df.to_string(index=False)

    llm = ChatOpenAI(temperature=0.3)
    prompt = portfolio_template.format(portfolio_table=table)
    response = llm.predict(prompt)

    return df, response
```

---

#### ✅ Step 5: Streamlit app (`app.py`)

```python
import streamlit as st
import matplotlib.pyplot as plt
from portfolio_agent import analyze_portfolio

st.title("📈 AI Portfolio Manager")

if st.button("Analyze My Portfolio"):
    df, summary = analyze_portfolio()

    st.subheader("💼 Portfolio Breakdown")
    st.dataframe(df)

    st.subheader("📊 Allocation Pie Chart")
    fig, ax = plt.subplots()
    ax.pie(df["Allocation (%)"], labels=df["Asset"], autopct="%1.1f%%", startangle=90)
    ax.axis("equal")
    st.pyplot(fig)

    st.subheader("🧠 AI Investment Guidance")
    st.write(summary)
```

Run the app:

```bash
streamlit run app.py
```

---

### 🧪 Example Output:

```
The current portfolio is moderately aggressive with a heavy tilt toward equities and crypto. While US stocks provide stable returns, the 20% exposure to high-volatility crypto increases downside risk.

Recommendations:
- Consider reducing crypto to 2% and shifting 3% into bonds to improve diversification.
- Real estate remains underweight given inflation hedging benefits — consider increasing it to 15%.
- Maintain equities but review international market exposure quarterly.

Outlook:
Adopt a “balanced growth” strategy with quarterly rebalancing and tax-loss harvesting.
```

---