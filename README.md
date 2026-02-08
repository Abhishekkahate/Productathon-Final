# HPCL B2B Lead Intelligence Agent

A prototype AI agent that discovers B2B leads from web signals and matches them with HPCL's product portfolio.

## Prerequisites
- Python 3.9+
- A modern web browser (Chrome/Edge/Firefox)

## Quick Start

### 1. Start the Backend
Open a terminal in the project root:

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt  # If requirements exist, else manual list below
# Manual install if needed:
# pip install fastapi uvicorn pandas faker pydantic openpyxl

# Start the server
uvicorn app.main:app --reload
```

The server will start at `http://localhost:8000`.
You can verify it by visiting `http://localhost:8000/docs`.

### 2. Run the Frontend (Next.js)
1. Navigate to the `frontend` folder.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.
5. Use `F12` -> Toggle Device Toolbar to view it in Mobile format (like iPhone 12/14) for the best experience.

## Features
- **Lead Feed**: Auto-generated signals from fake news/tenders.
- **AI Inference**: Maps signals (e.g., "Boiler installation") to HPCL Products (e.g., "Furnace Oil").
- **Dossier View**: Detailed company card with confidence score and reasoning.
- **WhatsApp Integration**: Button to simulate messaging the lead.
- **Executive Dashboard**: Top stats and product breakdown.

## Architecture
- **Backend**: FastAPI (Python)
- **Frontend**: Next.js + React + Tailwind CSS + Lucide Icons.
    - **UI Design**: Modern Glassmorphism with Dark/Light mode support.
- **Data**: Faker library for synthetic Indian context data.
# Productathon
