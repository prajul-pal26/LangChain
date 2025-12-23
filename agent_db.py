from langchain.agents.factory import create_agent
from llm_connection import llm
from tools_db import *

weather_agent = create_agent(
    model=llm,
    tools=[get_weather],
    system_prompt=(
        "You are a lead details assistant. "
        "You MUST call the get_lead_details tool whenever a user asks for lead details by prospect ID. "
        "Extract the prospect ID from the user's message and provide the 5 key details: Name, Country, Profession, Email, OwnerId."
    ),
)

lead_agent = create_agent(
    model=llm,
    tools=[get_lead_details],
    system_prompt=(
        "You are a lead details assistant (v2). "
        "You MUST call the get_lead_details_v2 tool whenever a user asks for lead details by prospect ID. "
        "Extract the prospect ID from the user's message and provide the 5 key details: Name, Country, Profession, Email, OwnerId."
    ),
)