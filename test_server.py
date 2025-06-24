#!/usr/bin/env python3
import http.server
import socketserver
import os

PORT = 8080

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        print(f"Received request: {self.path}")
        if self.path == '/' or self.path == '/health':
            self.send_response(200)
            self.send_header('Content-type', 'text/plain')
            self.end_headers()
            self.wfile.write(b'OK')
            print("Sent OK response")
        else:
            self.send_response(404)
            self.send_header('Content-type', 'text/plain')
            self.end_headers()
            self.wfile.write(b'Not Found')

if __name__ == "__main__":
    print(f"Starting server on port {PORT}")
    print(f"Working directory: {os.getcwd()}")
    print(f"Files in directory: {os.listdir('.')}")
    
    with socketserver.TCPServer(("0.0.0.0", PORT), MyHTTPRequestHandler) as httpd:
        print(f"Server running at http://0.0.0.0:{PORT}")
        httpd.serve_forever()