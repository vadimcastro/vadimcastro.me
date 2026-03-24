# app/schemas/metrics.py
from pydantic import BaseModel, Field
from typing import Dict, List, Any, Optional

# --- System Metrics Components ---

class CPUMetrics(BaseModel):
    usage_percent: float = 0.0
    cores: int = 0
    load_average: Optional[List[float]] = None

class MemoryMetrics(BaseModel):
    used_gb: float = 0.0
    total_gb: float = 0.0
    usage_percent: float = 0.0
    available_gb: float = 0.0

class DiskUsageDetails(BaseModel):
    used_gb: float = 0.0
    total_gb: float = 0.0
    usage_percent: float = 0.0
    free_gb: float = 0.0

class ContainerInfo(BaseModel):
    name: str
    status: str
    ports: str

class DockerStatus(BaseModel):
    containers: Optional[List[ContainerInfo]] = Field(default_factory=list)
    total_running: Optional[int] = 0
    error: Optional[str] = None

class PlatformInfo(BaseModel):
    system: str = "unknown"
    release: str = "unknown"
    machine: str = "unknown"

class SystemMetrics(BaseModel):
    cpu: Optional[CPUMetrics] = None
    memory: Optional[MemoryMetrics] = None
    disk: Optional[DiskUsageDetails] = None
    docker: Optional[DockerStatus] = None
    platform: Optional[PlatformInfo] = None
    error: Optional[str] = None

# --- Network Metrics ---

class NetworkMetrics(BaseModel):
    bytes_sent: int = 0
    bytes_recv: int = 0
    packets_sent: int = 0
    packets_recv: int = 0
    active_connections: int = 0
    total_connections: int = 0
    error: Optional[str] = None

# --- Disk Metrics (Detailed for Modal) ---

class DockerUsage(BaseModel):
    total_size_gb: float = 0.0
    percentage_of_disk: float = 0.0

class CleanupPotential(BaseModel):
    total_potential_gb: float = 0.0
    docker_cache_gb: float = 0.0
    logs_cleanup_mb: int = 0
    package_cache_mb: int = 0

class DiskMetrics(BaseModel):
    disk_used_gb: float = 0.0
    disk_total_gb: float = 0.0
    disk_free_gb: float = 0.0
    disk_percent: float = 0.0
    docker_usage: Optional[DockerUsage] = None
    cleanup_potential: Optional[CleanupPotential] = None
    health_status: str = "unknown"
    error: Optional[str] = None

# --- Analytics & Visitor Metrics ---

class VisitorMetrics(BaseModel):
    total: int = 0
    percentageChange: float = 0.0
    lastMonthTotal: int = 0
    totalInteractions: int = 0
    interactionCounts: Dict[str, int] = {}
    error: Optional[str] = None

class SessionMetrics(BaseModel):
    active: int = 0
    percentageChange: float = 0.0
    previousHourActive: int = 0
    totalToday: int = 0
    error: Optional[str] = None

# --- Health & Deployment ---

class HealthMetrics(BaseModel):
    memory_usage_mb: float = 0.0
    cpu_percent: float = 0.0
    uptime_seconds: int = 0
    uptime_human: str = "unknown"
    thread_count: int = 0
    status: str = "unknown"
    error: Optional[str] = None

class DeploymentInfo(BaseModel):
    current_branch: str = "unknown"
    commit_hash: str = "unknown"
    commit_message: str = "unknown"
    environment: str = "unknown"
    deploy_time: str = "unknown"
    error: Optional[str] = None
