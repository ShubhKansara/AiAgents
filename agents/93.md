
## 📊 **Agent #93: Automated Reporting Agent**

### 📝 Overview

The Automated Reporting Agent streamlines business reporting by generating regular summaries, metrics, and visualizations from raw data sources. It eliminates manual report creation by producing natural language summaries and charts that update on-demand or on a schedule. In this lab, you’ll build an agent that connects to a CSV/Excel dataset and generates a weekly performance report using GPT and matplotlib.

---

### 🧪 Lab Objectives

By the end of this lab, you will:

* Upload a business dataset (sales, KPIs, ops, etc.)
* Extract and summarize trends using GPT
* Generate visualizations for key metrics
* Export a report in Markdown or PDF format

---

### 🧰 Tech Stack

* **Python**
* **Streamlit**
* **Pandas + Matplotlib/Plotly**
* **LangChain + GPT-4 or GPT-3.5**
* *(Optional: Scheduled automation with Airflow/cron jobs)*

---

### 🧭 Step-by-Step Instructions

#### ✅ Step 1: Environment Setup

```bash
mkdir reporting_agent
cd reporting_agent
python -m venv venv
source venv/bin/activate
pip install streamlit pandas matplotlib openai langchain
```

---

#### ✅ Step 2: Sample Dataset (`data/weekly_sales.csv`)

```csv
Date,Region,Sales,New_Customers,Churned_Customers
2025-07-01,North,12000,45,3
2025-07-01,South,9500,35,4
2025-07-08,North,13500,50,2
2025-07-08,South,11000,38,5
```

---

#### ✅ Step 3: Reporting Logic (`generate_report.py`)

```python
import pandas as pd
import matplotlib.pyplot as plt
from langchain.chat_models import ChatOpenAI

def generate_summary(df):
    stats = df.describe().to_string()
    llm = ChatOpenAI(temperature=0.3)
    prompt = f"""
    Given the following business stats table, summarize weekly performance.
    Identify trends, anomalies, and noteworthy events in 150 words.

    {stats}
    """
    return llm.predict(prompt)

def plot_sales(df):
    grouped = df.groupby('Date')['Sales'].sum().reset_index()
    plt.figure(figsize=(8,4))
    plt.plot(grouped['Date'], grouped['Sales'], marker='o')
    plt.title("Weekly Sales")
    plt.xlabel("Date")
    plt.ylabel("Sales")
    plt.tight_layout()
    plt.savefig("sales_plot.png")
    return "sales_plot.png"
```

---

#### ✅ Step 4: Streamlit Dashboard (`app.py`)

```python
import streamlit as st
import pandas as pd
from generate_report import generate_summary, plot_sales

st.title("📊 Automated Reporting Agent")
st.caption("Upload business data and generate instant weekly summaries")

uploaded_file = st.file_uploader("Upload CSV Dataset", type=["csv"])
if uploaded_file:
    df = pd.read_csv(uploaded_file)
    st.dataframe(df)

    if st.button("Generate Report"):
        st.info("Creating summary...")
        summary = generate_summary(df)
        chart = plot_sales(df)

        st.subheader("📝 GPT-Generated Report Summary")
        st.text_area("Report", summary, height=300)

        st.subheader("📈 Sales Visualization")
        st.image(chart)

        st.download_button("Download Summary", data=summary, file_name="weekly_report.md")
```

Run:

```bash
streamlit run app.py
```

---

### 🧪 Example Output

**GPT Summary:**

> “North region saw a 12.5% increase in weekly sales, with a notable decrease in churned customers (from 3 to 2). South region sales improved 15%, although customer churn slightly rose. Overall growth trends suggest strong campaign impact in Q3 kickoff.”

**Sales Chart:**
Line graph of total sales per week

---
