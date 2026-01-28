from typing import TypedDict, Literal, Annotated
from pydantic import BaseModel, Field
import operator
from langgraph.graph.message import add_messages
from langchain_core.messages import BaseMessage, HumanMessage


class ChatState(TypedDict):
    messages: Annotated[list[BaseMessage], add_messages]