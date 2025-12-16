## ☁️ **Agent #60: Cloud Cost Optimization Agent**

### 📝 Overview

This agent reviews simulated or real cloud usage data (AWS, Azure, GCP), identifies cost inefficiencies (idle instances, overprovisioned VMs, unused storage), and provides optimization strategies. Using GPT, it analyzes data and recommends actions like rightsizing, spot instance usage, or deletion. In this lab, you’ll build a tool to upload cloud cost logs and generate GPT-based savings recommendations.

---

### 🧪 Lab Objectives

By the end of this lab, you will:

* Upload a cloud cost report (CSV) or use a simulated dataset
* Analyze high-cost resources
* Get GPT-powered cost optimization advice
* Visualize top spenders and savings opportunities

---

### 🧰 Tech Stack

* **Python**
* **Streamlit**
* **LangChain + GPT-4 or GPT-3.5**
* **Pandas / Matplotlib**

---

### 🧭 Step-by-Step Instructions

#### ✅ Step 1: Environment Setup

```bash
mkdir cloud_cost_agent
cd cloud_cost_agent
python -m venv venv
source venv/bin/activate
pip install streamlit openai langchain pandas matplotlib
```

---

#### ✅ Step 2: Simulated Cloud Usage Data (`cloud_data.py`)

```python
import pandas as pd

def get_cloud_costs():
    data = [
        {"Service": "EC2", "Instance": "t3.large", "Region": "us-east-1", "Monthly Cost": 120.00, "Usage Hours": 180, "Utilization %": 20},
        {"Service": "S3", "Instance": "N/A", "Region": "us-west-2", "Monthly Cost": 90.00, "Usage Hours": None, "Utilization %": None},
        {"Service": "RDS", "Instance": "db.m5.large", "Region": "us-east-1", "Monthly Cost": 200.00, "Usage Hours": 720, "Utilization %": 85},
        {"Service": "Lambda", "Instance": "N/A", "Region": "us-east-2", "Monthly Cost": 30.00, "Usage Hours": None, "Utilization %": None},
        {"Service": "EC2", "Instance": "m5.xlarge", "Region": "us-west-1", "Monthly Cost": 300.00, "Usage Hours": 100, "Utilization %": 10}
    ]
    return pd.DataFrame(data)
```

---

#### ✅ Step 3: Prompt Template for Optimization (`cloud_prompt.py`)

```python
from langchain.prompts import PromptTemplate

cloud_prompt = PromptTemplate.from_template("""
You are a cloud cost optimization expert.

Here is recent cloud usage data:
{cloud_table}

Analyze:
1. Identify high-cost, low-usage resources
2. Recommend optimization actions (e.g. rightsizing, deletion, spot instances)
3. Estimate potential monthly savings

Keep it concise and action-oriented.
""")
```

---

#### ✅ Step 4: GPT Advisor Logic (`cloud_agent.py`)

```python
from cloud_prompt import cloud_prompt
from langchain.chat_models import ChatOpenAI

def analyze_cloud_costs(table_str: str):
    llm = ChatOpenAI(temperature=0.3)
    prompt = cloud_prompt.format(cloud_table=table_str)
    return llm.predict(prompt)
```

---

#### ✅ Step 5: Streamlit Dashboard (`app.py`)

```python
import streamlit as st
from cloud_data import get_cloud_costs
from cloud_agent import analyze_cloud_costs
import matplotlib.pyplot as plt

st.title("☁️ Cloud Cost Optimization Agent")

df = get_cloud_costs()
st.subheader("💸 Cloud Spend Overview")
st.dataframe(df)

# Bar Chart
st.subheader("🔍 Top Services by Cost")
fig, ax = plt.subplots()
df.groupby("Service")["Monthly Cost"].sum().plot(kind="bar", ax=ax)
st.pyplot(fig)

if st.button("Generate Optimization Plan"):
    result = analyze_cloud_costs(df.to_string(index=False))
    st.subheader("🧠 GPT Optimization Recommendations")
    st.text_area("Response", result, height=400)
    st.download_button("Download Report", result, file_name="cloud_optimization.txt")
```

Run the app:

```bash
streamlit run app.py
```

---

### 🧪 Example Output

**GPT Optimization Summary:**

```
- EC2 instance m5.xlarge is severely underutilized (10%) – consider rightsizing or using spot instances.  
- t3.large also shows low usage (20%) – evaluate if it can be paused or consolidated.  
- S3 costs are high – check for redundant or untagged buckets.  
Estimated savings: $200–300/month with changes.
```

---
