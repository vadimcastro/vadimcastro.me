'use client';
import React, { useEffect, useState, useCallback } from 'react';
import { useProtectedApi } from '../../lib/api/protected';
import { InfrastructureMetrics } from './InfrastructureMetrics';
import { UserAnalyticsMetrics } from './UserAnalyticsMetrics';
import { GrowthMetrics } from './GrowthMetrics';
import { DiskMetricCard } from './DiskMetricCard';
import { DashboardHeader } from './DashboardHeader';
import { CryptoPrice } from './CryptoPrice';
import { NotepadWithBothMenus as Notepad } from './NotepadWithBothMenus';

interface DashboardMetrics {
  visitors: {
    total: number;
    percentageChange: number;
    lastMonthTotal: number;
    totalInteractions: number;
    interactionCounts: {
      project_click?: number;
      resume_view?: number;
      social_click?: number;
    };
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
  const [refreshKey, setRefreshKey] = useState(0);

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
      setRefreshKey(prev => prev + 1); // Trigger refresh in children
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

  const [isDashboardCollapsed, setIsDashboardCollapsed] = useState(false);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent"/>
      </div>
    );
  }

  return (
    <div className="max-w-full mx-auto px-2 md:px-6 py-4 space-y-6">
      <DashboardHeader
        lastUpdated={formatLastUpdated()}
        onRefresh={fetchDashboardMetrics}
        isRefreshing={isRefreshing}
      />
      
      <div className={`flex flex-col ${!isDashboardCollapsed ? 'lg:flex-row' : ''} gap-6 items-stretch`}>
        {/* Sidebar / Metrics Section */}
        <div className={`transition-all duration-300 ${isDashboardCollapsed ? 'w-full mb-4' : 'w-full lg:w-[420px] flex-shrink-0'}`}>
          <div className={`bg-gray-50/50 rounded-xl ${isDashboardCollapsed ? 'p-2' : 'p-4'} border border-gray-200 shadow-sm`}>
            {!isDashboardCollapsed && (
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-tight">Dashboard</h3>
                <button 
                  onClick={() => setIsDashboardCollapsed(true)}
                  className="text-xs font-medium text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Collapse
                </button>
              </div>
            )}

            {isDashboardCollapsed ? (
              /* Thin Wide Bar View - Simplified */
              <div className="flex items-center justify-between py-1 px-1 overflow-x-auto no-scrollbar whitespace-nowrap gap-4">
                <div className="flex items-center gap-4 flex-shrink-0">
                  <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Dashboard</h3>
                  <div className="w-px h-3 bg-gray-200" />
                </div>
                
                {metrics ? (
                  <div className="flex items-center gap-8 flex-nowrap flex-1 justify-center">
                    <div className="flex items-center gap-2">
                       <span className="text-[10px] text-gray-400 uppercase font-medium">Users</span>
                       <span className="text-xs font-bold text-gray-900">{formatNumber(metrics.visitors?.total ?? 0)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                       <span className="text-[10px] text-blue-500 uppercase font-bold">Projects</span>
                       <span className="text-xs font-bold text-gray-900">{formatNumber(metrics.visitors?.interactionCounts?.project_click ?? 0)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                       <span className="text-[10px] text-green-500 uppercase font-bold">Resume</span>
                       <span className="text-xs font-bold text-gray-900">{formatNumber(metrics.visitors?.interactionCounts?.resume_view ?? 0)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                       <span className="text-[10px] text-purple-500 uppercase font-bold">Social</span>
                       <span className="text-xs font-bold text-gray-900">{formatNumber(metrics.visitors?.interactionCounts?.social_click ?? 0)}</span>
                    </div>
                  </div>
                ) : (
                  <div className="text-[10px] text-gray-400 italic flex-1 text-center">Loading stats...</div>
                )}

                <button 
                  onClick={() => setIsDashboardCollapsed(false)}
                  className="text-[10px] font-bold text-blue-600 hover:text-blue-800 transition-colors uppercase whitespace-nowrap ml-2"
                >
                  Expand
                </button>
              </div>
            ) : (
              /* Full Metrics View */
              <div className="space-y-4">
                {/* Growth Metrics (New centerpiece) */}
                <GrowthMetrics refreshKey={refreshKey} />

                {/* User Analytics Metrics */}
                {metrics && (
                  <div className="pt-3 border-t border-gray-100">
                    <UserAnalyticsMetrics
                      visitors={metrics.visitors}
                      projects={metrics.projects}
                      sessions={metrics.sessions}
                      showExpanded={true}
                    />
                  </div>
                )}
                
                {/* Infrastructure Metrics (Compact sidebar view) */}
                {metrics && (
                  <div className="pt-3 border-t border-gray-100">
                    <InfrastructureMetrics
                      system={metrics.system}
                      network={metrics.network}
                      health={metrics.health}
                      deployment={metrics.deployment}
                      compact={true}
                    />
                  </div>
                )}
                
                {/* Disk usage card */}
                <DiskMetricCard />
              </div>
            )}
          </div>
        </div>

        {/* Main Content (Notepad) */}
        <div className="flex-1 min-w-0 min-h-[750px] flex flex-col">
          <Notepad />
        </div>
      </div>
    </div>
  );
};

export default DashboardComponent;