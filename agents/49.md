## 📱 **Agent #49: Social Media Engagement Agent**

### 📝 Overview

This agent generates and schedules engaging posts across platforms (Twitter, LinkedIn, Instagram), customized by audience, tone, and event type. It also suggests hashtags and responds to user comments or mentions using sentiment-aware responses. In this lab, you'll create post templates, generate GPT-driven posts, and simulate comment replies.

---

### 🧪 Lab Objectives

By the end of this lab, you will:

* Generate platform-specific social media posts using GPT
* Customize tone, format, hashtags, and emojis
* Simulate post comment responses using GPT sentiment logic
* Visualize a posting calendar interface in Streamlit

---

### 🧰 Tech Stack

* **Python**
* **Streamlit**
* **LangChain + GPT-4 or GPT-3.5**
* *(Optional)* Scheduling/Publishing APIs like Buffer, Hootsuite, or Zapier

---

### 🧭 Step-by-Step Instructions

#### ✅ Step 1: Environment Setup

```bash
mkdir social_engagement_agent
cd social_engagement_agent
python -m venv venv
source venv/bin/activate
pip install streamlit openai langchain pandas
```

---

#### ✅ Step 2: Create Post Template Prompt (`post_prompt.py`)

```python
from langchain.prompts import PromptTemplate

post_prompt = PromptTemplate.from_template("""
You are a social media strategist.

Create a {platform} post for:
- Topic: {topic}
- Goal: {goal}
- Audience: {audience}
- Tone: {tone}

Include a CTA, 2-3 relevant hashtags, and an emoji or two.
Keep it within platform constraints (e.g., Twitter = 280 characters).
""")
```

---

#### ✅ Step 3: Comment Reply Prompt (`comment_reply_prompt.py`)

```python
from langchain.prompts import PromptTemplate

comment_prompt = PromptTemplate.from_template("""
You are a social media community manager.

Given this user comment: "{comment}"  
Respond in a {tone} tone, appropriate to its sentiment ({sentiment}).

Keep the reply short, human, and on-brand.
""")
```

---

#### ✅ Step 4: GPT Post Generator (`social_agent.py`)

```python
from langchain.chat_models import ChatOpenAI
from post_prompt import post_prompt
from comment_reply_prompt import comment_prompt

llm = ChatOpenAI(temperature=0.6)

def generate_post(platform, topic, goal, audience, tone):
    prompt = post_prompt.format(platform=platform, topic=topic, goal=goal, audience=audience, tone=tone)
    return llm.predict(prompt)

def respond_to_comment(comment, sentiment, tone):
    prompt = comment_prompt.format(comment=comment, sentiment=sentiment, tone=tone)
    return llm.predict(prompt)
```

---

#### ✅ Step 5: Streamlit App (`app.py`)

```python
import streamlit as st
from social_agent import generate_post, respond_to_comment

st.title("📱 Social Media Engagement Agent")

st.subheader("🎯 Post Generator")
platform = st.selectbox("Platform", ["Twitter", "LinkedIn", "Instagram"])
topic = st.text_input("Topic", "AI in Education")
goal = st.selectbox("Goal", ["Brand Awareness", "Event Promo", "Product Launch", "Lead Generation"])
audience = st.text_input("Audience", "EdTech CEOs and Product Managers")
tone = st.selectbox("Tone", ["Friendly", "Professional", "Witty", "Inspirational"])

if st.button("Generate Post"):
    post = generate_post(platform, topic, goal, audience, tone)
    st.text_area("Generated Post", post, height=200)

st.subheader("💬 Comment Reply Generator")
user_comment = st.text_input("User Comment", "This tool saved me hours of work!")
sentiment = st.selectbox("Comment Sentiment", ["positive", "neutral", "negative"])
reply_tone = st.selectbox("Reply Tone", ["Supportive", "Playful", "Grateful", "Empathetic"])

if st.button("Generate Reply"):
    reply = respond_to_comment(user_comment, sentiment, reply_tone)
    st.text_area("Generated Reply", reply, height=150)
```

Run the app:

```bash
streamlit run app.py
```

---

### 🧪 Example Output

**Post (Twitter):**
Just launched our AI-powered course builder for educators! 🎓
Start building smarter today 👉 \[link]
\#AIinEducation #EdTech 🚀

**Reply (to positive comment):**
Thank you so much! We're thrilled it's been helpful 🙌 Stay tuned for even more updates soon!

---