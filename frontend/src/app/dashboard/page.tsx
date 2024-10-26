// src/app/dashboard/page.tsx
import ProtectedComponent from './components/ProtectedComponent';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <ProtectedComponent />
    </div>
  );
}