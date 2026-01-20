import sys
import os
from dotenv import load_dotenv

# ✅ LOAD .env FIRST
# load_dotenv()

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from langgraph.graph import StateGraph, START, END
from cricket_workflow.Node_function import *

graph = StateGraph(CricketState)

# add nodes
graph.add_node("calculate_strike_rate", calculate_strike_rate)
graph.add_node("calculate_balls_per_boundary", calculate_balls_per_boundary)
graph.add_node("calculate_boundary_percentage", calculate_boundary_percentage)
graph.add_node("summary", summary)

# add edges
graph.add_edge(START, "calculate_strike_rate")
graph.add_edge(START, "calculate_balls_per_boundary")
graph.add_edge(START, "calculate_boundary_percentage")
graph.add_edge("calculate_strike_rate", "summary")
graph.add_edge("calculate_balls_per_boundary", "summary")
graph.add_edge("calculate_boundary_percentage", "summary")
graph.add_edge("summary", END)

# compile graph
workflow = graph.compile()
# print(workflow)
# execute only when run directly (not when imported by LangGraph Studio)
if __name__ == "__main__":
    output = workflow.invoke({"runs": 50, "balls": 10, "fours": 5, "sixes": 2})
    print(output)
