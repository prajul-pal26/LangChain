from typing import Literal
import sys
import os
from dotenv import load_dotenv
load_dotenv()
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from langgraph.graph import StateGraph, START, END


from nodes import * 
from state import *

graph = StateGraph(ChatState)


# add nodes
graph.add_node("chat_node", chat_node)

# add edges
graph.add_edge(START, "chat_node")
graph.add_edge("chat_node", END)

# compile graph
workflow = graph.compile()


if __name__ == "__main__":
    
    output = workflow.invoke({
        "messages": [HumanMessage(content=message)],
    })
    print(output["blog_content"])



