import http.server
import socketserver
import json
import os
import urllib.request
import urllib.error
import traceback
import sqlite3

PORT = int(os.environ.get("PORT", 8000))
DATA_DIR = "/data" if os.environ.get("RENDER") or os.path.isdir("/data") else "./data"
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
            if self.path == "/api/weather":
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
