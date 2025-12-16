## 🛡️ **Agent #4: Fraud Detection Agent**

### 📝 Overview

This agent monitors financial transactions to detect potentially fraudulent behavior using pattern recognition and anomaly detection. In this lab, you’ll simulate transaction data, flag suspicious activities using simple heuristics or Z-score analysis, and generate GPT-based explanations for each flag.

---

### 🧪 Lab Objectives

By the end of this lab, you will:

* Simulate financial transactions with a mix of normal and anomalous entries
* Use statistical and rules-based techniques to detect anomalies
* Use GPT to explain why a transaction was flagged as suspicious
* Present everything via Streamlit in a clean UI

---

### 🧰 Tech Stack

* **Python**
* **Pandas + NumPy**
* **OpenAI GPT-4 / GPT-3.5**
* **LangChain**
* **Streamlit**

---

### 🧭 Step-by-Step Instructions

#### ✅ Step 1: Set up your environment

If you’ve already done this for previous labs, skip it.

```bash
mkdir fraud_detection_agent
cd fraud_detection_agent
python -m venv venv
source venv/bin/activate
pip install openai langchain pandas numpy streamlit
```

---

#### ✅ Step 2: Generate mock transaction data (`transaction_data.py`)

```python
import pandas as pd
import numpy as np

def generate_transactions(n=100):
    np.random.seed(42)
    amounts = np.random.normal(loc=200, scale=50, size=n)
    
    # Inject some fraud-like spikes
    amounts[np.random.randint(0, n, 5)] *= np.random.randint(5, 10)

    transactions = pd.DataFrame({
        "Transaction ID": [f"TX-{i+1:04d}" for i in range(n)],
        "Amount": amounts.round(2),
        "Type": np.random.choice(["Payment", "Refund", "Transfer", "Withdrawal"], size=n),
        "Account": np.random.choice(["A101", "A102", "A103"], size=n)
    })
    return transactions
```

---

#### ✅ Step 3: Flag anomalies (`fraud_detector.py`)

```python
import pandas as pd
import numpy as np
from transaction_data import generate_transactions

def flag_anomalies(df: pd.DataFrame):
    threshold = 3  # Z-score threshold
    mean = df["Amount"].mean()
    std = df["Amount"].std()

    df["Z-Score"] = (df["Amount"] - mean) / std
    df["Flagged"] = df["Z-Score"].abs() > threshold

    return df
```

---

#### ✅ Step 4: Create GPT-based fraud explanation (`explain_fraud.py`)

```python
from langchain.chat_models import ChatOpenAI
from langchain.prompts import PromptTemplate

explanation_prompt = PromptTemplate.from_template("""
You are a forensic accountant AI. A financial transaction has been flagged for possible fraud:

Transaction ID: {transaction_id}
Amount: ${amount}
Type: {type}
Account: {account}
Z-Score: {z_score}

Explain why this transaction might be suspicious and what actions a finance team should take.
""")

def explain_transaction(row):
    llm = ChatOpenAI(temperature=0.3)
    prompt = explanation_prompt.format(
        transaction_id=row["Transaction ID"],
        amount=row["Amount"],
        type=row["Type"],
        account=row["Account"],
        z_score=round(row["Z-Score"], 2)
    )
    return llm.predict(prompt)
```

---

#### ✅ Step 5: Build the Streamlit app (`app.py`)

```python
import streamlit as st
from fraud_detector import flag_anomalies
from transaction_data import generate_transactions
from explain_fraud import explain_transaction

st.title("🛡️ Fraud Detection Agent")

if st.button("Run Analysis"):
    df = generate_transactions()
    df = flag_anomalies(df)

    st.subheader("🔍 All Transactions")
    st.dataframe(df)

    flagged_df = df[df["Flagged"]]
    st.subheader("🚨 Flagged Transactions")
    st.dataframe(flagged_df)

    if not flagged_df.empty:
        st.subheader("💬 AI Explanation")
        selected_id = st.selectbox("Choose a flagged Transaction ID", flagged_df["Transaction ID"].tolist())
        row = flagged_df[flagged_df["Transaction ID"] == selected_id].iloc[0]
        explanation = explain_transaction(row)
        st.write(explanation)
```

Run it:

```bash
streamlit run app.py
```

---

### 🧪 Example Output:

```
Transaction TX-0042 involves a payment of $1470.23, which is significantly higher than average based on its Z-score of 6.2. Such spikes often suggest mistaken data entry, fraud, or misuse. Finance teams should verify source documentation, validate the recipient, and cross-reference timing with other system logs before releasing funds.
```

---

