
## 🔧 **Agent #71: Predictive Maintenance Agent**

### 📝 Overview

This agent analyzes sensor or machine log data to predict equipment failures before they occur. It identifies performance degradation patterns, flags anomalies, and uses GPT to recommend preventive actions. In this lab, you’ll build a simplified predictive maintenance assistant that evaluates simulated time-series data for a set of machines and suggests maintenance strategies.

---

### 🧪 Lab Objectives

By the end of this lab, you will:

* Load machine performance or sensor data (CSV)
* Calculate moving averages and anomalies
* Use GPT to interpret patterns and suggest actions
* Display actionable maintenance plans per machine

---

### 🧰 Tech Stack

* **Python**
* **Streamlit**
* **Pandas + Matplotlib**
* **LangChain + GPT-4 or GPT-3.5**

---

### 🧭 Step-by-Step Instructions

#### ✅ Step 1: Environment Setup

```bash
mkdir predictive_maintenance_agent
cd predictive_maintenance_agent
python -m venv venv
source venv/bin/activate
pip install streamlit pandas openai langchain matplotlib
```

---

#### ✅ Step 2: Sample CSV (`machine_data.csv`)

```csv
Timestamp,MachineID,Temperature,Vibration,Pressure
2025-07-01 00:00:00,M01,75.2,0.35,120
2025-07-01 01:00:00,M01,78.4,0.55,128
2025-07-01 02:00:00,M01,82.1,0.75,140
...
```

---

#### ✅ Step 3: GPT Prompt Template (`maintenance_prompt.py`)

```python
from langchain.prompts import PromptTemplate

maintenance_prompt = PromptTemplate.from_template("""
You are an AI predictive maintenance advisor.

Machine: {MachineID}
Temperature: {avg_temp:.2f}°C
Vibration: {avg_vib:.2f} mm/s
Pressure: {avg_pres:.2f} psi

Recent observations suggest:
{anomalies}

Provide:
1. Maintenance risk level (Low, Moderate, High)
2. Recommended action (e.g., inspect, replace, continue monitoring)
3. Justification (brief)

Keep it concise and technical.
""")
```

---

#### ✅ Step 4: GPT Logic (`maintenance_agent.py`)

```python
from langchain.chat_models import ChatOpenAI
from maintenance_prompt import maintenance_prompt

def get_maintenance_advice(machine_id, avg_temp, avg_vib, avg_pres, anomalies):
    llm = ChatOpenAI(temperature=0.2)
    prompt = maintenance_prompt.format(
        MachineID=machine_id,
        avg_temp=avg_temp,
        avg_vib=avg_vib,
        avg_pres=avg_pres,
        anomalies=anomalies
    )
    return llm.predict(prompt)
```

---

#### ✅ Step 5: Streamlit Interface (`app.py`)

```python
import streamlit as st
import pandas as pd
import matplotlib.pyplot as plt
from maintenance_agent import get_maintenance_advice

st.title("🔧 Predictive Maintenance Agent")
st.caption("Analyze machine data and prevent failures")

file = st.file_uploader("Upload machine log CSV", type=["csv"])

if file:
    df = pd.read_csv(file, parse_dates=["Timestamp"])
    machines = df["MachineID"].unique()

    for m in machines:
        st.subheader(f"🛠 Machine {m}")
        df_m = df[df["MachineID"] == m]

        # Basic anomaly checks
        anomalies = []
        if df_m["Temperature"].max() > 85:
            anomalies.append("High temperature spike")
        if df_m["Vibration"].mean() > 0.6:
            anomalies.append("Elevated vibration levels")
        if df_m["Pressure"].max() > 140:
            anomalies.append("Pressure exceeding threshold")

        advice = get_maintenance_advice(
            machine_id=m,
            avg_temp=df_m["Temperature"].mean(),
            avg_vib=df_m["Vibration"].mean(),
            avg_pres=df_m["Pressure"].mean(),
            anomalies=", ".join(anomalies) or "No significant issues."
        )

        st.markdown(advice)
```

Run the app:

```bash
streamlit run app.py
```

---

### 🧪 Example Output

**Machine:** M01
**GPT Output:**

```
- Risk Level: Moderate  
- Action: Schedule inspection within 48 hours  
- Reason: Vibration levels are elevated and pressure peaked above safe thresholds. Proactive maintenance recommended.
```

---
