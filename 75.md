
## 🏭 **Agent #75: Warehouse Automation Agent**

### 📝 Overview

This agent streamlines warehouse operations by analyzing order volume, storage layout, and item frequency to suggest automation strategies. It can identify inefficiencies in picking paths, space utilization, and labor allocation. In this lab, you’ll build an agent that reads warehouse activity data and generates recommendations using GPT.

---

### 🧪 Lab Objectives

By the end of this lab, you will:

* Upload warehouse operations data
* Identify fast/slow-moving items and picking frequency
* Use GPT to suggest layout and automation improvements
* Output actionable warehouse efficiency insights

---

### 🧰 Tech Stack

* **Python**
* **Streamlit**
* **Pandas + Matplotlib (optional)**
* **LangChain + GPT-4 or GPT-3.5**

---

### 🧭 Step-by-Step Instructions

#### ✅ Step 1: Environment Setup

```bash
mkdir warehouse_automation_agent
cd warehouse_automation_agent
python -m venv venv
source venv/bin/activate
pip install streamlit pandas openai langchain matplotlib
```

---

#### ✅ Step 2: Sample Warehouse CSV (`warehouse_data.csv`)

```csv
ItemID,ItemName,Zone,DailyPickFrequency,StorageSpaceUsed,AvgPickTimeSecs
I001,Widget A,Zone A,45,3.2,12
I002,Widget B,Zone B,10,5.1,25
I003,Gadget X,Zone C,2,6.7,30
I004,Tool Z,Zone A,60,2.9,10
```

---

#### ✅ Step 3: GPT Prompt Template (`warehouse_prompt.py`)

```python
from langchain.prompts import PromptTemplate

warehouse_prompt = PromptTemplate.from_template("""
You are a warehouse automation advisor AI.

Item Data:
- Name: {ItemName}
- Zone: {Zone}
- Daily Picks: {DailyPickFrequency}
- Storage Used: {StorageSpaceUsed} m²
- Average Pick Time: {AvgPickTimeSecs} sec

Recommend:
1. Whether to automate handling (Yes/No)
2. Suggested change (e.g., robot picker, zone relocation, batching)
3. Impact on efficiency (High, Medium, Low)
4. One-sentence rationale
""")
```

---

#### ✅ Step 4: GPT Logic (`warehouse_agent.py`)

```python
from langchain.chat_models import ChatOpenAI
from warehouse_prompt import warehouse_prompt

def recommend_automation(item_dict):
    llm = ChatOpenAI(temperature=0.3)
    prompt = warehouse_prompt.format(**item_dict)
    return llm.predict(prompt)
```

---

#### ✅ Step 5: Streamlit Interface (`app.py`)

```python
import streamlit as st
import pandas as pd
from warehouse_agent import recommend_automation

st.title("🏭 Warehouse Automation Agent")
st.caption("Analyze picking patterns and optimize warehouse layout")

file = st.file_uploader("Upload Warehouse CSV", type=["csv"])

if file:
    df = pd.read_csv(file)
    recommendations = []

    for _, row in df.iterrows():
        rec = recommend_automation(row.to_dict())
        recommendations.append(rec)

    df["GPT_Recommendation"] = recommendations
    st.dataframe(df[["ItemName", "Zone", "DailyPickFrequency", "GPT_Recommendation"]])
    st.download_button("Download Report", df.to_csv(index=False), "warehouse_automation.csv")
```

Run the app:

```bash
streamlit run app.py
```

---

### 🧪 Example GPT Output

**Item:** Widget A

```
- Automate: Yes  
- Suggestion: Assign to robotic picker in Zone A  
- Impact: High  
- Rationale: High pick frequency and low pick time justify automation for efficiency and labor savings.
```

---

