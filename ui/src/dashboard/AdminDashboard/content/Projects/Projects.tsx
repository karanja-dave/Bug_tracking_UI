import { Calendar, FolderKanban, Plus, Users } from "lucide-react";
import { projectAPI } from "../../../../features/projects/projectsAPI";
import { Link } from "react-router";

export const Projects = () => {
  const { data: projectsData, isLoading, isError } = projectAPI.useGetProjectsQuery();

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      todo: "text-gray-600 bg-gray-100",
      inprogress: "text-blue-600 bg-blue-50",
      completed: "text-green-600 bg-green-50",
      open: "text-red-600 bg-red-50",
      active: "text-blue-600 bg-blue-50",
      planning: "text-purple-600 bg-purple-50",
    };
    return colors[status] || "text-gray-600 bg-gray-100";
  };

  if (isLoading) return <p>Loading projects...</p>;
  if (isError) return <p>Failed to load projects.</p>;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
        <Link
          to="/admin/projects/create" // Route for creating new project
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
          New Project
        </Link>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projectsData?.data?.map((project) => (
          <Link
            key={project.projectid}
            to={`${project.projectid}`} // navigates to ProjectPage
            className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer block"
          >
            {/* Card Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="bg-blue-50 p-2 rounded-lg">
                <FolderKanban className="text-blue-600" size={24} />
              </div>
              <span className={`text-xs px-2 py-1 rounded ${getStatusColor(project.status)}`}>
                {project.status}
              </span>
            </div>

            {/* Title + Description */}
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{project.title}</h3>
            <p className="text-gray-600 text-sm mb-4">{project.description}</p>

            {/* Meta Info */}
            <div className="flex items-center justify-between text-sm text-gray-600 mt-4">
              <div className="flex items-center gap-1">
                <Calendar size={16} />
                <span>{new Date(project.created_at).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users size={16} />
                <span>Team assigned</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
