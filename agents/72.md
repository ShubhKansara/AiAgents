
## 🚚 **Agent #72: Supply Chain Optimization Agent**

### 📝 Overview

This agent analyzes supply chain data—inventory, supplier performance, lead times, and demand—to recommend improvements in sourcing, routing, and warehousing. In this lab, you’ll build a supply chain analyzer that takes input data and uses GPT to generate insights on bottlenecks, risks, and optimization strategies.

---

### 🧪 Lab Objectives

By the end of this lab, you will:

* Upload a supply chain dataset (CSV)
* Analyze lead times, fill rates, and delivery performance
* Use GPT to suggest optimizations (e.g., vendor changes, route efficiency)
* Generate a summary dashboard of supply chain health

---

### 🧰 Tech Stack

* **Python**
* **Streamlit**
* **Pandas**
* **LangChain + GPT-4 or GPT-3.5**

---

### 🧭 Step-by-Step Instructions

#### ✅ Step 1: Environment Setup

```bash
mkdir supply_chain_agent
cd supply_chain_agent
python -m venv venv
source venv/bin/activate
pip install streamlit pandas openai langchain
```

---

#### ✅ Step 2: Sample CSV (`supply_chain.csv`)

```csv
OrderID,Supplier,Item,OrderDate,DeliveryDate,LeadTimeDays,QuantityOrdered,QuantityReceived
ORD001,SupplierA,WidgetA,2025-06-01,2025-06-07,6,100,98
ORD002,SupplierB,WidgetB,2025-06-02,2025-06-12,10,200,180
ORD003,SupplierA,WidgetA,2025-06-05,2025-06-09,4,150,150
...
```

---

#### ✅ Step 3: GPT Prompt Template (`supply_prompt.py`)

```python
from langchain.prompts import PromptTemplate

supply_prompt = PromptTemplate.from_template("""
You are a supply chain optimization consultant AI.

Supplier Summary:
{summary}

Please provide:
1. Top 2 inefficiencies or risks
2. Actionable recommendations (e.g., new vendor, buffer stock, faster freight)
3. High-level supply chain health status (Green, Yellow, Red)

Keep the response under 150 words.
""")
```

---

#### ✅ Step 4: GPT Logic (`supply_agent.py`)

```python
from langchain.chat_models import ChatOpenAI
from supply_prompt import supply_prompt

def get_supply_chain_advice(summary: str):
    llm = ChatOpenAI(temperature=0.3)
    prompt = supply_prompt.format(summary=summary)
    return llm.predict(prompt)
```

---

#### ✅ Step 5: Streamlit App (`app.py`)

```python
import streamlit as st
import pandas as pd
from supply_agent import get_supply_chain_advice

st.title("🚚 Supply Chain Optimization Agent")
st.caption("Evaluate supplier performance and optimize logistics")

file = st.file_uploader("Upload supply chain data CSV", type=["csv"])

if file:
    df = pd.read_csv(file, parse_dates=["OrderDate", "DeliveryDate"])
    df["FillRate"] = df["QuantityReceived"] / df["QuantityOrdered"]
    summary = df.groupby("Supplier").agg({
        "LeadTimeDays": "mean",
        "FillRate": "mean",
        "OrderID": "count"
    }).rename(columns={"OrderID": "TotalOrders"}).round(2).to_string()

    st.subheader("📊 Supplier Performance Summary")
    st.text(summary)

    st.subheader("🧠 GPT Optimization Suggestions")
    suggestion = get_supply_chain_advice(summary)
    st.text_area("Recommendations", suggestion, height=250)
```

Run the app:

```bash
streamlit run app.py
```

---

### 🧪 Example GPT Output

```
- Inefficiencies: SupplierB shows low fill rate and long lead time. SupplierA has variability in delivery windows.  
- Recommendations: Explore alternate vendors for WidgetB, or renegotiate delivery terms. Consider holding buffer stock for high-demand items.  
- Health Status: Yellow
```

---
