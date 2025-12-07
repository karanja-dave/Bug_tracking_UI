import { Bug, CheckCircle2, FolderKanban, MessageSquare, Plus, Users } from 'lucide-react';
import React, { useMemo, useState } from 'react';

export const Admin = () => {
  // Sample data
  const [projects] = useState([
    { id: 1, name: 'E-Commerce Platform', description: 'Building new checkout flow', status: 'active', progress: 65, dueDate: '2025-11-20', team: 5 },
    { id: 2, name: 'Mobile App Redesign', description: 'UI/UX improvements', status: 'active', progress: 40, dueDate: '2025-12-15', team: 3 },
    { id: 3, name: 'API Integration', description: 'Third-party services', status: 'planning', progress: 15, dueDate: '2025-11-30', team: 4 }
  ]);

  const [tasks] = useState([
    { id: 1, title: 'Design login page', projectId: 1, assignee: 'Sarah Chen', status: 'inprogress', priority: 'high', dueDate: '2025-11-12', comments: 3 },
    { id: 2, title: 'Implement payment gateway', projectId: 1, assignee: 'Mike Johnson', status: 'todo', priority: 'critical', dueDate: '2025-11-15', comments: 7 },
    { id: 3, title: 'Create user dashboard', projectId: 2, assignee: 'John Doe', status: 'inprogress', priority: 'medium', dueDate: '2025-11-18', comments: 2 },
    { id: 4, title: 'Setup database schema', projectId: 3, assignee: 'Emma Wilson', status: 'completed', priority: 'high', dueDate: '2025-11-10', comments: 5 }
  ]);

  const [bugs] = useState([
    { id: 1, title: 'Cart not updating on item removal', projectId: 1, severity: 'critical', status: 'open', reporter: 'Alice Brown', assignee: 'Mike Johnson', createdAt: '2025-11-08' },
    { id: 2, title: 'Mobile menu overlapping content', projectId: 2, severity: 'medium', status: 'inprogress', reporter: 'John Doe', assignee: 'Sarah Chen', createdAt: '2025-11-07' },
    { id: 3, title: 'API timeout on large requests', projectId: 3, severity: 'high', status: 'open', reporter: 'Emma Wilson', assignee: null, createdAt: '2025-11-09' }
  ]);

  const [team] = useState([
    { id: 1, name: 'John Doe', role: 'admin', email: 'john@company.com', avatar: 'JD' },
    { id: 2, name: 'Sarah Chen', role: 'developer', email: 'sarah@company.com', avatar: 'SC' },
    { id: 3, name: 'Mike Johnson', role: 'developer', email: 'mike@company.com', avatar: 'MJ' },
    { id: 4, name: 'Emma Wilson', role: 'developer', email: 'emma@company.com', avatar: 'EW' },
    { id: 5, name: 'Alice Brown', role: 'viewer', email: 'alice@company.com', avatar: 'AB' }
  ]);

  // Statistics
  const stats = useMemo(() => ({
    totalProjects: projects.length,
    activeProjects: projects.filter(p => p.status === 'active').length,
    totalTasks: tasks.length,
    completedTasks: tasks.filter(t => t.status === 'completed').length,
    openBugs: bugs.filter(b => b.status === 'open').length,
    criticalBugs: bugs.filter(b => b.severity === 'critical').length
  }), [projects, tasks, bugs]);

  // Utility functions
  const getPriorityColor = (priority: string) => {
    const colors: Record<string, string> = {
      critical: 'text-red-600 bg-red-50',
      high: 'text-orange-600 bg-orange-50',
      medium: 'text-yellow-600 bg-yellow-50',
      low: 'text-green-600 bg-green-50'
    };
    return colors[priority] || colors.medium;
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      todo: 'text-gray-600 bg-gray-100',
      inprogress: 'text-blue-600 bg-blue-50',
      completed: 'text-green-600 bg-green-50',
      open: 'text-red-600 bg-red-50',
      active: 'text-blue-600 bg-blue-50',
      planning: 'text-purple-600 bg-purple-50'
    };
    return colors[status] || colors.todo;
  };

  // Replace with your current user info
  const currentUser = { name: 'Admin User' };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">Welcome back, {currentUser.name}</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <Plus size={20} /> Quick Add
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Active Projects */}
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Active Projects</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{stats.activeProjects}</p>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <FolderKanban className="text-blue-600" size={24} />
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-3">of {stats.totalProjects} total</p>
        </div>

        {/* Tasks Completed */}
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Tasks Completed</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{stats.completedTasks}</p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <CheckCircle2 className="text-green-600" size={24} />
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-3">of {stats.totalTasks} total</p>
        </div>

        {/* Open Bugs */}
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Open Bugs</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{stats.openBugs}</p>
            </div>
            <div className="bg-red-50 p-3 rounded-lg">
              <Bug className="text-red-600" size={24} />
            </div>
          </div>
          <p className="text-sm text-red-600 mt-3">{stats.criticalBugs} critical</p>
        </div>

        {/* Team Members */}
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Team Members</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{team.length}</p>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg">
              <Users className="text-purple-600" size={24} />
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-3">across all projects</p>
        </div>
      </div>

      {/* Recent Tasks & Critical Bugs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Tasks */}
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Tasks</h2>
          <div className="space-y-3">
            {tasks.slice(0, 4).map(task => (
              <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{task.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-xs px-2 py-1 rounded ${getStatusColor(task.status)}`}>{task.status}</span>
                    <span className={`text-xs px-2 py-1 rounded ${getPriorityColor(task.priority)}`}>{task.priority}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <MessageSquare size={16} />
                  <span>{task.comments}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Critical Bugs */}
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Critical Bugs</h2>
          <div className="space-y-3">
            {bugs.filter(b => b.severity === 'critical' || b.severity === 'high').map(bug => (
              <div key={bug.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{bug.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-xs px-2 py-1 rounded ${getStatusColor(bug.status)}`}>{bug.status}</span>
                    <span className={`text-xs px-2 py-1 rounded ${getPriorityColor(bug.severity)}`}>{bug.severity}</span>
                  </div>
                </div>
                <Bug className="text-red-500" size={20} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Project Progress */}
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Project Progress</h2>
        <div className="space-y-4">
          {projects.map(project => (
            <div key={project.id}>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="font-medium text-gray-900">{project.name}</p>
                  <p className="text-sm text-gray-500">{project.description}</p>
                </div>
                <span className="text-sm font-medium text-gray-700">{project.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
