from typing import TypedDict

#define state graph
class CricketState(TypedDict):
    runs: int
    balls: int
    fours: int
    sixes: int

    strike_rate: float
    balls_per_boundary:float
    boundary_percentage:float
    summary: str
    


def calculate_strike_rate(state: CricketState)-> CricketState:
    state["strike_rate"] = state["runs"] / state["balls"]
    return {"strike_rate": state["strike_rate"]}    

def calculate_balls_per_boundary(state: CricketState)-> CricketState:
    state["balls_per_boundary"] = state["balls"] / (state["fours"] + state["sixes"])
    return {"balls_per_boundary": state["balls_per_boundary"]}    

def calculate_boundary_percentage(state: CricketState)-> CricketState:
    state["boundary_percentage"] = (state["fours"] + state["sixes"]) / state["balls"]
    return {"boundary_percentage": state["boundary_percentage"]}      

def summary(state: CricketState)-> CricketState:
    summary = f"""Strike Rate: {state['strike_rate']:.2f}\
              Balls per boundary: {state['balls_per_boundary']:.2f} \
              Boundary percentage: {state['boundary_percentage']:.2f}"""
    
    return {"summary": summary}