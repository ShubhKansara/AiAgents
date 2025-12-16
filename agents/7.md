## 📉 **Agent #7: Financial Risk Assessment Agent**

### 📝 Overview

This AI agent evaluates the financial risk of a decision, transaction, or entity by analyzing internal data (e.g., credit exposure, volatility) and external factors (e.g., market trends, ratings). In this lab, you’ll simulate company financial data and use GPT to analyze and classify risk levels with a rationale.

---

### 🧪 Lab Objectives

By the end of this lab, you will:

* Create a simulated financial profile (company or investment)
* Use GPT to assess risk levels (low/medium/high)
* Generate rationale and recommendations
* Display results interactively in Streamlit

---

### 🧰 Tech Stack

* **Python**
* **Pandas**
* **LangChain + GPT-4 or GPT-3.5**
* **Streamlit**

---

### 🧭 Step-by-Step Instructions

#### ✅ Step 1: Set up your environment

If continuing from earlier labs, skip this. Otherwise:

```bash
mkdir financial_risk_agent
cd financial_risk_agent
python -m venv venv
source venv/bin/activate
pip install openai langchain pandas streamlit
```

---

#### ✅ Step 2: Simulate financial risk profile data (`risk_data.py`)

```python
import pandas as pd

def get_financial_profile():
    data = {
        "Metric": [
            "Debt-to-Equity Ratio",
            "Liquidity Ratio",
            "Revenue Growth (YoY)",
            "Net Margin",
            "Credit Score",
            "Market Volatility (1–10)"
        ],
        "Value": [2.8, 0.95, -5.0, 3.2, 620, 8]
    }
    return pd.DataFrame(data)
```

---

#### ✅ Step 3: Create GPT prompt template (`risk_prompt.py`)

```python
from langchain.prompts import PromptTemplate

risk_template = PromptTemplate.from_template("""
You are a financial risk analyst AI.

Given the following financial metrics:

{metrics_table}

Please:
1. Assess the financial risk level (low, medium, high).
2. Justify your assessment.
3. Recommend actions to reduce risk if needed.
Keep it concise but insightful.
""")
```

---

#### ✅ Step 4: Analyze with GPT (`risk_agent.py`)

```python
from risk_data import get_financial_profile
from risk_prompt import risk_template
from langchain.chat_models import ChatOpenAI

def analyze_risk():
    df = get_financial_profile()
    table = df.to_string(index=False)

    llm = ChatOpenAI(temperature=0.3)
    prompt = risk_template.format(metrics_table=table)
    result = llm.predict(prompt)
    return df, result
```

---

#### ✅ Step 5: Build the Streamlit interface (`app.py`)

```python
import streamlit as st
from risk_agent import analyze_risk

st.title("📉 Financial Risk Assessment Agent")

if st.button("Run Risk Analysis"):
    df, result = analyze_risk()

    st.subheader("📊 Financial Profile")
    st.dataframe(df)

    st.subheader("🔎 AI Risk Assessment")
    st.write(result)
```

Run the app:

```bash
streamlit run app.py
```

---

### 🧪 Example Output:

```
Risk Level: HIGH

Justification:
- The debt-to-equity ratio (2.8) indicates heavy reliance on borrowing.
- Liquidity ratio below 1.0 suggests cash flow strain.
- Negative revenue growth reflects operational concerns.
- A credit score of 620 is below investment grade.
- High market volatility further compounds risk.

Recommendations:
- Improve liquidity via cost-cutting or refinancing.
- Stabilize revenue streams.
- Engage in credit repair strategies.
```

---