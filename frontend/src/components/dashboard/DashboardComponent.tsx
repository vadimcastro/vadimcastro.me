'use client';

import React, { useEffect, useState } from 'react';
import { Activity, Users, FileText, Loader2, BarChart3 } from 'lucide-react';
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

  useEffect(() => {
    const fetchDashboardMetrics = async () => {
      try {
        setIsLoading(true);
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
      } catch (err) {
        console.error('Failed to fetch dashboard metrics:', err);
        setError('Failed to load dashboard metrics');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardMetrics();
    
    // Refresh data every 5 minutes
    const pollInterval = setInterval(fetchDashboardMetrics, 5 * 60 * 1000);
    return () => clearInterval(pollInterval);
  }, []);

  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const formatPercentage = (num: number): string => {
    const prefix = num > 0 ? '+' : '';
    return `${prefix}${num.toFixed(1)}%`;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200"
        >
          Retry
        </button>
      </div>
    );
  }

  const stats = metrics ? [
    {
      title: "Total Visitors",
      value: formatNumber(metrics.visitors.total),
      change: formatPercentage(metrics.visitors.percentageChange),
      icon: Users,
      description: "Compared to last month"
    },
    {
      title: "Projects Published",
      value: formatNumber(metrics.projects.total),
      change: `+${metrics.projects.newThisMonth}`,
      icon: FileText,
      description: "New this month"
    },
    {
      title: "Active Sessions",
      value: formatNumber(metrics.sessions.active),
      change: formatPercentage(metrics.sessions.percentageChange),
      icon: Activity,
      description: "Current active users"
    }
  ] : [];

  return (
    <div className="max-w-[95%] mx-auto px-4 py-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="px-3 py-1.5 text-3xl font-semibold text-gray-900">
          Welcome to Your Dashboard
        </h1>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Live updating</span>
        </div>
      </div>
      
      {/* Metrics Cards */}
      <div className="flex flex-col lg:flex-row gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div 
              key={index} 
              className="flex-1 bg-white rounded-lg border shadow-sm p-6 hover:shadow-md transition-shadow duration-200"
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
                  <span className={`${stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
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

      {/* Additional Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <section className="h-[400px] border rounded-lg bg-white shadow-sm">
          <div className="h-full flex flex-col">
            <h2 className="text-2xl font-semibold px-6 py-4 border-b flex items-center">
              <BarChart3 className="w-5 h-5 mr-2" />
              Recent Activity
            </h2>
            <div className="flex-1 p-4 overflow-y-auto">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span>New project published</span>
                  </div>
                  <span className="text-sm text-gray-500">2 hours ago</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    <span>Profile updated</span>
                  </div>
                  <span className="text-sm text-gray-500">5 hours ago</span>
                </div>
                {/* Add more activity items as needed */}
              </div>
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="h-[400px] border rounded-lg bg-white shadow-sm">
          <div className="h-full flex flex-col">
            <h2 className="text-2xl font-semibold px-6 py-4 border-b">Quick Actions</h2>
            <div className="flex-1 p-4">
              <div className="space-y-2">
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
        </section>
      </div>

      {/* Additional Features */}
      <div className="border rounded-lg bg-white shadow-sm p-6">
        <h2 className="text-2xl font-semibold mb-4">Coming Soon</h2>
        <p className="text-gray-600">
          More dashboard features are currently in development. Stay tuned for updates!
        </p>
      </div>
    </div>
  );
};

export default DashboardComponent;