
## 🛍️ **Agent #98: Personalized Product Recommendation Agent**

### 📝 Overview

The Personalized Product Recommendation Agent delivers intelligent, real-time suggestions based on user preferences, behavior, and purchase history. Powered by AI and recommendation algorithms, this agent can increase customer satisfaction and sales conversion. In this lab, you’ll build a prototype agent that accepts user input and delivers tailored product recommendations using embeddings and GPT.

---

### 🧪 Lab Objectives

By the end of this lab, you will:

* Load a sample product catalog
* Simulate user preferences or profile
* Generate recommendations using cosine similarity or GPT
* Display recommendations in a clean UI

---

### 🧰 Tech Stack

* **Python**
* **Streamlit**
* **Pandas**
* **OpenAI Embeddings (text-embedding-ada-002)**
* *(Optional: Integrate user click history or collaborative filtering)*

---

### 🧭 Step-by-Step Instructions

#### ✅ Step 1: Environment Setup

```bash
mkdir product_recommendation_agent
cd product_recommendation_agent
python -m venv venv
source venv/bin/activate
pip install streamlit openai pandas scikit-learn
```

---

#### ✅ Step 2: Sample Product Catalog (`products.csv`)

```csv
product_id,title,description
101,Wireless Headphones,Noise-canceling over-ear Bluetooth headphones with 40hr battery life
102,Smart Fitness Watch,Track heart rate, steps, sleep and get health insights
103,Espresso Machine,Brew barista-grade coffee at home with touch controls
104,Laptop Stand,Ergonomic aluminum stand for MacBook and notebooks
105,4K Monitor,Ultra-HD display with wide color gamut for creators
```

---

#### ✅ Step 3: Embedding & Recommendation Logic (`recommend.py`)

```python
import pandas as pd
import openai
from sklearn.metrics.pairwise import cosine_similarity

openai.api_key = "YOUR_API_KEY"

def get_embedding(text):
    response = openai.Embedding.create(
        input=[text], model="text-embedding-ada-002"
    )
    return response["data"][0]["embedding"]

def recommend_products(user_input, products_df):
    user_vec = get_embedding(user_input)
    product_vecs = [get_embedding(desc) for desc in products_df["description"]]

    scores = cosine_similarity([user_vec], product_vecs)[0]
    products_df["score"] = scores
    return products_df.sort_values(by="score", ascending=False).head(3)
```

---

#### ✅ Step 4: Streamlit App (`app.py`)

```python
import streamlit as st
import pandas as pd
from recommend import recommend_products

st.title("🛍️ Personalized Product Recommendation Agent")

user_input = st.text_area("Tell us what you're looking for:", 
                          placeholder="e.g., I need something for my home workouts")
if st.button("Get Recommendations"):
    df = pd.read_csv("products.csv")
    top_products = recommend_products(user_input, df)

    st.subheader("🎯 Top Recommendations:")
    for _, row in top_products.iterrows():
        st.markdown(f"**{row['title']}**")
        st.markdown(f"{row['description']}")
        st.markdown("---")
```

Run:

```bash
streamlit run app.py
```

---

### 🧪 Example Output

**User Input:**
“I want something to help me stay fit and track my workouts”

**Top 3 Recommendations:**

* **Smart Fitness Watch**: Track heart rate, steps, sleep and get health insights
* **Wireless Headphones**: Noise-canceling headphones for workout playlists
* **Laptop Stand**: Ergonomic setup for remote workouts and Zoom sessions

---
