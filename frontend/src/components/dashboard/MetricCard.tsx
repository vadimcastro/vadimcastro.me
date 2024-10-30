// src/components/dashboard/MetricCard.tsx
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  description: string;
  icon: LucideIcon;
  trend: 'up' | 'down';
}

export const MetricCard = ({
  title,
  value,
  change,
  description,
  icon: Icon,
  trend
}: MetricCardProps) => (
  <div className="bg-white rounded-lg border shadow-sm p-6 hover:shadow-md transition-shadow duration-200">
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-sm font-medium text-gray-600">{title}</h3>
      <Icon className="h-4 w-4 text-gray-600" />
    </div>
    <div className="space-y-2">
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <div className="flex items-center text-sm">
        <span className={trend === 'up' ? 'text-green-500' : 'text-red-500'}>
          {change}
        </span>
        <span className="ml-2 text-gray-600">{description}</span>
      </div>
    </div>
  </div>
);