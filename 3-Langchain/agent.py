from langchain.agents.factory import create_agent
from model_connection import llm_openrouter
from 3-Langchain.tools import get_weather

weather_agent = create_agent(
    model=llm_openrouter,
    tools=[get_weather],
    system_prompt=(
        "You are a weather assistant. "
        "You MUST call the get_weather tool whenever a city is mentioned."
    ),
)
