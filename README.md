# Hospital Bed Connect — College Demo

A small React + Express demo with sample hospital listings, city search, bed-category filtering, a bed-update dashboard, and hospital registration form.

> **Demo disclaimer:** hospital names and locations are real; bed counts are illustrative sample data. This is not connected to real hospital systems and must not be used for medical or emergency decisions.

## Requirements
- Node.js 18 or newer
- npm

## Run the backend
Open a terminal:
```bash
cd backend
npm install
npm run dev
```
Backend API: http://localhost:5400/api/health

## Run the frontend
Open a second terminal:
```bash
cd frontend
npm install
npm run dev
```
Open the URL Vite prints, usually http://localhost:5173.

## Try it
1. Search for Delhi, Mumbai, Jaipur, or Lucknow.
2. Filter by General, ICU, or Oxygen-supported beds.
3. In the hospital dashboard, change total/occupied beds and save.
4. Submit the hospital registration form.

## API endpoints
- `GET /api/health`
- `GET /api/hospitals?q=Sonipat&type=general`
- `GET /api/hospitals/:id`
- `PATCH /api/hospitals/:id/beds`
- `POST /api/register-hospital`
- `GET /api/applications`

## Limitations
- Data is held in backend memory and resets when the server restarts.
- No login/authentication or real hospital verification is implemented.
- CORS is open for local development.
- Do not deploy this as a real medical availability service without authentication, authorization, secure hosting, verified data feeds, and hospital agreements.
