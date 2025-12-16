
## 🔍 **Agent #83: AI-powered E-Discovery Agent**

### 📝 Overview

The AI-powered E-Discovery Agent streamlines the process of identifying, collecting, and analyzing digital evidence for legal or compliance investigations. It scans emails, documents, and logs to detect relevant communications, sensitive terms, or legal triggers. In this lab, you'll build an agent that ingests documents and extracts relevant information based on a legal query.

---

### 🧪 Lab Objectives

By the end of this lab, you will:

* Upload document files (emails, memos, text)
* Input a legal discovery keyword or query
* Use semantic search to extract relevant content
* Generate GPT-based summaries for legal review

---

### 🧰 Tech Stack

* **Python**
* **Streamlit**
* **LangChain + GPT-4 or GPT-3.5**
* **FAISS for vector search**
* *(Optional: Use OCR for image-based files)*

---

### 🧭 Step-by-Step Instructions

#### ✅ Step 1: Environment Setup

```bash
mkdir ediscovery_agent
cd ediscovery_agent
python -m venv venv
source venv/bin/activate
pip install streamlit langchain openai faiss-cpu tiktoken
```

---

#### ✅ Step 2: Sample Documents Folder (`evidence/`)

Create a folder with example `.txt` or `.md` documents:

```
Subject: Vendor Termination  
We’ve reviewed the contract and due to breach, we will terminate the agreement with Beta Inc as of July 1st.

Subject: Data Breach  
IT confirmed unauthorized access occurred on June 10. We may need to notify customers under GDPR.
```

---

#### ✅ Step 3: Document Embedding (`embed_docs.py`)

```python
import os
from langchain.document_loaders import TextLoader
from langchain.text_splitter import CharacterTextSplitter
from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import FAISS

def embed_documents():
    docs = []
    for fname in os.listdir("evidence"):
        if fname.endswith(".txt") or fname.endswith(".md"):
            loader = TextLoader(f"evidence/{fname}")
            docs.extend(loader.load())

    splitter = CharacterTextSplitter(chunk_size=800, chunk_overlap=100)
    chunks = splitter.split_documents(docs)

    embedding = OpenAIEmbeddings()
    vectordb = FAISS.from_documents(chunks, embedding)
    vectordb.save_local("ediscovery_index")
```

Run:

```bash
python embed_docs.py
```

---

#### ✅ Step 4: GPT Search Logic (`ediscovery_agent.py`)

```python
from langchain.vectorstores import FAISS
from langchain.embeddings import OpenAIEmbeddings
from langchain.chains import RetrievalQA
from langchain.chat_models import ChatOpenAI

def create_discovery_chain():
    db = FAISS.load_local("ediscovery_index", OpenAIEmbeddings())
    retriever = db.as_retriever(search_type="similarity", k=3)
    llm = ChatOpenAI(temperature=0)
    return RetrievalQA.from_chain_type(llm=llm, retriever=retriever)
```

---

#### ✅ Step 5: Streamlit Interface (`app.py`)

```python
import streamlit as st
from ediscovery_agent import create_discovery_chain

st.title("🔍 AI-Powered E-Discovery Agent")
st.caption("Search internal documents for legal or compliance discovery")

query = st.text_input("🔎 Enter keyword or legal issue (e.g., termination, GDPR breach)")

if query:
    chain = create_discovery_chain()
    response = chain.run(query)
    st.markdown("### 📄 Extracted Insight")
    st.text_area("Relevant Content Summary", response, height=300)
```

Run the app:

```bash
streamlit run app.py
```

---

### 🧪 Example Use Case

**Query:** “GDPR breach”
**Response:**

```
- Detected email mentioning unauthorized data access on June 10.
- Suggests GDPR notification obligation may apply.
- Mentions IT confirmation of the breach.
```

---
