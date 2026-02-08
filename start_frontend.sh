#!/bin/bash
# Activate the Python virtual environment which contains the local Node.js installation
source backend/venv/bin/activate

# Navigate to the frontend directory
cd frontend

# Start the Next.js development server
npm run dev
