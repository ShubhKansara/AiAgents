
## 📈 **Agent #94: KPI Monitoring Agent**

### 📝 Overview

The KPI Monitoring Agent tracks and evaluates key performance indicators in real-time, detecting deviations and surfacing actionable insights. It supports decision-making by keeping business units informed on progress against targets. In this lab, you'll build a dashboard that reads KPI data, compares it against thresholds, and uses GPT to generate observations and alerts.

---

### 🧪 Lab Objectives

By the end of this lab, you will:

* Upload a KPI dataset or define KPIs manually
* Compare each KPI against defined thresholds
* Generate GPT-based analysis of trends, warnings, and recommendations
* Visualize KPI trends and status using Streamlit charts

---

### 🧰 Tech Stack

* **Python**
* **Streamlit**
* **Pandas + Plotly or Matplotlib**
* **LangChain + GPT-4 or GPT-3.5**
* *(Optional: Add real-time database integration or Slack alerts)*

---

### 🧭 Step-by-Step Instructions

#### ✅ Step 1: Environment Setup

```bash
mkdir kpi_monitoring_agent
cd kpi_monitoring_agent
python -m venv venv
source venv/bin/activate
pip install streamlit pandas matplotlib openai langchain
```

---

#### ✅ Step 2: Sample KPI Dataset (`data/kpi_data.csv`)

```csv
Date,Metric,Value,Target
2025-07-01,Website Traffic,12000,10000
2025-07-01,Conversion Rate,2.5,3.0
2025-07-01,Customer Satisfaction,4.2,4.5
2025-07-08,Website Traffic,13500,10000
2025-07-08,Conversion Rate,2.9,3.0
2025-07-08,Customer Satisfaction,4.6,4.5
```

---

#### ✅ Step 3: KPI Analyzer (`analyze_kpis.py`)

```python
import pandas as pd
from langchain.chat_models import ChatOpenAI

def analyze_kpis(df):
    kpi_summary = ""
    for metric in df["Metric"].unique():
        recent = df[df["Metric"] == metric].sort_values("Date").tail(2)
        if len(recent) == 2:
            change = recent.iloc[1]["Value"] - recent.iloc[0]["Value"]
            kpi_summary += f"{metric}: changed by {change:.2f} (from {recent.iloc[0]['Value']} to {recent.iloc[1]['Value']})\n"

    prompt = f"""
    Given the following KPI changes, analyze overall business performance. 
    Point out improvements, risks, and recommended actions.

    {kpi_summary}
    """
    llm = ChatOpenAI(temperature=0.2)
    return llm.predict(prompt)
```

---

#### ✅ Step 4: Streamlit Dashboard (`app.py`)

```python
import streamlit as st
import pandas as pd
import matplotlib.pyplot as plt
from analyze_kpis import analyze_kpis

st.title("📈 KPI Monitoring Agent")
st.caption("Track KPI performance and receive AI-generated insights")

file = st.file_uploader("Upload KPI Data (CSV)", type=["csv"])
if file:
    df = pd.read_csv(file)
    st.dataframe(df)

    metric = st.selectbox("Choose Metric", df["Metric"].unique())
    filtered = df[df["Metric"] == metric]

    # Plot
    fig, ax = plt.subplots()
    ax.plot(filtered["Date"], filtered["Value"], label="Actual", marker="o")
    ax.plot(filtered["Date"], filtered["Target"], label="Target", linestyle="--", marker="x")
    ax.set_title(f"{metric} Over Time")
    ax.legend()
    st.pyplot(fig)

    if st.button("Analyze KPIs"):
        summary = analyze_kpis(df)
        st.subheader("🧠 GPT-Generated KPI Summary")
        st.text_area("Insights", summary, height=300)
```

Run the app:

```bash
streamlit run app.py
```

---

### 🧪 Example Output

**GPT Summary (Excerpt):**

> "Website Traffic is exceeding target, indicating successful engagement. Conversion Rate is improving but remains slightly below target—consider UX optimizations. Customer Satisfaction rose to 4.6, surpassing target. Overall trend is positive with minor conversion concerns."

---

