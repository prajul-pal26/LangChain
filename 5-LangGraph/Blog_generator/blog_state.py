from typing import TypedDict, Literal, Annotated
from pydantic import BaseModel, Field
import operator

class BlogState(TypedDict, total=False):
    # Required inputs
    topic: str
    target_audience: str  # e.g., "beginners", "intermediate", "advanced"
    # Auto-populated fields
    keywords: str
    blog_content: str
    evaluation: Literal["approved", "needs_improvement"]
    feedback: str
    iteration: int
    max_iterations: int
    blog_history: Annotated[list[str], operator.add]
    feedback_history: Annotated[list[str], operator.add]

class BlogEvaluation(BaseModel):
    evaluation: Literal["approved", "needs_improvement"] = Field(..., description="Final evaluation result")
    feedback: str = Field(..., description="Detailed feedback on blog quality, structure, SEO, and readability")
    seo_score: int = Field(..., description="SEO score from 1-10")
    readability_score: int = Field(..., description="Readability score from 1-10")