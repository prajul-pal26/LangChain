import sys
import os
from dotenv import load_dotenv

# ✅ LOAD .env FIRST
load_dotenv()

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from langgraph.graph import StateGraph, START, END
from essay_evaluator.Node_function import *

graph = StateGraph(UPSCState)

# add nodes
graph.add_node("evaluate_language", evaluate_language)
graph.add_node("evaluate_analysis", evaluate_analysis)
graph.add_node("evaluate_clarity", evaluate_clarity)
graph.add_node("final_evaluation", final_evaluation)


# add edges
graph.add_edge(START, "evaluate_language")
graph.add_edge(START, "evaluate_analysis")
graph.add_edge(START, "evaluate_clarity")
graph.add_edge("evaluate_language", "final_evaluation")
graph.add_edge("evaluate_analysis", "final_evaluation")
graph.add_edge("evaluate_clarity", "final_evaluation")
graph.add_edge("final_evaluation", END)

# compile graph
workflow = graph.compile()
# print(workflow)
# execute only when run directly (not when imported by LangGraph Studio)
if __name__ == "__main__":
    essay = """Current Role of Agentic AI in India

Agentic Artificial Intelligence (Agentic AI) refers to AI systems that are capable of autonomous decision-making, goal planning, tool usage, and adaptive learning with minimal human intervention. Unlike traditional AI systems that respond only to predefined inputs, agentic AI systems can plan actions, collaborate with other agents, and continuously refine their strategies. In recent years, India has witnessed a growing adoption of agentic AI across multiple sectors, driven by rapid digitalization, government initiatives, and the expanding startup ecosystem.

One of the most prominent areas where agentic AI is making an impact in India is enterprise automation and IT services. Indian IT giants and service-based companies are deploying agentic AI to automate workflows such as customer support, code generation, testing, and incident management. These AI agents can analyze system logs, identify issues, propose fixes, and even execute corrective actions autonomously. This has significantly improved efficiency and reduced operational costs, allowing companies to scale services without proportional increases in manpower.

In the financial and banking sector, agentic AI plays a critical role in fraud detection, credit risk assessment, and personalized financial advisory services. AI agents continuously monitor transactions, detect anomalous patterns, and take preventive actions in real time. Fintech startups in India are leveraging agentic AI to offer automated loan approvals, smart investment recommendations, and customer onboarding processes, making financial services faster and more accessible to a large population.

The healthcare sector is another domain where agentic AI is gaining importance. AI agents assist doctors by analyzing medical records, recommending diagnostic tests, and monitoring patient health data. In telemedicine platforms, agentic AI systems help triage patients, schedule appointments, and provide preliminary medical guidance. This is particularly valuable in India, where access to healthcare professionals is limited in rural and remote regions.

Agentic AI also plays a growing role in governance and public services. Government-backed digital initiatives use AI agents to manage citizen queries, process documents, detect anomalies in public data, and improve service delivery. Chatbots and autonomous agents deployed in government portals help citizens access information efficiently, reducing bureaucratic delays and enhancing transparency.

In the startup ecosystem, Indian AI startups are actively experimenting with multi-agent systems for education, legal tech, e-commerce, and logistics. Agentic AI systems are being used for personalized learning platforms, contract analysis, demand forecasting, and supply chain optimization. These applications demonstrate how agentic AI can function as a collaborative problem-solver rather than a simple automation tool.

Despite its rapid adoption, challenges remain. Issues related to data privacy, ethical AI usage, model reliability, and regulatory frameworks need careful attention. Ensuring responsible deployment of agentic AI is essential to prevent misuse and build public trust.

In conclusion, agentic AI is playing an increasingly transformative role in India by enhancing productivity, enabling intelligent automation, and improving service delivery across sectors. As India continues to invest in digital infrastructure and AI research, agentic AI is expected to become a foundational technology shaping the country’s economic growth and technological leadership in the coming years."""


    output = workflow.invoke({"essay": essay})
    print(output)
