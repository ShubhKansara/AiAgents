## 📄 **Agent #35: Automated Proposal Generator**

### 📝 Overview

This agent auto-generates tailored sales proposals based on client data, product details, and pricing rules. It ensures consistency, reduces manual effort, and accelerates closing. In this lab, you’ll simulate a client inquiry and use GPT to generate a customized PDF proposal.

---

### 🧪 Lab Objectives

By the end of this lab, you will:

* Simulate a client’s input (industry, needs, budget)
* Combine it with product and pricing data
* Use GPT to generate a proposal
* Export the proposal to a downloadable PDF using `pdfkit` or `xhtml2pdf`

---

### 🧰 Tech Stack

* **Python**
* **LangChain + GPT-4 or GPT-3.5**
* **Streamlit**
* **PDF generation**: `pdfkit`, `xhtml2pdf`, or `reportlab`

---

### 🧭 Step-by-Step Instructions

#### ✅ Step 1: Environment Setup

```bash
mkdir proposal_generator_agent
cd proposal_generator_agent
python -m venv venv
source venv/bin/activate
pip install openai langchain streamlit pdfkit
brew install wkhtmltopdf  # For macOS (or apt-get install for Linux)
```

---

#### ✅ Step 2: Define Client & Product Info (`client_data.py`)

```python
client_profile = {
    "Client Name": "NextData Inc.",
    "Industry": "Analytics & Cloud",
    "Needs": "Reduce cloud costs, increase DevOps automation",
    "Budget": "$50,000"
}

products = {
    "Cloud Optimization": "Analyzes multi-cloud spend and recommends actions",
    "DevOps Toolkit": "CI/CD pipelines, monitoring, and anomaly alerts"
}

def get_client_and_products():
    return client_profile, products
```

---

#### ✅ Step 3: GPT Prompt Template (`proposal_prompt.py`)

```python
from langchain.prompts import PromptTemplate

proposal_prompt = PromptTemplate.from_template("""
You are an enterprise proposal generator.

Client: {client_name}  
Industry: {industry}  
Needs: {needs}  
Budget: {budget}  
Products Offered:
{product_info}

Write a 1-page sales proposal with:
1. Executive Summary
2. Recommended Solutions
3. Estimated Cost
4. Contact CTA

Use a professional tone.
""")
```

---

#### ✅ Step 4: Proposal Generator Logic (`proposal_agent.py`)

```python
from client_data import get_client_and_products
from proposal_prompt import proposal_prompt
from langchain.chat_models import ChatOpenAI

def generate_proposal():
    client, products = get_client_and_products()
    product_info = "\n".join([f"- {name}: {desc}" for name, desc in products.items()])
    
    prompt = proposal_prompt.format(
        client_name=client["Client Name"],
        industry=client["Industry"],
        needs=client["Needs"],
        budget=client["Budget"],
        product_info=product_info
    )

    llm = ChatOpenAI(temperature=0.4)
    proposal_text = llm.predict(prompt)
    return proposal_text
```

---

#### ✅ Step 5: Streamlit Interface + PDF Download (`app.py`)

```python
import streamlit as st
import pdfkit
from proposal_agent import generate_proposal

st.title("📄 Automated Proposal Generator")

if st.button("Generate Proposal"):
    proposal = generate_proposal()
    st.text_area("Generated Proposal", proposal, height=400)

    with open("proposal.html", "w") as f:
        f.write(f"<html><body><pre>{proposal}</pre></body></html>")

    pdfkit.from_file("proposal.html", "proposal.pdf")
    with open("proposal.pdf", "rb") as f:
        st.download_button("Download Proposal PDF", f, "proposal.pdf", "application/pdf")
```

Run the app:

```bash
streamlit run app.py
```

---

### 🧪 Example Output (GPT):

**Executive Summary**
NextData Inc. seeks to reduce cloud expenses and improve DevOps efficiency. Our proposal combines Cloud Optimization and DevOps Toolkit to meet these goals within a \$50,000 budget.

**Recommended Solutions**

* Cloud Optimization for real-time multi-cloud spend management
* DevOps Toolkit to automate deployment and monitoring

**Estimated Cost**: \$47,000
**Next Step**: Schedule a demo via \[email/phone]

---

