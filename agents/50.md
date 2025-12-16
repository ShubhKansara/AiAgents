## 🎬 **Agent #50: Video Content Creation Agent**

### 📝 Overview

This agent generates short-form video scripts and storyboard outlines using GPT based on a selected topic, audience, and tone. Optionally, it can auto-generate voiceover scripts, scene descriptions, and caption text. In this lab, you’ll create a video storyboard and script for platforms like YouTube Shorts, TikTok, or Instagram Reels.

---

### 🧪 Lab Objectives

By the end of this lab, you will:

* Select a video topic, audience, and tone
* Generate a 5–7 scene storyboard with GPT
* Create voiceover lines and captions per scene
* Visualize the structure in a Streamlit interface

---

### 🧰 Tech Stack

* **Python**
* **Streamlit**
* **LangChain + GPT-4 or GPT-3.5**

---

### 🧭 Step-by-Step Instructions

#### ✅ Step 1: Environment Setup

```bash
mkdir video_content_agent
cd video_content_agent
python -m venv venv
source venv/bin/activate
pip install openai langchain streamlit
```

---

#### ✅ Step 2: Storyboard Prompt Template (`video_prompt.py`)

```python
from langchain.prompts import PromptTemplate

video_prompt = PromptTemplate.from_template("""
You are a video content strategist.

Generate a storyboard for a short-form video with:
- Topic: {topic}
- Platform: {platform}
- Audience: {audience}
- Tone: {tone}

Create 5–7 scenes. For each scene include:
1. Scene description
2. Voiceover script
3. On-screen text (caption)

Keep it dynamic and under 60 seconds total.
""")
```

---

#### ✅ Step 3: GPT Script Generator (`video_agent.py`)

```python
from video_prompt import video_prompt
from langchain.chat_models import ChatOpenAI

def generate_storyboard(topic, platform, audience, tone):
    llm = ChatOpenAI(temperature=0.6)
    prompt = video_prompt.format(
        topic=topic,
        platform=platform,
        audience=audience,
        tone=tone
    )
    return llm.predict(prompt)
```

---

#### ✅ Step 4: Streamlit Interface (`app.py`)

```python
import streamlit as st
from video_agent import generate_storyboard

st.title("🎬 Video Content Creation Agent")

topic = st.text_input("Video Topic", "AI for Small Business")
platform = st.selectbox("Platform", ["YouTube Shorts", "Instagram Reels", "TikTok"])
audience = st.text_input("Target Audience", "Startup founders")
tone = st.selectbox("Tone", ["Motivational", "Informative", "Funny", "Casual"])

if st.button("Generate Storyboard"):
    storyboard = generate_storyboard(topic, platform, audience, tone)
    st.subheader("📋 Storyboard Output")
    st.text_area("Generated Storyboard", storyboard, height=500)
    st.download_button("Download Script", storyboard, file_name="video_storyboard.txt")
```

Run the app:

```bash
streamlit run app.py
```

---

### 🧪 Example Output:

**Title:** How AI Saves Time for Founders ⏰
**Platform:** Instagram Reels
**Tone:** Informative + Casual
**Audience:** Startup founders

**Scene 1:**
*Description:* Founder juggling emails and spreadsheets
*Voiceover:* "Running a startup is non-stop chaos..."
*Caption:* “Too many tasks, not enough time!”

**Scene 2:**
*Description:* AI tool automates daily planning
*Voiceover:* "But with AI, your morning starts with clarity."
*Caption:* “AI daily planner in action 🧠”

...

**Scene 7:**
*Description:* Smiling founder sipping coffee
*Voiceover:* "Now that’s a productivity upgrade ☕"
*Caption:* “Founders, this is your new co-pilot!”

---