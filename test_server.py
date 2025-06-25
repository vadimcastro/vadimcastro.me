#!/usr/bin/env python3
import socketserver
import http.server
import sys
import os

print("=== STARTING SERVER ===", flush=True)
print(f"Python version: {sys.version}", flush=True)
print(f"Working directory: {os.getcwd()}", flush=True)
print(f"Files: {os.listdir('.')}", flush=True)

class Handler(http.server.BaseHTTPRequestHandler):
    def do_GET(self):
        print(f"GET {self.path}", flush=True)
        self.send_response(200)
        self.send_header('Content-Type', 'text/plain')
        self.end_headers()
        self.wfile.write(b'OK\n')
        print(f"Responded OK to {self.path}", flush=True)
    
    def log_message(self, format, *args):
        print(f"HTTP: {format % args}", flush=True)

PORT = 8080
print(f"Binding to 0.0.0.0:{PORT}", flush=True)

try:
    with socketserver.TCPServer(("0.0.0.0", PORT), Handler) as httpd:
        print(f"=== SERVER READY ON PORT {PORT} ===", flush=True)
        httpd.serve_forever()
except Exception as e:
    print(f"ERROR: {e}", flush=True)
    raise