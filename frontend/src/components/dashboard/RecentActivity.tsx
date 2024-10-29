// src/components/dashboard/RecentActivity.tsx
import { BarChart3 } from 'lucide-react';

export const RecentActivity = () => {
  return (
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
          </div>
        </div>
      </div>
    </section>
  );
};