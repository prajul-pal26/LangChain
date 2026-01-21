from typing import Literal
import sys
import os
from dotenv import load_dotenv

# LOAD .env FIRST and set up path
load_dotenv()
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from langgraph.graph import StateGraph, START, END
from twitter_nodes import generate_tweet, evaluate_tweet, optimize_tweet
from twitter_state import PostState

graph = StateGraph(PostState)

# Routing function for conditional edges
def route_evaluation(state: PostState):
    if state["evaluation"] == "approved" or state["iteration"] >= state["max_iterations"]:
        return "approved"
    else:
        return "needs_improvement"

# add nodes
graph.add_node("generate", generate_tweet)
graph.add_node("evaluate", evaluate_tweet)
graph.add_node("optimize", optimize_tweet)

# add edges
graph.add_edge(START, "generate")
graph.add_edge("generate", "evaluate")

# add conditional edge - routes based on discriminant value
graph.add_conditional_edges(
    "evaluate",
    route_evaluation,
    {
        "approved": END,
        "needs_improvement": "optimize"
    }
)
graph.add_edge("optimize", "evaluate")

# compile graph
workflow = graph.compile()



if __name__ == "__main__":
    output = workflow.invoke({
        "topic": "AI",
        "iteration": 0,
        "max_iterations": 3,
        "tweet_history": [],
        "feedback_history": []
    })
    print(output["tweet"])
