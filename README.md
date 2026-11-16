# Hospital Bed Connect — College Demo

A React + Express hospital directory with emergency bed matching, hospital registration, bed updates, and a MySQL-backed data layer.

> **Demo disclaimer:** hospital names and locations are real; bed counts are illustrative sample data. This is not connected to real hospital systems and must not be used for medical or emergency decisions.

## Stack
- Frontend: React + Vite
- Backend: Express
- DBMS: MySQL 8+ with normalized relational tables

## Database setup
1. Create the database with `backend/schema.sql`, or allow the API to create its tables automatically.
2. Copy `backend/.env.example` to `backend/.env` and fill in your MySQL values.
3. Run `npm install` inside `backend/`, then `npm run dev`.

On its first start, the backend creates the tables and seeds the 12 illustrative hospital records.

## Database tables
- `hospitals` — hospital master data
- `bed_inventory` — bed category, total and occupied count per hospital
- `hospital_applications` — hospital registration requests
- `bed_requests` — patient bed requests

Hospital applications and bed requests are stored in MySQL. The list endpoints require `ADMIN_API_KEY` and the `x-admin-key` request header, so patient/contact details are not public.

## Run locally
Backend:
```bash
cd backend
npm install
npm run dev
```
API: http://localhost:5400/api/health

Frontend:
```bash
cd frontend
npm install
npm run dev
```

## Deploy
Deploy `backend/` as a Node web service and configure `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, and `ADMIN_API_KEY`.
Deploy `frontend/` as a static site using build command `npm run build`, publish directory `dist`, and set `VITE_API_BASE` to the hosted backend URL followed by `/api`.

## API endpoints
- `GET /api/health`
- `GET /api/hospitals?q=Delhi&type=icu`
- `GET /api/hospitals/:id`
- `PATCH /api/hospitals/:id/beds`
- `POST /api/register-hospital`
- `POST /api/bed-requests`
- `GET /api/applications` (admin key required)
- `GET /api/bed-requests` (admin key required)
