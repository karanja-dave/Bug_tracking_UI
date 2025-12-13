import { useState } from "react";
import { FaPlus, FaChevronDown } from "react-icons/fa";
import React from "react";
import { bugAPI, type TypeBug } from "../../../../features/bugs/bugsAPI";
import { CreateBug } from "./CreateBug";
import { UpdateBug } from "./UpdateBug";
import { DeleteBug } from "./DeleteBug";

export const Bugs = () => {
  const [selectedBug, setSelectedBug] = useState<TypeBug | null>(null);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  const { data: bugsData } = bugAPI.useGetBugsQuery();

  // defince colors for serverity
  const getSeverityColor = (severity: string) => {
    const colors: Record<string, string> = {
      critical: "text-red-600 bg-red-50",
      high: "text-orange-600 bg-orange-50",
      medium: "text-yellow-600 bg-yellow-50",
      low: "text-green-600 bg-green-50",
    };
    return colors[severity] || colors.medium;
  };
  // define colors for status 
  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      open: "text-red-600 bg-red-50",
      in_progress: "text-blue-600 bg-blue-50",
      resolved: "text-green-600 bg-green-50",
      closed: "text-gray-600 bg-gray-100",
    };
    return colors[status] || colors.open;
  };

  //  define fun to expand rows 
  const handleDropdownToggle = (bugid: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenDropdown(openDropdown === bugid ? null : bugid);
  };

  //  define update fun 
  const handleUpdate = (bug: TypeBug) => {
    setSelectedBug(bug);
    setOpenDropdown(null);
    (document.getElementById("update-bug") as HTMLDialogElement).showModal();
  };

  // define del func 
  const handleDelete = (bug: TypeBug) => {
    setSelectedBug(bug);
    setOpenDropdown(null);
    (document.getElementById("delete_modal") as HTMLDialogElement).showModal();
  };

  return (
    <main className="flex-1 p-4">
      <div className="space-y-6">

        {/* header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Bugs</h1>
          <button
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            onClick={() =>
              (document.getElementById("create-bug") as HTMLDialogElement).showModal()
            }
          >
            <FaPlus size={20} /> Report Bug
          </button>
        </div>

        {/* call modals */}
        <CreateBug />
        <DeleteBug bug={selectedBug} />
        <UpdateBug bug={selectedBug} />

        {/* bugs Table */}
        {bugsData?.data?.length ? (
          <div className="bg-white rounded-xl border border-gray-200 overflow-visible">
            <div className="overflow-x-auto">
              <table className="min-w-max w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  {/* column names  */}
                  <tr>
                    <th className="text-left p-4 text-sm font-semibold text-gray-700">Bug</th>
                    <th className="text-left p-4 text-sm font-semibold text-gray-700">Project</th>
                    <th className="text-left p-4 text-sm font-semibold text-gray-700">Severity</th>
                    <th className="text-left p-4 text-sm font-semibold text-gray-700">Status</th>
                    <th className="text-left p-4 text-sm font-semibold text-gray-700">Reporter</th>
                    <th className="text-left p-4 text-sm font-semibold text-gray-700">Assignee</th>
                    <th className="text-left p-4 text-sm font-semibold text-gray-700">Created</th>
                    <th className="p-4 text-right"></th>
                  </tr>
                </thead>
                {/* table body */}
                <tbody>
                  {bugsData.data.map((bug: TypeBug) => {
                    const isOpen = selectedBug?.bugid === bug.bugid;

                    return (
                      <React.Fragment key={bug.bugid}>
                        <tr
                          className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
                          onClick={() => setSelectedBug(isOpen ? null : bug)}
                        >
                          <td className="p-4 flex items-center gap-2">
                            <FaChevronDown
                              className={`text-gray-500 transition-transform duration-200 ${
                                isOpen ? "rotate-180" : ""
                              }`}
                              size={12}
                            />
                            <p className="text-xs sm:text-sm font-medium text-gray-900">
                              {bug.title}
                            </p>
                          </td>

                          <td className="p-4">{bug.project_title}</td>

                          <td className="p-4">
                            <span
                              className={`text-xs px-2 py-1 rounded ${getSeverityColor(
                                bug.severity
                              )}`}
                            >
                              {bug.severity}
                            </span>
                          </td>

                          <td className="p-4">
                            <span
                              className={`text-xs px-2 py-1 rounded ${getStatusColor(
                                bug.status
                              )}`}
                            >
                              {bug.status}
                            </span>
                          </td>

                          <td className="p-4">{bug.reporter_name}</td>

                          <td className="p-4">{bug.assignee_name || "Unassigned"}</td>

                          <td className="p-4">
                            {new Date(bug.created_at).toLocaleDateString()}
                          </td>

                          <td className="p-4 text-right relative">
                            <button
                              className="hover:bg-gray-100 p-1 rounded"
                              onClick={(e) => handleDropdownToggle(bug.bugid, e)}
                            >
                              ⋯
                            </button>

                            {openDropdown === bug.bugid && (
                              <div className="absolute right-0 mt-1 w-28 bg-white border border-gray-200 rounded shadow-lg z-10">
                                <button
                                  className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleUpdate(bug);
                                  }}
                                >
                                  Update
                                </button>

                                <button
                                  className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-red-600"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDelete(bug);
                                  }}
                                >
                                  Delete
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>

                        {/* description */}
                        {isOpen && (
                          <tr className="bg-gray-50">
                            <td colSpan={8} className="p-4">
                              <p className="text-xs sm:text-sm font-semibold text-gray-900 mb-1">
                                Description
                              </p>
                              <p className="text-xs sm:text-sm text-gray-700">
                                {bug.description || "No description provided."}
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
          <p>No Bugs Found</p>
        )}
      </div>
    </main>
  );
};
