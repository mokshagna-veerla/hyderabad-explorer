import http.server
import socketserver
import json
import os
import urllib.request
import urllib.error
import urllib.parse
import traceback
import sqlite3

# Load environment variables from local .env file if it exists
env_path = os.path.join(os.getcwd(), ".env")
if os.path.exists(env_path):
    print("[INFO] Loading environment variables from .env file...")
    try:
        with open(env_path, "r", encoding="utf-8") as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith("#") and "=" in line:
                    key, val = line.split("=", 1)
                    os.environ[key.strip()] = val.strip().strip("'\"")
    except Exception as e:
        print(f"[WARN] Failed to load .env file: {e}")

PORT = int(os.environ.get("PORT", 8000))
GOOGLE_CLIENT_ID = os.environ.get("GOOGLE_CLIENT_ID", "")
GOOGLE_CLIENT_SECRET = os.environ.get("GOOGLE_CLIENT_SECRET", "")
GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY", "")
DATA_DIR = "/data" if os.environ.get("RENDER") or os.path.isdir("/data") else ("/tmp" if os.environ.get("VERCEL") else "./data")
BOOKINGS_FILE = os.path.join(DATA_DIR, "bookings.json")
COMPLAINTS_FILE = os.path.join(DATA_DIR, "complaints.json")
REVIEWS_FILE = os.path.join(DATA_DIR, "reviews.json")
LOSTFOUND_FILE = os.path.join(DATA_DIR, "lostfound.json")
USERS_FILE = os.path.join(DATA_DIR, "users.json")
DB_FILE = os.path.join(DATA_DIR, "hyderabad_360.db")

def get_db_connection():
    conn = sqlite3.connect(DB_FILE)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    os.makedirs(DATA_DIR, exist_ok=True)
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # 1. Create tables
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS users (
            username TEXT PRIMARY KEY,
            email TEXT,
            password TEXT,
            is_google INTEGER DEFAULT 0,
            avatar_url TEXT
        )
    """)
    
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS bookings (
            id TEXT PRIMARY KEY,
            item TEXT,
            visitor TEXT,
            date TEXT,
            time TEXT,
            qty INTEGER,
            cost REAL,
            type TEXT
        )
    """)
    
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS complaints (
            id TEXT PRIMARY KEY,
            item TEXT,
            visitor TEXT,
            date TEXT,
            time TEXT,
            qty INTEGER,
            cost REAL,
            type TEXT
        )
    """)
    
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS reviews (
            id TEXT PRIMARY KEY,
            location TEXT,
            author TEXT,
            rating INTEGER,
            comment TEXT,
            date TEXT
        )
    """)
    
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS lostfound (
            id TEXT PRIMARY KEY,
            item TEXT,
            visitor TEXT,
            date TEXT,
            time TEXT,
            qty INTEGER,
            cost REAL,
            type TEXT
        )
    """)
    conn.commit()
    
    # 2. Migration function helper
    def migrate_json_to_table(json_filepath, table_name, mapping_func):
        if os.path.exists(json_filepath) and not os.path.exists(json_filepath + ".bak"):
            print(f"[MIGRATION] Migrating legacy JSON file {json_filepath} to SQLite table '{table_name}'...")
            try:
                with open(json_filepath, "r", encoding="utf-8") as f:
                    data = json.load(f)
                if isinstance(data, list):
                    for item in data:
                        try:
                            mapping_func(cursor, item)
                        except sqlite3.IntegrityError as ie:
                            print(f"[MIGRATION WARN] Primary key conflict in table '{table_name}', skipping item: {ie}")
                    conn.commit()
                # Rename the file to mark migration complete
                os.rename(json_filepath, json_filepath + ".bak")
                print(f"[MIGRATION SUCCESS] Finished migrating {json_filepath} to '{table_name}'. Legacy file archived to {json_filepath}.bak")
            except Exception as ex:
                print(f"[MIGRATION ERROR] Failed migrating {json_filepath}: {ex}")
                traceback.print_exc()

    # Define mapping functions for migration
    def map_user(cur, item):
        cur.execute(
            "INSERT INTO users (username, email, password, is_google, avatar_url) VALUES (?, ?, ?, ?, ?)",
            (
                item.get("username", "").strip(),
                item.get("email", "").strip(),
                item.get("password", ""),
                1 if item.get("isGoogle", False) else 0,
                item.get("avatarUrl", "")
            )
        )

    def map_booking(cur, item):
        cur.execute(
            "INSERT INTO bookings (id, item, visitor, date, time, qty, cost, type) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            (
                item.get("id", "").strip(),
                item.get("item", "").strip(),
                item.get("visitor", "").strip(),
                item.get("date", "").strip(),
                item.get("time", "").strip(),
                int(item.get("qty", 1)),
                float(item.get("cost", 0.0)),
                item.get("type", "").strip()
            )
        )

    def map_complaint(cur, item):
        cur.execute(
            "INSERT INTO complaints (id, item, visitor, date, time, qty, cost, type) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            (
                item.get("id", "").strip(),
                item.get("item", "").strip(),
                item.get("visitor", "").strip(),
                item.get("date", "").strip(),
                item.get("time", "").strip(),
                int(item.get("qty", 1)),
                float(item.get("cost", 0.0)),
                item.get("type", "").strip()
            )
        )

    def map_review(cur, item):
        cur.execute(
            "INSERT INTO reviews (id, location, author, rating, comment, date) VALUES (?, ?, ?, ?, ?, ?)",
            (
                item.get("id", "").strip(),
                item.get("location", "").strip(),
                item.get("author", "").strip(),
                int(item.get("rating", 5)),
                item.get("comment", "").strip(),
                item.get("date", "").strip()
            )
        )

    def map_lostfound(cur, item):
        cur.execute(
            "INSERT INTO lostfound (id, item, visitor, date, time, qty, cost, type) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            (
                item.get("id", "").strip(),
                item.get("item", "").strip(),
                item.get("visitor", "").strip(),
                item.get("date", "").strip(),
                item.get("time", "").strip(),
                int(item.get("qty", 1)),
                float(item.get("cost", 0.0)),
                item.get("type", "").strip()
            )
        )

    # 3. Perform migrations
    migrate_json_to_table(USERS_FILE, "users", map_user)
    migrate_json_to_table(BOOKINGS_FILE, "bookings", map_booking)
    migrate_json_to_table(COMPLAINTS_FILE, "complaints", map_complaint)
    migrate_json_to_table(REVIEWS_FILE, "reviews", map_review)
    migrate_json_to_table(LOSTFOUND_FILE, "lostfound", map_lostfound)
    
    conn.close()

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    
    def log_message(self, format, *args):
        print(f"[LOG] {format % args}")

    def do_GET(self):
        print(f"do_GET: {self.path}")
        try:
            if self.path.startswith("/api/google/login"):
                self.handle_google_login()
            elif self.path.startswith("/api/google/callback"):
                self.handle_google_callback()
            elif self.path == "/api/weather":
                self.handle_get_weather()
            elif self.path == "/api/bookings":
                self.handle_get_bookings()
            elif self.path == "/api/reviews":
                self.handle_get_reviews()
            elif self.path == "/api/lostfound":
                self.handle_get_lostfound()
            else:
                self.serve_static_file()
        except Exception as e:
            print(f"CRITICAL EXCEPTION in do_GET: {e}")
            traceback.print_exc()

    def do_POST(self):
        print(f"do_POST: {self.path}")
        try:
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length).decode('utf-8')
            
            try:
                payload = json.loads(post_data)
            except json.JSONDecodeError:
                self.send_json_response({"error": "Malformed JSON payload"}, 400)
                return

            if self.path == "/api/bookings":
                self.handle_post_booking(payload)
            elif self.path == "/api/complaints":
                self.handle_post_complaint(payload)
            elif self.path == "/api/reviews":
                self.handle_post_review(payload)
            elif self.path == "/api/lostfound":
                self.handle_post_lostfound(payload)
            elif self.path == "/api/signup":
                self.handle_post_signup(payload)
            elif self.path == "/api/login":
                self.handle_post_login(payload)
            elif self.path == "/api/ai/chat":
                self.handle_post_ai_chat(payload)
            else:
                self.send_json_response({"error": "Endpoint not found"}, 404)
        except Exception as e:
            print(f"CRITICAL EXCEPTION in do_POST: {e}")
            traceback.print_exc()

    # ==========================================================================
    # Handler Methods
    # ==========================================================================

    def handle_get_weather(self):
        url = "http://wttr.in/Hyderabad?format=j1"
        try:
            req = urllib.request.Request(
                url, 
                headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
            )
            with urllib.request.urlopen(req, timeout=5) as response:
                data = json.loads(response.read().decode('utf-8'))
                current_condition = data['current_condition'][0]
                temp_c = current_condition['temp_C']
                humidity = current_condition['humidity']
                wind_speed = current_condition['windspeedKmph']
                weather_desc = current_condition['weatherDesc'][0]['value']
                aqi = 75
                
                response_payload = {
                    "temp": float(temp_c),
                    "humidity": int(humidity),
                    "wind": float(wind_speed),
                    "description": weather_desc,
                    "aqi": aqi,
                    "source": "wttr.in Live Feed"
                }
                self.send_json_response(response_payload, 200)
        except Exception as e:
            print(f"Weather proxy failed, using fallback: {e}")
            fallback_payload = {
                "temp": 32.4,
                "humidity": 52,
                "wind": 10.5,
                "description": "Partly Cloudy (Deccan Plateau)",
                "aqi": 82,
                "source": "Backup Deccan Met Office (Mock)"
            }
            self.send_json_response(fallback_payload, 200)

    def handle_get_bookings(self):
        try:
            conn = get_db_connection()
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM bookings")
            rows = cursor.fetchall()
            bookings = []
            for r in rows:
                bookings.append({
                    "id": r["id"],
                    "item": r["item"],
                    "visitor": r["visitor"],
                    "date": r["date"],
                    "time": r["time"],
                    "qty": r["qty"],
                    "cost": r["cost"],
                    "type": r["type"]
                })
            conn.close()
            self.send_json_response(bookings, 200)
        except Exception as e:
            print(f"Error in handle_get_bookings: {e}")
            self.send_error_response("Database error", 500)

    def handle_post_booking(self, payload):
        try:
            conn = get_db_connection()
            cursor = conn.cursor()
            cursor.execute(
                "INSERT INTO bookings (id, item, visitor, date, time, qty, cost, type) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
                (
                    payload.get("id"),
                    payload.get("item"),
                    payload.get("visitor"),
                    payload.get("date"),
                    payload.get("time"),
                    payload.get("qty"),
                    payload.get("cost"),
                    payload.get("type")
                )
            )
            conn.commit()
            conn.close()
            self.send_json_response({"status": "success", "booking": payload}, 201)
        except Exception as e:
            print(f"Error in handle_post_booking: {e}")
            self.send_error_response("Database error", 500)

    def handle_post_complaint(self, payload):
        try:
            conn = get_db_connection()
            cursor = conn.cursor()
            cursor.execute(
                "INSERT INTO complaints (id, item, visitor, date, time, qty, cost, type) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
                (
                    payload.get("id"),
                    payload.get("item"),
                    payload.get("visitor"),
                    payload.get("date"),
                    payload.get("time"),
                    payload.get("qty"),
                    payload.get("cost"),
                    payload.get("type")
                )
            )
            conn.commit()
            conn.close()
            self.send_json_response({"status": "success", "complaint": payload}, 201)
        except Exception as e:
            print(f"Error in handle_post_complaint: {e}")
            self.send_error_response("Database error", 500)

    def handle_get_reviews(self):
        try:
            conn = get_db_connection()
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM reviews")
            rows = cursor.fetchall()
            reviews = []
            for r in rows:
                reviews.append({
                    "id": r["id"],
                    "location": r["location"],
                    "author": r["author"],
                    "rating": r["rating"],
                    "comment": r["comment"],
                    "date": r["date"]
                })
            conn.close()
            self.send_json_response(reviews, 200)
        except Exception as e:
            print(f"Error in handle_get_reviews: {e}")
            self.send_error_response("Database error", 500)

    def handle_post_review(self, payload):
        try:
            conn = get_db_connection()
            cursor = conn.cursor()
            cursor.execute(
                "INSERT INTO reviews (id, location, author, rating, comment, date) VALUES (?, ?, ?, ?, ?, ?)",
                (
                    payload.get("id"),
                    payload.get("location"),
                    payload.get("author"),
                    payload.get("rating"),
                    payload.get("comment"),
                    payload.get("date")
                )
            )
            conn.commit()
            conn.close()
            self.send_json_response({"status": "success", "review": payload}, 201)
        except Exception as e:
            print(f"Error in handle_post_review: {e}")
            self.send_error_response("Database error", 500)

    def handle_get_lostfound(self):
        try:
            conn = get_db_connection()
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM lostfound")
            rows = cursor.fetchall()
            lostfound = []
            for r in rows:
                lostfound.append({
                    "id": r["id"],
                    "item": r["item"],
                    "visitor": r["visitor"],
                    "date": r["date"],
                    "time": r["time"],
                    "qty": r["qty"],
                    "cost": r["cost"],
                    "type": r["type"]
                })
            conn.close()
            self.send_json_response(lostfound, 200)
        except Exception as e:
            print(f"Error in handle_get_lostfound: {e}")
            self.send_error_response("Database error", 500)

    def handle_post_lostfound(self, payload):
        try:
            conn = get_db_connection()
            cursor = conn.cursor()
            cursor.execute(
                "INSERT INTO lostfound (id, item, visitor, date, time, qty, cost, type) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
                (
                    payload.get("id"),
                    payload.get("item"),
                    payload.get("visitor"),
                    payload.get("date"),
                    payload.get("time"),
                    payload.get("qty"),
                    payload.get("cost"),
                    payload.get("type")
                )
            )
            conn.commit()
            conn.close()
            self.send_json_response({"status": "success", "lostfound": payload}, 201)
        except Exception as e:
            print(f"Error in handle_post_lostfound: {e}")
            self.send_error_response("Database error", 500)

    def handle_post_signup(self, payload):
        username = payload.get("username", "").strip()
        email = payload.get("email", "").strip()
        password = payload.get("password", "")
        is_google = payload.get("isGoogle", False)
        avatar_url = payload.get("avatarUrl", "")

        if not username:
            self.send_json_response({"error": "Username is required"}, 400)
            return

        if not is_google and not password:
            self.send_json_response({"error": "Password is required for email accounts"}, 400)
            return

        try:
            conn = get_db_connection()
            cursor = conn.cursor()
            
            # Check if username already exists
            cursor.execute("SELECT username FROM users WHERE LOWER(username) = ?", (username.lower(),))
            if cursor.fetchone():
                conn.close()
                self.send_json_response({"error": "Username is already taken"}, 400)
                return
            
            # Check if email already registered
            if email:
                cursor.execute("SELECT email FROM users WHERE LOWER(email) = ?", (email.lower(),))
                if cursor.fetchone():
                    conn.close()
                    self.send_json_response({"error": "Email is already registered"}, 400)
                    return
            
            cursor.execute(
                "INSERT INTO users (username, email, password, is_google, avatar_url) VALUES (?, ?, ?, ?, ?)",
                (username, email, password, 1 if is_google else 0, avatar_url)
            )
            conn.commit()
            conn.close()
            
            return_user = {
                "username": username,
                "email": email,
                "isGoogle": is_google,
                "avatarUrl": avatar_url
            }
            self.send_json_response({"status": "success", "user": return_user}, 201)
        except Exception as e:
            print(f"Error in handle_post_signup: {e}")
            self.send_error_response("Database error", 500)

    def handle_post_login(self, payload):
        username = payload.get("username", "").strip()
        password = payload.get("password", "")
        is_google = payload.get("isGoogle", False)

        try:
            conn = get_db_connection()
            cursor = conn.cursor()

            if is_google:
                cursor.execute(
                    "SELECT * FROM users WHERE LOWER(username) = ? AND is_google = 1",
                    (username.lower(),)
                )
                user = cursor.fetchone()
                if not user:
                    # Register new Google user dynamically
                    email = payload.get("email", "").strip()
                    avatar_url = payload.get("avatarUrl", "")
                    cursor.execute(
                        "INSERT INTO users (username, email, password, is_google, avatar_url) VALUES (?, ?, ?, ?, ?)",
                        (username, email, "", 1, avatar_url)
                    )
                    conn.commit()
                    user = {
                        "username": username,
                        "email": email,
                        "is_google": 1,
                        "avatar_url": avatar_url
                    }
                else:
                    user = dict(user)

                conn.close()
                return_user = {
                    "username": user["username"],
                    "email": user["email"],
                    "isGoogle": True,
                    "avatarUrl": user["avatar_url"]
                }
                self.send_json_response({"status": "success", "user": return_user}, 200)
                return

            cursor.execute(
                "SELECT * FROM users WHERE LOWER(username) = ? OR LOWER(email) = ?",
                (username.lower(), username.lower())
            )
            row = cursor.fetchone()
            if not row:
                conn.close()
                self.send_json_response({"error": "Invalid username or password"}, 400)
                return

            user = dict(row)
            if user["is_google"] == 1:
                conn.close()
                self.send_json_response({"error": "Invalid username or password"}, 400)
                return

            if user["password"] != password:
                conn.close()
                self.send_json_response({"error": "Invalid username or password"}, 400)
                return

            conn.close()
            return_user = {
                "username": user["username"],
                "email": user["email"],
                "isGoogle": False,
                "avatarUrl": user["avatar_url"]
            }
            self.send_json_response({"status": "success", "user": return_user}, 200)
        except Exception as e:
            print(f"Error in handle_post_login: {e}")
            self.send_error_response("Database error", 500)

    def handle_post_ai_chat(self, payload):
        user_msg = payload.get("message", "").strip()
        if not user_msg:
            self.send_json_response({"error": "Message is required"}, 400)
            return

        if not GEMINI_API_KEY:
            self.send_json_response({
                "reply": "Adaab! I am Nizam AI, your Hyderabad concierge. To activate my full AI capabilities, please add your `GEMINI_API_KEY` to your `.env` file!"
            }, 200)
            return

        system_instruction = (
            "You are 'Nizam AI', an enthusiastic, polite, and deeply knowledgeable local AI concierge for Hyderabad, India (The City of Pearls). "
            "Your tone is warm, culturally rich (using friendly Hyderabadi greetings like 'Adaab', 'Namaskaram', or 'Zabardast'), and helpful. "
            "You provide concise, structured, and practical advice regarding Hyderabad monuments (Charminar, Golconda, Chowmahalla), biryani & Irani chai spots (Niloufer, Paradise, Shah Ghouse), "
            "Hyderabad Metro & TSRTC transit advice, IT hubs (HITEC City, Gachibowli), weather, and city administration. "
            "Keep answers engaging, formatted with bullet points where appropriate, and concise."
        )

        gemini_payload = {
            "contents": [
                {
                    "role": "user",
                    "parts": [{"text": f"System Context: {system_instruction}\n\nUser Question: {user_msg}"}]
                }
            ]
        }

        models_to_try = ["gemini-2.5-flash", "gemini-2.0-flash", "gemini-flash-latest"]
        reply_text = None
        last_error = None

        for model_name in models_to_try:
            url = f"https://generativelanguage.googleapis.com/v1beta/models/{model_name}:generateContent?key={GEMINI_API_KEY}"
            try:
                req_data = json.dumps(gemini_payload).encode('utf-8')
                req = urllib.request.Request(url, data=req_data, headers={"Content-Type": "application/json"})
                with urllib.request.urlopen(req, timeout=12) as response:
                    res_data = json.loads(response.read().decode('utf-8'))
                    reply_text = res_data['candidates'][0]['content']['parts'][0]['text']
                    break
            except Exception as e:
                print(f"[WARN] Failed calling model {model_name}: {e}")
                last_error = e
                continue

        if reply_text:
            self.send_json_response({"status": "success", "reply": reply_text}, 200)
        else:
            print(f"Error calling Google AI Studio API: {last_error}")
            traceback.print_exc()
            self.send_json_response({"reply": "Adaab! I encountered a temporary connection issue reaching Google AI Studio. Please verify your API key!"}, 200)

    def serve_config_error(self, message):
        html = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Google OAuth Setup Required</title>
    <style>
        body {{
            background: #070a13;
            color: #e2e8f0;
            font-family: 'Segoe UI', system-ui, sans-serif;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            margin: 0;
            padding: 20px;
        }}
        .card {{
            background: rgba(30, 41, 59, 0.4);
            backdrop-filter: blur(16px);
            border: 1px solid rgba(255, 255, 255, 0.08);
            padding: 40px;
            border-radius: 16px;
            max-width: 500px;
            text-align: center;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
        }}
        h1 {{
            color: #d4af37;
            font-size: 24px;
            margin-top: 0;
            margin-bottom: 16px;
        }}
        p {{
            color: #94a3b8;
            font-size: 15px;
            line-height: 1.6;
        }}
        .code-block {{
            background: #020617;
            padding: 16px;
            border-radius: 8px;
            font-family: 'Courier New', Courier, monospace;
            font-size: 13px;
            color: #38bdf8;
            text-align: left;
            margin: 24px 0;
            overflow-x: auto;
            border: 1px solid rgba(56, 189, 248, 0.2);
        }}
        .btn {{
            display: inline-block;
            background: linear-gradient(135deg, #d4af37, #b59023);
            color: #070a13;
            padding: 12px 24px;
            border-radius: 8px;
            text-decoration: none;
            font-weight: 600;
            margin-top: 15px;
            transition: transform 0.2s, box-shadow 0.2s;
        }}
        .btn:hover {{
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(212, 175, 55, 0.3);
        }}
    </style>
</head>
<body>
    <div class="card">
        <h1>Google OAuth Credentials Required</h1>
        <p>{message}</p>
        <div class="code-block">
            # Please set these environment variables before running the server:<br>
            $env:GOOGLE_CLIENT_ID="your_client_id"<br>
            $env:GOOGLE_CLIENT_SECRET="your_client_secret"
        </div>
        <p>Or configure them on your deployment dashboard (e.g. Render, Heroku).</p>
        <a href="/" class="btn">Return to Hyderabad 360</a>
    </div>
</body>
</html>"""
        content = html.encode("utf-8")
        self.send_response(200)
        self.send_header("Content-Type", "text/html; charset=utf-8")
        self.send_header("Content-Length", str(len(content)))
        self.end_headers()
        self.wfile.write(content)

    def handle_google_login(self):
        if not GOOGLE_CLIENT_ID or not GOOGLE_CLIENT_SECRET:
            self.serve_config_error("Google client credentials are not configured in environment variables.")
            return

        host = self.headers.get("Host", "localhost:8000")
        proto = self.headers.get("X-Forwarded-Proto")
        if not proto:
            proto = "http" if ("localhost" in host or "127.0.0.1" in host) else "https"
        redirect_uri = f"{proto}://{host}/api/google/callback"

        params = {
            "client_id": GOOGLE_CLIENT_ID,
            "redirect_uri": redirect_uri,
            "response_type": "code",
            "scope": "openid email profile",
            "prompt": "select_account",
            "state": "google_oauth_state"
        }
        auth_url = f"https://accounts.google.com/o/oauth2/v2/auth?{urllib.parse.urlencode(params)}"
        
        self.send_response(302)
        self.send_header("Location", auth_url)
        self.end_headers()

    def handle_google_callback(self):
        if not GOOGLE_CLIENT_ID or not GOOGLE_CLIENT_SECRET:
            self.serve_config_error("Google client credentials are not configured in environment variables.")
            return

        parsed_url = urllib.parse.urlsplit(self.path)
        query_params = urllib.parse.parse_qs(parsed_url.query)
        
        code_list = query_params.get("code")
        if not code_list:
            self.send_response(302)
            self.send_header("Location", "/index.html?login_error=Missing+authorization+code")
            self.end_headers()
            return
            
        code = code_list[0]

        host = self.headers.get("Host", "localhost:8000")
        proto = self.headers.get("X-Forwarded-Proto")
        if not proto:
            proto = "http" if ("localhost" in host or "127.0.0.1" in host) else "https"
        redirect_uri = f"{proto}://{host}/api/google/callback"

        # Exchange authorization code for token
        token_url = "https://oauth2.googleapis.com/token"
        post_data = urllib.parse.urlencode({
            "code": code,
            "client_id": GOOGLE_CLIENT_ID,
            "client_secret": GOOGLE_CLIENT_SECRET,
            "redirect_uri": redirect_uri,
            "grant_type": "authorization_code"
        }).encode("utf-8")
        
        try:
            req = urllib.request.Request(
                token_url,
                data=post_data,
                headers={"Content-Type": "application/x-www-form-urlencoded"}
            )
            with urllib.request.urlopen(req, timeout=10) as response:
                token_res = json.loads(response.read().decode("utf-8"))
        except Exception as e:
            print(f"Token exchange failed: {e}")
            self.send_response(302)
            self.send_header("Location", "/index.html?login_error=Token+exchange+failed")
            self.end_headers()
            return
            
        access_token = token_res.get("access_token")
        if not access_token:
            self.send_response(302)
            self.send_header("Location", "/index.html?login_error=No+access+token+received")
            self.end_headers()
            return

        # Fetch user info
        userinfo_url = "https://www.googleapis.com/oauth2/v3/userinfo"
        try:
            req = urllib.request.Request(
                userinfo_url,
                headers={"Authorization": f"Bearer {access_token}"}
            )
            with urllib.request.urlopen(req, timeout=10) as response:
                user_info = json.loads(response.read().decode("utf-8"))
        except Exception as e:
            print(f"Failed to fetch Google userinfo: {e}")
            self.send_response(302)
            self.send_header("Location", "/index.html?login_error=Failed+to+retrieve+profile")
            self.end_headers()
            return

        email = user_info.get("email", "").strip()
        name = user_info.get("name", "").strip()
        picture = user_info.get("picture", "").strip()
        
        if not email:
            self.send_response(302)
            self.send_header("Location", "/index.html?login_error=Email+not+provided+by+Google")
            self.end_headers()
            return

        # SQLite storage logic
        try:
            conn = get_db_connection()
            cursor = conn.cursor()
            
            # Look up by email
            cursor.execute("SELECT username FROM users WHERE LOWER(email) = ?", (email.lower(),))
            row = cursor.fetchone()
            if row:
                username = row["username"]
                # Update Google status and avatar
                cursor.execute(
                    "UPDATE users SET is_google = 1, avatar_url = ? WHERE username = ?",
                    (picture, username)
                )
            else:
                # Generate unique username
                # base_username should only contain valid characters
                base_username = "".join(c for c in name if c.isalnum() or c in " _.-").strip().replace(" ", "_")
                if not base_username:
                    base_username = email.split("@")[0]
                username = base_username
                counter = 1
                while True:
                    cursor.execute("SELECT username FROM users WHERE LOWER(username) = ?", (username.lower(),))
                    if not cursor.fetchone():
                        break
                    username = f"{base_username}_{counter}"
                    counter += 1
                
                cursor.execute(
                    "INSERT INTO users (username, email, password, is_google, avatar_url) VALUES (?, ?, ?, ?, ?)",
                    (username, email, "", 1, picture)
                )
            conn.commit()
            conn.close()
        except Exception as e:
            print(f"Database operation failed for OAuth callback: {e}")
            traceback.print_exc()
            self.send_response(302)
            self.send_header("Location", "/index.html?login_error=Database+registration+error")
            self.end_headers()
            return

        # Redirect with details
        params = {
            "login_success": "true",
            "username": username,
            "email": email,
            "avatar_url": picture
        }
        redirect_url = f"/index.html?{urllib.parse.urlencode(params)}"
        self.send_response(302)
        self.send_header("Location", redirect_url)
        self.end_headers()

    # ==========================================================================
    # Helper Utilities
    # ==========================================================================

    def serve_static_file(self):
        clean_path = self.path.split("?")[0]
        if clean_path == "/" or clean_path == "":
            clean_path = "/index.html"
        
        # Absolute path resolution on Windows
        filename = clean_path.lstrip("/")
        local_path = os.path.abspath(os.path.join(os.getcwd(), filename))
        print(f"Resolving static file: self.path='{self.path}' -> local_path='{local_path}'")
        
        if not os.path.exists(local_path) or os.path.isdir(local_path):
            print(f"File NOT found: {local_path}")
            self.send_error_response("File Not Found", 404)
            return

        # Determine MIME Type
        _, ext = os.path.splitext(local_path)
        mime_types = {
            ".html": "text/html",
            ".css": "text/css",
            ".js": "application/javascript",
            ".json": "application/json",
            ".png": "image/png",
            ".jpg": "image/jpeg",
            ".jpeg": "image/jpeg",
            ".svg": "image/svg+xml"
        }
        content_type = mime_types.get(ext.lower(), "application/octet-stream")

        with open(local_path, "rb") as f:
            content = f.read()
            print(f"Sending file response: {local_path} ({len(content)} bytes), Content-Type: {content_type}")
            self.send_response(200)
            self.send_header("Content-Type", content_type)
            self.send_header("Content-Length", str(len(content)))
            self.end_headers()
            self.wfile.write(content)
            print("Response successfully written to wfile!")

    def send_json_response(self, data, status_code=200):
        content = json.dumps(data).encode('utf-8')
        self.send_response(status_code)
        self.send_header("Content-Type", "application/json")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Content-Length", str(len(content)))
        self.end_headers()
        self.wfile.write(content)

    def send_error_response(self, message, status_code):
        self.send_json_response({"error": message}, status_code)

    def read_json_file(self, filepath):
        if not os.path.exists(filepath):
            return []
        try:
            with open(filepath, "r") as f:
                return json.load(f)
        except Exception as e:
            print(f"Error reading JSON {filepath}: {e}")
            return []

    def write_json_file(self, filepath, data):
        os.makedirs(os.path.dirname(filepath), exist_ok=True)
        try:
            with open(filepath, "w") as f:
                json.dump(data, f, indent=2)
        except Exception as e:
            print(f"Error writing JSON {filepath}: {e}")

if __name__ == "__main__":
    init_db()
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), CustomHTTPRequestHandler) as httpd:
        print(f"[SUCCESS] Hyderabad 360 Full-Stack Server active on port {PORT}")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n[INFO] Server shutting down.")
