import { toast } from "sonner"
import { taskAPI, type TypeTask } from "../../../../features/task/taskAPI"

type DeleteTaskProps={
    task:TypeTask|null
}
export const DeleteTasks = ({task}:DeleteTaskProps) => {
    // definations
    const [deleteTodo,{isLoading}]=taskAPI.useDeleteTaskMutation()

    // define the delete function 
    const handleDelete =async()=>{
        try {
            if(!task){
                toast.error("No Task selected for deletion")
                return;
            }
            await deleteTodo(task.taskid).unwrap()
            toast.success("Task delete successfully");
            // close modal
            (document.getElementById('delete_modal') as HTMLDialogElement)?.close()
        } catch (error) {
            console.log(error);
            toast.error("Failed to delete task. Please try again");
        }
    }

    // define styling for delete warning message 
    return (
    <dialog id="delete_modal" className="modal sm:modal-middle">
        <div className="modal-box bg-gray-600 text-white w-full max-w-xs sm:max-w-lg mx-auto rounded-lg">
            <h3 className="font-bold text-lg mb-4 ">Delete Todo</h3>
            <p className="mb-6">
                Are you sure you want to delete <span className="font-semibold">{task?.task_title}</span>?
            </p>
            <div className="modal-action flec gap-4">
                {/* del btn  */}
                <button
                    data-test="delete-todo-confirm-button"
                    className="btn btn-error"
                    onClick={handleDelete}
                    disabled={isLoading}
                >
                    {isLoading?(
                        <>
                        <span className="loading loading-spinner text-primary"/> Deleting
                        </>
                    ):"Yes, Delete"}
                </button>
                {/* cancel btn  */}
                <button
                    className="btn"
                    type="button"
                    onClick={()=>(document.getElementById('delete_modal')as HTMLDialogElement)?.close()}
                >
                    Cancel


                </button>
            </div>
        </div>
    </dialog>
    )
}
