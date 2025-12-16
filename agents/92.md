
## 🔎 **Agent #92: AI-powered Search Agent**

### 📝 Overview

The AI-powered Search Agent enhances traditional search functionality by offering context-aware, natural language query handling across enterprise documents, emails, reports, and wikis. Instead of keyword matching, it uses semantic search to understand intent and retrieve the most relevant answers. In this lab, you’ll build an agent that indexes internal documents and answers user questions using GPT and vector search.

---

### 🧪 Lab Objectives

By the end of this lab, you will:

* Load and embed company documents (PDFs, text files, or markdown)
* Use a vector database for fast retrieval
* Ask natural language queries and get GPT-generated answers
* Provide source snippets to build trust and traceability

---

### 🧰 Tech Stack

* **Python**
* **Streamlit**
* **LangChain + GPT-4 or GPT-3.5**
* **FAISS (or Chroma) for document embeddings**
* *(Optional: PDF parser, file upload, multi-language support)*

---

### 🧭 Step-by-Step Instructions

#### ✅ Step 1: Environment Setup

```bash
mkdir ai_search_agent
cd ai_search_agent
python -m venv venv
source venv/bin/activate
pip install streamlit langchain openai faiss-cpu tiktoken PyPDF2
```

---

#### ✅ Step 2: Sample Document Folder (`docs/`)

Add company documents (e.g., policies, procedures, FAQs) in `.txt` or `.pdf`.

---

#### ✅ Step 3: Document Loader and Embedder (`embed_docs.py`)

```python
from langchain.document_loaders import PyPDFLoader, TextLoader
from langchain.text_splitter import CharacterTextSplitter
from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import FAISS
import os

documents = []
for file in os.listdir("docs"):
    if file.endswith(".pdf"):
        documents.extend(PyPDFLoader(f"docs/{file}").load())
    elif file.endswith(".txt"):
        documents.extend(TextLoader(f"docs/{file}").load())

splitter = CharacterTextSplitter(chunk_size=700, chunk_overlap=100)
chunks = splitter.split_documents(documents)

embedding_model = OpenAIEmbeddings()
db = FAISS.from_documents(chunks, embedding_model)
db.save_local("search_index")
```

Run:

```bash
python embed_docs.py
```

---

#### ✅ Step 4: GPT Search Logic (`search_agent.py`)

```python
from langchain.vectorstores import FAISS
from langchain.embeddings import OpenAIEmbeddings
from langchain.chains import RetrievalQA
from langchain.chat_models import ChatOpenAI

def query_documents(query):
    db = FAISS.load_local("search_index", OpenAIEmbeddings())
    retriever = db.as_retriever(search_type="similarity", k=3)
    llm = ChatOpenAI(temperature=0.2)
    qa_chain = RetrievalQA.from_chain_type(llm=llm, retriever=retriever)
    return qa_chain.run(query)
```

---

#### ✅ Step 5: Streamlit Interface (`app.py`)

```python
import streamlit as st
from search_agent import query_documents

st.title("🔎 AI-powered Enterprise Search Agent")
st.caption("Ask questions across internal files, policies, or wikis")

query = st.text_input("Enter your question (e.g., What is the PTO policy?)")

if query:
    result = query_documents(query)
    st.subheader("📑 AI-Generated Answer")
    st.text_area("Search Response", result, height=500)
```

Run:

```bash
streamlit run app.py
```

---

### 🧪 Example Use Case

**User Input:**
“What are the rules around remote work reimbursement?”

**GPT Output (Excerpt):**

```
According to the policy dated May 2024, employees working remotely are eligible for up to $200/month in home office reimbursement, covering internet, ergonomic chairs, and lighting. Claims must be submitted by the 5th of the following month with receipts.

Source: RemoteWorkPolicy2024.pdf, page 3
```

---

