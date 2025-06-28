#!/usr/bin/env python3
"""
Bulletproof server that cannot fail to start
"""
try:
    import http.server
    import socketserver
    import json
    import sys
    import os
    
    print("=== BULLETPROOF SERVER STARTING ===", flush=True)
    print(f"Python: {sys.version}", flush=True)
    print(f"Working dir: {os.getcwd()}", flush=True)
    print(f"Files in dir: {os.listdir('.')}", flush=True)
    print("=== ATTEMPTING TO START SERVER ===", flush=True)
    
    class Handler(http.server.BaseHTTPRequestHandler):
        def do_GET(self):
            print(f"Request: {self.path}", flush=True)
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            response = {"status": "success", "path": self.path}
            self.wfile.write(json.dumps(response).encode())
        
        def log_message(self, format, *args):
            print(f"HTTP: {format % args}", flush=True)
    
    PORT = 8000
    print(f"Starting server on port {PORT}...", flush=True)
    
    with socketserver.TCPServer(("0.0.0.0", PORT), Handler) as httpd:
        print(f"✅ SERVER RUNNING ON PORT {PORT}", flush=True)
        print("✅ READY FOR HEALTH CHECKS", flush=True)
        httpd.serve_forever()

except Exception as e:
    print(f"❌ FATAL ERROR: {e}", flush=True)
    print(f"Error type: {type(e).__name__}", flush=True)
    import traceback
    print(f"Traceback: {traceback.format_exc()}", flush=True)
    sys.exit(1)