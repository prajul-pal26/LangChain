import sys
import os
from dotenv import load_dotenv

# ✅ LOAD .env FIRST
load_dotenv()

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from langgraph.graph import StateGraph, START, END
from Node_function import *

graph = StateGraph(BMIState)

# add nodes
graph.add_node("calculate_bmi", calculate_bmi)

# add edges
graph.add_edge(START, "calculate_bmi")
graph.add_edge("calculate_bmi", END)

# compile graph
workflow = graph.compile()

# execute
output = workflow.invoke({"height": 1.8, "weight": 70})
print(output)
