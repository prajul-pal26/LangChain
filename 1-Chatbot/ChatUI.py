import sys
import os
import streamlit as st
from langchain_core.messages import SystemMessage, HumanMessage, AIMessage

# Add parent directory to path to import model_connection
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from model_connection import llm_openrouter

# Page configuration
st.set_page_config(
    page_title="AI Chatbot",
    page_icon="🤖",
    layout="centered"
)

# Custom CSS for attractive styling
st.markdown("""
<style>
    /* Main background gradient */
    .stApp {
        background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
    }
    
    /* Title styling */
    h1 {
        background: linear-gradient(90deg, #00d4ff, #7c3aed, #f472b6);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        font-size: 2.5rem !important;
        font-weight: 700 !important;
        text-align: center;
        padding: 1rem 0;
        animation: glow 2s ease-in-out infinite alternate;
    }
    
    @keyframes glow {
        from { filter: drop-shadow(0 0 5px #00d4ff); }
        to { filter: drop-shadow(0 0 15px #7c3aed); }
    }
    
    /* Chat message containers */
    .stChatMessage {
        background: rgba(255, 255, 255, 0.05) !important;
        border-radius: 15px !important;
        padding: 1rem !important;
        margin: 0.5rem 0 !important;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    /* User message styling */
    [data-testid="stChatMessageContent"] {
        color: #e0e0e0 !important;
        font-size: 1rem !important;
        line-height: 1.6 !important;
    }
    
    /* Chat input styling */
    .stChatInput {
        background: rgba(255, 255, 255, 0.1) !important;
        border-radius: 25px !important;
    }
    
    .stChatInput > div {
        background: rgba(255, 255, 255, 0.08) !important;
        border: 2px solid rgba(124, 58, 237, 0.5) !important;
        border-radius: 25px !important;
    }
    
    .stChatInput input {
        color: white !important;
    }
    
    .stChatInput input::placeholder {
        color: rgba(255, 255, 255, 0.5) !important;
    }
    
    /* Avatar styling */
    .stChatMessage img {
        border-radius: 50% !important;
        border: 2px solid #7c3aed !important;
    }
    
    /* Scrollbar styling */
    ::-webkit-scrollbar {
        width: 8px;
    }
    
    ::-webkit-scrollbar-track {
        background: rgba(255, 255, 255, 0.05);
    }
    
    ::-webkit-scrollbar-thumb {
        background: linear-gradient(180deg, #00d4ff, #7c3aed);
        border-radius: 10px;
    }
    
    /* Hide Streamlit branding */
    #MainMenu {visibility: hidden;}
    footer {visibility: hidden;}
    header {visibility: hidden;}
</style>
""", unsafe_allow_html=True)

# Header with emoji
st.markdown("<h1>🤖 AI Chatbot</h1>", unsafe_allow_html=True)

# Subtitle
st.markdown("""
<p style='text-align: center; color: #888; margin-bottom: 2rem;'>
    Powered by LangChain • Ask me anything!
</p>
""", unsafe_allow_html=True)

# Initialize chat history
if "messages" not in st.session_state:
    st.session_state.messages = [
        SystemMessage(content="You are a helpful, friendly AI assistant. Be concise but thorough in your responses.")
    ]

# Display chat messages from history on app rerun
for message in st.session_state.messages:
    if isinstance(message, HumanMessage):
        with st.chat_message("user", avatar="👤"):
            st.markdown(message.content)
    elif isinstance(message, AIMessage):
        with st.chat_message("assistant", avatar="🤖"):
            st.markdown(message.content)

# React to user input
if prompt := st.chat_input("Type your message here..."):
    # Display user message in chat message container
    with st.chat_message("user", avatar="👤"):
        st.markdown(prompt)
    # Add user message to chat history
    st.session_state.messages.append(HumanMessage(content=prompt))

    # Display assistant response in chat message container
    with st.chat_message("assistant", avatar="🤖"):
        with st.spinner("✨ Thinking..."):
            response = llm_openrouter.invoke(st.session_state.messages)
        st.markdown(response.content)
    
    # Add assistant response to chat history
    st.session_state.messages.append(response)