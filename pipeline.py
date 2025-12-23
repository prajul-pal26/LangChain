from agent_db import *


weather_finder = weather_agent.invoke(
    {"messages": [{"role": "user", "content": "What is the weather in New York?"}]}
)
print(weather_finder["messages"][-1].content)