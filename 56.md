
## 🧾 **Agent #56: IT Asset Management Agent**

### 📝 Overview

This agent tracks IT assets like laptops, monitors, licenses, and peripherals, providing visibility into ownership, warranty status, location, and usage. It uses GPT for smart queries like “Who owns MacBook Pro #2031?” or “Show all licenses expiring this month.” In this lab, you’ll build a searchable IT asset dashboard with GPT-enhanced natural language queries.

---

### 🧪 Lab Objectives

By the end of this lab, you will:

* Simulate an asset inventory database
* Use GPT to interpret asset-related queries
* Display asset details, owners, status, and expiry alerts
* Generate a human-readable asset summary from data

---

### 🧰 Tech Stack

* **Python**
* **Streamlit**
* **LangChain + GPT-4 or GPT-3.5**
* **Pandas**

---

### 🧭 Step-by-Step Instructions

#### ✅ Step 1: Environment Setup

```bash
mkdir it_asset_agent
cd it_asset_agent
python -m venv venv
source venv/bin/activate
pip install streamlit openai langchain pandas
```

---

#### ✅ Step 2: Simulated Asset Inventory (`assets.py`)

```python
import pandas as pd
from datetime import datetime, timedelta

def get_assets():
    today = datetime.today()
    return pd.DataFrame([
        {"Asset ID": "LTP-001", "Type": "Laptop", "Owner": "Alice", "Location": "NY Office", "Purchase Date": today - timedelta(days=700), "Warranty Expiry": today + timedelta(days=30)},
        {"Asset ID": "MON-104", "Type": "Monitor", "Owner": "Bob", "Location": "Remote", "Purchase Date": today - timedelta(days=400), "Warranty Expiry": today + timedelta(days=365)},
        {"Asset ID": "LIC-008", "Type": "Adobe License", "Owner": "Charlie", "Location": "NY Office", "Purchase Date": today - timedelta(days=300), "Warranty Expiry": today + timedelta(days=5)},
        {"Asset ID": "LTP-009", "Type": "Laptop", "Owner": "Denise", "Location": "SF Office", "Purchase Date": today - timedelta(days=900), "Warranty Expiry": today - timedelta(days=10)},
    ])
```

---

#### ✅ Step 3: GPT Prompt for Asset Query (`asset_prompt.py`)

```python
from langchain.prompts import PromptTemplate

asset_prompt = PromptTemplate.from_template("""
You are an IT asset assistant.

Given this asset data:
{asset_table}

User query: "{user_query}"

1. Identify the asset(s) involved
2. Summarize key information (owner, type, expiry)
3. Mention if warranty is expiring soon or expired

Respond clearly and concisely.
""")
```

---

#### ✅ Step 4: GPT-Powered Query Handler (`asset_agent.py`)

```python
from asset_prompt import asset_prompt
from langchain.chat_models import ChatOpenAI

def handle_asset_query(asset_table: str, user_query: str):
    llm = ChatOpenAI(temperature=0.3)
    prompt = asset_prompt.format(asset_table=asset_table, user_query=user_query)
    return llm.predict(prompt)
```

---

#### ✅ Step 5: Streamlit UI (`app.py`)

```python
import streamlit as st
from assets import get_assets
from asset_agent import handle_asset_query

st.title("🧾 IT Asset Management Agent")

df = get_assets()
st.subheader("📋 Current Inventory")
st.dataframe(df)

user_query = st.text_input("Ask a question about your IT assets:", "Which licenses are expiring soon?")

if st.button("Ask"):
    result = handle_asset_query(df.to_string(index=False), user_query)
    st.subheader("🤖 GPT Response")
    st.text_area("Answer", result, height=300)
    st.download_button("Download Summary", result, file_name="asset_summary.txt")
```

Run the app:

```bash
streamlit run app.py
```

---

### 🧪 Example Output

**User Query:** Show all laptops with expired warranty.
**GPT Response:**

* **LTP-009** (Laptop) is assigned to **Denise** at **SF Office**.

  * Warranty expired 10 days ago.
* Recommend notifying the user for replacement or extended coverage.

---
