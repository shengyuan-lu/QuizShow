#!/bin/bash

# Define the port to check
PORT=4200

# Check if port is in use
if lsof -Pi :$PORT -sTCP:LISTEN -t >/dev/null ; then
    echo "Port $PORT is in use. Killing the process..."

    # Find and kill the process using port 4200
    lsof -i :$PORT | awk 'NR!=1 {print $2}' | xargs kill -9
fi

ng serve --open