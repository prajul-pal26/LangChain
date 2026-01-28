from pydantic import BaseModel, Field
from langchain_core.messages import HumanMessage, SystemMessage
import operator
import sys
import os
from dotenv import load_dotenv
load_dotenv()
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from model_connection import llm_openrouter
from state import *



def chat_node(state: ChatState):
    # take user query from state 
    messages = ChatState['messages']

    # send to llm
    response = llm.invoke(messages)

    # response store state
    return {'messages': [response]}
