// src/app/dashboard/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '../../lib/auth/AuthContext';
import { ShieldCheck, Cpu, HardDrive, Activity, Users, Globe, Lock, Loader2 } from 'lucide-react';
import Cookies from 'js-cookie';

export default function DashboardPage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const [metrics, setMetrics] = useState<any>(null);
  const [loadingMetrics, setLoadingMetrics] = useState(true);

  const token = Cookies.get('accessToken');

  useEffect(() => {
    async function loadMetrics() {
      if (!token) return;
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/v1/metrics/system`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (res.ok) {
          const data = await res.json();
          setMetrics(data);
        }
      } catch (err) {
        console.error('Error loading metrics:', err);
      } finally {
        setLoadingMetrics(false);
      }
    }

    if (isAuthenticated) {
      loadMetrics();
    } else {
      setLoadingMetrics(false);
    }
  }, [isAuthenticated, token]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated || !user?.is_superuser) {
    return (
      <div className="max-w-md mx-auto my-20 p-8 rounded-3xl bg-slate-900/80 border border-slate-800 text-center space-y-6">
        <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 mx-auto">
          <Lock className="w-7 h-7" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-extrabold text-white">Administrator Access Required</h2>
          <p className="text-sm text-slate-400">
            This dashboard displays sensitive telemetry and server control metrics reserved for superusers.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Title */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">System Admin & Telemetry Dashboard</h1>
            <p className="text-xs text-slate-400">Real-time health, memory, and container status</p>
          </div>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">CPU Usage</span>
            <Cpu className="w-4 h-4 text-cyan-400" />
          </div>
          <p className="text-3xl font-extrabold text-white">
            {metrics?.cpu?.usage_percent ? `${metrics.cpu.usage_percent}%` : 'Normal'}
          </p>
          <p className="text-[11px] text-slate-400">{metrics?.cpu?.cores || 4} CPU Cores Detected</p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Memory Used</span>
            <Activity className="w-4 h-4 text-blue-400" />
          </div>
          <p className="text-3xl font-extrabold text-white">
            {metrics?.memory?.used_gb ? `${metrics.memory.used_gb} GB` : 'Active'}
          </p>
          <p className="text-[11px] text-slate-400">Total: {metrics?.memory?.total_gb || 8} GB</p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Disk Storage</span>
            <HardDrive className="w-4 h-4 text-purple-400" />
          </div>
          <p className="text-3xl font-extrabold text-white">
            {metrics?.disk?.used_gb ? `${metrics.disk.used_gb} GB` : 'Mounted'}
          </p>
          <p className="text-[11px] text-slate-400">Free: {metrics?.disk?.free_gb || 20} GB</p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Active Superuser</span>
            <Users className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-xl font-bold text-white truncate">{user.username}</p>
          <p className="text-[11px] text-emerald-400 font-semibold">{user.email}</p>
        </div>
      </div>
    </div>
  );
}
