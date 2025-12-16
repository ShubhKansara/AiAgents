## 📦 **Agent #29: Inventory Reduction Agent**

### 📝 Overview

This AI agent helps reduce excess inventory by analyzing product turnover rates, identifying slow-moving SKUs, and suggesting actions like discounting, bundling, or supplier renegotiation. In this lab, you’ll simulate inventory data and use GPT to recommend data-driven reduction strategies.

---

### 🧪 Lab Objectives

By the end of this lab, you will:

* Simulate inventory turnover data
* Identify low-turnover SKUs and surplus items
* Use GPT to suggest tailored reduction strategies
* Display actionable inventory reports in Streamlit

---

### 🧰 Tech Stack

* **Python**
* **Pandas**
* **LangChain + GPT-4 or GPT-3.5**
* **Streamlit**

---

### 🧭 Step-by-Step Instructions

#### ✅ Step 1: Environment Setup

```bash
mkdir inventory_reduction_agent
cd inventory_reduction_agent
python -m venv venv
source venv/bin/activate
pip install pandas openai langchain streamlit
```

---

#### ✅ Step 2: Simulate Inventory Data (`inventory_data.py`)

```python
import pandas as pd

def get_inventory_data():
    return pd.DataFrame({
        "SKU": ["CHAIR001", "TABLE002", "MONITOR003", "CABLE004", "DESK005"],
        "Product Name": ["Ergo Chair", "Meeting Table", "24'' Monitor", "HDMI Cable", "Standing Desk"],
        "Units in Stock": [320, 50, 190, 800, 70],
        "Monthly Sales Avg": [12, 25, 60, 100, 5],
        "Last Restocked": ["2024-11-01", "2025-03-15", "2025-06-01", "2025-05-10", "2024-09-30"]
    })
```

---

#### ✅ Step 3: GPT Prompt Template (`reduction_prompt.py`)

```python
from langchain.prompts import PromptTemplate

reduction_template = PromptTemplate.from_template("""
You are an AI inventory analyst.

Given this inventory item:
- SKU: {sku}
- Product: {name}
- Stock: {stock} units
- Monthly Sales: {sales} units
- Last Restocked: {restocked}

Identify:
1. Is this overstocked? (Yes/No)
2. Suggested actions (e.g., discount, bundle, reduce reorder)
3. Justify briefly

Respond in 3 concise bullet points.
""")
```

---

#### ✅ Step 4: Inventory Evaluation Logic (`reduction_agent.py`)

```python
from inventory_data import get_inventory_data
from reduction_prompt import reduction_template
from langchain.chat_models import ChatOpenAI

def reduce_inventory():
    df = get_inventory_data()
    llm = ChatOpenAI(temperature=0.3)
    recommendations = []

    for _, row in df.iterrows():
        prompt = reduction_template.format(
            sku=row["SKU"],
            name=row["Product Name"],
            stock=row["Units in Stock"],
            sales=row["Monthly Sales Avg"],
            restocked=row["Last Restocked"]
        )
        result = llm.predict(prompt)
        recommendations.append((row["Product Name"], result))

    return df, recommendations
```

---

#### ✅ Step 5: Streamlit Interface (`app.py`)

```python
import streamlit as st
from reduction_agent import reduce_inventory

st.title("📦 Inventory Reduction Agent")

if st.button("Run Inventory Optimization"):
    df, recs = reduce_inventory()

    for product, summary in recs:
        st.subheader(f"📦 {product}")
        st.text_area("AI Recommendation", summary, height=200)
        st.markdown("---")
```

Run the app:

```bash
streamlit run app.py
```

---

### 🧪 Example Output:

**Ergo Chair:**

* Overstocked: Yes
* Suggested Action: Offer a 15% discount or bundle with desks
* Justification: Only 12 sold per month vs 320 in stock; old restock date

**Standing Desk:**

* Overstocked: Yes
* Suggested Action: Freeze reorders and offer promotion
* Justification: Only 5 monthly sales, stock aging since 2024

---