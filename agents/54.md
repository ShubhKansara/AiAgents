## 🖥️ **Agent #54: System Monitoring Agent**

### 📝 Overview

This agent continuously scans simulated system health metrics (CPU usage, memory, disk, uptime) and flags abnormal behavior using threshold-based rules or GPT-based diagnostics. It generates system health summaries and alerts for unusual patterns. In this lab, you'll simulate system metrics and use GPT to describe and assess the system state.

---

### 🧪 Lab Objectives

By the end of this lab, you will:

* Simulate system performance data (CPU, RAM, disk, etc.)
* Detect anomalies using rule-based and LLM-based checks
* Generate a system health summary using GPT
* Display the results in a Streamlit dashboard

---

### 🧰 Tech Stack

* **Python**
* **Streamlit**
* **LangChain + GPT-4 or GPT-3.5**
* **Pandas**
* *(Optional: psutil for real system data)*

---

### 🧭 Step-by-Step Instructions

#### ✅ Step 1: Environment Setup

```bash
mkdir system_monitoring_agent
cd system_monitoring_agent
python -m venv venv
source venv/bin/activate
pip install streamlit openai langchain pandas
```

---

#### ✅ Step 2: Simulated System Data (`metrics.py`)

```python
import pandas as pd
import random

def generate_metrics():
    return pd.DataFrame([
        {
            "Metric": "CPU Usage (%)", "Value": round(random.uniform(10, 95), 2)
        },
        {
            "Metric": "Memory Usage (%)", "Value": round(random.uniform(20, 95), 2)
        },
        {
            "Metric": "Disk Usage (%)", "Value": round(random.uniform(30, 98), 2)
        },
        {
            "Metric": "System Uptime (hours)", "Value": round(random.uniform(2, 240), 1)
        },
        {
            "Metric": "Network Activity (Mbps)", "Value": round(random.uniform(0.5, 150), 2)
        }
    ])
```

---

#### ✅ Step 3: GPT Prompt for Health Summary (`monitor_prompt.py`)

```python
from langchain.prompts import PromptTemplate

monitor_prompt = PromptTemplate.from_template("""
You are a system reliability engineer.

Here are recent system metrics:
{metrics}

1. Identify any abnormal readings
2. Summarize system health status
3. Recommend actions if necessary

Keep it short and professional.
""")
```

---

#### ✅ Step 4: GPT Agent for System Health (`monitor_agent.py`)

```python
from monitor_prompt import monitor_prompt
from langchain.chat_models import ChatOpenAI

def analyze_metrics(metrics_table: str):
    llm = ChatOpenAI(temperature=0.3)
    prompt = monitor_prompt.format(metrics=metrics_table)
    return llm.predict(prompt)
```

---

#### ✅ Step 5: Streamlit Interface (`app.py`)

```python
import streamlit as st
from metrics import generate_metrics
from monitor_agent import analyze_metrics

st.title("🖥️ System Monitoring Agent")

df = generate_metrics()
st.subheader("📊 Simulated Metrics")
st.dataframe(df)

metrics_string = df.to_string(index=False)

if st.button("Analyze System Health"):
    report = analyze_metrics(metrics_string)
    st.subheader("🩺 System Health Summary")
    st.text_area("GPT Summary", report, height=300)
    st.download_button("Download Report", report, file_name="system_health_report.txt")
```

Run the app:

```bash
streamlit run app.py
```

---

### 🧪 Example Output:

**System Health Summary:**

* CPU usage at 93% and memory usage at 89% indicate potential overload.
* Disk usage at 94% is nearing critical capacity.
* System uptime is 227 hours—recommend scheduled restart.
* Network activity is within normal range.
  **Action:** Restart non-critical processes, clear disk space, schedule maintenance.

---
