import { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { bugAPI, type TypeBug } from "../../../../features/bugs/bugsAPI";
import { toast } from "sonner";

type UpdateBugInputs = {
  projectid: number;
  reported_by: number;
  assigned_to: number;
  title: string;
  description: string;
  severity: "low" | "medium" | "high" | "critical";
  status: "open" | "in_progress" | "resolved" | "closed";
};

type UpdateBugProps = {
  bug: TypeBug | null;
};

// Example static projects (replace later with API fetch)
const projects = [
  { id: 1, name: "Project Alpha", users: [{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }] },
  { id: 2, name: "Project Beta", users: [{ id: 3, name: "Charlie" }, { id: 4, name: "Dana" }] },
];

// Validation schema
const schema = yup.object({
  projectid: yup.number().required().positive().integer(),
  reported_by: yup.number().required().positive().integer(),
  assigned_to: yup.number().required().positive().integer(),
  title: yup.string().max(150).required(),
  description: yup.string().max(255).required(),
  severity: yup.string().oneOf(["low", "medium", "high", "critical"]).required(),
  status: yup.string().oneOf(["open", "in_progress", "resolved", "closed"]).required(),
});

export const UpdateBug = ({ bug }: UpdateBugProps) => {
  const [updateBug, { isLoading }] = bugAPI.useUpdateBugMutation();
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  const [projectUsers, setProjectUsers] = useState<{ id: number; name: string }[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<UpdateBugInputs>({
    resolver: yupResolver(schema),
  });

  // Load users when project changes
  useEffect(() => {
    const project = projects.find((p) => p.id === selectedProjectId);
    setProjectUsers(project?.users || []);
  }, [selectedProjectId]);

  // Prefill the form if bug changes
  useEffect(() => {
    if (bug) {
      const project = projects.find((p) => p.name === bug.project_title);
      const projId = project?.id || null;
      setSelectedProjectId(projId);

      setValue("projectid", projId || 0);
      setValue("reported_by", bug.reported_by);
      setValue("assigned_to", bug.assigned_to);
      setValue("title", bug.title);
      setValue("description", bug.description);
      setValue("severity", bug.severity as UpdateBugInputs["severity"]);
      setValue("status", bug.status as UpdateBugInputs["status"]);
    } else {
      reset();
    }
  }, [bug, reset, setValue]);

  // Submit updated bug
  const onSubmit: SubmitHandler<UpdateBugInputs> = async (data) => {
    if (!bug) {
      toast.error("No bug selected for update");
      return;
    }

    const payload = {
      ...data,
      bugid: bug.bugid,
      projectid: Number(data.projectid),
      reported_by: Number(data.reported_by),
      assigned_to: Number(data.assigned_to)
    };

    try {
      const response = await updateBug(payload).unwrap();
      toast.success(response.message);
      (document.getElementById("update-bug") as HTMLDialogElement).close();
    } catch (error) {
      toast.error("Failed to update bug.");
    }
  };

  return (
    <dialog id="update-bug" className="modal sm:modal-middle">
      <div className="modal-box bg-gray-50 text-gray-900 w-full max-w-lg mx-auto rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Update Bug</h2>
        <p className="text-sm text-gray-500 mb-4">
          Required fields are marked with <span className="text-red-600">*</span>
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

          {/* Project */}
          <label className="flex flex-col">
            <span className="font-medium">Project *</span>
            <select
              {...register("projectid")}
              value={selectedProjectId || ""}
              onChange={(e) => setSelectedProjectId(Number(e.target.value))}
              className="select w-full border border-gray-300"
            >
              <option value="">Select a project</option>
              {projects.map((project) => (
                <option key={project.id} value={project.id}>{project.name}</option>
              ))}
            </select>
            {errors.projectid && <span className="text-red-700 text-sm">{errors.projectid.message}</span>}
          </label>

          {/* Reported By */}
          <label className="flex flex-col">
            <span className="font-medium">Reported By *</span>
            <select {...register("reported_by")} className="select w-full border border-gray-300">
              <option value="">Select reporter</option>
              {projectUsers.map((user) => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))}
            </select>
            {errors.reported_by && <span className="text-red-700 text-sm">{errors.reported_by.message}</span>}
          </label>

          {/* Assigned To */}
          <label className="flex flex-col">
            <span className="font-medium">Assigned To</span>
            <select {...register("assigned_to")} className="select w-full border border-gray-300">
              <option value="">Unassigned</option>
              {projectUsers.map((user) => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))}
            </select>
            {errors.assigned_to && <span className="text-red-700 text-sm">{errors.assigned_to.message}</span>}
          </label>

          {/* Title */}
          <label className="flex flex-col">
            <span className="font-medium">Title *</span>
            <input
              type="text"
              {...register("title")}
              className="input w-full border border-gray-300"
            />
            {errors.title && <span className="text-red-700 text-sm">{errors.title.message}</span>}
          </label>

          {/* Description */}
          <label className="flex flex-col">
            <span className="font-medium">Description *</span>
            <textarea
              {...register("description")}
              className="textarea w-full border border-gray-300"
            />
            {errors.description && <span className="text-red-700 text-sm">{errors.description.message}</span>}
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
          </label>

          {/* Actions */}
          <div className="modal-action flex justify-end gap-2 mt-2">
            <button type="submit" className="btn btn-primary" disabled={isLoading}>
              {isLoading ? <span className="loading loading-spinner" /> : "Update Bug"}
            </button>
            <button
              type="button"
              className="btn"
              onClick={() => (document.getElementById("update-bug") as HTMLDialogElement).close()}
            >
              Close
            </button>
          </div>

        </form>
      </div>
    </dialog>
  );
};
