import sys
import os

# Allow importing modules from the parent directory
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from server import CustomHTTPRequestHandler, init_db

# Initialize transient database in /tmp
init_db()

# Expose Vercel-compatible class handler
class handler(CustomHTTPRequestHandler):
    pass
