from fastapi import FastAPI
from pydantic import BaseModel
from agent import lead_agent

app = FastAPI()

class QueryRequest(BaseModel):
    query: str

@app.post("/lead")
async def get_lead(request: QueryRequest):
    # Invoke the agent synchronously
    result = lead_agent.invoke({"messages": [{"role": "user", "content": request.query}]})
    return {"response": result["messages"][-1].content}

