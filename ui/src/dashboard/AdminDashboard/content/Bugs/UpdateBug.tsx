import { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { bugAPI, type TypeBug } from "../../../../features/bugs/bugsAPI";
import { projectAPI } from "../../../../features/projects/projectsAPI";
import { toast } from "sonner";

type UpdateBugInputs = {
  projectid: number;
  reported_by: number;
  assigned_to: number;
  title: string;
  description: string;
  severity: "low" | "medium" | "high" | "critical";
  status: "open" | "in_progress" | "resolved" | "closed";
  updated_at: string;
};

type UpdateBugProps = {
  bug: TypeBug | null;
};

const schema = yup.object({
  projectid: yup.number().required().positive().integer(),
  reported_by: yup.number().required().positive().integer(),
  assigned_to: yup.number().required().positive().integer(),
  title: yup.string().max(150).required(),
  description: yup.string().max(255).required(),
  severity: yup
    .string()
    .oneOf(["low", "medium", "high", "critical"])
    .required(),
  status: yup
    .string()
    .oneOf(["open", "in_progress", "resolved", "closed"])
    .required(),
  updated_at: yup.string().required(),
});

export const UpdateBug = ({ bug }: UpdateBugProps) => {
  const [updateBug, { isLoading }] = bugAPI.useUpdateBugMutation();
  const { data: projectsData } = projectAPI.useGetProjectsWithDetailsQuery();

  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  const [projectUsers, setProjectUsers] = useState<{ id: number; name: string }[]>(
    []
  );

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<UpdateBugInputs>({
    resolver: yupResolver(schema),
  });

  // Load project users when project changes
  useEffect(() => {
    if (!projectsData || selectedProjectId === null) return;

    const project = projectsData.data.find((p) => p.id === selectedProjectId);
    setProjectUsers(project?.users || []);
  }, [selectedProjectId, projectsData]);

  // Prefill form when a bug is selected
  useEffect(() => {
    if (!bug || !projectsData) return;

    const project = projectsData.data.find((p) => p.id === bug.projectid);
    const projId = project?.id || null;

    setSelectedProjectId(projId);
    setProjectUsers(project?.users || []);

    setValue("projectid", projId || 0);
    setValue("reported_by", bug.reported_by);
    setValue("assigned_to", bug.assigned_to);
    setValue("title", bug.title);
    setValue("description", bug.description);
    setValue("severity", bug.severity as UpdateBugInputs["severity"]);
    setValue("status", bug.status as UpdateBugInputs["status"]);
    setValue("updated_at", bug.updated_at ? bug.updated_at.slice(0, 10) : "");
  }, [bug, projectsData, setValue]);

  // Submit handler
  const onSubmit: SubmitHandler<UpdateBugInputs> = async (data) => {
    if (!bug) {
      toast.error("No bug selected for update");
      return;
    }

    const payload = {
      projectid: Number(data.projectid),
      reported_by: Number(data.reported_by),
      assigned_to: Number(data.assigned_to),
      title: data.title,
      description: data.description,
      severity: data.severity,
      status: data.status,
      updated_at: data.updated_at,
    };

    try {
      const response = await updateBug({ ...payload, bugid: bug.bugid }).unwrap();
      toast.success(response.message);

      reset();
      setSelectedProjectId(null);
      setProjectUsers([]);

      (document.getElementById("update-bug") as HTMLDialogElement).close();
    } catch (error) {
      toast.error("Failed to update bug. Please try again.");
    }
  };

  // Close modal handler
  const handleClose = () => {
    reset();
    setSelectedProjectId(null);
    setProjectUsers([]);
    (document.getElementById("update-bug") as HTMLDialogElement).close();
  };

  return (
    <dialog id="update-bug" className="modal sm:modal-middle">
      <div className="modal-box bg-gray-50 text-gray-900 w-full max-w-lg mx-auto rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Update Bug</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {/* Project */}
          <label className="flex flex-col">
            <span className="font-medium">Project *</span>
            <select
              {...register("projectid")}
              value={selectedProjectId || ""}
              className="select w-full border border-gray-300"
              disabled
            >
              <option value="">Select a project</option>
              {projectsData?.data.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.title}
                </option>
              ))}
            </select>
            {errors.projectid && (
              <span className="text-red-700 text-sm">{errors.projectid.message}</span>
            )}
          </label>

          {/* Created By */}
          <label className="flex flex-col">
            <span className="font-medium">Created By *</span>
            <select
              {...register("reported_by")}
              className="select w-full border border-gray-300"
              disabled
            >
              {projectUsers.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
            {errors.reported_by && (
              <span className="text-red-700 text-sm">{errors.reported_by.message}</span>
            )}
          </label>

          {/* Assigned To */}
          <label className="flex flex-col">
            <span className="font-medium">Assigned To *</span>
            <select {...register("assigned_to")} className="select w-full border border-gray-300">
              {projectUsers.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>

          {/* Title */}
          <label className="flex flex-col">
            <span className="font-medium">Bug Title *</span>
            <input
              type="text"
              {...register("title")}
              className="input w-full p-2 border border-gray-300"
            />
          </label>

          {/* Description */}
          <label className="flex flex-col">
            <span className="font-medium">Description *</span>
            <textarea
              {...register("description")}
              className="textarea w-full p-2 border border-gray-300"
            />
          </label>

          {/* Severity */}
          <label className="flex flex-col">
            <span className="font-medium">Severity *</span>
            <select {...register("severity")} className="select w-full border border-gray-300">
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </select>
            {errors.severity && (
              <span className="text-red-700 text-sm">{errors.severity.message}</span>
            )}
          </label>

          {/* Status */}
          <label className="flex flex-col">
            <span className="font-medium">Status *</span>
            <select {...register("status")} className="select w-full border border-gray-300">
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
            </select>
            {errors.status && (
              <span className="text-red-700 text-sm">{errors.status.message}</span>
            )}
          </label>

          {/* Updated At */}
          <label className="flex flex-col">
            <span className="font-medium">Updated At *</span>
            <input
              type="date"
              {...register("updated_at")}
              className="input w-full p-2 border border-gray-300"
            />
          </label>

          {/* Footer */}
          <div className="modal-action flex justify-end gap-2">
            <button type="submit" className="btn btn-primary" disabled={isLoading}>
              {isLoading ? <span className="loading loading-spinner" /> : "Update Bug"}
            </button>
            <button type="button" className="btn" onClick={handleClose}>
              Close
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};
