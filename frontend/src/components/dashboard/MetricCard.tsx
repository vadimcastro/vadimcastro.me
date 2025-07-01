// src/components/dashboard/MetricCard.tsx
import { LucideIcon, TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  description: string;
  icon: LucideIcon;
  trend: 'up' | 'down';
  healthStatus?: 'healthy' | 'warning' | 'critical';
}

export const MetricCard = ({
  title,
  value,
  change,
  description,
  icon: Icon,
  trend,
  healthStatus = 'healthy'
}: MetricCardProps) => {
  // Enhanced visual styling based on health status and capacity
  const getHealthColors = () => {
    switch (healthStatus) {
      case 'critical':
        return {
          text: 'text-red-600',
          bg: 'bg-red-50',
          border: 'border-red-300',
          icon: 'text-red-500'
        };
      case 'warning':
        return {
          text: 'text-amber-600',
          bg: 'bg-amber-50',
          border: 'border-amber-300',
          icon: 'text-amber-500'
        };
      default: // healthy
        return {
          text: 'text-green-600',
          bg: 'bg-green-50',
          border: 'border-green-200',
          icon: 'text-green-500'
        };
    }
  };

  const colors = getHealthColors();
  const TrendIcon = trend === 'up' ? TrendingUp : TrendingDown;

  return (
    <div className={`bg-white rounded-lg border ${colors.border} shadow-sm p-2 md:p-4 hover:shadow-md transition-all duration-200 hover:border-gray-300`}>
      <div className="flex justify-between items-center mb-1 md:mb-2">
        <h3 className="text-xs font-medium text-gray-600 uppercase tracking-wide">{title}</h3>
        <div className="flex items-center gap-1">
          <Icon className={`h-3 w-3 ${colors.icon}`} />
          <TrendIcon className={`h-2 w-2 ${colors.icon}`} />
        </div>
      </div>
      <div className="space-y-0.5 md:space-y-1">
        <p className="text-base md:text-xl font-bold text-gray-900">{value}</p>
        <div className={`flex items-center text-xs px-2 py-1 rounded-md ${colors.bg}`}>
          <span className={`font-medium ${colors.text}`}>
            {change}
          </span>
          <span className="ml-1 text-gray-600">{description}</span>
        </div>
      </div>
    </div>
  );
};