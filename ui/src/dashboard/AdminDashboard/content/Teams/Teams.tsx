import { Plus, Users } from 'lucide-react';
import { useState } from 'react';

type TeamMember = {
  id: number;
  name: string;
  role: 'admin' | 'developer' | 'viewer';
  email: string;
  avatar: string;
  teamId: number;
};

type Team = {
  id: number;
  name: string;
  description: string;
  members: TeamMember[];
};

export const Teams = () => {
  // Sample team members
  const [members] = useState<TeamMember[]>([
    { id: 1, name: 'John Doe', role: 'admin', email: 'john@company.com', avatar: 'JD', teamId: 1 },
    { id: 2, name: 'Sarah Chen', role: 'developer', email: 'sarah@company.com', avatar: 'SC', teamId: 1 },
    { id: 3, name: 'Mike Johnson', role: 'developer', email: 'mike@company.com', avatar: 'MJ', teamId: 2 },
    { id: 4, name: 'Emma Wilson', role: 'developer', email: 'emma@company.com', avatar: 'EW', teamId: 2 },
    { id: 5, name: 'Alice Brown', role: 'viewer', email: 'alice@company.com', avatar: 'AB', teamId: 3 }
  ]);

  // Group members by teams
  const [teams] = useState<Team[]>([
    { id: 1, name: 'Frontend Team', description: 'Handles UI and client-side logic', members: members.filter(m => m.teamId === 1) },
    { id: 2, name: 'Backend Team', description: 'Handles APIs and database', members: members.filter(m => m.teamId === 2) },
    { id: 3, name: 'QA Team', description: 'Handles testing and bug reports', members: members.filter(m => m.teamId === 3) }
  ]);

  const getRoleBadge = (role: TeamMember['role']) => {
    switch (role) {
      case 'admin':
        return 'bg-purple-50 text-purple-600';
      case 'developer':
        return 'bg-blue-50 text-blue-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Teams</h1>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <Plus size={20} />
          Create Team
        </button>
      </div>

      {/* Teams grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teams.map(team => (
          <div key={team.id} className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Users className="text-blue-600" size={24} />
                <h3 className="text-lg font-semibold text-gray-900">{team.name}</h3>
              </div>
              <span className="text-sm text-gray-600">{team.members.length} members</span>
            </div>
            <p className="text-sm text-gray-500 mb-4">{team.description}</p>
            {/* Show members on click could be implemented with a modal or expand */}
            <div className="space-y-2">
              {team.members.map(member => (
                <div key={member.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {member.avatar}
                    </div>
                    <span className="text-sm text-gray-900">{member.name}</span>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded ${getRoleBadge(member.role)}`}>
                    {member.role}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
