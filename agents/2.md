## 🧮 **Agent #2: Ledger Agent**

### 📝 **Overview**

This AI agent monitors, classifies, and reconciles ledger entries (debits/credits) to help finance teams ensure accuracy, detect anomalies, and generate summaries. In this lab, we’ll simulate ledger data and build a GPT-powered agent to explain inconsistencies or balance summaries conversationally.

---

### 🧪 Lab Objectives

By the end of this lab, you will:

* Ingest a sample ledger as a Pandas DataFrame
* Use GPT to summarize transactions, detect imbalances
* Explain discrepancies and generate reconciliation notes
* Build a UI to chat with the ledger

---

### 🧰 Tech Stack

* **Python**
* **OpenAI GPT-4 / GPT-3.5**
* **LangChain**
* **Pandas**
* **Streamlit**

---

### 🧭 Step-by-Step Instructions

#### ✅ Step 1: Set up your environment

If continuing from the previous lab, stay in the same virtual environment. Otherwise:

```bash
mkdir ledger_agent
cd ledger_agent
python -m venv venv
source venv/bin/activate
pip install openai langchain streamlit pandas
```

---

#### ✅ Step 2: Create a mock ledger dataset (`ledger_data.py`)

```python
import pandas as pd

def get_ledger():
    data = {
        "Date": ["2025-07-01", "2025-07-01", "2025-07-02", "2025-07-02", "2025-07-03"],
        "Description": ["Customer Payment", "Revenue Recorded", "Office Supplies", "Cash Paid", "Consulting Income"],
        "Account": ["Accounts Receivable", "Revenue", "Office Supplies", "Cash", "Revenue"],
        "Debit": [0, 500, 100, 100, 0],
        "Credit": [500, 0, 0, 0, 1500],
    }
    df = pd.DataFrame(data)
    return df
```

---

#### ✅ Step 3: Create your prompt template (`ledger_prompt.py`)

```python
from langchain.prompts import PromptTemplate

ledger_template = PromptTemplate.from_template("""
You are a financial ledger analyst AI. Analyze the following transactions:

{ledger_table}

Tasks:
1. Identify if the debits equal credits.
2. Highlight any imbalances or potential errors.
3. Provide a one-paragraph explanation of the ledger status.
""")
```

---

#### ✅ Step 4: Format ledger and run GPT analysis (`ledger_agent.py`)

```python
import openai
import pandas as pd
from langchain.chat_models import ChatOpenAI
from ledger_prompt import ledger_template
from ledger_data import get_ledger

def run_ledger_analysis():
    df = get_ledger()
    ledger_table = df.to_string(index=False)
    
    prompt = ledger_template.format(ledger_table=ledger_table)
    llm = ChatOpenAI(temperature=0.2)
    response = llm.predict(prompt)
    
    return df, response
```

---

#### ✅ Step 5: Build Streamlit interface (`app.py`)

```python
import streamlit as st
from ledger_agent import run_ledger_analysis

st.title("Ledger Analysis Agent 📒")
if st.button("Analyze Ledger"):
    df, result = run_ledger_analysis()
    st.subheader("🧾 Ledger Data")
    st.dataframe(df)
    st.subheader("🔍 Analysis Result")
    st.write(result)
```

Launch it:

```bash
streamlit run app.py
```

---

### 🧪 Example Output:

```
Debits and credits are not balanced. The total debit is $200 while the total credit is $2000.

There appears to be a mismatch—likely due to a missing revenue entry or a duplicated credit. Please verify the entries for Consulting Income and Office Supplies. This could cause discrepancies in monthly close and must be resolved before reporting.
```

---
