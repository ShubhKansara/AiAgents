
## 🧑‍💻 **Agent #57: AI Code Review Agent**

### 📝 Overview

This agent reviews code snippets for bugs, security risks, code smells, and adherence to best practices. It uses GPT to analyze and suggest improvements in plain language. In this lab, you'll build a web-based AI-powered code review tool where developers can paste code and receive instant feedback.

---

### 🧪 Lab Objectives

By the end of this lab, you will:

* Paste code into a web interface
* Use GPT to detect issues and suggest improvements
* Display structured review output (Bugs, Security, Style)
* Enable download of review reports

---

### 🧰 Tech Stack

* **Python**
* **Streamlit**
* **LangChain + GPT-4 or GPT-3.5**
* *(Optional: GitHub API for repo analysis later)*

---

### 🧭 Step-by-Step Instructions

#### ✅ Step 1: Environment Setup

```bash
mkdir ai_code_review_agent
cd ai_code_review_agent
python -m venv venv
source venv/bin/activate
pip install streamlit openai langchain
```

---

#### ✅ Step 2: Prompt Template for Code Review (`review_prompt.py`)

```python
from langchain.prompts import PromptTemplate

review_prompt = PromptTemplate.from_template("""
You are a senior software engineer performing a code review.

Please analyze the following code:
```

{code}

```

1. Identify any syntax errors or bugs
2. Suggest security improvements if needed
3. Recommend best practices or code style fixes

Provide output in this format:
- Issues
- Suggestions
- Overall Assessment
""")
```

---

#### ✅ Step 3: GPT Review Engine (`review_agent.py`)

```python
from langchain.chat_models import ChatOpenAI
from review_prompt import review_prompt

def review_code(code: str):
    llm = ChatOpenAI(temperature=0.3)
    prompt = review_prompt.format(code=code)
    return llm.predict(prompt)
```

---

#### ✅ Step 4: Streamlit UI (`app.py`)

```python
import streamlit as st
from review_agent import review_code

st.title("🧑‍💻 AI Code Review Agent")

code_input = st.text_area("Paste your code here:", height=300)

if st.button("Run Review"):
    with st.spinner("Analyzing..."):
        output = review_code(code_input)
        st.subheader("📋 Review Output")
        st.text_area("AI Feedback", output, height=400)
        st.download_button("Download Report", output, file_name="code_review.txt")
```

Run the app:

```bash
streamlit run app.py
```

---

### 🧪 Example Output

**Input Code (Python):**

```python
def fetch_data(url):
    import requests
    data = requests.get(url)
    return data.json()
```

**GPT Review:**

```
- Issues:
  • No error handling if `requests.get` fails
  • Import inside function is non-standard

- Suggestions:
  • Move `import requests` to top of file
  • Wrap `requests.get` in try-except block

- Overall Assessment:
  The function is functional but lacks robustness. Consider modularizing and adding logging.
```

---

