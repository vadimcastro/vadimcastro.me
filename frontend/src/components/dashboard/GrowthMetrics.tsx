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
    <div className="space-y-3">
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-blue-600 mb-0.5" />
          <h2 className="text-sm font-bold text-gray-900 tracking-tight">Growth & Engagement</h2>
        </div>
        <span className="text-[10px] text-gray-400 font-medium bg-gray-100/50 px-2 py-0.5 rounded-full uppercase tracking-wider">Real-time</span>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-white/50 shadow-sm hover:shadow-md transition-all group">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-1.5 rounded-lg bg-purple-50 group-hover:bg-purple-100 transition-colors">
              <MousePointer2 className="w-3.5 h-3.5 text-purple-600" />
            </div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Project Clicks</span>
          </div>
          <div className="text-2xl font-black text-gray-900 tracking-tight">{stats?.summary['project_click'] || 0}</div>
        </div>
        <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-white/50 shadow-sm hover:shadow-md transition-all group">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-1.5 rounded-lg bg-green-50 group-hover:bg-green-100 transition-colors">
              <FileDown className="w-3.5 h-3.5 text-green-600" />
            </div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Resume Views</span>
          </div>
          <div className="text-2xl font-black text-gray-900 tracking-tight">{stats?.summary['resume_view'] || 0}</div>
        </div>
        <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-white/50 shadow-sm hover:shadow-md transition-all group col-span-2 lg:col-span-1">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-1.5 rounded-lg bg-blue-50 group-hover:bg-blue-100 transition-colors">
              <Share2 className="w-3.5 h-3.5 text-blue-600" />
            </div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Social Clicks</span>
          </div>
          <div className="text-2xl font-black text-gray-900 tracking-tight">{stats?.summary['social_click'] || 0}</div>
        </div>
      </div>

      <div className="bg-white/60 backdrop-blur-md rounded-xl border border-white/50 shadow-sm overflow-hidden">
        <div className="px-4 py-3 bg-gray-50/50 border-b border-gray-100 flex items-center justify-between">
          <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Top Performance</span>
          <span className="text-[10px] text-blue-500 font-bold bg-blue-50 px-2 py-0.5 rounded-full">30D</span>
        </div>
        <div className="divide-y divide-gray-100/50 max-h-60 overflow-y-auto custom-scrollbar">
          {stats?.details && stats.details.length > 0 ? (
            stats.details
              .sort((a, b) => b.count - a.count)
              .slice(0, 10)
              .map((item, idx) => (
                <div key={idx} className="px-4 py-3 flex items-center justify-between hover:bg-white/80 transition-all group">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="p-2 rounded-lg bg-white shadow-sm ring-1 ring-black/5 group-hover:scale-110 transition-transform">
                      {item.type === 'project_click' ? <ExternalLink className="w-3 h-3 text-blue-500" /> : <Share2 className="w-3 h-3 text-purple-500" />}
                    </div>
                    <span className="text-xs font-semibold text-gray-700 truncate">{item.target}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-blue-600 tabular-nums">{item.count}</span>
                  </div>
                </div>
              ))
          ) : (
            <div className="px-3 py-10 text-center text-[10px] text-gray-400 italic tracking-wide">No interaction data available yet</div>
          )}
        </div>
      </div>
    </div>
  );
};
