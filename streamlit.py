import streamlit as st
from pipeline import graph

st.title("Weather Agent")

query = st.text_input("Ask about weather")

if query:
    result = graph.invoke({
        "messages": [
            {"role": "user", "content": query}
        ]
    })

    st.write(result["messages"][-1].content)
