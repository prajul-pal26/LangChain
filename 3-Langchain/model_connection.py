from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_google_genai import ChatGoogleGenerativeAI
from dotenv import load_dotenv
import os

load_dotenv()

# OpenRouter API Key
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
'1--------------------------------------------------------------------------------language model connection'

llm_openrouter = ChatOpenAI(
    model="mistralai/mistral-7b-instruct:free",
    base_url="https://openrouter.ai/api/v1",
    api_key=OPENROUTER_API_KEY,
    temperature=0
)
# result = llm_openrouter.invoke("What is the capital of India?")
# print(result.content)

'3--------------------------------------------------------------------------------embeddings model connection'
embeddings_model = OpenAIEmbeddings(model="openai/text-embedding-3-small",
                                    dimensions=32,
                                    base_url="https://openrouter.ai/api/v1",
                                    api_key=OPENROUTER_API_KEY)
# result = embeddings_model.embed_query("What is the capital of India?")
# print(result)

'4-------------------------------------------------------------------embeddings model connection for document embeddings'
embeddings_model = OpenAIEmbeddings(model="openai/text-embedding-3-small",
                                    dimensions=32,
                                    base_url="https://openrouter.ai/api/v1",
                                    api_key=OPENROUTER_API_KEY)
document = ["LangChain is a framework for developing applications powered by language models.",
            "It enables developers to build robust and scalable applications that leverage the capabilities of large language models.",
            "LangChain provides a suite of tools and abstractions to facilitate the integration of language models into various applications."]
# result = embeddings_model.embed_documents(document)
# print(result)
