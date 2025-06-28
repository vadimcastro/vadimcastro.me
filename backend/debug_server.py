#!/usr/bin/env python3
"""
Debug server to diagnose AppRunner networking issues
"""
import http.server
import socketserver
import json
import logging
import sys
import socket
import os
import threading
import time

# Set up comprehensive logging
logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[logging.StreamHandler(sys.stdout)]
)
logger = logging.getLogger(__name__)

def log_environment():
    """Log environment information"""
    logger.info("=== ENVIRONMENT INFO ===")
    logger.info(f"Python version: {sys.version}")
    logger.info(f"Platform: {sys.platform}")
    logger.info(f"Working directory: {os.getcwd()}")
    logger.info(f"Environment variables:")
    for key, value in os.environ.items():
        if 'PORT' in key or 'HOST' in key or 'ENVIRONMENT' in key:
            logger.info(f"  {key}={value}")

def test_network():
    """Test network capabilities"""
    logger.info("=== NETWORK DIAGNOSTICS ===")
    
    # Test hostname resolution
    try:
        hostname = socket.gethostname()
        logger.info(f"Hostname: {hostname}")
        
        # Get all network interfaces
        addrs = socket.getaddrinfo(hostname, None)
        for addr in addrs:
            logger.info(f"Address: {addr}")
    except Exception as e:
        logger.error(f"Network test failed: {e}")

def test_port_binding():
    """Test if we can bind to port 8080"""
    logger.info("=== PORT BINDING TEST ===")
    
    for host in ['0.0.0.0', '127.0.0.1', 'localhost']:
        try:
            sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            sock.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
            sock.bind((host, 8000))
            logger.info(f"✅ Can bind to {host}:8000")
            sock.close()
        except Exception as e:
            logger.error(f"❌ Cannot bind to {host}:8000: {e}")

class DiagnosticHandler(http.server.BaseHTTPRequestHandler):
    def do_GET(self):
        logger.info("=" * 50)
        logger.info(f"🔥 INCOMING REQUEST: {self.path}")
        logger.info(f"Client: {self.client_address}")
        logger.info(f"Headers: {dict(self.headers)}")
        logger.info("=" * 50)
        
        # Always return success for any path
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        
        response = {
            "status": "SUCCESS",
            "message": "Server is working!",
            "path": self.path,
            "client": str(self.client_address),
            "timestamp": time.time()
        }
        
        response_json = json.dumps(response, indent=2)
        self.wfile.write(response_json.encode())
        
        logger.info(f"✅ SENT RESPONSE: {response}")
        logger.info("=" * 50)
    
    def do_HEAD(self):
        logger.info(f"🔥 HEAD REQUEST: {self.path}")
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
    
    def do_OPTIONS(self):
        logger.info(f"🔥 OPTIONS REQUEST: {self.path}")
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', '*')
        self.end_headers()
    
    def log_message(self, format, *args):
        logger.info(f"HTTP LOG: {format % args}")

def heartbeat():
    """Send periodic heartbeat logs"""
    while True:
        time.sleep(30)
        logger.info("💓 HEARTBEAT: Server is still running...")

if __name__ == "__main__":
    logger.info("🚀 STARTING DIAGNOSTIC SERVER")
    
    # Log environment
    log_environment()
    
    # Test network
    test_network()
    
    # Test port binding
    test_port_binding()
    
    # Start heartbeat thread
    heartbeat_thread = threading.Thread(target=heartbeat, daemon=True)
    heartbeat_thread.start()
    
    PORT = 8000
    logger.info(f"🎯 ATTEMPTING TO START SERVER ON PORT {PORT}")
    
    try:
        with socketserver.TCPServer(("0.0.0.0", PORT), DiagnosticHandler) as httpd:
            logger.info("🎉 SERVER STARTED SUCCESSFULLY!")
            logger.info(f"🌐 Listening on 0.0.0.0:{PORT}")
            logger.info("📡 Waiting for connections...")
            logger.info("🏥 Health check endpoint: GET /")
            logger.info("=" * 60)
            
            httpd.serve_forever()
            
    except Exception as e:
        logger.error(f"💥 FAILED TO START SERVER: {e}")
        logger.error(f"Exception type: {type(e).__name__}")
        import traceback
        logger.error(f"Traceback: {traceback.format_exc()}")
        sys.exit(1)