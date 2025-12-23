from langchain.agents.factory import create_agent
from llm_connection import llm
from tools_db import get_weather

weather_agent = create_agent(
    model=llm,
    tools=[get_weather],
    system_prompt=(
        "You are a weather assistant. "
        "You MUST call the get_weather tool whenever a city is mentioned."
    ),

)