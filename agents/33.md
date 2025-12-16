## 📈 **Agent #33: Sales Forecasting Agent**

### 📝 Overview

This AI agent generates forward-looking sales forecasts using historical data, deal pipelines, and trends across products, regions, or reps. It helps teams plan revenue targets, capacity, and strategy. In this lab, you’ll simulate CRM pipeline data and use GPT to create a natural language forecast summary.

---

### 🧪 Lab Objectives

By the end of this lab, you will:

* Simulate CRM-style pipeline and sales history data
* Use GPT to summarize trends and predict outcomes
* Visualize historical vs projected sales
* Display recommendations in Streamlit

---

### 🧰 Tech Stack

* **Python**
* **Pandas**
* **LangChain + GPT-4 or GPT-3.5**
* **Streamlit**
* *(Optional)*: Prophet or statsmodels for numeric forecasting

---

### 🧭 Step-by-Step Instructions

#### ✅ Step 1: Environment Setup

```bash
mkdir sales_forecasting_agent
cd sales_forecasting_agent
python -m venv venv
source venv/bin/activate
pip install pandas openai langchain streamlit
```

---

#### ✅ Step 2: Simulate Sales Pipeline Data (`sales_data.py`)

```python
import pandas as pd

def get_sales_pipeline():
    return pd.DataFrame({
        "Month": ["Apr", "May", "Jun", "Jul", "Aug"],
        "Closed Deals": [220000, 250000, 270000, 0, 0],
        "Pipeline Value": [300000, 280000, 290000, 310000, 330000],
        "Conversion Rate (%)": [75, 78, 81, None, None]
    })
```

---

#### ✅ Step 3: GPT Prompt Template (`forecast_prompt.py`)

```python
from langchain.prompts import PromptTemplate

forecast_template = PromptTemplate.from_template("""
You are an AI sales strategist.

Given the monthly sales performance:
{data}

Please:
1. Forecast expected sales for July and August
2. Identify any trend or seasonality
3. Provide 2 strategic recommendations to close pipeline gaps

Output in a clear, 3-bullet format.
""")
```

---

#### ✅ Step 4: Sales Forecast Logic (`forecast_agent.py`)

```python
from sales_data import get_sales_pipeline
from forecast_prompt import forecast_template
from langchain.chat_models import ChatOpenAI

def generate_forecast():
    df = get_sales_pipeline()
    data_str = df.to_string(index=False)
    llm = ChatOpenAI(temperature=0.3)

    prompt = forecast_template.format(data=data_str)
    result = llm.predict(prompt)

    return df, result
```

---

#### ✅ Step 5: Streamlit Dashboard (`app.py`)

```python
import streamlit as st
import matplotlib.pyplot as plt
from forecast_agent import generate_forecast

st.title("📈 Sales Forecasting Agent")

if st.button("Generate Forecast"):
    df, forecast = generate_forecast()

    st.subheader("📊 Historical Sales Data")
    st.dataframe(df)

    st.subheader("🧠 AI Forecast Summary")
    st.text_area("Forecast", forecast, height=250)

    st.subheader("📉 Chart View")
    fig, ax = plt.subplots()
    ax.plot(df["Month"], df["Closed Deals"], marker='o', label='Closed Deals')
    ax.plot(df["Month"], df["Pipeline Value"], marker='x', label='Pipeline Value')
    ax.legend()
    st.pyplot(fig)
```

Run the app:

```bash
streamlit run app.py
```

---

### 🧪 Example GPT Output:

* **Forecast**: July: \$255,000; August: \$265,000 based on rising pipeline
* **Trend**: Steady growth and improving conversion rates
* **Strategy**: Focus on mid-pipeline deals and introduce Q3 incentives for enterprise accounts

---
