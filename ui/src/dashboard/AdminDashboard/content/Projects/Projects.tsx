import { useState } from "react";
import { Calendar, FolderKanban, Plus, Users } from "lucide-react";

export const Projects = () => {
  const [projects] = useState([
    { id: 1, name: 'E-Commerce Platform', description: 'Building new checkout flow', status: 'active', progress: 65, dueDate: '2025-11-20', team: 5 },
    { id: 2, name: 'Mobile App Redesign', description: 'UI/UX improvements', status: 'active', progress: 40, dueDate: '2025-12-15', team: 3 },
    { id: 3, name: 'API Integration', description: 'Third-party services', status: 'planning', progress: 15, dueDate: '2025-11-30', team: 4 }
  ]);

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'todo': 'text-gray-600 bg-gray-100',
      'inprogress': 'text-blue-600 bg-blue-50',
      'completed': 'text-green-600 bg-green-50',
      'open': 'text-red-600 bg-red-50',
      'active': 'text-blue-600 bg-blue-50',
      'planning': 'text-purple-600 bg-purple-50'
    };
    return colors[status] || colors['todo'];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <Plus size={20} />
          New Project
        </button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map(project => (
          <div
            key={project.id}
            className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer"
          >
            {/* Header with icon and status */}
            <div className="flex items-start justify-between mb-4">
              <div className="bg-blue-50 p-2 rounded-lg">
                <FolderKanban className="text-blue-600" size={24} />
              </div>
              <span className={`text-xs px-2 py-1 rounded ${getStatusColor(project.status)}`}>
                {project.status}
              </span>
            </div>

            {/* Project name & description */}
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{project.name}</h3>
            <p className="text-gray-600 text-sm mb-4">{project.description}</p>

            {/* Progress & meta */}
            <div className="space-y-3">
              {/* Progress bar */}
              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-gray-600">Progress</span>
                  <span className="font-medium text-gray-900">{project.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>

              {/* Due date & team members */}
              <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Calendar size={16} />
                  <span>{project.dueDate}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users size={16} />
                  <span>{project.team} members</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


