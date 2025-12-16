
## 📦 **Agent #74: Inventory Management Agent**

### 📝 Overview

This agent monitors stock levels, tracks inventory movement, and suggests restocking or redistribution strategies to avoid shortages or overstock. It flags slow-moving or high-turnover items and uses GPT to generate actionable insights. In this lab, you’ll build an agent that processes inventory data and outputs inventory health insights and stock-level recommendations.

---

### 🧪 Lab Objectives

By the end of this lab, you will:

* Upload current inventory data
* Analyze stock status and turnover rate
* Use GPT to provide restock or optimization advice
* Generate alerts for low stock or excess items

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
mkdir inventory_agent
cd inventory_agent
python -m venv venv
source venv/bin/activate
pip install streamlit pandas openai langchain
```

---

#### ✅ Step 2: Sample Inventory CSV (`inventory.csv`)

```csv
ItemID,ItemName,Category,StockLevel,ReorderPoint,MonthlySales
I001,Widget A,Electronics,45,30,60
I002,Widget B,Electronics,15,20,5
I003,Gadget X,Appliances,120,50,10
I004,Tool Z,Hardware,8,25,35
```

---

#### ✅ Step 3: GPT Prompt Template (`inventory_prompt.py`)

```python
from langchain.prompts import PromptTemplate

inventory_prompt = PromptTemplate.from_template("""
You are an AI inventory optimization expert.

Item Info:
- Item: {ItemName}
- Category: {Category}
- Current Stock: {StockLevel}
- Reorder Point: {ReorderPoint}
- Monthly Sales: {MonthlySales}

Provide:
1. Restock recommendation (Yes/No)
2. Suggested Action (e.g., restock, reallocate, discontinue)
3. Risk Level (Low, Medium, High)
4. Justification (1 sentence)
""")
```

---

#### ✅ Step 4: GPT Logic (`inventory_agent.py`)

```python
from langchain.chat_models import ChatOpenAI
from inventory_prompt import inventory_prompt

def analyze_inventory(item_dict):
    llm = ChatOpenAI(temperature=0.2)
    prompt = inventory_prompt.format(**item_dict)
    return llm.predict(prompt)
```

---

#### ✅ Step 5: Streamlit Interface (`app.py`)

```python
import streamlit as st
import pandas as pd
from inventory_agent import analyze_inventory

st.title("📦 Inventory Management Agent")
st.caption("Get restock advice and optimize inventory")

file = st.file_uploader("Upload Inventory CSV", type=["csv"])

if file:
    df = pd.read_csv(file)
    results = []

    for _, row in df.iterrows():
        result = analyze_inventory(row.to_dict())
        results.append(result)

    df["GPT_Recommendation"] = results
    st.dataframe(df[["ItemName", "StockLevel", "MonthlySales", "GPT_Recommendation"]])
    st.download_button("Download Recommendations", df.to_csv(index=False), "inventory_recommendations.csv")
```

Run the app:

```bash
streamlit run app.py
```

---

### 🧪 Example GPT Output

**Item:** Tool Z

```
- Restock: Yes  
- Action: Reorder 30 units immediately  
- Risk: High  
- Reason: High monthly sales and stock is well below reorder point; risk of stockout.
```

---

