import React, { useState } from 'react';
import { GitBranch, Cpu, Zap, HardDrive, Wifi, Server, ChevronDown, ChevronUp } from 'lucide-react';
import { MetricCard } from './MetricCard';

interface SystemMetrics {
  cpu: {
    usage_percent: number;
    cores: number;
    load_average?: number[];
  };
  memory: {
    used_gb: number;
    total_gb: number;
    usage_percent: number;
    available_gb: number;
  };
  disk: {
    used_gb: number;
    total_gb: number;
    usage_percent: number;
    free_gb: number;
  };
  docker: {
    containers: Array<{
      name: string;
      status: string;
      ports: string;
    }>;
    total_running: number;
  };
}

interface NetworkMetrics {
  bytes_sent: number;
  bytes_recv: number;
  packets_sent: number;
  packets_recv: number;
  active_connections: number;
  total_connections: number;
}

interface HealthMetrics {
  memory_usage_mb: number;
  cpu_percent: number;
  uptime_seconds: number;
  uptime_human: string;
  thread_count: number;
  status: string;
}

interface DeploymentMetrics {
  current_branch: string;
  commit_hash: string;
  commit_message: string;
  commit_date: string;
  environment: string;
  deploy_time: string;
}

interface InfrastructureMetricsProps {
  system: SystemMetrics;
  network: NetworkMetrics;
  health: HealthMetrics;
  deployment: DeploymentMetrics;
}

const formatBytes = (bytes: number): string => {
  const gb = bytes / (1024 ** 3);
  if (gb > 1) return `${gb.toFixed(1)}GB`;
  const mb = bytes / (1024 ** 2);
  return `${mb.toFixed(0)}MB`;
};

const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('en-US').format(num);
};

export const InfrastructureMetrics: React.FC<InfrastructureMetricsProps> = ({
  system,
  network,
  health,
  deployment
}) => {
  const [showAllMetrics, setShowAllMetrics] = useState(false);
  // Helper function to determine health status based on usage
  const getHealthStatus = (usage: number, type: 'cpu' | 'memory' | 'disk'): 'healthy' | 'warning' | 'critical' => {
    const thresholds = {
      cpu: { warning: 70, critical: 85 },
      memory: { warning: 75, critical: 90 },
      disk: { warning: 80, critical: 95 }
    };
    
    const threshold = thresholds[type];
    if (usage >= threshold.critical) return 'critical';
    if (usage >= threshold.warning) return 'warning';
    return 'healthy';
  };

  const metrics = [
    {
      title: "Deploy Branch",
      value: deployment.current_branch || `${deployment.commit_hash}`,
      change: deployment.current_branch ? deployment.commit_hash : "release/tag",
      icon: GitBranch,
      description: deployment.current_branch ? "current" : "deployed",
      trend: "up" as const,
      healthStatus: "healthy" as const
    },
    {
      title: "CPU Usage",
      value: `${system.cpu.usage_percent.toFixed(1)}%`,
      change: `${system.cpu.cores} cores`,
      icon: Cpu,
      description: "system load",
      trend: system.cpu.usage_percent < 70 ? "up" as const : "down" as const,
      healthStatus: getHealthStatus(system.cpu.usage_percent, 'cpu')
    },
    {
      title: "Memory",
      value: `${system.memory.usage_percent.toFixed(0)}%`,
      change: `${system.memory.used_gb}GB used`,
      icon: Zap,
      description: `of ${system.memory.total_gb}GB`,
      trend: system.memory.usage_percent < 80 ? "up" as const : "down" as const,
      healthStatus: getHealthStatus(system.memory.usage_percent, 'memory')
    },
    {
      title: "Disk Space",
      value: `${system.disk.free_gb.toFixed(1)}GB`,
      change: `${system.disk.usage_percent.toFixed(0)}% used`,
      icon: HardDrive,
      description: "free space",
      trend: system.disk.usage_percent < 80 ? "up" as const : "down" as const,
      healthStatus: getHealthStatus(system.disk.usage_percent, 'disk')
    },
    {
      title: "Network",
      value: formatBytes(network.bytes_recv),
      change: `${network.active_connections} connections`,
      icon: Wifi,
      description: "received",
      trend: "up" as const,
      healthStatus: "healthy" as const
    },
    {
      title: "API Health",
      value: `${health.memory_usage_mb.toFixed(0)}MB`,
      change: health.uptime_human,
      icon: Server,
      description: "uptime",
      trend: health.status === 'healthy' ? "up" as const : "down" as const,
      healthStatus: health.status === 'healthy' ? "healthy" as const : "critical" as const
    },
    {
      title: "Containers",
      value: formatNumber(system.docker.total_running || 0),
      change: "running",
      icon: Server,
      description: "docker",
      trend: "up" as const,
      healthStatus: system.docker.total_running > 0 ? "healthy" as const : "warning" as const
    }
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 px-1">
        <Server className="w-4 h-4 text-gray-600" />
        <h2 className="text-sm font-semibold text-gray-900">Infrastructure & Deployment</h2>
      </div>
      
      {/* Mobile view: show first 3 metrics with expand/collapse */}
      <div className="lg:hidden">
        <div className="grid grid-cols-1 gap-2">
          {(showAllMetrics ? metrics : metrics.slice(0, 3)).map((metric, index) => (
            <MetricCard
              key={index}
              title={metric.title}
              value={metric.value}
              change={metric.change}
              icon={metric.icon}
              description={metric.description}
              trend={metric.trend}
              healthStatus={metric.healthStatus}
            />
          ))}
        </div>
        
        {metrics.length > 3 && (
          <div className="flex justify-center mt-3">
            <button
              onClick={() => setShowAllMetrics(!showAllMetrics)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
            >
              <span>{showAllMetrics ? 'Show Less' : `Show ${metrics.length - 3} More`}</span>
              {showAllMetrics ? (
                <ChevronUp className="w-3 h-3" />
              ) : (
                <ChevronDown className="w-3 h-3" />
              )}
            </button>
          </div>
        )}
      </div>

      {/* Desktop view: show all in responsive grid */}
      <div className="hidden lg:block">
        <div className="grid grid-cols-3 xl:grid-cols-4 2xl:grid-cols-7 gap-3">
          {metrics.map((metric, index) => (
            <MetricCard
              key={index}
              title={metric.title}
              value={metric.value}
              change={metric.change}
              icon={metric.icon}
              description={metric.description}
              trend={metric.trend}
              healthStatus={metric.healthStatus}
            />
          ))}
        </div>
      </div>
    </div>
  );
};