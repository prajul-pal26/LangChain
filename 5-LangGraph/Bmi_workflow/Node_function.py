from typing import TypedDict

#define state graph
class BMIState(TypedDict):
    height: float
    weight: float
    bmi: float

def calculate_bmi(state: BMIState)-> BMIState:
    state["bmi"] = state["weight"] / (state["height"] ** 2)
    return state    