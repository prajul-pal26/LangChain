from typing import TypedDict
import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
from model_connection import *

class Review(TypedDict):
    number1: int
    number2: int
    opertion: str

    
structured_model = llm_openrouter.with_structured_output(Review)

result = structured_model.invoke("""can you calculate the addition of 2 and 8""")

print(result)