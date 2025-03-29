import React, { useEffect, useState, useCallback } from 'react';
import { Activity, Users, FileText, BarChart3 } from 'lucide-react';
import { useProtectedApi } from '../../lib/api/protected';
import { MetricCard } from './MetricCard';
import { DashboardHeader } from './DashboardHeader';
import { CryptoPrice } from './CryptoPrice';
import { Notepad } from './Notepad';

interface DashboardMetrics {
  visitors: {
    total: number;
    percentageChange: number;
  };
  projects: {
    total: number;
    newThisMonth: number;
  };
  sessions: {
    active: number;
    percentageChange: number;
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

      const [visitorsData, projectsData, sessionsData] = await Promise.all([
        api.get('/api/v1/metrics/visitors'),
        api.get('/api/v1/metrics/projects'),
        api.get('/api/v1/metrics/sessions'),
      ]);

      setMetrics({
        visitors: visitorsData,
        projects: projectsData,
        sessions: sessionsData,
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
  }, [fetchDashboardMetrics]);

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

  const stats = metrics ? [
    {
      title: "Total Visitors",
      value: formatNumber(metrics.visitors.total),
      change: formatPercentage(metrics.visitors.percentageChange),
      icon: Users,
      description: "vs. last month",
      trend: metrics.visitors.percentageChange >= 0 ? "up" : "down"
    },
    {
      title: "Projects Published",
      value: formatNumber(metrics.projects.total),
      change: `+${metrics.projects.newThisMonth}`,
      icon: FileText,
      description: "new this month",
      trend: "up"
    },
    {
      title: "Active Sessions",
      value: formatNumber(metrics.sessions.active),
      change: formatPercentage(metrics.sessions.percentageChange),
      icon: Activity,
      description: "vs. last hour",
      trend: metrics.sessions.percentageChange >= 0 ? "up" : "down"
    }
  ] : [];

  return (
    <div className="max-w-[95%] mx-auto px-4 py-4 space-y-6">
      <DashboardHeader
        lastUpdated={formatLastUpdated()}
        onRefresh={fetchDashboardMetrics}
        isRefreshing={isRefreshing}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <MetricCard
            key={index}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            icon={stat.icon}
            description={stat.description}
            trend={stat.trend}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CryptoPrice />
        <Notepad />
      </div>
    </div>
  );
};

export default DashboardComponent;