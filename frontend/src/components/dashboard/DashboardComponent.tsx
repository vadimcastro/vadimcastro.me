import React, { useEffect, useState, useCallback } from 'react';
import { Activity, Users, FileText, BarChart3 } from 'lucide-react';
import { useProtectedApi } from '../../lib/api/protected';

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
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold text-gray-900">
          Welcome to Your Dashboard
        </h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">
            Last updated {formatLastUpdated()}
          </span>
          <button
            onClick={fetchDashboardMetrics}
            disabled={isRefreshing}
            className={`px-4 py-2 rounded-md text-sm flex items-center gap-2 ${
              isRefreshing 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
            }`}
          >
            {isRefreshing ? (
              <div className="animate-spin rounded-full h-4 w-4 border border-gray-400 border-t-transparent"/>
            ) : (
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            )}
            Refresh
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div 
              key={index}
              className="bg-white rounded-lg border shadow-sm p-6 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-medium text-gray-600">
                  {stat.title}
                </h3>
                <Icon className="h-4 w-4 text-gray-600" />
              </div>
              <div className="space-y-2">
                <p className="text-2xl font-bold text-gray-900">
                  {stat.value}
                </p>
                <div className="flex items-center text-sm">
                  <span className={`${
                    stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {stat.change}
                  </span>
                  <span className="ml-2 text-gray-600">
                    {stat.description}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border shadow-sm">
          <div className="border-b px-6 py-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Recent Activity
            </h2>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span>New project published</span>
              </div>
              <span className="text-sm text-gray-500">2 hours ago</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                <span>Profile updated</span>
              </div>
              <span className="text-sm text-gray-500">5 hours ago</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border shadow-sm">
          <div className="border-b px-6 py-4">
            <h2 className="text-lg font-semibold">Quick Actions</h2>
          </div>
          <div className="p-6 space-y-3">
            <button className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              Create New Project
            </button>
            <button className="w-full py-2 px-4 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors">
              Update Profile
            </button>
            <button className="w-full py-2 px-4 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors">
              View Analytics
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardComponent;