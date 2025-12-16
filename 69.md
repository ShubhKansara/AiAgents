
## ⚡ **Agent #69: Energy Efficiency Optimization Agent**

### 📝 Overview

This agent analyzes energy consumption data from buildings, factories, or devices to recommend cost-saving and sustainability improvements. Using time-series data, it identifies inefficiencies, unusual spikes, and suggests optimization strategies. In this lab, you’ll build an AI agent that processes energy usage data and uses GPT to provide actionable recommendations.

---

### 🧪 Lab Objectives

By the end of this lab, you will:

* Upload energy consumption data (CSV)
* Use pandas to compute consumption trends
* Feed results to GPT for insights
* Output optimization suggestions (e.g., peak-hour reduction, equipment audit)

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
mkdir energy_efficiency_agent
cd energy_efficiency_agent
python -m venv venv
source venv/bin/activate
pip install streamlit openai langchain pandas matplotlib
```

---

#### ✅ Step 2: Sample CSV (`energy_data.csv`)

```csv
Timestamp,Device,Energy_kWh
2025-07-01 00:00:00,HVAC,12.5
2025-07-01 01:00:00,HVAC,14.2
2025-07-01 00:00:00,Lighting,4.3
2025-07-01 01:00:00,Lighting,4.1
...
```

---

#### ✅ Step 3: Prompt Template (`efficiency_prompt.py`)

```python
from langchain.prompts import PromptTemplate

efficiency_prompt = PromptTemplate.from_template("""
You are an energy efficiency consultant AI.

Here are recent consumption patterns (in kWh):
{summary}

Identify:
1. Devices or time periods with inefficiency
2. Energy-saving recommendations
3. Any anomalies to investigate

Keep your response under 150 words.
""")
```

---

#### ✅ Step 4: GPT Agent Logic (`efficiency_agent.py`)

```python
from langchain.chat_models import ChatOpenAI
from efficiency_prompt import efficiency_prompt

def analyze_energy_efficiency(summary: str):
    llm = ChatOpenAI(temperature=0.2)
    prompt = efficiency_prompt.format(summary=summary)
    return llm.predict(prompt)
```

---

#### ✅ Step 5: Streamlit App (`app.py`)

```python
import streamlit as st
import pandas as pd
import matplotlib.pyplot as plt
from efficiency_agent import analyze_energy_efficiency

st.title("⚡ Energy Efficiency Optimization Agent")
st.caption("Analyze energy data and recommend optimizations")

file = st.file_uploader("Upload CSV with Timestamp, Device, Energy_kWh", type=["csv"])

if file:
    df = pd.read_csv(file, parse_dates=["Timestamp"])
    
    st.subheader("📈 Energy Trend")
    pivot = df.pivot_table(index="Timestamp", columns="Device", values="Energy_kWh", aggfunc="sum")
    st.line_chart(pivot)

    summary = df.groupby("Device")["Energy_kWh"].sum().to_string()
    st.subheader("🧠 GPT Optimization Suggestions")
    response = analyze_energy_efficiency(summary)
    st.text_area("Suggestions", response, height=250)
```

Run the app:

```bash
streamlit run app.py
```

---

### 🧪 Example Output

**Data Summary:**

```
Device
HVAC        340.8  
Lighting    112.4  
ServerRack  389.2
```

**GPT Output:**

```
- The ServerRack has consistently high energy use. Consider power-saving modes or server load balancing.  
- HVAC peaks during midday—review insulation and thermostat settings.  
- Lighting is efficient, but sensors or timers could reduce usage further.  
- No severe anomalies detected, but recommend a power audit of server systems.
```

---
