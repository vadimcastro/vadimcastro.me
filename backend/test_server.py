#!/usr/bin/env python3
print("=== TEST SERVER STARTING ===", flush=True)

import sys
import os
print(f"Python: {sys.version}", flush=True)
print(f"Working dir: {os.getcwd()}", flush=True)
print(f"Files: {os.listdir('.')}", flush=True)

try:
    import socketserver
    import http.server
    print("Imports successful", flush=True)
    
    class Handler(http.server.BaseHTTPRequestHandler):
        def do_GET(self):
            print(f"GET {self.path}", flush=True)
            self.send_response(200)
            self.send_header('Content-Type', 'text/plain')
            self.end_headers()
            self.wfile.write(b'OK\n')
        
        def log_message(self, format, *args):
            print(f"HTTP: {format % args}", flush=True)
    
    PORT = 8080
    print(f"Creating server on 0.0.0.0:{PORT}", flush=True)
    
    httpd = socketserver.TCPServer(("0.0.0.0", PORT), Handler)
    print("=== SERVER READY ===", flush=True)
    httpd.serve_forever()
    
except Exception as e:
    print(f"FATAL ERROR: {e}", flush=True)
    import traceback
    traceback.print_exc()
    sys.exit(1)