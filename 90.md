## 📖 **Agent #90: Compliance Knowledge Assistant**

### 📝 Overview

The Compliance Knowledge Assistant serves as an on-demand advisor for regulatory and internal compliance queries. It helps employees, auditors, and legal teams instantly retrieve and understand compliance rules, definitions, and protocols across frameworks like GDPR, SOX, HIPAA, or internal policies. In this lab, you’ll build a chatbot that answers compliance-related questions by searching through a regulation document database using GPT.

---

### 🧪 Lab Objectives

By the end of this lab, you will:

* Load compliance documents (GDPR, HIPAA, etc.)
* Embed the documents for fast semantic search
* Ask GPT natural language questions about policy details
* Retrieve answers with citations and source snippets

---

### 🧰 Tech Stack

* **Python**
* **Streamlit**
* **LangChain + GPT-4 or GPT-3.5**
* **FAISS for search**
* *(Optional: Document upload support for internal policies)*

---

### 🧭 Step-by-Step Instructions

#### ✅ Step 1: Environment Setup

```bash
mkdir compliance_knowledge_agent
cd compliance_knowledge_agent
python -m venv venv
source venv/bin/activate
pip install streamlit langchain openai faiss-cpu
```

---

#### ✅ Step 2: Sample Regulation File (`docs/gdpr_excerpt.txt`)

```text
Article 5(1)(b): Personal data shall be collected for specified, explicit and legitimate purposes and not further processed in a manner that is incompatible with those purposes.
...
Article 15: The data subject shall have the right to obtain from the controller confirmation as to whether or not personal data concerning them is being processed...
```

---

#### ✅ Step 3: Embed the Documents (`embed_docs.py`)

```python
from langchain.document_loaders import TextLoader
from langchain.text_splitter import CharacterTextSplitter
from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import FAISS
import os

docs = []
for file in os.listdir("docs"):
    if file.endswith(".txt"):
        loader = TextLoader(f"docs/{file}")
        docs.extend(loader.load())

splitter = CharacterTextSplitter(chunk_size=600, chunk_overlap=100)
chunks = splitter.split_documents(docs)

embeddings = OpenAIEmbeddings()
db = FAISS.from_documents(chunks, embeddings)
db.save_local("compliance_index")
```

Run:

```bash
python embed_docs.py
```

---

#### ✅ Step 4: GPT Answer Retrieval (`qa_agent.py`)

```python
from langchain.vectorstores import FAISS
from langchain.embeddings import OpenAIEmbeddings
from langchain.chains import RetrievalQA
from langchain.chat_models import ChatOpenAI

def ask_compliance_question(question):
    db = FAISS.load_local("compliance_index", OpenAIEmbeddings())
    retriever = db.as_retriever(search_type="similarity", k=3)
    llm = ChatOpenAI(temperature=0.2)
    chain = RetrievalQA.from_chain_type(llm=llm, retriever=retriever)
    return chain.run(question)
```

---

#### ✅ Step 5: Streamlit UI (`app.py`)

```python
import streamlit as st
from qa_agent import ask_compliance_question

st.title("📖 Compliance Knowledge Assistant")
st.caption("Ask your internal compliance or regulatory policy questions")

question = st.text_input("Enter your question (e.g., What are GDPR consent requirements?)")

if question:
    answer = ask_compliance_question(question)
    st.subheader("🧠 Answer")
    st.text_area("GPT Compliance Explanation", answer, height=400)
```

Run:

```bash
streamlit run app.py
```

---

### 🧪 Example Use Case

**User Input:**
“What does GDPR say about the right to be informed?”

**GPT Output (Excerpt):**

```
Under Article 13 and 14 of GDPR, data subjects must be informed of the identity of the data controller, the purposes of processing, and their rights. This information must be provided at the time of data collection or within a reasonable period.

Relevant section: Article 13 — Information to be provided where personal data are collected from the data subject.
```

---

