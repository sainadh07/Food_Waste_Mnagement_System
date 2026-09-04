import os
import re
from functools import wraps

import mysql.connector
from dotenv import load_dotenv
from flask import Flask, g, jsonify, request
from flask_cors import CORS
from werkzeug.security import check_password_hash, generate_password_hash

load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})


def get_db():
    if "db" not in g:
        g.db = mysql.connector.connect(
            host=os.getenv("MYSQL_HOST", "127.0.0.1"),
            port=int(os.getenv("MYSQL_PORT", "3306")),
            database=os.getenv("MYSQL_DATABASE", "foodshare"),
            user=os.getenv("MYSQL_USER", "root"),
            password=os.getenv("MYSQL_PASSWORD", ""),
        )
    return g.db


@app.teardown_appcontext
def close_db(_error=None):
    db = g.pop("db", None)
    if db is not None and db.is_connected():
        db.close()


def user_payload(row):
    return {
        "id": row["id"],
        "role": row["role"],
        "name": row["name"],
        "email": row["email"],
        "phone": row["phone"],
        "donorType": row["donor_type"],
        "ngoId": row["ngo_id"],
        "contactPerson": row["contact_person"],
        "address": row["address"],
        "location": row["location"],
        "verificationStatus": row["verification_status"],
    }


def require_json(*fields):
    data = request.get_json(silent=True) or {}
    missing = [field for field in fields if not str(data.get(field, "")).strip()]
    if missing:
        return None, jsonify({"error": "Missing required fields", "fields": missing}), 400
    return data, None, None


def validate_credentials(email, password):
    if not re.fullmatch(r"[^\s@]+@gmail\.com", email.strip(), re.IGNORECASE):
        return "Email must end with @gmail.com"
    if not re.search(r"[a-z]", password) or not re.search(r"[A-Z]", password):
        return "Password must include at least one lowercase letter and one uppercase letter"
    return None


def require_role(role):
    def decorator(handler):
        @wraps(handler)
        def wrapped(*args, **kwargs):
            user_id = request.headers.get("X-User-Id")
            if not user_id:
                return jsonify({"error": "Authentication required"}), 401
            cursor = get_db().cursor(dictionary=True)
            cursor.execute("SELECT * FROM users WHERE id = %s AND role = %s", (user_id, role))
            user = cursor.fetchone()
            cursor.close()
            if user is None:
                return jsonify({"error": "Access denied"}), 403
            g.current_user = user
            return handler(*args, **kwargs)
        return wrapped
    return decorator


@app.get("/api/health")
def health():
    try:
        db = get_db()
        cursor = db.cursor()
        cursor.execute("SELECT 1")
        cursor.fetchone()
        cursor.close()
        return jsonify({"status": "ok", "database": "connected"})
    except mysql.connector.Error as error:
        return jsonify({"status": "error", "database": "unavailable", "message": str(error)}), 503


@app.post("/api/auth/register")
def register():
    data, error_response, status = require_json("role", "name", "email", "password")
    if error_response:
        return error_response, status
    if data["role"] not in ("donor", "ngo"):
        return jsonify({"error": "Only donor and NGO registration is available publicly"}), 400
    credential_error = validate_credentials(data["email"], data["password"])
    if credential_error:
        return jsonify({"error": credential_error}), 400

    db = get_db()
    cursor = db.cursor(dictionary=True)
    try:
        cursor.execute(
            """INSERT INTO users
            (role, name, email, password_hash, phone, donor_type, ngo_id,
             contact_person, address, location, verification_status)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)""",
            (
                data["role"], data["name"].strip(), data["email"].strip().lower(),
                generate_password_hash(data["password"]), data.get("phone"),
                data.get("donorType"), data.get("ngoId"), data.get("contactPerson"),
                data.get("address"), data.get("location"),
                "pending" if data["role"] == "ngo" else None,
            ),
        )
        db.commit()
    except mysql.connector.IntegrityError:
        db.rollback()
        return jsonify({"error": "An account with this email already exists"}), 409
    finally:
        cursor.close()

    return jsonify({"message": "Account registered", "requiresLogin": True}), 201


@app.post("/api/auth/login")
def login():
    data, error_response, status = require_json("email", "password", "role")
    if error_response:
        return error_response, status
    credential_error = validate_credentials(data["email"], data["password"])
    if credential_error:
        return jsonify({"error": credential_error}), 400
    cursor = get_db().cursor(dictionary=True)
    cursor.execute("SELECT * FROM users WHERE email = %s AND role = %s", (data["email"].strip().lower(), data["role"]))
    user = cursor.fetchone()
    cursor.close()
    if user is None or not check_password_hash(user["password_hash"], data["password"]):
        return jsonify({"error": "Invalid registered account or password"}), 401
    return jsonify({"user": user_payload(user), "userId": user["id"]})


@app.get("/api/donations")
def donations():
    cursor = get_db().cursor(dictionary=True)
    cursor.execute("SELECT * FROM donations WHERE status = 'available' ORDER BY created_at DESC")
    rows = cursor.fetchall()
    cursor.close()
    return jsonify({"donations": rows})


@app.post("/api/donations")
@require_role("donor")
def create_donation():
    data, error_response, status = require_json(
        "foodName", "category", "foodType", "quantity", "unit", "servings",
        "preparationDate", "preparationTime", "deadline", "address", "location",
        "pickupStart", "pickupEnd", "contactPerson", "contactPhone",
    )
    if error_response:
        return error_response, status
    db = get_db()
    cursor = db.cursor()
    cursor.execute(
        """INSERT INTO donations
        (donor_id, food_name, category, food_type, quantity, unit, servings,
         preparation_date, preparation_time, deadline, storage_method, safety_notes,
         address, location, pickup_start, pickup_end, contact_person, contact_phone,
         description, status)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)""",
        (
            g.current_user["id"], data["foodName"], data["category"], data["foodType"],
            data["quantity"], data["unit"], data["servings"], data["preparationDate"],
            data["preparationTime"], data["deadline"], data.get("storageMethod"),
            data.get("safetyNotes"), data["address"], data["location"], data["pickupStart"],
            data["pickupEnd"], data["contactPerson"], data["contactPhone"],
            data.get("description"), data.get("status", "available"),
        ),
    )
    donation_id = cursor.lastrowid
    db.commit()
    cursor.close()
    return jsonify({"id": donation_id, "status": data.get("status", "available")}), 201


@app.get("/api/donations/mine")
@require_role("donor")
def my_donations():
    cursor = get_db().cursor(dictionary=True)
    cursor.execute("SELECT * FROM donations WHERE donor_id = %s ORDER BY created_at DESC", (g.current_user["id"],))
    rows = cursor.fetchall()
    cursor.close()
    return jsonify({"donations": rows})


@app.post("/api/donations/<int:donation_id>/requests")
@require_role("ngo")
def request_donation(donation_id):
    data, error_response, status = require_json("people", "pickupStart", "pickupEnd")
    if error_response:
        return error_response, status
    db = get_db()
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT id FROM donations WHERE id = %s AND status = 'available'", (donation_id,))
    donation = cursor.fetchone()
    if donation is None:
        cursor.close()
        return jsonify({"error": "Donation is no longer available"}), 409
    cursor.execute(
        "INSERT INTO donation_requests (donation_id, ngo_id, people, pickup_start, pickup_end, message) VALUES (%s, %s, %s, %s, %s, %s)",
        (donation_id, g.current_user["id"], data["people"], data["pickupStart"], data["pickupEnd"], data.get("message")),
    )
    cursor.close()
    db.commit()
    return jsonify({"message": "Request sent", "status": "pending"}), 201


@app.get("/api/ngo/requests")
@require_role("ngo")
def ngo_requests():
    cursor = get_db().cursor(dictionary=True)
    cursor.execute(
        """SELECT r.*, d.food_name, d.quantity, d.unit, u.name AS donor_name
           FROM donation_requests r
           JOIN donations d ON d.id = r.donation_id
           JOIN users u ON u.id = d.donor_id
           WHERE r.ngo_id = %s ORDER BY r.created_at DESC""",
        (g.current_user["id"],),
    )
    rows = cursor.fetchall()
    cursor.close()
    return jsonify({"requests": rows})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.getenv("API_PORT", "5000")), debug=os.getenv("FLASK_DEBUG", "1") == "1")
