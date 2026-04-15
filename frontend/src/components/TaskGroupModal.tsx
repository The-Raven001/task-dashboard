import { useState, useEffect } from "react"
import type { TaskGroup, TaskGroupInput } from "../types/taskGroup";

type TaskGroupModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (taskGroup: TaskGroupInput) => Promise<void>;
    mode: "create" | "edit";
    taskGroup: TaskGroup | null;
}

export function TaskGroupModal ({ isOpen, onClose, onSubmit, mode, taskGroup}: TaskGroupModalProps) {
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (mode === "edit" && taskGroup){
            setName(taskGroup.name);
        } else {
            setName("");
        }

        const handleKeyDown = (e: KeyboardEvent) => {
            if(e.key === "Escape") {
                onClose()
            }
        };

        window.addEventListener("keydown", handleKeyDown)

        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        };

    }, [mode, taskGroup, isOpen, onClose]);

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();

        if (!name.trim()) return;

        setLoading(true);

        await onSubmit({
            id: taskGroup?.id,
            name
        })

        setLoading(false)
        onClose();
    }

    const isEdit = mode === "edit";
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center backdrop-blur-md"
             onClick={onClose}   
                >
            <div className="bg-neutral-800/50 p-6 rounded-2xl w-96"
                 onClick={(e) => e.stopPropagation()}
                >
                <h2 className="text-lg font-bold mb-4">
                    {isEdit ? "Edit Task Group": "New Task Group"}
                </h2>
                <form onSubmit={handleSubmit}>
                    <input 
                    className="w-full border p-2 mb-4 rounded-xl focus:outline-none focus:border-indigo-500 hover:border-indigo-500 transition"
                    placeholder="Task Group Name"
                    maxLength={50}
                    value={name}
                    onChange={event => setName(event.target.value)}
                    required
                    type="text" />
                <div className="flex justify-end gap-2">
                    <button
                    type="button"
                    onClick={onClose}
                    className="px-3 py-1 border"

                    >
                    Cancel
                    </button>

                    <button
                    type="submit"
                    disabled={loading}
                    className="px-3 py-1 bg-black text-white">
                        {loading
                            ? isEdit 
                                ? "Updating..."
                                : "Creating..."
                            : isEdit 
                            ? "Update"
                            : "Create"
                        }
                    </button>
                </div>
                </form>
                
            </div>
        </div>
    )
}