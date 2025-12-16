## 📈 **Agent #3: Advanced Prediction Agent**

### 📝 **Overview**

This AI agent forecasts future financial trends such as revenue, expenses, or cash flow using historical data. In this lab, you’ll build a time series predictor that takes mock revenue data and uses a fine-tuned GPT prompt (or Prophet model) to generate forecast summaries and visualization.

---

### 🧪 Lab Objectives

By the end of this lab, you will:

* Load and visualize historical revenue data
* Use GPT to interpret trends and forecast future values
* Generate human-readable summaries and charts
* Present everything in a Streamlit interface

---

### 🧰 Tech Stack

* **Python**
* **OpenAI GPT-4 / GPT-3.5**
* **Pandas + Matplotlib**
* **LangChain**
* **Streamlit**

---

### 🧭 Step-by-Step Instructions

#### ✅ Step 1: Set up your environment

If you’re continuing from the previous labs, skip this step.

```bash
mkdir prediction_agent
cd prediction_agent
python -m venv venv
source venv/bin/activate
pip install openai langchain pandas matplotlib streamlit
```

---

#### ✅ Step 2: Create mock revenue data (`data_loader.py`)

```python
import pandas as pd
import numpy as np

def get_revenue_data():
    dates = pd.date_range(start="2023-01-01", periods=18, freq='M')
    revenue = [10000 + np.random.randint(-1000, 1500) + i*300 for i in range(len(dates))]
    df = pd.DataFrame({'Month': dates, 'Revenue': revenue})
    return df
```

---

#### ✅ Step 3: Define the GPT prompt for forecasting (`forecast_prompt.py`)

```python
from langchain.prompts import PromptTemplate

forecast_template = PromptTemplate.from_template("""
You are a financial forecasting analyst. Below is the monthly revenue data for the past 18 months:

{revenue_table}

Tasks:
1. Identify growth patterns or seasonality.
2. Forecast revenue for the next 3 months.
3. Provide actionable suggestions based on the forecast.

Respond in business-friendly language.
""")
```

---

#### ✅ Step 4: Analyze and predict with GPT (`forecast_agent.py`)

```python
import pandas as pd
from data_loader import get_revenue_data
from forecast_prompt import forecast_template
from langchain.chat_models import ChatOpenAI

def run_forecast_analysis():
    df = get_revenue_data()
    revenue_table = df.to_string(index=False)
    
    prompt = forecast_template.format(revenue_table=revenue_table)
    llm = ChatOpenAI(temperature=0.3)
    forecast_summary = llm.predict(prompt)
    
    return df, forecast_summary
```

---

#### ✅ Step 5: Visualize in Streamlit (`app.py`)

```python
import streamlit as st
import matplotlib.pyplot as plt
from forecast_agent import run_forecast_analysis

st.title("📊 Advanced Prediction Agent")

if st.button("Run Forecast"):
    df, summary = run_forecast_analysis()

    # Line Chart
    st.subheader("📈 Revenue Over Time")
    fig, ax = plt.subplots()
    ax.plot(df["Month"], df["Revenue"], marker='o')
    ax.set_xlabel("Month")
    ax.set_ylabel("Revenue")
    ax.set_title("Historical Revenue Trend")
    st.pyplot(fig)

    # Summary
    st.subheader("🧠 AI Forecast Summary")
    st.write(summary)
```

Launch the app:

```bash
streamlit run app.py
```

---

### 🧪 Example Output:

```
Over the past 18 months, revenue has steadily increased by approximately $300/month with occasional seasonal dips in July and December. Based on this trend, projected revenues for the next 3 months are: $19,800, $20,200, and $20,600.

Recommendation: Consider allocating additional marketing budget for Q4, when growth tends to spike. Monitor expense-to-revenue ratio to preserve margins.
```

---