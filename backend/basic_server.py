#!/usr/bin/env python3
"""
Basic HTTP server for AppRunner testing
"""
import http.server
import socketserver
import json
import logging
import sys
from urllib.parse import urlparse

# Set up logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[logging.StreamHandler(sys.stdout)]
)
logger = logging.getLogger(__name__)

class HealthHandler(http.server.BaseHTTPRequestHandler):
    def do_GET(self):
        logger.info(f"GET request received: {self.path}")
        
        if self.path == '/' or self.path == '/health':
            # Return successful health check
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            
            response = {
                "status": "healthy",
                "message": "Basic HTTP server running",
                "path": self.path
            }
            
            self.wfile.write(json.dumps(response).encode())
            logger.info(f"✅ Returned 200 OK for {self.path}")
        else:
            # Return 404 for other paths
            self.send_response(404)
            self.end_headers()
            logger.info(f"❌ Returned 404 for {self.path}")
    
    def log_message(self, format, *args):
        # Override to use our logger
        logger.info(f"HTTP: {format % args}")

if __name__ == "__main__":
    PORT = 8080
    logger.info("=== STARTING BASIC HTTP SERVER ===")
    logger.info(f"Port: {PORT}")
    
    try:
        with socketserver.TCPServer(("0.0.0.0", PORT), HealthHandler) as httpd:
            logger.info(f"✅ Server started successfully on 0.0.0.0:{PORT}")
            logger.info("Endpoints available:")
            logger.info("  GET / -> health check")
            logger.info("  GET /health -> health check")
            logger.info("=== SERVER READY FOR CONNECTIONS ===")
            httpd.serve_forever()
    except Exception as e:
        logger.error(f"❌ Failed to start server: {e}")
        sys.exit(1)