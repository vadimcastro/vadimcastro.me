# app/services/system.py
import psutil
import platform
import subprocess
import os
from datetime import datetime
from typing import Dict, List, Optional
import logging

logger = logging.getLogger(__name__)

class SystemService:
    @staticmethod
    def get_system_metrics() -> Dict:
        """Get host system metrics (CPU, Memory, Disk)"""
        try:
            # CPU Usage
            cpu_percent = psutil.cpu_percent(interval=1)
            cpu_count = psutil.cpu_count()
            
            # Memory Usage
            memory = psutil.virtual_memory()
            memory_used_gb = round(memory.used / (1024**3), 2)
            memory_total_gb = round(memory.total / (1024**3), 2)
            memory_percent = round(memory.percent, 1)
            
            # Disk Usage
            disk = psutil.disk_usage('/')
            disk_used_gb = round(disk.used / (1024**3), 2)
            disk_total_gb = round(disk.total / (1024**3), 2)
            disk_percent = round((disk.used / disk.total) * 100, 1)
            
            # Load Average (Linux/Unix only)
            load_avg = None
            if hasattr(os, 'getloadavg'):
                load_avg = os.getloadavg()
            
            # Docker status
            docker_status = SystemService.get_docker_status()
            
            return {
                "cpu": {
                    "usage_percent": cpu_percent,
                    "cores": cpu_count,
                    "load_average": list(load_avg) if load_avg else None
                },
                "memory": {
                    "used_gb": memory_used_gb,
                    "total_gb": memory_total_gb,
                    "usage_percent": memory_percent,
                    "available_gb": round(memory.available / (1024**3), 2)
                },
                "disk": {
                    "used_gb": disk_used_gb,
                    "total_gb": disk_total_gb,
                    "usage_percent": disk_percent,
                    "free_gb": round(disk.free / (1024**3), 2)
                },
                "docker": docker_status,
                "platform": {
                    "system": platform.system(),
                    "release": platform.release(),
                    "machine": platform.machine()
                }
            }
        except Exception as e:
            logger.error(f"Error getting system metrics: {e}")
            return {"error": str(e)}

    @staticmethod
    def get_docker_status() -> Dict:
        """Get Docker container status via subprocess"""
        try:
            result = subprocess.run(
                ['docker', 'ps', '--format', 'table {{.Names}}\t{{.Status}}\t{{.Ports}}'],
                capture_output=True, text=True, timeout=5
            )
            
            if result.returncode == 0:
                lines = result.stdout.strip().split('\n')[1:]  # Skip header
                containers = []
                for line in lines:
                    if line.strip():
                        parts = line.split('\t')
                        if len(parts) >= 2:
                            containers.append({
                                "name": parts[0],
                                "status": parts[1],
                                "ports": parts[2] if len(parts) > 2 else ""
                            })
                return {
                    "containers": containers,
                    "total_running": len(containers)
                }
            return {"error": "Docker command failed"}
        except Exception as e:
            return {"error": str(e)}

    @staticmethod
    def get_network_metrics() -> Dict:
        """Get network I/O stats"""
        try:
            net_io = psutil.net_io_counters()
            connections = psutil.net_connections(kind='inet')
            active_connections = len([c for c in connections if c.status == 'ESTABLISHED'])
            
            return {
                "bytes_sent": net_io.bytes_sent,
                "bytes_recv": net_io.bytes_recv,
                "packets_sent": net_io.packets_sent,
                "packets_recv": net_io.packets_recv,
                "active_connections": active_connections,
                "total_connections": len(connections)
            }
        except Exception as e:
            return {"error": str(e)}

    @staticmethod
    def get_application_health() -> Dict:
        """Get health of the current API process"""
        try:
            process = psutil.Process()
            memory_info = process.memory_info()
            memory_mb = round(memory_info.rss / (1024**2), 2)
            cpu_percent = process.cpu_percent()
            uptime = datetime.now() - datetime.fromtimestamp(process.create_time())
            
            return {
                "memory_usage_mb": memory_mb,
                "cpu_percent": cpu_percent,
                "uptime_seconds": int(uptime.total_seconds()),
                "uptime_human": str(uptime).split('.')[0],
                "thread_count": process.num_threads(),
                "status": "healthy"
            }
        except Exception as e:
            return {"error": str(e), "status": "unhealthy"}

    @staticmethod
    def get_deployment_info() -> Dict:
        """Get git and env info from environment variables"""
        try:
            return {
                "current_branch": os.getenv("GIT_BRANCH", "unknown"),
                "commit_hash": os.getenv("GIT_COMMIT_HASH", "unknown")[:8],
                "commit_message": os.getenv("GIT_COMMIT_MESSAGE", "unknown"),
                "environment": os.getenv("ENVIRONMENT", "unknown"),
                "deploy_time": datetime.now().isoformat()
            }
        except Exception as e:
            return {"error": str(e)}

    @staticmethod
    def get_disk_details() -> Dict:
        """Get detailed disk usage with cleanup potential (matching frontend interface)"""
        try:
            disk = psutil.disk_usage('/')
            disk_used_gb = round(disk.used / (1024**3), 2)
            disk_total_gb = round(disk.total / (1024**3), 2)
            disk_free_gb = round(disk.free / (1024**3), 2)
            disk_percent = round((disk.used / disk.total) * 100, 1)
            
            # Docker usage (simplified for local dev if command fails)
            docker_usage = {"total_size_gb": 0, "percentage_of_disk": 0}
            try:
                # Try to get real docker size if possible
                result = subprocess.run(
                    ['docker', 'system', 'df', '--format', '{{.Size}}'],
                    capture_output=True, text=True, timeout=2
                )
                if result.returncode == 0:
                    # Very simple parsing for now
                    sizes = result.stdout.strip().split('\n')
                    total_gb = 0
                    for s in sizes:
                        if 'GB' in s: total_gb += float(s.replace('GB', ''))
                        elif 'MB' in s: total_gb += float(s.replace('MB', '')) / 1024
                    docker_usage["total_size_gb"] = round(total_gb, 2)
                    docker_usage["percentage_of_disk"] = round((total_gb / disk_total_gb) * 100, 1)
            except:
                pass

            # Mock some cleanup potential for the dashboard visuals
            cleanup_potential = {
                "total_potential_gb": round(docker_usage["total_size_gb"] * 0.2, 2),
                "docker_cache_gb": round(docker_usage["total_size_gb"] * 0.15, 2),
                "logs_cleanup_mb": 50,
                "package_cache_mb": 100
            }
            
            return {
                "disk_used_gb": disk_used_gb,
                "disk_total_gb": disk_total_gb,
                "disk_free_gb": disk_free_gb,
                "disk_percent": disk_percent,
                "docker_usage": docker_usage,
                "cleanup_potential": cleanup_potential,
                "health_status": "warning" if disk_percent > 85 else "caution" if disk_percent > 70 else "good"
            }
        except Exception as e:
            logger.error(f"Error in get_disk_details: {e}")
            return {
                "disk_used_gb": 0, "disk_total_gb": 0, "disk_free_gb": 0, "disk_percent": 0,
                "docker_usage": {"total_size_gb": 0, "percentage_of_disk": 0},
                "cleanup_potential": {"total_potential_gb": 0, "docker_cache_gb": 0, "logs_cleanup_mb": 0, "package_cache_mb": 0},
                "health_status": "error"
            }
