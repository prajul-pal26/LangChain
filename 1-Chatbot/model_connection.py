from langchain_openai import ChatOpenAI
from dotenv import load_dotenv
import os

load_dotenv()

# OpenRouter API Key
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
'1--------------------------------------------------------------------------------language model connection'

llm_openrouter = ChatOpenAI(
    model="mistralai/mistral-7b-instruct",
    base_url="https://openrouter.ai/api/v1",
    api_key=OPENROUTER_API_KEY,
    temperature=0
)
# result = llm_openrouter.invoke("What is the capital of India?")
# print(result.content)
