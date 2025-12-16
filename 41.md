## ✍️ **Agent #41: Content Generation Agent**

### 📝 Overview

This agent creates original marketing content such as blog posts, product descriptions, LinkedIn updates, and more—based on brief prompts or campaign needs. In this lab, you’ll build an AI writer that generates posts for different formats and tones based on user input.

---

### 🧪 Lab Objectives

By the end of this lab, you will:

* Define input prompts (topic, target audience, format, tone)
* Use GPT to generate different types of content (e.g., blog, tweet, email)
* Provide a Streamlit interface to preview and download content
* Optionally, include word count and tone controls

---

### 🧰 Tech Stack

* **Python**
* **LangChain + GPT-4 or GPT-3.5**
* **Streamlit**

---

### 🧭 Step-by-Step Instructions

#### ✅ Step 1: Environment Setup

```bash
mkdir content_generation_agent
cd content_generation_agent
python -m venv venv
source venv/bin/activate
pip install openai langchain streamlit
```

---

#### ✅ Step 2: Define Prompt Template (`content_prompt.py`)

```python
from langchain.prompts import PromptTemplate

content_prompt = PromptTemplate.from_template("""
You are a creative AI content writer.

Write a {format} on the topic: "{topic}"  
Audience: {audience}  
Tone: {tone}  
Word count target: {length} words

Make it engaging, relevant, and well-structured.
""")
```

---

#### ✅ Step 3: Content Generator Logic (`content_agent.py`)

```python
from content_prompt import content_prompt
from langchain.chat_models import ChatOpenAI

def generate_content(topic, audience, format, tone, length):
    prompt = content_prompt.format(
        topic=topic,
        audience=audience,
        format=format,
        tone=tone,
        length=length
    )
    llm = ChatOpenAI(temperature=0.6)
    return llm.predict(prompt)
```

---

#### ✅ Step 4: Streamlit UI (`app.py`)

```python
import streamlit as st
from content_agent import generate_content

st.title("✍️ AI Content Generation Agent")

topic = st.text_input("Enter topic:", "AI in healthcare")
audience = st.text_input("Target audience:", "healthcare executives")
format = st.selectbox("Content format:", ["Blog Post", "LinkedIn Post", "Email", "Product Description"])
tone = st.selectbox("Tone:", ["Professional", "Conversational", "Witty", "Urgent"])
length = st.slider("Word count target:", 50, 1000, 300)

if st.button("Generate Content"):
    content = generate_content(topic, audience, format, tone, length)
    st.subheader("📝 Generated Content")
    st.text_area("Content", content, height=400)
    st.download_button("Download as .txt", content, file_name="content.txt")
```

Run the app:

```bash
streamlit run app.py
```

---

### 🧪 Example Output (Blog Post – Conversational Tone – 300 words):

**Topic**: AI in healthcare
**Audience**: Healthcare executives
**Tone**: Conversational
**Format**: Blog Post

**Excerpt:**
AI is reshaping healthcare—from diagnostic imaging to predictive analytics. But beyond the buzzwords lies a real opportunity: saving lives, reducing burnout, and optimizing operations. If you're a healthcare leader wondering where to begin, the answer isn’t complex tech—it’s identifying where inefficiencies hurt most…

---
