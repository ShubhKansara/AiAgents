
## 🗒️ **Agent #91: AI Meeting Notes Agent**

### 📝 Overview

The AI Meeting Notes Agent automatically transcribes, summarizes, and organizes meeting conversations into structured action items, decisions, and key points. It improves productivity by eliminating manual note-taking and enabling better follow-through. In this lab, you'll build a web app that accepts audio recordings, uses speech-to-text and GPT to summarize meetings into bullet points.

---

### 🧪 Lab Objectives

By the end of this lab, you will:

* Upload a meeting audio file (.mp3/.wav)
* Transcribe it using OpenAI Whisper API (or any STT engine)
* Use GPT to generate summaries with action items
* Export/share the notes in Markdown or plain text

---

### 🧰 Tech Stack

* **Python**
* **Streamlit**
* **OpenAI Whisper (for STT)**
* **LangChain + GPT-4 or GPT-3.5**
* *(Optional: AssemblyAI/Deepgram/Google STT alternative)*

---

### 🧭 Step-by-Step Instructions

#### ✅ Step 1: Environment Setup

```bash
mkdir ai_meeting_notes
cd ai_meeting_notes
python -m venv venv
source venv/bin/activate
pip install streamlit openai langchain pydub
```

---

#### ✅ Step 2: Upload Audio + Transcription (`transcribe_audio.py`)

```python
import openai
from pydub import AudioSegment
import os

def transcribe_audio(file_path):
    audio = AudioSegment.from_file(file_path)
    audio.export("temp.wav", format="wav")

    with open("temp.wav", "rb") as audio_file:
        transcript = openai.Audio.transcribe("whisper-1", audio_file)
    os.remove("temp.wav")
    return transcript["text"]
```

---

#### ✅ Step 3: GPT Meeting Summarizer (`summarizer.py`)

```python
from langchain.chat_models import ChatOpenAI

def summarize_meeting(transcript):
    llm = ChatOpenAI(temperature=0.3)
    prompt = f"""
    Summarize the following meeting transcript into:
    1. Key Discussion Points
    2. Decisions Made
    3. Action Items with Owners
    4. Next Steps

    Transcript:
    {transcript}
    """
    return llm.predict(prompt)
```

---

#### ✅ Step 4: Streamlit App (`app.py`)

```python
import streamlit as st
from transcribe_audio import transcribe_audio
from summarizer import summarize_meeting

st.title("🗒️ AI Meeting Notes Agent")
st.caption("Turn your meeting audio into actionable notes")

audio_file = st.file_uploader("Upload your meeting recording (.mp3/.wav)", type=["mp3", "wav"])

if audio_file:
    with open("uploaded_audio", "wb") as f:
        f.write(audio_file.read())
    st.info("Transcribing audio...")
    transcript = transcribe_audio("uploaded_audio")
    st.success("Transcription complete!")
    st.text_area("📝 Transcript", transcript, height=200)

    st.info("Summarizing meeting...")
    summary = summarize_meeting(transcript)
    st.subheader("📋 AI-Generated Meeting Notes")
    st.text_area("Meeting Summary", summary, height=500)
    st.download_button("Download Notes", data=summary, file_name="meeting_notes.md")
```

Run the app:

```bash
streamlit run app.py
```

---

### 🧪 Example Output

**Transcript (excerpt):**
“Let’s launch the new feature by Friday. Alex will handle QA. Priya will update the landing page.”

**GPT Output:**

```
1. Key Discussion Points:
   - Launch timeline for new feature
   - Marketing prep for landing page update
   - QA assignment and readiness

2. Decisions Made:
   - Go-live date confirmed: Friday

3. Action Items:
   - Alex: Complete QA by Thursday
   - Priya: Finalize and publish landing page

4. Next Steps:
   - Review KPIs post-launch next Monday
```

---

