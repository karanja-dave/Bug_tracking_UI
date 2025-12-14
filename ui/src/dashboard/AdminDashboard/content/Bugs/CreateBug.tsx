import { useState, useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { bugAPI } from "../../../../features/bugs/bugsAPI";
import { toast } from "sonner";
import { projectAPI } from "../../../../features/projects/projectsAPI";

type CreateBugInputs = {
  projectid: number;
  reported_by: number;
  assigned_to: number;
  title: string;
  description: string;
  severity: "low" | "medium" | "high" | "critical";
  status: "open" | "in_progress" | "resolved" | "closed";
  created_at:string
};



// Validation Schema
const schema = yup
  .object({
    projectid: yup.number().required().positive().integer(),
    reported_by: yup.number().required().positive().integer(),
    assigned_to: yup.number().required().positive().integer(),
    title: yup.string().max(150).required(),
    description: yup.string().required(),
    severity: yup.string().oneOf(["low", "medium", "high", "critical"]).required(),
    status: yup
      .string()
      .oneOf(["open", "in_progress", "resolved", "closed"])
      .required(),
    created_at: yup.string().required("Due date is required"),
  })
  .required();

export const CreateBug = () => {
  const [createBug, { isLoading }] = bugAPI.useCreateBugMutation();
  const {data:projectsData}=projectAPI.useGetProjectsWithDetailsQuery()
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  const [projectUsers, setProjectUsers] = useState<{ id: number; name: string }[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreateBugInputs>({
    resolver: yupResolver(schema),
  });

  // Update users list when project changes
  useEffect(() => {
    if(!projectsData) return;
    const project = projectsData.data.find(p => p.id === selectedProjectId);

    // ensure users in a specified project exist 
    setProjectUsers(project?.users || []);

    // reset created by and assigned to 
    setValue("reported_by", 0);
    setValue("assigned_to", 0);
  }, [selectedProjectId, projectsData, setValue]);

  // Submit Handler
  const onSubmit: SubmitHandler<CreateBugInputs> = async (data) => {
    const payload = {
    ...data,
    projectid: Number(data.projectid),
    created_by: Number(data.reported_by),
    assigned_to: Number(data.assigned_to),
  };

    try {
      const response = await createBug(payload).unwrap();
      toast.success(response.message);

      (document.getElementById("create-bug") as HTMLDialogElement).close();
    } catch (error) {
      toast.error("Failed to report bug. Please try again.");
    }
  };

  return (
    <dialog id="create-bug" className="modal sm:modal-middle">
      <div className="modal-box bg-gray-50 text-gray-900 w-full max-w-lg mx-auto rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Report Bug </h2>

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
              {projectsData?.data.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.title}
                </option>
              ))}
            </select>
            {errors.projectid && <span className="text-red-700 text-sm">{errors.projectid.message}</span>}
          </label>

          {/* Reported By */}
          <label className="flex flex-col">
            <span className="font-medium">Created By <span className="text-red-600">*</span></span>
            <select {...register("reported_by")} className="select w-full border border-gray-300">
              <option value="">Select creator</option>
              {projectUsers.map(user => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))}
            </select>
            {errors.reported_by && <span className="text-red-700 text-sm">{errors.reported_by.message}</span>}
          </label>

          {/* Assigned To */}
          <label className="flex flex-col">
            <span className="font-medium">Assigned To <span className="text-red-600">*</span></span>
            <select {...register("assigned_to")} className="select w-full border border-gray-300">
              <option value="">Select assignee</option>
              {projectUsers.map(user => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))}
            </select>
            {errors.assigned_to && <span className="text-red-700 text-sm">{errors.assigned_to.message}</span>}
          </label>

          {/* Title */}
          <label className="flex flex-col">
            <span className="font-medium">Bug Title *</span>
            <input
              type="text"
              {...register("title")}
              className="input w-full p-2 border border-gray-300"
            />
            {errors.title && <span className="text-red-700 text-sm">{errors.title.message}</span>}
          </label>

          {/* Description */}
          <label className="flex flex-col">
            <span className="font-medium">Description *</span>
            <textarea
              {...register("description")}
              className="textarea w-full p-2 border border-gray-300"
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
            {errors.severity && <span className="text-red-700 text-sm">{errors.severity.message}</span>}
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
            {errors.status && <span className="text-red-700 text-sm">{errors.status.message}</span>}
          </label>

          {/* Due Date */}
          <label className="flex flex-col">
            <span className="font-medium">Due Date <span className="text-red-600">*</span></span>
            <input
              type="date"
              {...register("created_at")}
              className="input rounded w-full p-2 border border-gray-300"
            />
            {errors.created_at && <span className="text-red-700 text-sm">{errors.created_at.message}</span>}
          </label>

          {/* ACTIONS */}
          <div className="modal-action flex justify-end gap-2 mt-2">
            <button type="submit" className="btn btn-primary" disabled={isLoading}>
              {isLoading ? <span className="loading loading-spinner" /> : "Report Bug"}
            </button>
            <button
              type="button"
              className="btn"
              onClick={() => (document.getElementById("create-bug") as HTMLDialogElement).close()}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};
