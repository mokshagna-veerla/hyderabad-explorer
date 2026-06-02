import subprocess
import time
import urllib.request
import os
import signal

def diagnostic():
    print("Starting server.py in diagnostic mode...")
    
    proc = subprocess.Popen(
        ["python", "-u", "server.py"],
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        cwd=os.getcwd(),
        text=True
    )
    
    # Wait for server to boot
    time.sleep(2)
    
    # Test IPv4 loopback
    print("Testing connection to http://127.0.0.1:8000/...")
    try:
        response = urllib.request.urlopen("http://127.0.0.1:8000/", timeout=2)
        print("IPv4 Connection succeeded! Status code:", response.status)
    except Exception as e:
        print(f"IPv4 Connection failed: {e}")
    
    # Test localhost loopback
    print("Testing connection to http://localhost:8000/...")
    try:
        response = urllib.request.urlopen("http://localhost:8000/", timeout=2)
        print("localhost Connection succeeded! Status code:", response.status)
    except Exception as e:
        print(f"localhost Connection failed: {e}")
        
    time.sleep(1)
    
    # Terminate process
    proc.terminate()
    try:
        stdout, stderr = proc.communicate(timeout=2)
        print("\n=== SERVER STDOUT ===")
        print(stdout)
        print("\n=== SERVER STDERR ===")
        print(stderr)
    except Exception as e:
        print(f"Failed to communicate: {e}")

if __name__ == "__main__":
    diagnostic()
