# HPCL Lead Intelligence Agent (Next.js Frontend)

This is the **Next.js 14 (App Router)** version of the frontend.

## Prerequisites
- Node.js 18.17 or later
- npm or yarn

## Setup Instructions

1.  **Download this folder** to your local machine.
2.  Open a terminal in this folder.
3.  Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```

## Running the App

1.  Start the development server:
    ```bash
    npm run dev
    ```
2.  Open [http://localhost:3000](http://localhost:3000) in your browser.

## Backend Connection

This app expects the Python Backend to be running on `http://localhost:8000`.
Ensure you have started the backend service separately:

```bash
cd ../backend
source venv/bin/activate
uvicorn app.main:app --reload
```

## Features
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS + Glassmorphism
- **Icons**: Lucide React
- **Font**: Outfit (via Google Fonts)
