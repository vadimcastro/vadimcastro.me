// src/components/dashboard/QuickActions.tsx
export const QuickActions = () => {
    return (
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
    );
  };