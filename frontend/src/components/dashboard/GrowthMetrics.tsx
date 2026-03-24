'use client';
import React, { useEffect, useState } from 'react';
import { BarChart3, MousePointer2, FileDown, ExternalLink, Share2 } from 'lucide-react';
import { useProtectedApi } from '../../lib/api/protected';

interface InteractionSummary {
  [key: string]: number;
}

interface InteractionDetail {
  type: string;
  target: string;
  count: number;
}

interface AnalyticsStats {
  summary: InteractionSummary;
  details: InteractionDetail[];
}

export const GrowthMetrics = ({ refreshKey = 0 }) => {
  const api = useProtectedApi();
  const [stats, setStats] = useState<AnalyticsStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, [refreshKey]);

  const fetchStats = async () => {
    try {
      const data = await api.get<AnalyticsStats>('/api/v1/analytics/stats?days=30');
      setStats(data);
    } catch (error) {
      console.error('Failed to fetch analytics stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <div className="h-20 flex items-center justify-center"><div className="animate-pulse text-gray-400 text-xs text-center">Loading interactions...</div></div>;

  const totalInteractions = stats?.details.reduce((acc, curr) => acc + curr.count, 0) || 0;

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 px-1">
        <BarChart3 className="w-4 h-4 text-blue-600" />
        <h2 className="text-sm font-semibold text-gray-900">Growth & Engagement</h2>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        <div className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 mb-1">
            <MousePointer2 className="w-3 h-3 text-purple-500" />
            <span className="text-[10px] font-bold text-gray-500 uppercase">Project Clicks</span>
          </div>
          <div className="text-xl font-bold text-gray-900">{stats?.summary['project_click'] || 0}</div>
        </div>
        <div className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 mb-1">
            <FileDown className="w-3 h-3 text-green-500" />
            <span className="text-[10px] font-bold text-gray-500 uppercase">Resume Views</span>
          </div>
          <div className="text-xl font-bold text-gray-900">{stats?.summary['resume_view'] || 0}</div>
        </div>
        <div className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm col-span-2 lg:col-span-1">
          <div className="flex items-center gap-2 mb-1">
            <Share2 className="w-3 h-3 text-blue-500" />
            <span className="text-[10px] font-bold text-gray-500 uppercase">Social Clicks</span>
          </div>
          <div className="text-xl font-bold text-gray-900">{stats?.summary['social_click'] || 0}</div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-3 py-2 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
          <span className="text-[10px] font-bold text-gray-500 uppercase">Top Interacted Targets</span>
          <span className="text-[10px] text-gray-400">Past 30d</span>
        </div>
        <div className="divide-y divide-gray-50 max-h-48 overflow-y-auto">
          {stats?.details && stats.details.length > 0 ? (
            stats.details
              .sort((a, b) => b.count - a.count)
              .slice(0, 5)
              .map((item, idx) => (
                <div key={idx} className="px-3 py-2 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-2 min-w-0">
                    {item.type === 'project_click' ? <ExternalLink className="w-3 h-3 text-blue-400 flex-shrink-0" /> : <Share2 className="w-3 h-3 text-gray-400 flex-shrink-0" />}
                    <span className="text-xs text-gray-700 truncate">{item.target}</span>
                  </div>
                  <span className="text-xs font-semibold text-gray-900 ml-2">{item.count}</span>
                </div>
              ))
          ) : (
            <div className="px-3 py-4 text-center text-[10px] text-gray-400">No data recorded yet</div>
          )}
        </div>
      </div>
    </div>
  );
};
