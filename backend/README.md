# FoodShare backend

This backend uses Flask for the API and MySQL supplied by XAMPP for persistent storage.

## 1. Start XAMPP

Open XAMPP Control Panel and start **MySQL**. Apache is not required for the Flask API.

## 2. Create the database

Open `http://localhost/phpmyadmin`, choose the **Import** tab, select `backend/schema.sql`, and run it. This creates the `foodshare` database and its tables.

The default XAMPP MySQL settings are:

- Host: `127.0.0.1`
- Port: `3306`
- User: `root`
- Password: empty unless you configured one
- Database: `foodshare`

## 3. Create a Python environment

From the project root in PowerShell:

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r backend\requirements.txt
Copy-Item backend\.env.example backend\.env
```

Edit `backend/.env` if your XAMPP MySQL password or port is different.

## 4. Start the API

```powershell
python backend\app.py
```

The API runs at `http://localhost:5000`.

Test it in a browser:

```text
http://localhost:5000/api/health
```

Expected response after MySQL is running and the schema is imported:

```json
{"database":"connected","status":"ok"}
```

The existing frontend still runs at `http://localhost:8000`. Its current mock data remains in browser `localStorage`; the next integration step is replacing those storage calls with `fetch()` calls to this API.
