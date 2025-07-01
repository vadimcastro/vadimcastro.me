import React, { useEffect, useState, useCallback } from 'react';
import { useProtectedApi } from '../../lib/api/protected';
import { InfrastructureMetrics } from './InfrastructureMetrics';
import { UserAnalyticsMetrics } from './UserAnalyticsMetrics';
import { DiskMetricCard } from './DiskMetricCard';
import { DashboardHeader } from './DashboardHeader';
import { CryptoPrice } from './CryptoPrice';
import { NotepadWithBothMenus as Notepad } from './NotepadWithBothMenus';

interface DashboardMetrics {
  visitors: {
    total: number;
    percentageChange: number;
    lastMonthTotal: number;
  };
  projects: {
    total: number;
    newThisMonth: number;
    percentageChange: number;
    lastMonthTotal: number;
  };
  sessions: {
    active: number;
    percentageChange: number;
    previousHourActive: number;
    totalToday: number;
  };
  system: {
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
  };
  network: {
    bytes_sent: number;
    bytes_recv: number;
    packets_sent: number;
    packets_recv: number;
    active_connections: number;
    total_connections: number;
  };
  health: {
    memory_usage_mb: number;
    cpu_percent: number;
    uptime_seconds: number;
    uptime_human: string;
    thread_count: number;
    status: string;
  };
  deployment: {
    current_branch: string;
    commit_hash: string;
    commit_message: string;
    commit_date: string;
    environment: string;
    deploy_time: string;
  };
}

const DashboardComponent = () => {
  const api = useProtectedApi();
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchDashboardMetrics = useCallback(async () => {
    try {
      setIsRefreshing(true);
      setError(null);

      const [visitorsData, projectsData, sessionsData, systemData, networkData, healthData, deploymentData] = await Promise.all([
        api.get<DashboardMetrics['visitors']>('/api/v1/metrics/visitors'),
        api.get<DashboardMetrics['projects']>('/api/v1/metrics/projects'),
        api.get<DashboardMetrics['sessions']>('/api/v1/metrics/sessions'),
        api.get<DashboardMetrics['system']>('/api/v1/metrics/system'),
        api.get<DashboardMetrics['network']>('/api/v1/metrics/network'),
        api.get<DashboardMetrics['health']>('/api/v1/metrics/health'),
        api.get<DashboardMetrics['deployment']>('/api/v1/metrics/deployment'),
      ]);

      setMetrics({
        visitors: visitorsData,
        projects: projectsData,
        sessions: sessionsData,
        system: systemData,
        network: networkData,
        health: healthData,
        deployment: deploymentData,
      });
      setLastUpdated(new Date());
    } catch (err) {
      console.error('Failed to fetch dashboard metrics:', err);
      setError('Failed to load dashboard metrics');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, [api]);

  useEffect(() => {
    fetchDashboardMetrics();
    const pollInterval = setInterval(fetchDashboardMetrics, 5 * 60 * 1000);
    return () => clearInterval(pollInterval);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const formatPercentage = (num: number): string => {
    const prefix = num > 0 ? '+' : '';
    return `${prefix}${num.toFixed(1)}%`;
  };

  const formatLastUpdated = (): string => {
    const minutes = Math.round((new Date().getTime() - lastUpdated.getTime()) / 60000);
    if (minutes < 1) return 'just now';
    if (minutes === 1) return '1 minute ago';
    return `${minutes} minutes ago`;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent"/>
      </div>
    );
  }


  return (
    <div className="max-w-[95%] mx-auto px-1 md:px-4 py-4 space-y-6">
      <DashboardHeader
        lastUpdated={formatLastUpdated()}
        onRefresh={fetchDashboardMetrics}
        isRefreshing={isRefreshing}
      />
      
      <div className="space-y-6">
        {/* Infrastructure & Deployment Metrics */}
        {metrics && (
          <InfrastructureMetrics
            system={metrics.system}
            network={metrics.network}
            health={metrics.health}
            deployment={metrics.deployment}
          />
        )}
        
        {/* Disk usage card */}
        <DiskMetricCard />
        
        {/* User Analytics Metrics */}
        {metrics && (
          <UserAnalyticsMetrics
            visitors={metrics.visitors}
            projects={metrics.projects}
            sessions={metrics.sessions}
          />
        )}
      </div>

      <div className="space-y-6">
        <Notepad />
        <CryptoPrice />
      </div>
    </div>
  );
};

export default DashboardComponent;