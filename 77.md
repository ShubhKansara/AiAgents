
## 📈 **Agent #77: Demand Planning Agent**

### 📝 Overview

This agent forecasts product demand using historical sales, seasonality, and promotional data. It identifies trends, predicts stock requirements, and uses GPT to recommend procurement or marketing actions. In this lab, you’ll build an agent that forecasts future demand from a dataset and generates intelligent business insights.

---

### 🧪 Lab Objectives

By the end of this lab, you will:

* Upload historical demand data
* Forecast next month’s demand using moving averages
* Use GPT to interpret the trends and suggest actions
* Output visual and text-based planning insights

---

### 🧰 Tech Stack

* **Python**
* **Streamlit**
* **Pandas + Matplotlib**
* **LangChain + GPT-4 or GPT-3.5**

---

### 🧭 Step-by-Step Instructions

#### ✅ Step 1: Environment Setup

```bash
mkdir demand_planning_agent
cd demand_planning_agent
python -m venv venv
source venv/bin/activate
pip install streamlit pandas openai langchain matplotlib
```

---

#### ✅ Step 2: Sample CSV (`demand_data.csv`)

```csv
Month,Product,UnitsSold
2024-01,Widget A,120
2024-02,Widget A,140
2024-03,Widget A,100
2024-04,Widget A,160
2024-05,Widget A,180
2024-06,Widget A,150
```

---

#### ✅ Step 3: GPT Prompt Template (`demand_prompt.py`)

```python
from langchain.prompts import PromptTemplate

demand_prompt = PromptTemplate.from_template("""
You are a demand planning expert AI.

Product: {Product}
Historical Sales: {sales_list}
Predicted Demand Next Month: {forecast}

Provide:
1. Demand trend (e.g., rising, stable, falling)
2. Recommendation (e.g., increase order, launch promotion)
3. Risk level (Low, Medium, High)
4. One-sentence rationale
""")
```

---

#### ✅ Step 4: GPT Logic (`demand_agent.py`)

```python
from langchain.chat_models import ChatOpenAI
from demand_prompt import demand_prompt

def get_demand_advice(product, sales_list, forecast):
    llm = ChatOpenAI(temperature=0.2)
    prompt = demand_prompt.format(
        Product=product,
        sales_list=sales_list,
        forecast=forecast
    )
    return llm.predict(prompt)
```

---

#### ✅ Step 5: Streamlit App (`app.py`)

```python
import streamlit as st
import pandas as pd
import matplotlib.pyplot as plt
from demand_agent import get_demand_advice

st.title("📈 Demand Planning Agent")
st.caption("Forecast demand and generate recommendations")

file = st.file_uploader("Upload Demand CSV", type=["csv"])

if file:
    df = pd.read_csv(file, parse_dates=["Month"])
    product_list = df["Product"].unique()

    for product in product_list:
        st.subheader(f"📦 Product: {product}")
        df_p = df[df["Product"] == product].copy()
        df_p.sort_values("Month", inplace=True)
        df_p["MA_3"] = df_p["UnitsSold"].rolling(3).mean()
        
        forecast = round(df_p["MA_3"].iloc[-1], 2)
        sales_list = df_p["UnitsSold"].tolist()
        
        st.line_chart(df_p.set_index("Month")[["UnitsSold", "MA_3"]])
        st.markdown(f"**Forecast for next month:** {forecast} units")

        advice = get_demand_advice(product, sales_list, forecast)
        st.text_area("AI Recommendation", advice, height=200)
```

Run the app:

```bash
streamlit run app.py
```

---

### 🧪 Example GPT Output

```
- Trend: Rising  
- Recommendation: Increase production and pre-order raw materials  
- Risk Level: Medium  
- Rationale: Strong upward trend in past 3 months; buffer stock advised to prevent shortage during peak demand.
```

---
