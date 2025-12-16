## 🚀 **Agent #47: AI-powered SEO Optimization Agent**

### 📝 Overview

This agent analyzes web content and provides SEO optimization suggestions, including keyword improvements, meta description rewrites, title tag enhancements, and semantic content suggestions. In this lab, you’ll input sample blog/article content and use GPT to suggest SEO improvements based on target keywords.

---

### 🧪 Lab Objectives

By the end of this lab, you will:

* Input or upload webpage/article content
* Specify a target keyword or phrase
* Use GPT to analyze title, meta description, and body content
* Generate SEO suggestions, including keyword density, title rewrites, and content gaps

---

### 🧰 Tech Stack

* **Python**
* **Streamlit**
* **LangChain + GPT-4 or GPT-3.5**

---

### 🧭 Step-by-Step Instructions

#### ✅ Step 1: Environment Setup

```bash
mkdir seo_optimization_agent
cd seo_optimization_agent
python -m venv venv
source venv/bin/activate
pip install openai langchain streamlit
```

---

#### ✅ Step 2: SEO Prompt Template (`seo_prompt.py`)

```python
from langchain.prompts import PromptTemplate

seo_prompt = PromptTemplate.from_template("""
You are an SEO optimization expert.

Given the following content:
{content}

And the target keyword: "{keyword}"

Provide:
1. A rewritten SEO-optimized title (max 60 characters)
2. An improved meta description (max 155 characters)
3. Keyword usage feedback (density and placement)
4. Suggested headings or sections to improve semantic richness

Format clearly with bullet points.
""")
```

---

#### ✅ Step 3: GPT Optimization Engine (`seo_agent.py`)

```python
from seo_prompt import seo_prompt
from langchain.chat_models import ChatOpenAI

def generate_seo_insights(content, keyword):
    llm = ChatOpenAI(temperature=0.3)
    prompt = seo_prompt.format(content=content, keyword=keyword)
    return llm.predict(prompt)
```

---

#### ✅ Step 4: Streamlit UI (`app.py`)

```python
import streamlit as st
from seo_agent import generate_seo_insights

st.title("🚀 AI-powered SEO Optimization Agent")

content = st.text_area("Paste your content:", height=300)
keyword = st.text_input("Target keyword:", "AI for marketing")

if st.button("Optimize SEO"):
    if content and keyword:
        insights = generate_seo_insights(content, keyword)
        st.subheader("🔍 SEO Suggestions")
        st.text_area("Results", insights, height=400)
    else:
        st.warning("Please provide content and a target keyword.")
```

Run the app:

```bash
streamlit run app.py
```

---

### 🧪 Example Output:

**SEO Title:**
“Mastering AI for Marketing: Boost Strategy & Results”

**Meta Description:**
“Unlock AI’s full potential in marketing. Improve targeting, personalization, and ROI.”

**Keyword Analysis:**

* Target keyword appears 3 times (\~0.8% density)
* Appears in body and one heading
* Missing in title and meta (before optimization)

**Suggestions:**

* Add a section: “How AI Improves Campaign ROI”
* Use related phrases like “AI-driven personalization” and “predictive targeting”
* Include internal links to related blog posts

---
