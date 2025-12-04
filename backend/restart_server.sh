#!/bin/bash

# Stop the backend server running on port 3000
echo "Stopping backend server on port 3000..."
lsof -ti:3000 | xargs kill -9 2>/dev/null || echo "No process found on port 3000"

# Navigate to backend directory and start server
echo "Starting backend server on port 5002..."
cd /Users/swatighosh/Desktop/GreenRoot_cp/backend
npm start
