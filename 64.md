
## 🎙️ **Agent #64: Voice Analytics Agent**

### 📝 Overview

This agent analyzes audio from customer support calls or meetings to extract key insights like speaker sentiment, call intent, interruptions, and action items. It transcribes the call, performs sentiment tagging, and summarizes outcomes using GPT. In this lab, we’ll use pre-recorded audio, convert it to text (via Whisper or SpeechRecognition), and feed it to GPT for analysis.

---

### 🧪 Lab Objectives

By the end of this lab, you will:

* Upload a customer support call (MP3/WAV)
* Transcribe the audio into text
* Use GPT to extract call insights and sentiment
* View a structured summary and recommended actions

---

### 🧰 Tech Stack

* **Python**
* **Streamlit**
* **OpenAI Whisper or `whisper` Python package**
* **LangChain + GPT-4 or GPT-3.5**

---

### 🧭 Step-by-Step Instructions

#### ✅ Step 1: Environment Setup

```bash
mkdir voice_analytics_agent
cd voice_analytics_agent
python -m venv venv
source venv/bin/activate
pip install streamlit openai langchain whisper
```

---

#### ✅ Step 2: Download Whisper Model (Optional)

```bash
# Optional: If using whisper locally
import whisper
model = whisper.load_model("base")
```

---

#### ✅ Step 3: Transcription Logic (`transcribe.py`)

```python
import whisper

def transcribe_audio(file_path):
    model = whisper.load_model("base")
    result = model.transcribe(file_path)
    return result["text"]
```

---

#### ✅ Step 4: GPT Call Summary Prompt (`call_summary_prompt.py`)

```python
from langchain.prompts import PromptTemplate

call_summary_prompt = PromptTemplate.from_template("""
You are an AI voice analytics agent.

Here is the transcript of a customer support call:
"{transcript}"

Extract and respond with:
1. Call intent
2. Customer sentiment (Positive, Neutral, Negative)
3. Key concerns raised
4. Recommended follow-up action

Be professional and concise.
""")
```

---

#### ✅ Step 5: GPT Analysis (`voice_agent.py`)

```python
from langchain.chat_models import ChatOpenAI
from call_summary_prompt import call_summary_prompt

def analyze_transcript(transcript):
    llm = ChatOpenAI(temperature=0.3)
    prompt = call_summary_prompt.format(transcript=transcript)
    return llm.predict(prompt)
```

---

#### ✅ Step 6: Streamlit App (`app.py`)

```python
import streamlit as st
from transcribe import transcribe_audio
from voice_agent import analyze_transcript
import tempfile

st.title("🎙️ Voice Analytics Agent")
st.caption("Analyze calls for sentiment, intent, and action items")

audio_file = st.file_uploader("Upload an MP3 or WAV file", type=["mp3", "wav"])

if audio_file:
    with tempfile.NamedTemporaryFile(delete=False, suffix=".wav") as tmp:
        tmp.write(audio_file.read())
        tmp_path = tmp.name

    with st.spinner("Transcribing..."):
        transcript = transcribe_audio(tmp_path)

    st.subheader("📝 Transcript")
    st.text_area("Call Transcript", transcript, height=200)

    if st.button("Analyze Call"):
        with st.spinner("Analyzing..."):
            result = analyze_transcript(transcript)
        st.subheader("🧠 Call Insights")
        st.text_area("GPT Analysis", result, height=300)
```

Run the app:

```bash
streamlit run app.py
```

---

### 🧪 Example Output

**Transcript Snippet:**
*"I’ve been trying to resolve a billing issue for weeks. No one’s responding to my emails!"*

**GPT Response:**

```
- Intent: Resolve a billing issue
- Sentiment: Negative
- Key Concerns: Unresponsive support, unresolved charges
- Recommendation: Escalate to billing supervisor, respond within 24 hours
```

---
