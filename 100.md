
## 📝 **Agent #100: Executive Summary Generator Agent**

### 🧠 Overview

The Executive Summary Generator Agent takes long-form content—such as reports, meeting transcripts, research papers, or business plans—and produces clear, concise executive summaries. These summaries highlight key decisions, insights, and next steps. In this lab, you’ll build an agent that ingests a document and generates a bullet or paragraph summary designed for busy decision-makers.

---

### 🧪 Lab Objectives

By the end of this lab, you will:

* Upload or paste long-form text
* Use GPT to summarize the content in executive style
* Choose between paragraph and bullet formats
* Export the result as downloadable text

---

### 🧰 Tech Stack

* **Python**
* **Streamlit**
* **LangChain + GPT-4 or GPT-3.5**
* *(Optional: Add text chunking and document type classification)*

---

### 🧭 Step-by-Step Instructions

#### ✅ Step 1: Environment Setup

```bash
mkdir executive_summary_agent
cd executive_summary_agent
python -m venv venv
source venv/bin/activate
pip install streamlit openai langchain
```

---

#### ✅ Step 2: Summarization Logic (`summarizer.py`)

```python
from langchain.chat_models import ChatOpenAI

llm = ChatOpenAI(temperature=0.3)

def summarize_text(text, mode="bullet"):
    prompt_type = {
        "bullet": "Generate an executive summary in bullet points (max 7 items)",
        "paragraph": "Write a 150-word executive summary paragraph"
    }
    prompt = f"""
    {prompt_type[mode]}
    Content:
    {text[:5000]}  # Trim for token efficiency
    """
    return llm.predict(prompt)
```

---

#### ✅ Step 3: Streamlit Interface (`app.py`)

```python
import streamlit as st
from summarizer import summarize_text

st.title("📝 Executive Summary Generator Agent")
st.caption("Upload or paste content and get instant executive summaries")

input_text = st.text_area("Paste your document content:", height=300)
summary_mode = st.radio("Choose summary style:", ["bullet", "paragraph"])

if st.button("Generate Summary") and input_text:
    with st.spinner("Generating summary..."):
        result = summarize_text(input_text, summary_mode)
        st.subheader("📄 Executive Summary")
        st.text_area("Output", result, height=250)
        st.download_button("📥 Download Summary", data=result, file_name="executive_summary.txt")
```

Run the app:

```bash
streamlit run app.py
```

---

### 🧪 Example Output

**Input:** A 7-page quarterly operations report.

**Output (Bullet Format):**

* Revenue increased by 12% YoY, driven by APAC expansion
* Customer churn reduced from 9% to 6% via onboarding improvements
* Cloud costs were optimized, saving \$1.3M in Q2
* Product roadmap delay expected due to hiring freeze
* Net Promoter Score improved from 48 to 56
* Key risk: potential regulatory delays in EU launch
* Next review scheduled for October 1, 2025

**Output (Paragraph Format):**
“In Q2, the company saw a 12% revenue increase, improved customer retention, and significant cloud cost savings. While the NPS score rose, hiring delays could impact product delivery. The EU launch faces regulatory hurdles, and the leadership team plans to re-evaluate timelines in the next quarterly review.”

---

