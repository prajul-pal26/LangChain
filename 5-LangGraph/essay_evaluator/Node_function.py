from typing import TypedDict, Annotated
from pydantic import BaseModel, Field
from .model_connection import llm_openrouter
import operator
import sys
import os
from dotenv import load_dotenv

# ✅ LOAD .env FIRST
load_dotenv()

class UPSCState(TypedDict):
    essay: str
    language_feedback: str
    analysis_feedback: str
    clarity_feedback: str
    overall_feedback: str

    individual_score: Annotated[list[int],operator.add]  #this is the reducer function 
    avg_score: float

class EvaluationSchema(BaseModel):
    feedback: str = Field(description="Detailed feedback for the essay")
    score: int = Field(description="Score out of 10", ge=0, le=10)

structure_model = llm_openrouter.with_structured_output(EvaluationSchema)

def evaluate_language(state:UPSCState):
    prompt = f"Evaluate the language quality of the following essay and provide a feedback and score out of 10 \n {state['essay']}"
    result = structure_model.invoke(prompt)
    return {"language_feedback": result.feedback, "individual_score": [result.score]}

def evaluate_analysis(state:UPSCState):
    prompt = f"Evaluate the depth of analysis of the following essay and provide a feedback and score out of 10 \n {state['essay']}"
    result = structure_model.invoke(prompt)
    return {"analysis_feedback": result.feedback, "individual_score": [result.score]}

def evaluate_clarity(state:UPSCState):
    prompt = f"Evaluate the clarity of thought of the following essay and provide a feedback and score out of 10 \n {state['essay']}"
    result = structure_model.invoke(prompt)
    return {"clarity_feedback": result.feedback, "individual_score": [result.score]}

def final_evaluation(state:UPSCState):
    # summary feedback
    prompt = f"Based on the following feedbacks create a summarized feedback \n language feedback - {state['language_feedback']} \n analysis feedback - {state['analysis_feedback']} \n clarity feedback - {state['clarity_feedback']}"
    result = llm_openrouter.invoke(prompt).content

    # avg calculate 
    avg_score = sum(state['individual_score'])/len(state['individual_score'])
    return {"overall_feedback": result, "overall_score": avg_score}



