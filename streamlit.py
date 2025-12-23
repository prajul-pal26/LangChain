import streamlit as st
import time
from agent_db import *
from langchain_core.messages import AIMessage

st.title("Weather Agent")

query = st.text_input("Ask about weather")

if query:
    result = weather_agent.invoke({
        "messages": [
            {"role": "user", "content": query}
        ]
    })

    st.write(result["messages"][-1].content)


st.title("Lead Details Agent")

query = st.text_input("Ask for lead details by prospect ID")

if query:
    placeholder = st.empty()
    full_response = ""

    for chunk in lead_agent.stream({
        "messages": [
            {"role": "user", "content": query}
        ]
    }, stream_mode="updates"):
        for node, updates in chunk.items():
            if "messages" in updates:
                for msg in updates["messages"]:
                    if isinstance(msg, AIMessage) and msg.content:
                        for char in msg.content:
                            full_response += char
                            placeholder.markdown(full_response)
                            time.sleep(0.05)  # Adjust speed as needed