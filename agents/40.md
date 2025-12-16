## 🗺️ **Agent #40: Sales Territory Intelligence Agent**

### 📝 Overview

This agent analyzes performance by sales territory, surfaces regional trends, and recommends actions to improve rep allocation, targeting, and quotas. In this lab, you’ll simulate territory-based sales data, visualize patterns, and use GPT to generate actionable insights per region.

---

### 🧪 Lab Objectives

By the end of this lab, you will:

* Create a dataset of sales by territory and rep
* Analyze key performance indicators (KPIs)
* Use GPT to suggest improvements and realignment strategies
* Visualize territory heatmaps in Streamlit

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
mkdir territory_intelligence_agent
cd territory_intelligence_agent
python -m venv venv
source venv/bin/activate
pip install pandas openai langchain streamlit plotly
```

---

#### ✅ Step 2: Simulate Territory Sales Data (`territory_data.py`)

```python
import pandas as pd

def get_sales_territory_data():
    return pd.DataFrame([
        {"Territory": "Northeast", "Rep": "Alice", "Quota": 120000, "Sales": 95000},
        {"Territory": "Southeast", "Rep": "Bob", "Quota": 100000, "Sales": 112000},
        {"Territory": "Midwest", "Rep": "Carlos", "Quota": 90000, "Sales": 87000},
        {"Territory": "West", "Rep": "Dana", "Quota": 110000, "Sales": 134000},
        {"Territory": "Southwest", "Rep": "Eva", "Quota": 95000, "Sales": 67000}
    ])
```

---

#### ✅ Step 3: GPT Prompt Template (`territory_prompt.py`)

```python
from langchain.prompts import PromptTemplate

territory_prompt = PromptTemplate.from_template("""
You are a regional sales strategist.

Here is the territory performance summary:
{territory_table}

Analyze:
1. Which reps or territories are underperforming?
2. Where are there overachievements?
3. Recommend reallocation, retraining, or quota changes.

Respond in 3 clear sections.
""")
```

---

#### ✅ Step 4: GPT-Based Analysis (`territory_agent.py`)

```python
from territory_data import get_sales_territory_data
from territory_prompt import territory_prompt
from langchain.chat_models import ChatOpenAI

def generate_territory_insights():
    df = get_sales_territory_data()
    formatted_table = df.to_string(index=False)

    llm = ChatOpenAI(temperature=0.4)
    prompt = territory_prompt.format(territory_table=formatted_table)
    result = llm.predict(prompt)

    return df, result
```

---

#### ✅ Step 5: Streamlit Visualization (`app.py`)

```python
import streamlit as st
import plotly.express as px
from territory_agent import generate_territory_insights

st.title("🗺️ Sales Territory Intelligence Agent")

if st.button("Analyze Territories"):
    df, gpt_result = generate_territory_insights()

    st.subheader("📊 Territory Sales Performance")
    df["Performance (%)"] = (df["Sales"] / df["Quota"]) * 100
    st.dataframe(df)

    st.subheader("🌍 Visualize Territory Performance")
    fig = px.bar(df, x="Territory", y="Performance (%)", color="Rep", title="Sales vs Quota")
    st.plotly_chart(fig)

    st.subheader("🧠 GPT Recommendations")
    st.text_area("Insights", gpt_result, height=300)
```

Run the app:

```bash
streamlit run app.py
```

---

### 🧪 Example GPT Output:

**Underperforming:**

* Southwest territory is under 71% of quota. Eva may need coaching or a territory reassignment.
* Midwest is slightly under but consistent.

**Overachievers:**

* Dana exceeded quota by 22%. Consider additional accounts or a leadership role.

**Recommendations:**

* Adjust quotas based on market size
* Add inside sales support in Southwest
* Incentivize referrals in Northeast

---