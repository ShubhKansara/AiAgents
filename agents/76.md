
## 🚛 **Agent #76: AI-powered Logistics Routing Agent**

### 📝 Overview

This agent analyzes delivery locations, vehicle capacity, route constraints, and delivery windows to generate optimal routing plans. It can minimize travel time, fuel cost, and delays using real-time and historical data. In this lab, you’ll build an agent that reads delivery orders and generates AI-enhanced routing suggestions with GPT.

---

### 🧪 Lab Objectives

By the end of this lab, you will:

* Upload delivery order and vehicle data
* Simulate route optimization logic
* Use GPT to provide intelligent routing suggestions
* Output routing plans and improvement ideas

---

### 🧰 Tech Stack

* **Python**
* **Streamlit**
* **Pandas + Geopandas (optional)**
* **LangChain + GPT-4 or GPT-3.5**
* *(Optional: Google Maps API or OpenRouteService)*

---

### 🧭 Step-by-Step Instructions

#### ✅ Step 1: Environment Setup

```bash
mkdir logistics_routing_agent
cd logistics_routing_agent
python -m venv venv
source venv/bin/activate
pip install streamlit pandas openai langchain
```

---

#### ✅ Step 2: Sample CSVs

**Orders (`orders.csv`)**

```csv
OrderID,DestinationCity,DeliveryWindowStart,DeliveryWindowEnd,PackageWeight
ORD001,Houston,08:00,12:00,100
ORD002,Dallas,10:00,14:00,200
ORD003,Austin,09:00,11:00,150
```

**Vehicles (`vehicles.csv`)**

```csv
VehicleID,Capacity,DepotCity,AvailableFrom,AvailableUntil
V001,500,Houston,07:00,19:00
V002,300,Dallas,06:00,18:00
```

---

#### ✅ Step 3: GPT Prompt Template (`routing_prompt.py`)

```python
from langchain.prompts import PromptTemplate

routing_prompt = PromptTemplate.from_template("""
You are a logistics optimization AI.

Given:
- Orders: {order_summary}
- Vehicles: {vehicle_summary}

Provide:
1. Assignment of orders to vehicles
2. Routing strategy (minimize total travel, honor delivery windows)
3. Risks (e.g., late deliveries, overloads)
4. One improvement recommendation

Use clear bullet points.
""")
```

---

#### ✅ Step 4: GPT Logic (`routing_agent.py`)

```python
from langchain.chat_models import ChatOpenAI
from routing_prompt import routing_prompt

def optimize_routes(order_summary, vehicle_summary):
    llm = ChatOpenAI(temperature=0.3)
    prompt = routing_prompt.format(
        order_summary=order_summary,
        vehicle_summary=vehicle_summary
    )
    return llm.predict(prompt)
```

---

#### ✅ Step 5: Streamlit Interface (`app.py`)

```python
import streamlit as st
import pandas as pd
from routing_agent import optimize_routes

st.title("🚛 AI-powered Logistics Routing Agent")
st.caption("Assign deliveries to vehicles and optimize routing")

order_file = st.file_uploader("Upload Orders CSV", type=["csv"])
vehicle_file = st.file_uploader("Upload Vehicles CSV", type=["csv"])

if order_file and vehicle_file:
    orders = pd.read_csv(order_file)
    vehicles = pd.read_csv(vehicle_file)

    order_summary = orders.to_string(index=False)
    vehicle_summary = vehicles.to_string(index=False)

    st.subheader("📝 Routing Plan Suggestion")
    suggestion = optimize_routes(order_summary, vehicle_summary)
    st.text_area("GPT Routing Output", suggestion, height=300)
```

Run the app:

```bash
streamlit run app.py
```

---

### 🧪 Example GPT Output

```
- Assign ORD001 & ORD003 to V001 (Houston depot, capacity 500)
- Assign ORD002 to V002 (Dallas depot)
- Route: Houston → Austin → Houston (V001); Dallas → Dallas (V002)
- Risk: Slight delay for ORD003 if Austin traffic worsens
- Suggestion: Add real-time traffic API integration to reroute dynamically.
```

---
