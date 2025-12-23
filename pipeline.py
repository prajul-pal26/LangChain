from agent_db import *


# weather_finder = weather_agent.invoke(
#     {"messages": [{"role": "user", "content": "What is the weather in New York?"}]}
# )
lead_finder = lead_agent.invoke(
    {"messages": [{"role": "user", "content": "91ec4c1d-f14b-42cd-9dc6-3a9ad0bbe2c4"}]}
)

if __name__ == "__main__":
    print(lead_finder["messages"][-1].content)