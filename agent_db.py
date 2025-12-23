from langchain.agents.factory import create_agent
from llm_connection import llm
from tools_db import *

weather_agent = create_agent(
    model=llm,
    tools=[get_weather],
    system_prompt=(
        "You are a weather assistant. "
        "You MUST call the get_weather tool whenever a city is mentioned."
    ),
)

lead_agent = create_agent(
    model=llm,
    tools=[search_lead_details],
    system_prompt=(
        "You are a lead details assistant (v2). "
        "You MUST call the search_lead_details tool whenever a user asks for lead details. "
        "Extract any relevant query from the user's message and search for matching leads. "
        "Provide the 5 key details for each matching lead: Name, Country, Profession, Email, OwnerId."
    ),
)