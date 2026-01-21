from typing import Literal
import sys
import os
from dotenv import load_dotenv

# LOAD .env FIRST and set up path
load_dotenv()
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from langgraph.graph import StateGraph, START, END
from blog_nodes import generate_blog, evaluate_blog, optimize_blog, research_keywords
from blog_state import BlogState

graph = StateGraph(BlogState)

# Routing function for conditional edges
def route_evaluation(state: BlogState):
    iteration = state.get("iteration", 0)
    max_iterations = state.get("max_iterations", 5)
    if state.get("evaluation") == "approved" or iteration >= max_iterations:
        return "approved"
    else:
        return "needs_improvement"

# add nodes
# add nodes
graph.add_node("research_keywords", research_keywords)
graph.add_node("generate", generate_blog)
graph.add_node("evaluate", evaluate_blog)
graph.add_node("optimize", optimize_blog)

# add edges
graph.add_edge(START, "research_keywords")
graph.add_edge("research_keywords", "generate")
graph.add_edge("generate", "evaluate")

# add conditional edge - routes based on evaluation
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
    # Only 2 inputs required
    topic = "Getting Started with FastAPI: A Complete Guide"
    target_audience = "intermediate Python developers"
    
    output = workflow.invoke({
        "topic": topic,
        "target_audience": target_audience,
    })
    print(output["blog_content"])



