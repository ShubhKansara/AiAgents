
## 🧠 **Agent #59: Software Recommendation Agent**

### 📝 Overview

This agent suggests the most suitable software tools based on user needs—e.g., project management, design, accounting, or CRM—by comparing feature sets, costs, integrations, and user personas. GPT interprets natural language queries and recommends tailored software options with reasons. In this lab, you’ll build a GPT-powered assistant that takes in use cases and outputs software suggestions.

---

### 🧪 Lab Objectives

By the end of this lab, you will:

* Accept user queries describing their software needs
* Use GPT to recommend relevant tools with justification
* Display alternatives and decision factors
* Enable download of recommendation reports

---

### 🧰 Tech Stack

* **Python**
* **Streamlit**
* **LangChain + GPT-4 or GPT-3.5**

---

### 🧭 Step-by-Step Instructions

#### ✅ Step 1: Environment Setup

```bash
mkdir software_recommendation_agent
cd software_recommendation_agent
python -m venv venv
source venv/bin/activate
pip install streamlit openai langchain
```

---

#### ✅ Step 2: Prompt Template for Recommendations (`recommend_prompt.py`)

```python
from langchain.prompts import PromptTemplate

recommend_prompt = PromptTemplate.from_template("""
You are a software consultant.

User requirements:
"{user_needs}"

1. Recommend 2-3 software tools
2. Explain why each fits the need (features, cost, integrations)
3. Mention potential trade-offs or limitations

Format your response professionally and clearly.
""")
```

---

#### ✅ Step 3: GPT Recommendation Engine (`recommend_agent.py`)

```python
from langchain.chat_models import ChatOpenAI
from recommend_prompt import recommend_prompt

def get_software_recommendation(user_needs: str):
    llm = ChatOpenAI(temperature=0.3)
    prompt = recommend_prompt.format(user_needs=user_needs)
    return llm.predict(prompt)
```

---

#### ✅ Step 4: Streamlit UI (`app.py`)

```python
import streamlit as st
from recommend_agent import get_software_recommendation

st.title("🧠 Software Recommendation Agent")
st.caption("Describe what you're looking for, and get the right tools")

user_input = st.text_area(
    "Describe your use case:", 
    "We need a project management tool for a remote team of 10 with task tracking, file sharing, and calendar integration."
)

if st.button("Get Recommendations"):
    result = get_software_recommendation(user_input)
    st.subheader("📋 Recommended Tools")
    st.text_area("GPT Suggestions", result, height=400)
    st.download_button("Download Report", result, file_name="software_recommendation.txt")
```

Run the app:

```bash
streamlit run app.py
```

---

### 🧪 Example Output

**User Input:**
"We need an accounting tool for a small startup that integrates with Stripe and supports multi-currency billing."

**GPT Response:**

```
1. **Xero** – Cloud-based, integrates with Stripe, supports multi-currency, and is ideal for startups. Easy to use and affordable.

2. **QuickBooks Online** – Offers robust accounting, multi-currency support, and strong reporting. Slightly more expensive but better for scalability.

3. **Zoho Books** – Good for automation, supports integrations, but may lack some advanced features of QuickBooks.

Trade-offs: Xero has great usability but fewer customization options. Zoho is cheaper but may not scale as well.
```

---