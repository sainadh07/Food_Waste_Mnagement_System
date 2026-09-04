# FoodShare

A basic Food Waste Management application that connects surplus food donors with verified NGOs and community distribution programs.

## Features

- Donor and NGO registration and login
- Gmail-only authentication guidance
- Role-based donor and NGO dashboards
- Donor donation creation, drafts, active donations, and history
- NGO nearby donation discovery and request workflow
- Collection and distribution tracking interfaces
- Personal impact, notifications, profiles, and issue reporting
- Flask API foundation with MySQL/XAMPP database schema
- Responsive frontend with food and community imagery

## Technology

- Frontend: HTML, CSS, and JavaScript single-page application
- Backend: Flask REST API
- Database: MySQL provided by XAMPP
- Local frontend server: Python `serve.py`

## Run Locally

### Frontend

```powershell
python serve.py
```

Open `http://localhost:8000`.

### Backend

Start MySQL in XAMPP, import `backend/schema.sql` into phpMyAdmin, then run:

```powershell
python -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r backend\requirements.txt
Copy-Item backend\.env.example backend\.env
.\.venv\Scripts\python.exe backend\app.py
```

The API runs at `http://localhost:5000`.

Health check: `http://localhost:5000/api/health`

## Database

The backend schema creates the `foodshare` database with these main tables:

- `users`: donor and NGO account records
- `donations`: food donation listings and statuses
- `donation_requests`: NGO requests for donor listings

Never commit `backend/.env`, passwords, or local virtual environments.

## Project Status

This is an initial frontend-focused application with a Flask/MySQL backend foundation. Authentication endpoints are connected to the database; additional dashboard operations can be migrated from mock browser storage to the API incrementally.
