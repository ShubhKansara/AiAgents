## 💬 **Agent #34: AI Chatbot for Sales**

### 📝 Overview

This agent acts as an intelligent 24/7 sales assistant on a website or product page. It qualifies leads, answers product questions, recommends offerings, and routes serious prospects to human reps. In this lab, you’ll simulate a product catalog and build a GPT-powered sales chatbot that answers customer queries.

---

### 🧪 Lab Objectives

By the end of this lab, you will:

* Create a product catalog as chatbot knowledge
* Set up a LangChain-powered chatbot using GPT
* Answer product and pricing questions from sample users
* Deploy it with a simple Streamlit UI

---

### 🧰 Tech Stack

* **Python**
* **LangChain + GPT-4 or GPT-3.5**
* **Streamlit**
* *(Optional)*: FAISS for long product catalogs

---

### 🧭 Step-by-Step Instructions

#### ✅ Step 1: Environment Setup

```bash
mkdir ai_sales_chatbot
cd ai_sales_chatbot
python -m venv venv
source venv/bin/activate
pip install openai langchain streamlit
```

---

#### ✅ Step 2: Define Product Catalog (`product_knowledge.py`)

```python
products = {
    "Ergo Chair": {
        "description": "Ergonomic office chair with lumbar support and adjustable height",
        "price": "$299",
        "best_for": "Remote workers and office teams"
    },
    "SmartDesk 2": {
        "description": "Sit-stand electric desk with programmable presets",
        "price": "$499",
        "best_for": "Tech startups and health-conscious professionals"
    },
    "Acoustic Panels": {
        "description": "Sound-dampening panels for video call clarity",
        "price": "$99",
        "best_for": "Content creators and sales teams"
    }
}

def get_product_info():
    return products
```

---

#### ✅ Step 3: GPT Prompt Template (`chatbot_prompt.py`)

```python
from langchain.prompts import PromptTemplate

chat_prompt = PromptTemplate.from_template("""
You are a helpful sales assistant. Use the following product catalog to answer customer questions.

{catalog}

Customer: {question}

Respond in a friendly, helpful tone.
""")
```

---

#### ✅ Step 4: Chatbot Engine (`chatbot_agent.py`)

```python
from product_knowledge import get_product_info
from chatbot_prompt import chat_prompt
from langchain.chat_models import ChatOpenAI

def handle_chat(query):
    catalog = get_product_info()
    formatted_catalog = "\n".join([
        f"{name}: {info['description']} | Price: {info['price']} | Best for: {info['best_for']}"
        for name, info in catalog.items()
    ])
    
    prompt = chat_prompt.format(catalog=formatted_catalog, question=query)
    llm = ChatOpenAI(temperature=0.4)
    return llm.predict(prompt)
```

---

#### ✅ Step 5: Streamlit Chat Interface (`app.py`)

```python
import streamlit as st
from chatbot_agent import handle_chat

st.title("💬 AI Chatbot for Sales")

user_query = st.text_input("Ask me about our products:")

if st.button("Get Response") and user_query:
    reply = handle_chat(user_query)
    st.markdown("**AI Chatbot Says:**")
    st.success(reply)
```

Run the app:

```bash
streamlit run app.py
```

---

### 🧪 Example Interactions:

**User:** “Which desk helps reduce back pain?”
**Bot:** “Our SmartDesk 2 is ideal for reducing back pain with its sit-stand design and programmable presets.”

**User:** “What’s best for a sales team working from home?”
**Bot:** “I'd recommend the Ergo Chair for posture and Acoustic Panels to improve call clarity.”

---
