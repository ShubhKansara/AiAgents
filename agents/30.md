## 📊 **Agent #30: Demand Forecasting Agent**

### 📝 Overview

This AI agent predicts future product demand using historical sales data, seasonality patterns, and recent trends. It helps reduce stockouts and overstock by providing actionable forecasts for procurement and planning. In this lab, you’ll simulate past sales data and use GPT to generate demand forecasts with natural language summaries and visuals.

---

### 🧪 Lab Objectives

By the end of this lab, you will:

* Simulate monthly sales data for multiple products
* Use GPT to generate demand forecasts and trends
* Visualize predictions and confidence ranges
* Display a dashboard with actionable AI summaries

---

### 🧰 Tech Stack

* **Python**
* **Pandas + NumPy**
* **LangChain + GPT-4 or GPT-3.5**
* **Matplotlib or Plotly**
* **Streamlit**

---

### 🧭 Step-by-Step Instructions

#### ✅ Step 1: Environment Setup

```bash
mkdir demand_forecasting_agent
cd demand_forecasting_agent
python -m venv venv
source venv/bin/activate
pip install pandas numpy openai langchain matplotlib streamlit
```

---

#### ✅ Step 2: Simulate Sales Data (`sales_data.py`)

```python
import pandas as pd
import numpy as np

def get_sales_data():
    months = pd.date_range(start="2024-01-01", periods=18, freq="M")
    data = {
        "Month": list(months) * 3,
        "Product": ["Ergo Chair"] * 18 + ["HDMI Cable"] * 18 + ["Standing Desk"] * 18,
        "Sales": list(np.random.poisson(30, 18)) + list(np.random.poisson(100, 18)) + list(np.random.poisson(10, 18))
    }
    return pd.DataFrame(data)
```

---

#### ✅ Step 3: GPT Prompt Template (`forecast_prompt.py`)

```python
from langchain.prompts import PromptTemplate

forecast_template = PromptTemplate.from_template("""
You are a demand forecasting AI.

Given the past 18 months of sales for the product "{product}", generate:
1. A 3-month demand forecast (Jul–Sep 2025)
2. Commentary on sales trends and seasonality
3. Actionable advice for procurement

Here is the monthly data:
{sales_series}
""")
```

---

#### ✅ Step 4: Forecast Logic (`forecast_agent.py`)

```python
from sales_data import get_sales_data
from forecast_prompt import forecast_template
from langchain.chat_models import ChatOpenAI

def generate_forecasts():
    df = get_sales_data()
    llm = ChatOpenAI(temperature=0.3)
    results = []

    for product in df["Product"].unique():
        product_data = df[df["Product"] == product]
        sales_series = product_data[["Month", "Sales"]].to_string(index=False)
        prompt = forecast_template.format(product=product, sales_series=sales_series)
        forecast = llm.predict(prompt)
        results.append((product, product_data, forecast))

    return results
```

---

#### ✅ Step 5: Streamlit Dashboard (`app.py`)

```python
import streamlit as st
import matplotlib.pyplot as plt
from forecast_agent import generate_forecasts

st.title("📊 Demand Forecasting Agent")

if st.button("Run Forecasts"):
    results = generate_forecasts()

    for product, df, forecast in results:
        st.subheader(f"📦 {product}")
        st.text_area("AI Forecast Summary", forecast, height=300)

        st.line_chart(df.set_index("Month")["Sales"])
        st.markdown("---")
```

Run the app:

```bash
streamlit run app.py
```

---

### 🧪 Example GPT Output:

**HDMI Cable:**

* Forecast: July 105 units, August 110 units, September 102 units
* Trend: Steady monthly growth with slight summer peak
* Recommendation: Increase buffer stock in Q3 to avoid stockouts

---

