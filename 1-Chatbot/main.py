from typing import Literal
import sys
import os
from dotenv import load_dotenv
load_dotenv()
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from langgraph.graph import StateGraph, START, END
# for memory and persistence 
from langgraph.checkpoint.memory import MemorySaver


from nodes import * 
from state import *

checkpointer = MemorySaver()

graph = StateGraph(ChatState)


# add nodes
graph.add_node("chat_node", chat_node)

# add edges
graph.add_edge(START, "chat_node")
graph.add_edge("chat_node", END)

# compile graph
workflow = graph.compile(checkpointer=checkpointer)


if __name__ == "__main__":
    thread_id = '1'

    while True:
        user_input = input("Type here: ")
        print("User:", user_input)
        if user_input.strip().lower() in ["exit", "quit", "bye", "goodbye"]:
            break
        config = {"configurable": {"thread_id": thread_id}}
        output = workflow.invoke({"messages": [HumanMessage(content=user_input)]}, config=config)
        print("Assistant:", output["messages"][-1].content)



