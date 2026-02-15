import { useEffect, useState } from "react";

type Task = {
    id: number; 
    title: string;
    description: string;
    completed: boolean;
};

type TaskModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (task: { id?: number; title: string; description: string; completed?: boolean }) => Promise<void>;
    mode: "create" | "edit";
    task?: Task | null;
};

export function TaskModal({ isOpen, onClose, onSubmit, mode, task }: TaskModalProps) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("")
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (mode === "edit" && task){
            setTitle(task.title);
            setDescription(task.description)
        } else {
            setTitle("");
            setDescription("")
        }
    }, [mode, task, isOpen]);

    if (!isOpen) return null;

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        setLoading(true);

        await onSubmit({
            id: task?.id,
            title,
            description,
            completed: task?.completed ?? false
        });

        setLoading(false);
        onClose();
}

    const isEdit = mode === "edit";

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
            <div className="bg-zinc-700 p-6 rounded w-96">
                <h2 className="text-lg font-bold mb-4">
                    New Task
                </h2>
                <form onSubmit={handleSubmit}>
                    <input 
                    className="w-full border p-2 mb-4"
                    placeholder="Task title"
                    value={title}
                    onChange={event => setTitle(event.target.value)}
                    required
                     />


                    <textarea
                    className="w-full border p-2 mb-4 h-32 resize-none"
                    placeholder="Task description"
                    value={description}
                    onChange={event => setDescription(event.target.value)}
                    required
                    />

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
                    className="px-3 py-1 bg-black text-white"
                    >
                        {loading 
                            ? isEdit
                               ? "Updating..."
                               : "Creating..."
                            : isEdit
                            ? "Update"
                            : "Create"}
                    </button>
                </div>
                </form>

                
            </div>
        </div>
    )

}
