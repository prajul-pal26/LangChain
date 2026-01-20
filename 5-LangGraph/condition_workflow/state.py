from typing import TypedDict


class conditionState(TypedDict):
    a:int
    b:int
    c:int

    equation: str
    discriminant: float
    result:str