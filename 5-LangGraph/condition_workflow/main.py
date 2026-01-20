from typing import Literal
import sys
import os
from dotenv import load_dotenv
from langgraph.graph import StateGraph, START, END
from condition_workflow.Nodes import *

# LOAD .env FIRST
load_dotenv()
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

graph = StateGraph(conditionState)

# Routing function for conditional edges
def check_condition(state: conditionState) -> Literal["real_roots", "repeated_roots", "no_real_roots"]:
    if state["discriminant"] > 0:
        return "real_roots"
    elif state["discriminant"] == 0:
        return "repeated_roots"
    else:
        return "no_real_roots"

# add nodes
graph.add_node("show_equation", show_equation)
graph.add_node("calculate_discriminant", calculate_discriminant)
graph.add_node("real_roots", real_roots)
graph.add_node("repeated_roots", repeated_roots)
graph.add_node("no_real_roots", no_real_roots)

# add edges
graph.add_edge(START, "show_equation")
graph.add_edge("show_equation", "calculate_discriminant")

# add conditional edge - routes based on discriminant value
graph.add_conditional_edges(
    "calculate_discriminant",
    check_condition,
    {
        "real_roots": "real_roots",
        "repeated_roots": "repeated_roots", 
        "no_real_roots": "no_real_roots"
    }
)

# all root nodes lead to END
graph.add_edge('real_roots', END)
graph.add_edge('repeated_roots', END)
graph.add_edge('no_real_roots', END)

# compile graph
workflow = graph.compile()



if __name__ == "__main__":

    output = workflow.invoke()
    print(output)
