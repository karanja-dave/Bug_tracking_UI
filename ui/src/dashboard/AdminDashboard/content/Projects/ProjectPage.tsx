import { useState } from 'react';
import { Users, CheckSquare, Bug, Plus, MoreVertical, Calendar, User, AlertCircle, Clock, Github, ExternalLink, GitBranch } from 'lucide-react';

import { projectAPI } from '../../../../features/projects/projectsAPI';
import { useParams } from 'react-router';

export const ProjectPage = () => {
  const { data: projectsData } = projectAPI.useGetProjectsWithDetailsQuery();
  const {id}=useParams<{id:string}>()

  const projectData = projectsData?.data?.find(p => p.id === Number(id));;


  // Task filters
  const [filterTaskAssignee, setFilterTaskAssignee] = useState(""); 
  const [filterTaskStatus, setFilterTaskStatus] = useState('');
  const [filterTaskPriority, setFilterTaskPriority] = useState('');

  const filteredTasks = projectData?.tasks.filter(task => 
    (filterTaskAssignee ? task.assigned_to_name === filterTaskAssignee : true) &&
    (filterTaskStatus ? task.status === filterTaskStatus : true) &&
    (filterTaskPriority ? task.priority === filterTaskPriority : true)
  );

  // Bug filters
  const [filterBugAssignee, setFilterBugAssignee] = useState("");  
  const [filterBugStatus, setFilterBugStatus] = useState('');
  const [filterBugPriority, setFilterBugPriority] = useState('');

  const filteredBugs = projectData?.bugs.filter(bug => 
    (filterBugAssignee ? bug.assignee_name === filterBugAssignee : true) &&
    (filterBugStatus ? bug.status === filterBugStatus : true) &&
    (filterBugPriority ? bug.severity === filterBugPriority : true)
  );

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'To Do': 'bg-gray-100 text-gray-700',
      'In Progress': 'bg-blue-100 text-blue-700',
      'In Review': 'bg-purple-100 text-purple-700',
      'Done': 'bg-green-100 text-green-700',
      'Open': 'bg-red-100 text-red-700',
      'Critical': 'bg-red-100 text-red-700',
      'Resolved': 'bg-green-100 text-green-700',
      'active': 'bg-green-100 text-green-700',
      'away': 'bg-yellow-100 text-yellow-700',
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  const getPriorityColor = (priority: string) => {
    const colors: Record<string, string> = {
      'Critical': 'text-red-600',
      'High': 'text-orange-600',
      'Medium': 'text-yellow-600',
      'Low': 'text-green-600',
    };
    return colors[priority] || 'text-gray-600';
  };

  const completedTasks = projectData?.tasks.filter(t => t.status === "Done").length;
  const inProgressTasks = projectData?.tasks.filter(t => t.status === "In Progress").length;
  const openBugs = projectData?.tasks.filter(b => b.status !== "Resolved").length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{projectData?.title}</h1>
            <p className="text-sm text-gray-500 mt-1">{projectData?.description}</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              <Plus size={18} />
              <span>Create Item</span>
            </button>
          </div>
        </div>

        {/* Project Info */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">Status</p>
              <span className={`inline-block text-xs px-3 py-1 rounded-full border ${getStatusColor(projectData?.status)}`}>
                {projectData?.status}
              </span>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Due Date</p>
              <p className="text-sm font-medium text-gray-900">{projectData?.id}</p>  {/* this hsould be due date  */}
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">GitHub Repository</p>
              <a 
              
              // href={project.githubUrl} shld be this instead
              href="https://github.com/karanja-dave/BugHive"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
              >
                <Github size={14} />
                {/* <span>{project.githubRepo}</span> should be this insetad */} 
                <span>project-githubRepo</span>
                <ExternalLink size={12} />
              </a>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Branch</p>
              <div className="flex items-center gap-1 text-sm text-gray-900">
                <GitBranch size={14} />
                {/* <span>{project.branch}</span> */}
                <span>projectbranch</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <p className="text-sm text-blue-600 font-medium mb-1">Progress</p>
            {/* <p className="text-2xl font-bold text-blue-700">{project.progress}%</p> */}
          </div>

          <div className="bg-green-50 p-4 rounded-lg border border-green-100">
            <p className="text-sm text-green-600 font-medium mb-1">Completed</p>
            <p className="text-2xl font-bold text-green-700">
              {completedTasks}/{projectData?.tasks.length}
            </p>
          </div>

          <div className="bg-orange-50 p-4 rounded-lg border border-orange-100">
            <p className="text-sm text-orange-600 font-medium mb-1">In Progress</p>
            <p className="text-2xl font-bold text-orange-700">{inProgressTasks}</p>
          </div>

          <div className="bg-red-50 p-4 rounded-lg border border-red-100">
            <p className="text-sm text-red-600 font-medium mb-1">Open Bugs</p>
            <p className="text-2xl font-bold text-red-700">{openBugs}</p>
          </div>
        </div>

        {/* Users */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Users className="text-blue-600" size={24} />
              <div>
                <h2 className="text-lg font-bold text-gray-800">Team Members</h2>
                <p className="text-sm text-gray-500">Active project contributors</p>
              </div>
            </div>
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">{projectData?.users.length} Members</span>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {projectData?.users.map(user => (
                <div key={user.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-sm">
                        {/* {user.avatar} */}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 text-sm">{user.name}</h3>
                        <p className="text-xs text-gray-500">{user.role}</p>
                      </div>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreVertical size={16} />
                    </button>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs text-gray-600">{user.email}</p>
                    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                      {/* <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(user.status)}`}>{user.status}</span> */}
                      {/* <span className="text-xs text-gray-600 font-medium">{user.tasksAssigned} tasks</span> */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tasks */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div className="flex items-center gap-3">
              <CheckSquare className="text-green-600" size={24} />
              <div>
                <h2 className="text-lg font-bold text-gray-800">Tasks</h2>
                <p className="text-sm text-gray-500">Active project tasks and deliverables</p>
              </div>
            </div>

            {/* Task filters */}
            <div className="flex flex-wrap gap-2">
              <select className="border border-gray-300 rounded px-2 py-1 text-sm"
                value={filterTaskAssignee} onChange={e => setFilterTaskAssignee(e.target.value)}>
                <option value="">All Assignees</option>
                {projectData?.users.map(u => <option key={u.id} value={u.name}>{u.name}</option>)} 
              </select>

              <select className="border border-gray-300 rounded px-2 py-1 text-sm"
                value={filterTaskStatus} onChange={e => setFilterTaskStatus(e.target.value)}>
                <option value="">All Statuses</option>
                {[...new Set(projectData?.tasks.map(t => t.status))].map(s => <option key={s} value={s}>{s}</option>)}
              </select>

              <select className="border border-gray-300 rounded px-2 py-1 text-sm"
                value={filterTaskPriority} onChange={e => setFilterTaskPriority(e.target.value)}>
                <option value="">All Priorities</option>
                {[...new Set(projectData?.tasks.map(t => t.priority))].map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
          </div>

          <div className="p-6 space-y-3">
            {filteredTasks?.map(task => (
              <div key={task.taskid} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-mono text-gray-500 font-medium">{task.taskid}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(task.status)}`}>{task.status}</span>
                      <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700">taski-type</span>
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-3">{task.task_title}</h3>
                    <div className="flex items-center gap-6 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <User size={14} />
                        <span className="text-xs">{task.assigned_to_name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar size={14} />
                        <span className="text-xs">{task.due_date}</span>
                      </div>
                      <div className={`flex items-center gap-2 ${getPriorityColor(task.priority)}`}>
                        <AlertCircle size={14} />
                        <span className="text-xs font-medium">{task.priority}</span>
                      </div>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600"><MoreVertical size={18} /></button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bugs */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div className="flex items-center gap-3">
              <Bug className="text-red-600" size={24} />
              <div>
                <h2 className="text-lg font-bold text-gray-800">Bugs & Issues</h2>
                <p className="text-sm text-gray-500">Critical and open bugs requiring attention</p>
              </div>
            </div>

            {/* Bug filters */}
            <div className="flex flex-wrap gap-2">
              <select className="border border-gray-300 rounded px-2 py-1 text-sm"
                value={filterBugAssignee} onChange={e => setFilterBugAssignee(e.target.value)}>
                <option value="">All Assignees</option>
                {projectData?.users.map(u => <option key={u.id} value={u.name}>{u.name}</option>)}
              </select>

              <select className="border border-gray-300 rounded px-2 py-1 text-sm"
                value={filterBugStatus} onChange={e => setFilterBugStatus(e.target.value)}>
                <option value="">All Statuses</option>
                {[...new Set(projectData?.bugs.map(b => b.status))].map(s => <option key={s} value={s}>{s}</option>)}
              </select>

              <select className="border border-gray-300 rounded px-2 py-1 text-sm"
                value={filterBugPriority} onChange={e => setFilterBugPriority(e.target.value)}>
                <option value="">All Priorities</option>
                {[...new Set(projectData?.bugs.map(b => b.severity))].map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
          </div>

          <div className="p-6 space-y-3">
            {filteredBugs?.map(bug => (
              <div key={bug.bugid} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-mono text-gray-500 font-medium">{bug.bugid}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(bug.status)}`}>{bug.status}</span>
                      <Bug size={14} className={getPriorityColor(bug.severity)} />
                      <span className={`text-xs font-semibold ${getPriorityColor(bug.severity)}`}>{bug.severity}</span>
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-3">{bug.title}</h3>
                    <div className="flex items-center gap-6 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <User size={14} />
                        <span className="text-xs">Assigned: {bug.assignee_name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={14} />
                        <span className="text-xs">Reported: {new Date(bug.created_at).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs">Reporter: {bug.reporter_name}</span>
                      </div>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600"><MoreVertical size={18} /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
