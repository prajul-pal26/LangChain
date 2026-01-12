import sys
import os
import streamlit as st
from langchain_core.messages import SystemMessage, HumanMessage, AIMessage

# Add parent directory to path to import model_connection
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from model_connection import llm_openrouter

st.title("LangChain Chatbot")

# Initialize chat history
if "messages" not in st.session_state:
    st.session_state.messages = [
        SystemMessage(content="You are a helpful assistant.")
    ]

# Display chat messages from history on app rerun
for message in st.session_state.messages:
    if isinstance(message, HumanMessage):
        with st.chat_message("user"):
            st.markdown(message.content)
    elif isinstance(message, AIMessage):
        with st.chat_message("assistant"):
            st.markdown(message.content)

# React to user input
if prompt := st.chat_input("What is up?"):
    # Display user message in chat message container
    st.chat_message("user").markdown(prompt)
    # Add user message to chat history
    st.session_state.messages.append(HumanMessage(content=prompt))

    # Display assistant response in chat message container
    with st.chat_message("assistant"):
        response = llm_openrouter.invoke(st.session_state.messages)
        st.markdown(response.content)
    
    # Add assistant response to chat history
    st.session_state.messages.append(response)