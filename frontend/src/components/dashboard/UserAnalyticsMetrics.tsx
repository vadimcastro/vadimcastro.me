import React, { useState } from 'react';
import { Users, FileText, Activity, ChevronDown, ChevronUp } from 'lucide-react';
import { MetricCard } from './MetricCard';

interface VisitorMetrics {
  total: number;
  percentageChange: number;
  lastMonthTotal: number;
}

interface ProjectMetrics {
  total: number;
  newThisMonth: number;
  percentageChange: number;
  lastMonthTotal: number;
}

interface SessionMetrics {
  active: number;
  percentageChange: number;
  previousHourActive: number;
  totalToday: number;
}

interface UserAnalyticsMetricsProps {
  visitors: VisitorMetrics;
  projects: ProjectMetrics;
  sessions: SessionMetrics;
  showExpanded?: boolean;
}

const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('en-US').format(num);
};

const formatPercentage = (num: number): string => {
  const prefix = num > 0 ? '+' : '';
  return `${prefix}${num.toFixed(1)}%`;
};

export const UserAnalyticsMetrics: React.FC<UserAnalyticsMetricsProps> = ({
  visitors,
  projects,
  sessions,
  showExpanded = false
}) => {
  const [isExpanded, setIsExpanded] = useState(showExpanded);

  const metrics = [
    {
      title: "Visitors",
      value: formatNumber(visitors.total),
      change: formatPercentage(visitors.percentageChange),
      icon: Users,
      description: "vs. last month",
      trend: visitors.percentageChange >= 0 ? "up" as const : "down" as const
    },
    {
      title: "Projects",
      value: formatNumber(projects.total),
      change: formatPercentage(projects.percentageChange),
      icon: FileText,
      description: "vs. last month",
      trend: projects.percentageChange >= 0 ? "up" as const : "down" as const
    },
    {
      title: "Sessions",
      value: formatNumber(sessions.active),
      change: formatPercentage(sessions.percentageChange),
      icon: Activity,
      description: "vs. last hour",
      trend: sessions.percentageChange >= 0 ? "up" as const : "down" as const
    }
  ];

  // Enhanced metrics for expanded view (when data becomes available)
  const enhancedMetrics = [
    ...metrics,
    // Placeholder for future enhanced metrics when data integration happens
    {
      title: "Bounce Rate",
      value: "42.3%",
      change: "-2.1%",
      icon: Activity,
      description: "vs. last week",
      trend: "up" as const
    },
    {
      title: "Avg. Session",
      value: "3.2m",
      change: "+0.8m",
      icon: Activity,
      description: "duration",
      trend: "up" as const
    }
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-gray-600" />
          <h2 className="text-sm font-semibold text-gray-900">User Analytics</h2>
        </div>
        
        {/* Toggle for mobile - show/hide section */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-1 px-2 py-1 text-xs text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-md transition-colors lg:hidden"
        >
          <span>{isExpanded ? 'Hide' : 'Show'}</span>
          {isExpanded ? (
            <ChevronUp className="w-3 h-3" />
          ) : (
            <ChevronDown className="w-3 h-3" />
          )}
        </button>
      </div>

      {/* Mobile view: collapsible */}
      <div className={`lg:hidden ${isExpanded ? 'block' : 'hidden'}`}>
        <div className="grid grid-cols-1 gap-2">
          {metrics.map((metric, index) => (
            <MetricCard
              key={index}
              title={metric.title}
              value={metric.value}
              change={metric.change}
              icon={metric.icon}
              description={metric.description}
              trend={metric.trend}
            />
          ))}
        </div>
      </div>

      {/* Desktop view: always visible */}
      <div className="hidden lg:block">
        <div className="grid grid-cols-3 gap-3">
          {metrics.map((metric, index) => (
            <MetricCard
              key={index}
              title={metric.title}
              value={metric.value}
              change={metric.change}
              icon={metric.icon}
              description={metric.description}
              trend={metric.trend}
            />
          ))}
        </div>
      </div>

      {/* Future: Enhanced metrics section when data integration happens */}
      {/* This section can be uncommented and configured when more detailed analytics are available */}
      {/*
      <div className="mt-4 pt-3 border-t border-gray-100">
        <div className="text-xs text-gray-500 mb-2 px-1">Enhanced Analytics (Coming Soon)</div>
        <div className="grid grid-cols-2 gap-2 opacity-50">
          {enhancedMetrics.slice(3).map((metric, index) => (
            <MetricCard
              key={index + 100}
              title={metric.title}
              value={metric.value}
              change={metric.change}
              icon={metric.icon}
              description={metric.description}
              trend={metric.trend}
            />
          ))}
        </div>
      </div>
      */}
    </div>
  );
};