import { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { taskAPI, type TypeTask } from "../../../../features/task/taskAPI";
import { projectAPI } from "../../../../features/projects/projectsAPI";
import { toast } from "sonner";

type UpdateTaskInputs = {
  projectid: number;
  created_by: number;
  assigned_to: number;
  title: string;
  description: string;
  priority: "low" | "medium" | "high" | "urgent";
  status: "todo" | "in_progress" | "blocked" | "completed";
  due_date: string;
};

type UpdateTaskProps = {
  task: TypeTask | null;
};

const schema = yup.object({
  projectid: yup.number().required().positive().integer(),
  created_by: yup.number().required().positive().integer(),
  assigned_to: yup.number().required().positive().integer(),
  title: yup.string().max(150).required(),
  description: yup.string().max(255).required(),
  priority: yup.string().oneOf(["low", "medium", "high", "urgent"]).required(),
  status: yup.string().oneOf(["todo", "in_progress", "blocked", "completed"]).required(),
  due_date: yup.string().required(),
});

export const UpdateTask = ({ task }: UpdateTaskProps) => {
  const [updateTask, { isLoading }] = taskAPI.useUpdateTaskMutation();

  
  const { data: projectsData } = projectAPI.useGetProjectsWithDetailsQuery();

  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  const [projectUsers, setProjectUsers] = useState<{ id: number; name: string }[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<UpdateTaskInputs>({
    resolver: yupResolver(schema),
  });

  // When project changes → load its users
  useEffect(() => {
    if (!projectsData) return;

    const project = projectsData.data.find((p) => p.id === selectedProjectId);
    setProjectUsers(project?.users || []);
  }, [selectedProjectId, projectsData]);

  // Prefill when a task is selected
  useEffect(() => {
    if (!task || !projectsData) return;

    // Find project by its name
    const project = projectsData.data.find((p) => p.title === task.project_title);
    const projId = project?.id || null;

    setSelectedProjectId(projId);

    setValue("projectid", projId || 0);
    setValue("created_by", task.created_by_id);
    setValue("assigned_to", task.assigned_to_id);
    setValue("title", task.task_title);
    setValue("description", task.description);
    setValue("priority", task.priority as UpdateTaskInputs["priority"]);
    setValue("status", task.status as UpdateTaskInputs["status"]);
    setValue("due_date", task.due_date.slice(0, 10));
  }, [task, projectsData, setValue]);

  // Submit update
  const onSubmit: SubmitHandler<UpdateTaskInputs> = async (data) => {
    if (!task) {
      toast.error("No task selected for update");
      return;
    }

    const payload = {
      projectid: Number(task.projectid),   // from selected task or form
      created_by: Number(task.created_by_id), // from selected task
      assigned_to: Number(data.assigned_to),
      title: data.title,
      description: data.description,
      priority: data.priority,
      status: data.status,
      due_date: data.due_date,
    };

    // console.log("Updating task id:", task.taskid);
    // console.log("Payload:", payload);

    try {
      const response = await updateTask({ ...payload, id: task.taskid }).unwrap();
      toast.success(response.message);

      reset();
      setSelectedProjectId(null);
      setProjectUsers([]);

      (document.getElementById("update-task") as HTMLDialogElement).close();
    } catch (error) {
      toast.error("Failed to update task. Please try again.");
    }
  };

  return (
    <dialog id="update-task" className="modal sm:modal-middle">
      <div className="modal-box bg-gray-50 text-gray-900 w-full max-w-lg mx-auto rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Update Task</h2>

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
            {errors.projectid && <span className="text-red-700 text-sm">{errors.projectid.message}</span>}
          </label>

          {/* Created By */}
          <label className="flex flex-col">
            <span className="font-medium">Created By *</span>
            <select 
              {...register("created_by")} 
              className="select w-full border border-gray-300"
              disabled
              >
              {projectUsers.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
            {errors.created_by && <span className="text-red-700 text-sm">{errors.created_by.message}</span>}
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
            <span className="font-medium">Task Title *</span>
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

          {/* Priority */}
          <label className="flex flex-col">
            <span className="font-medium">Priority *</span>
            <select {...register("priority")} className="select border w-full border-gray-300">
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </label>

          {/* Status */}
          <label className="flex flex-col">
            <span className="font-medium">Status *</span>
            <select {...register("status")} className="select border w-full border-gray-300">
              <option value="todo">Todo</option>
              <option value="in_progress">In Progress</option>
              <option value="blocked">Blocked</option>
              <option value="completed">Completed</option>
            </select>
          </label>

          {/* Due Date */}
          <label className="flex flex-col">
            <span className="font-medium">Due Date *</span>
            <input
              type="date"
              {...register("due_date")}
              className="input w-full p-2 border border-gray-300"
            />
          </label>

          {/* Footer */}
          <div className="modal-action flex justify-end gap-2">
            <button type="submit" className="btn btn-primary" disabled={isLoading}>
              {isLoading ? <span className="loading loading-spinner" /> : "Update Task"}
            </button>
            <button type="button" className="btn" onClick={() => (document.getElementById("update-task") as HTMLDialogElement).close()}>
              Close
            </button>
          </div>

        </form>
      </div>
    </dialog>
  );
};
