import { toast } from "sonner";
import { bugAPI, type TypeBug } from "../../../../features/bugs/bugsAPI";
type DeleteBugProps = {
    bug: TypeBug | null;
};

export const DeleteBug = ({ bug }: DeleteBugProps) => {
    const [deleteBug, { isLoading }] = bugAPI.useDeleteBugMutation();
    // define delete func 
    const handleDelete = async () => {
        try {
            if (!bug) {
                toast.error("No Bug selected for deletion");
                return;
            }

            await deleteBug(bug.bugid).unwrap();
            toast.success("Bug deleted successfully");

            // close modal
            (document.getElementById("delete_modal") as HTMLDialogElement)?.close();
        } catch (error) {
            console.log(error);
            toast.error("Failed to delete bug. Please try again.");
        }
    };

    // styling the delete warning message 
    return (
        <dialog id="delete_modal" className="modal sm:modal-middle">
            <div className="modal-box bg-gray-600 text-white w-full max-w-xs sm:max-w-lg mx-auto rounded-lg">
                <h3 className="font-bold text-lg mb-4">Delete Bug</h3>

                <p className="mb-6">
                    Are you sure you want to delete{" "}
                    <span className="font-semibold">{bug?.title}</span>?
                </p>

                <div className="modal-action flex gap-4">
                    {/* del btn */}
                    <button
                        className="btn btn-error"
                        onClick={handleDelete}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <span className="loading loading-spinner text-primary" /> Deleting
                            </>
                        ) : (
                            "Yes, Delete"
                        )}
                    </button>

                    {/* cancel btn */}
                    <button
                        className="btn"
                        type="button"
                        onClick={() =>
                            (document.getElementById("delete_modal") as HTMLDialogElement)?.close()
                        }
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </dialog>
    );
};
