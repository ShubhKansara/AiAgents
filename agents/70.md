## 📄 **Agent #70: Contract Renewal & Expiry Agent**

### 📝 Overview

This agent monitors contract metadata (start/end dates, renewal terms, client name) and notifies users of upcoming expirations or auto-renewals. It can also suggest action steps based on client value, renewal terms, or performance. In this lab, you'll build a system that reads contract data, flags contracts due soon, and uses GPT to recommend next steps.

---

### 🧪 Lab Objectives

By the end of this lab, you will:

* Upload a contract tracking file (CSV)
* Identify contracts nearing renewal or expiry
* Use GPT to suggest renewal actions
* Output a renewal summary for each client

---

### 🧰 Tech Stack

* **Python**
* **Streamlit**
* **Pandas + datetime**
* **LangChain + GPT-4 or GPT-3.5**

---

### 🧭 Step-by-Step Instructions

#### ✅ Step 1: Environment Setup

```bash
mkdir contract_renewal_agent
cd contract_renewal_agent
python -m venv venv
source venv/bin/activate
pip install streamlit openai langchain pandas
```

---

#### ✅ Step 2: Sample CSV (`contracts.csv`)

```csv
ClientName,ContractStart,ContractEnd,AutoRenew,ClientValue,Notes
Acme Inc,2023-09-01,2024-09-01,Yes,High,"Key enterprise client"
Beta Corp,2023-07-15,2024-07-30,No,Medium,"Late on last payment"
Delta LLC,2023-10-01,2024-10-01,Yes,Low,"Under pilot program"
```

---

#### ✅ Step 3: GPT Prompt Template (`contract_prompt.py`)

```python
from langchain.prompts import PromptTemplate

contract_prompt = PromptTemplate.from_template("""
You are a contract renewal advisor AI.

Contract Info:
- Client: {ClientName}
- Ends: {ContractEnd}
- Auto-renew: {AutoRenew}
- Value: {ClientValue}
- Notes: {Notes}

Based on this, recommend:
1. Renewal Action (Renew, Negotiate, Terminate)
2. Reasoning (1-2 sentences)
3. Any follow-up needed

Respond in clear bullet points.
""")
```

---

#### ✅ Step 4: GPT Logic (`renewal_agent.py`)

```python
from langchain.chat_models import ChatOpenAI
from contract_prompt import contract_prompt

def get_renewal_advice(contract_dict):
    llm = ChatOpenAI(temperature=0.2)
    prompt = contract_prompt.format(**contract_dict)
    return llm.predict(prompt)
```

---

#### ✅ Step 5: Streamlit Interface (`app.py`)

```python
import streamlit as st
import pandas as pd
from datetime import datetime, timedelta
from renewal_agent import get_renewal_advice

st.title("📄 Contract Renewal & Expiry Agent")
st.caption("Track and act on upcoming contract renewals")

file = st.file_uploader("Upload CSV with contract metadata", type=["csv"])

if file:
    df = pd.read_csv(file, parse_dates=["ContractEnd"])
    today = datetime.today()
    df["DaysToEnd"] = (df["ContractEnd"] - today).dt.days
    due_df = df[df["DaysToEnd"] <= 60]  # Flag contracts expiring in 60 days

    results = []
    for _, row in due_df.iterrows():
        result = get_renewal_advice(row.to_dict())
        results.append(result)

    due_df["GPT_Advice"] = results
    st.dataframe(due_df[["ClientName", "ContractEnd", "DaysToEnd", "GPT_Advice"]])
    st.download_button("Download Renewal Actions", due_df.to_csv(index=False), "renewals.csv")
```

Run the app:

```bash
streamlit run app.py
```

---

### 🧪 Example Output

**Client:** Acme Inc
**Ends In:** 25 days
**GPT Output:**

```
- Renewal Action: Renew  
- Reason: High-value client under auto-renew; no issues noted.  
- Follow-up: Send renewal confirmation and schedule QBR.
```

---
