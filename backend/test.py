import google.generativeai as genai
genai.configure(api_key="AIzaSyDZzFWkKhsEhmYgn4lUKWytiSvtQxKcX58")

for m in genai.list_models():
    print(m.name, m.supported_generation_methods)
