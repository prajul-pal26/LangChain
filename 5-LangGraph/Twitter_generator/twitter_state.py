from typing import TypedDict, Literal, Annotated
from pydantic import BaseModel,Field
import operator

class PostState(TypedDict):
     topic:str
     tweet:str
     evaluation:Literal["approved","needs_improvement"]
     feedback:str
     iteration:int
     max_iterations:int
     tweet_history:Annotated[list[str], operator.add]
     feedback_history:Annotated[list[str], operator.add]

class TweetEvaluation(BaseModel):
    evaluation:Literal["approved","needs_improvement"] = Field(..., description="Final evaluation result")
    feedback:str = Field(..., description="Constructive feedback for the tweet")