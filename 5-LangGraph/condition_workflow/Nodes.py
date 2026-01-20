from pydantic import BaseModel, Field
import operator
import sys
import os
from dotenv import load_dotenv
from condition_workflow.state import *

# ✅ LOAD .env FIRST
load_dotenv()


def show_equation(state:conditionState):
    equation = f'{state["a"]}x2{state["b"]}x{state["c"]}'
    return {'equation':equation}

def calculate_discriminant(state:conditionState):
    discriminant = state["b"]**2 - (4*state["a"]*state["c"])
    return {'discriminant':discriminant}

def real_roots(state:conditionState):
    import math
    a, b, d = state["a"], state["b"], state["discriminant"]
    x1 = (-b + math.sqrt(d)) / (2 * a)
    x2 = (-b - math.sqrt(d)) / (2 * a)
    return {'result': f'Two real roots: x1 = {x1}, x2 = {x2}'}

def repeated_roots(state:conditionState):
    a, b = state["a"], state["b"]
    x = -b / (2 * a)
    return {'result': f'One repeated root: x = {x}'}

def no_real_roots(state:conditionState):
    import cmath
    a, b, d = state["a"], state["b"], state["discriminant"]
    x1 = (-b + cmath.sqrt(d)) / (2 * a)
    x2 = (-b - cmath.sqrt(d)) / (2 * a)
    return {'result': f'Two complex roots: x1 = {x1}, x2 = {x2}'}