import { useState, useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { taskAPI } from "../../../../features/task/taskAPI";
import { projectAPI} from "../../../../features/projects/projectsAPI";
import { toast } from "sonner";

type CreateTask = {
  projectid: number;
  created_by: number;
  assigned_to: number;
  title: string;
  description: string;
  priority: "low" | "medium" | "high" | "urgent";
  status: "todo" | "in_progress" | "blocked" | "completed";
  due_date: string;
};

const schema = yup.object({
  projectid: yup.number().required("Project is required").positive().integer(),
  created_by: yup.number().required("Creator is required").positive().integer(),
  assigned_to: yup.number().required("Assignee is required").positive().integer(),
  title: yup.string().max(150).required("Task title is required"),
  description: yup.string().max(255).required("Description is required"),
  priority: yup.string().oneOf(["low", "medium", "high", "urgent"]).required(),
  status: yup.string().oneOf(["todo", "in_progress", "blocked", "completed"]).required(),
  due_date: yup.string().required("Due date is required"),
}).required();

export const CreateTask = () => {
  const [createTask, { isLoading }] = taskAPI.useCreateTaskMutation();
  const { data: projectsData } = projectAPI.useGetProjectsWithDetailsQuery(); // fetch projects
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  const [projectUsers, setProjectUsers] = useState<{ id: number; name: string }[]>([]);

  const { register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors } } = useForm<CreateTask>({
    resolver: yupResolver(schema)
  });

  // Update users when project changes
  useEffect(() => {
    if (!projectsData) return;

    const project = projectsData.data.find(p => p.id === selectedProjectId);
    
    // Ensure project.users exists and is an array
    setProjectUsers(project?.users || []);

    // Reset created_by and assigned_to
    setValue("created_by", 0);
    setValue("assigned_to", 0);
  }, [selectedProjectId, projectsData, setValue]);

  const onSubmit: SubmitHandler<CreateTask> = async (data) => {
  const payload = {
    ...data,
    projectid: Number(data.projectid),
    created_by: Number(data.created_by),
    assigned_to: Number(data.assigned_to),
  };

  try {
    const response = await createTask(payload).unwrap();
    toast.success(response.message);

    //reset the form after success
    reset()
    setSelectedProjectId(null);  
    setProjectUsers([]);

    // close the modal on successfull creation
    (document.getElementById("create-task") as HTMLDialogElement).close();

  } catch (error) {
    toast.error("Failed to create task. Please try again.");
  }
};


  return (
    <dialog id="create-task" className="modal sm:modal-middle">
      <div className="modal-box bg-gray-50 text-gray-900 w-full max-w-lg mx-auto rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Create Task</h2>
        <p className="text-sm text-gray-500 mb-4">
          Required fields are marked with <span className="text-red-600">*</span>
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

          {/* Project */}
          <label className="flex flex-col">
            <span className="font-medium">Project <span className="text-red-600">*</span></span>
            <select
              {...register("projectid")}
              value={selectedProjectId || ""}
              onChange={(e) => setSelectedProjectId(Number(e.target.value))}
              className="select w-full border border-gray-300"
            >
              <option value="">Select a project</option>
              {projectsData?.data.map(project => (
                <option key={project.id} value={project.id}>
                  {project.title}
                </option>
              ))}
            </select>
            {errors.projectid && <span className="text-red-700 text-sm">{errors.projectid.message}</span>}
          </label>

          {/* Created By */}
          <label className="flex flex-col">
            <span className="font-medium">Created By <span className="text-red-600">*</span></span>
            <select {...register("created_by")} className="select w-full border border-gray-300">
              <option value="">Select creator</option>
              {projectUsers.map(user => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))}
            </select>
            {errors.created_by && <span className="text-red-700 text-sm">{errors.created_by.message}</span>}
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

          {/* Task Title */}
          <label className="flex flex-col">
            <span className="font-medium">Task Title <span className="text-red-600">*</span></span>
            <input
              type="text"
              {...register("title")}
              className="input rounded w-full p-2 border border-gray-300"
            />
            {errors.title && <span className="text-red-700 text-sm">{errors.title.message}</span>}
          </label>

          {/* Description */}
          <label className="flex flex-col">
            <span className="font-medium">Description <span className="text-red-600">*</span></span>
            <textarea
              {...register("description")}
              className="textarea w-full p-2 border border-gray-300"
            />
            {errors.description && <span className="text-red-700 text-sm">{errors.description.message}</span>}
          </label>

          {/* Priority */}
          <label className="flex flex-col">
            <span className="font-medium">Priority <span className="text-red-600">*</span></span>
            <select {...register("priority")} className="select w-full border border-gray-300">
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
            {errors.priority && <span className="text-red-700 text-sm">{errors.priority.message}</span>}
          </label>

          {/* Status */}
          <label className="flex flex-col">
            <span className="font-medium">Status <span className="text-red-600">*</span></span>
            <select {...register("status")} className="select w-full border border-gray-300">
              <option value="todo">Todo</option>
              <option value="in_progress">In Progress</option>
              <option value="blocked">Blocked</option>
              <option value="completed">Completed</option>
            </select>
            {errors.status && <span className="text-red-700 text-sm">{errors.status.message}</span>}
          </label>

          {/* Due Date */}
          <label className="flex flex-col">
            <span className="font-medium">Due Date <span className="text-red-600">*</span></span>
            <input
              type="date"
              {...register("due_date")}
              className="input rounded w-full p-2 border border-gray-300"
            />
            {errors.due_date && <span className="text-red-700 text-sm">{errors.due_date.message}</span>}
          </label>

          {/* Actions */}
          <div className="modal-action flex justify-end gap-2 mt-2">
            <button type="submit" className="btn btn-primary" disabled={isLoading}>
              {isLoading ? <span className="loading loading-spinner" /> : "Create Task"}
            </button>
            <button
              type="button"
              className="btn"
              onClick={() => (document.getElementById("create-task") as HTMLDialogElement).close()}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};
