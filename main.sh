#!/bin/bash

# Source virtual environment if it exists
if [ -d "venv" ]; then
    source venv/bin/activate
fi

# Clean up any existing processes on these ports before starting
lsof -ti:8501 | xargs -r kill -9 2>/dev/null
lsof -ti:8502 | xargs -r kill -9 2>/dev/null
sleep 1

# Run Landing Page on port 8501
streamlit run LandingPage.py --server.port 8501 &
PID1=$!

# Run Chatbot on port 8502
streamlit run 1-Chatbot/ChatUI.py --server.port 8502 &
PID2=$!



# Wait for all background processes
wait $PID1 $PID2