#!/bin/bash

# LangChain React Project - Simple Start/Stop Script
# Usage: source main.sh start | stop

# Read configuration from config.json
CONFIG_FILE="config.json"
REACT_DIR="REACT"

# Extract port from config.json using jq
if command -v jq &> /dev/null && [ -f "$CONFIG_FILE" ]; then
    PORT=$(jq -r '.ports.react' "$CONFIG_FILE")
    if [ "$PORT" == "null" ] || [ -z "$PORT" ]; then
        echo "Error: 'ports.react' not found in $CONFIG_FILE"
        exit 1
    fi
else
    echo "Error: jq tool or $CONFIG_FILE is missing."
    echo "Please install jq (sudo apt install jq) and ensure $CONFIG_FILE exists."
    exit 1
fi

PID_FILE="/tmp/langchain_react.pid"

start_server() {
    # Check if already running
    if [ -f "$PID_FILE" ] && kill -0 $(cat "$PID_FILE") 2>/dev/null; then
        echo "Server is already running on port $PORT"
        echo "   Use 'source main.sh stop' to stop it first"
        return 1
    fi

    # Clean up port if something else is using it
    lsof -ti:$PORT | xargs -r kill -9 2>/dev/null
    sleep 1

    # Check for npm
    if ! command -v npm &> /dev/null; then
        echo "Error: npm is not installed. Please install Node.js and npm."
        return 1
    fi

    echo "Starting React development server..."
    cd $REACT_DIR
    
    # Check for node_modules and install if missing
    if [ ! -d "node_modules" ]; then
        echo "Dependencies not found. Installing..."
        npm install
        if [ $? -ne 0 ]; then
            echo "Error: Failed to install dependencies."
            cd ..
            return 1
        fi
    fi

    npm run dev -- --host < /dev/null &
    echo $! > "$PID_FILE"
    cd ..
    
    sleep 2
    echo ""
    echo "Server started!"
    echo "Open: http://localhost:$PORT"
    echo ""
    echo "To stop: source main.sh stop"
}

stop_server() {
    if [ -f "$PID_FILE" ]; then
        PID=$(cat "$PID_FILE")
        if kill -0 $PID 2>/dev/null; then
            kill $PID 2>/dev/null
            echo "Server stopped"
        else
            echo "Server was not running"
        fi
        rm -f "$PID_FILE"
    else
        echo "No server to stop"
    fi
    
    # Clean up port just in case
    lsof -ti:$PORT | xargs -r kill -9 2>/dev/null
}

# Main
case "${1:-start}" in
    start)
        start_server
        ;;
    stop)
        stop_server
        ;;
    restart)
        stop_server
        start_server
        ;;
    build)
        echo "Building production bundle..."
        cd $REACT_DIR
        npm run build
        if [ $? -eq 0 ]; then
            echo ""
            echo "Build complete! Output in $REACT_DIR/dist/"
            echo "Deploy this folder to your web server."
        else
            echo "Build failed!"
        fi
        cd ..
        ;;
    preview)
        echo "Starting production preview server..."
        cd $REACT_DIR
        if [ ! -d "dist" ]; then
            echo "No production build found. Running 'npm run build' first..."
            npm run build
        fi
        npm run preview -- --host
        cd ..
        ;;
    *)
        echo "Usage: source main.sh [start|stop|restart|build|preview]"
        echo "  start   - Start the React dev server (default)"
        echo "  stop    - Stop the server"
        echo "  restart - Restart the server"
        echo "  build   - Build production bundle"
        echo "  preview - Preview production build locally"
        ;;
esac