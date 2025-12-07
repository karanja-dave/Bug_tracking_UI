import { useState } from "react";
import { FaPlus, FaChevronDown } from "react-icons/fa";
import { taskAPI, type TypeTask } from "../../../../features/task/taskAPI";
import React from "react";

export const Tasks = () => {
  const [selectedTask, setSelectedTask] = useState<TypeTask | null>(null);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const { data: tasksData } = taskAPI.useGetTasksQuery();

  const handleDropdownToggle = (taskid: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenDropdown(openDropdown === taskid ? null : taskid);
  };

  const handleUpdate = (task: TypeTask) => {
    console.log("Update task:", task);
    setOpenDropdown(null);
    setSelectedTask(task);
  };

  const handleDelete = (task: TypeTask) => {
    console.log("Delete task:", task);
    setOpenDropdown(null);
  };

  const getPriorityColor = (priority: string) => {
    const colors: Record<string, string> = {
      critical: "text-red-600 bg-red-50",
      high: "text-orange-600 bg-orange-50",
      medium: "text-yellow-600 bg-yellow-50",
      low: "text-green-600 bg-green-50",
    };
    return colors[priority] || colors.medium;
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      completed: "text-green-600 bg-green-50",
      "in-progress": "text-blue-600 bg-blue-50",
      todo: "text-gray-600 bg-gray-100",
    };
    return colors[status] || colors.todo;
  };

  return (
    <main className="flex-1 p-4">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Tasks</h1>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            <FaPlus size={20} /> New Task
          </button>
        </div>

        {/* Table */}
        {tasksData?.data?.length ? (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-max w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left p-4 text-sm font-semibold text-gray-700">Task</th>
                    <th className="text-left p-4 text-sm font-semibold text-gray-700">Project</th>
                    <th className="text-left p-4 text-sm font-semibold text-gray-700">Assignee</th>
                    <th className="text-left p-4 text-sm font-semibold text-gray-700">Status</th>
                    <th className="text-left p-4 text-sm font-semibold text-gray-700">Priority</th>
                    <th className="text-left p-4 text-sm font-semibold text-gray-700">Due Date</th>
                    <th className="p-4 text-right"></th>
                  </tr>
                </thead>
                <tbody>
                  {tasksData.data.map((task: TypeTask) => {
                    const isOpen = selectedTask?.taskid === task.taskid;
                    return (
                      <React.Fragment key={task.taskid}>
                        <tr
                          className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
                          onClick={() => setSelectedTask(isOpen ? null : task)}
                        >
                          <td className="p-4 flex items-center gap-2">
                            <FaChevronDown
                              className={`text-gray-500 transition-transform duration-200 ${
                                isOpen ? "rotate-180" : ""
                              }`}
                              size={12}
                            />
                            <p className="text-xs sm:text-sm font-medium text-gray-900">{task.title}</p>
                          </td>
                          <td className="p-2">{task.projectid}</td>
                          <td className="p-2">{task.assigned_to}</td>
                          <td className="p-2">
                            <span className={`text-xs px-2 py-1 rounded ${getStatusColor(task.status)}`}>
                              {task.status}
                            </span>
                          </td>
                          <td className="p-2">
                            <span className={`text-xs px-2 py-1 rounded ${getPriorityColor(task.priority)}`}>
                              {task.priority}
                            </span>
                          </td>
                          <td className="p-4">{new Date(task.due_date).toLocaleDateString()}</td>
                          <td className="p-4 text-right relative">
                            <button
                              className="hover:bg-gray-100 p-1 rounded"
                              onClick={(e) => handleDropdownToggle(task.taskid, e)}
                            >
                              ⋯
                            </button>

                            {openDropdown === task.taskid && (
                              <div className="absolute right-0 mt-1 w-28 bg-white border border-gray-200 rounded shadow-lg z-10">
                                <button
                                  className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                                  onClick={() => handleUpdate(task)}
                                >
                                  Update
                                </button>
                                <button
                                  className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-red-600"
                                  onClick={() => handleDelete(task)}
                                >
                                  Delete
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>

                        {/* Expanded Description */}
                        {isOpen && (
                          <tr className="bg-gray-50">
                            <td colSpan={7} className="p-4">
                              <p className="text-xs sm:text-sm font-semibold text-gray-900 mb-1">
                                Description
                              </p>
                              <p className="text-xs sm:text-sm text-gray-700">
                                {task.description || "No description provided."}
                              </p>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <p>No Tasks Found</p>
        )}
      </div>
    </main>
  );
};
