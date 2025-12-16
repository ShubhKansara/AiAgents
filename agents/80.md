## 🧠 **Agent #80: AI-powered Knowledge Management Agent**

### 📝 Overview

This agent ingests internal documentation, wikis, meeting notes, and SOPs to create a smart knowledge base. It enables employees to query company knowledge using natural language, surfacing accurate, context-aware answers. In this lab, you’ll build a chatbot that indexes documents and responds to user queries using GPT and embeddings.

---

### 🧪 Lab Objectives

By the end of this lab, you will:

* Upload internal documents (PDFs, text, Markdown)
* Generate vector embeddings for semantic search
* Query the knowledge base via natural language
* Use GPT to provide context-rich answers

---

### 🧰 Tech Stack

* **Python**
* **Streamlit**
* **LangChain + OpenAI Embeddings + GPT-4/3.5**
* **FAISS (or ChromaDB) for vector search**
* *(Optional: Pinecone or Weaviate for external vector DBs)*

---

### 🧭 Step-by-Step Instructions

#### ✅ Step 1: Environment Setup

```bash
mkdir knowledge_agent
cd knowledge_agent
python -m venv venv
source venv/bin/activate
pip install streamlit langchain openai faiss-cpu tiktoken
```

---

#### ✅ Step 2: Upload Sample Docs

Put your `.md`, `.txt`, or `.pdf` files into a folder:

```
knowledge_agent/
│
├── docs/
│   ├── onboarding.md
│   ├── expense_policy.txt
│   └── product_faq.txt
```

---

#### ✅ Step 3: Ingest and Embed (`embed_docs.py`)

```python
import os
from langchain.document_loaders import TextLoader
from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import FAISS
from langchain.text_splitter import CharacterTextSplitter

def ingest_docs():
    docs = []
    for filename in os.listdir("docs"):
        if filename.endswith(".txt") or filename.endswith(".md"):
            loader = TextLoader(os.path.join("docs", filename))
            docs.extend(loader.load())

    splitter = CharacterTextSplitter(chunk_size=1000, chunk_overlap=100)
    chunks = splitter.split_documents(docs)

    embeddings = OpenAIEmbeddings()
    vectorstore = FAISS.from_documents(chunks, embeddings)
    vectorstore.save_local("kb_index")
```

Run this once:

```bash
python embed_docs.py
```

---

#### ✅ Step 4: GPT-Powered QA (`knowledge_agent.py`)

```python
from langchain.vectorstores import FAISS
from langchain.embeddings import OpenAIEmbeddings
from langchain.chains import RetrievalQA
from langchain.chat_models import ChatOpenAI

def create_qa_chain():
    embeddings = OpenAIEmbeddings()
    db = FAISS.load_local("kb_index", embeddings)
    retriever = db.as_retriever(search_type="similarity", k=3)

    llm = ChatOpenAI(temperature=0)
    chain = RetrievalQA.from_chain_type(llm=llm, retriever=retriever)
    return chain
```

---

#### ✅ Step 5: Streamlit App (`app.py`)

```python
import streamlit as st
from knowledge_agent import create_qa_chain

st.title("🧠 AI Knowledge Management Agent")
st.caption("Ask anything from your internal documents")

query = st.text_input("❓ Ask a question")
if query:
    chain = create_qa_chain()
    response = chain.run(query)
    st.markdown(f"**Answer:** {response}")
```

Run the app:

```bash
streamlit run app.py
```

---

### 🧪 Example Queries

* “What is the reimbursement policy for remote employees?”
* “Summarize the onboarding checklist for new hires.”
* “What’s the SLA for internal ticket handling?”

---

