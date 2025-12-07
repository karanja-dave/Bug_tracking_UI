import { Plus, Bug } from 'lucide-react';
import { useMemo, useState } from 'react';

type Project = {
  id: number;
  name: string;
  description: string;
  status: string;
  progress: number;
  dueDate: string;
  team: number;
};

type BugType = {
  id: number;
  title: string;
  projectId: number;
  severity: 'critical' | 'high' | 'medium' | 'low';
  status: 'open' | 'in-progress' | 'completed';
  reporter: string;
  assignee: string | null;
  createdAt: string;
};

export const Bugs = () => {
  const [projects] = useState<Project[]>([
    { id: 1, name: 'E-Commerce Platform', description: 'Building new checkout flow', status: 'active', progress: 65, dueDate: '2025-11-20', team: 5 },
    { id: 2, name: 'Mobile App Redesign', description: 'UI/UX improvements', status: 'active', progress: 40, dueDate: '2025-12-15', team: 3 },
    { id: 3, name: 'API Integration', description: 'Third-party services', status: 'planning', progress: 15, dueDate: '2025-11-30', team: 4 }
  ]);

  const [bugs] = useState<BugType[]>([
    { id: 1, title: 'Cart not updating on item removal', projectId: 1, severity: 'critical', status: 'open', reporter: 'Alice Brown', assignee: 'Mike Johnson', createdAt: '2025-11-08' },
    { id: 2, title: 'Mobile menu overlapping content', projectId: 2, severity: 'medium', status: 'in-progress', reporter: 'John Doe', assignee: 'Sarah Chen', createdAt: '2025-11-07' },
    { id: 3, title: 'API timeout on large requests', projectId: 3, severity: 'high', status: 'open', reporter: 'Emma Wilson', assignee: null, createdAt: '2025-11-09' }
  ]);

  const getPriorityColor = (severity: BugType['severity']) => {
    const colors: Record<string, string> = {
      critical: 'text-red-600 bg-red-50',
      high: 'text-orange-600 bg-orange-50',
      medium: 'text-yellow-600 bg-yellow-50',
      low: 'text-green-600 bg-green-50'
    };
    return colors[severity] || colors.medium;
  };

  const getStatusColor = (status: BugType['status']) => {
    const colors: Record<string, string> = {
      'open': 'text-red-600 bg-red-50',
      'in-progress': 'text-blue-600 bg-blue-50',
      'completed': 'text-green-600 bg-green-50'
    };
    return colors[status] || colors['open'];
  };

  const stats = useMemo(() => ({
    totalProjects: projects.length,
    openBugs: bugs.filter(b => b.status === 'open').length,
    criticalBugs: bugs.filter(b => b.severity === 'critical').length
  }), [projects, bugs]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Bug Tracking</h1>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <Plus size={20} />
          Report Bug
        </button>
      </div>

      {/* Bug Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left p-4 text-sm font-semibold text-gray-700">Bug</th>
                <th className="text-left p-4 text-sm font-semibold text-gray-700">Project</th>
                <th className="text-left p-4 text-sm font-semibold text-gray-700">Severity</th>
                <th className="text-left p-4 text-sm font-semibold text-gray-700">Status</th>
                <th className="text-left p-4 text-sm font-semibold text-gray-700">Reporter</th>
                <th className="text-left p-4 text-sm font-semibold text-gray-700">Assignee</th>
                <th className="text-left p-4 text-sm font-semibold text-gray-700">Created</th>
              </tr>
            </thead>
            <tbody>
              {bugs.map(bug => {
                const project = projects.find(p => p.id === bug.projectId);
                return (
                  <tr key={bug.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="p-4 flex items-center gap-2">
                      <Bug className="text-red-500" size={18} />
                      <span className="font-medium text-gray-900">{bug.title}</span>
                    </td>
                    <td className="p-4 text-sm text-gray-600">{project?.name}</td>
                    <td className="p-4">
                      <span className={`text-xs px-2 py-1 rounded ${getPriorityColor(bug.severity)}`}>
                        {bug.severity}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`text-xs px-2 py-1 rounded ${getStatusColor(bug.status)}`}>
                        {bug.status}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-gray-900">{bug.reporter}</td>
                    <td className="p-4 text-sm text-gray-900">{bug.assignee || 'Unassigned'}</td>
                    <td className="p-4 text-sm text-gray-600">{bug.createdAt}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
