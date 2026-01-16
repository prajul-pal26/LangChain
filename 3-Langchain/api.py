from fastapi import FastAPI
from pydantic import BaseModel
from agent import weather_agent

app = FastAPI()

@app.post("/weather")
async def get_weather(city: str):
    # Invoke the agent synchronously
    result = weather_agent.invoke({"messages": [{"role": "user", "content": f"Get weather for {city}"}]})
    return {"response": result["messages"][-1].content}

