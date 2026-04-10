import { useState } from "react"
import { TaskGroupModal } from "./TaskGroupModal";
import { Plus } from "lucide-react";
import toast from "react-hot-toast";

type TaskGroup = {
    id: number;
    title: string;
}

export function Sidebar({isOpen, onClose}: { isOpen: boolean; onClose: () => void }) {
    const [isModalOpen, setIsmodalOpen] = useState(false)
    const [editingTaskGroup, setEditingTaskGroup] = useState<TaskGroup | null>(null)

        async function createTaskGroup(taskGroup: { id?: number;  name: string;}) {
        const token = localStorage.getItem("token");
        if (!token) return;

        /* Edit task group */

        if (taskGroup.id){
            const response = await fetch(`${import.meta.env.VITE_API_URL}/gropus/${taskGroup.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(taskGroup),
            }) 

            if(!response.ok){
                toast.error("Something went wrong");
                throw new Error("Failed to edit task group")
            }

            const updatedTaskGroup = await response.json();

            toast.success("Task group name edited successfully")
            set
        }

    }
    
    return (
        <>
            {/* Overlay (mobile only) */}
            {isOpen && (
                <div 
                className="fixed inset-0 bg-black/40 z-40 2xl:hidden"
                onClick={onClose}
                />
            )}

            <aside className={`
                    fixed top-0 left-0 h-full w-64 z-50
                    bg-neutral-900 p-4 mx-2
                    transform transition-transform duration-300
                    rounded-xl 

                    ${isOpen ? "translate-x-0" : "-translate-x-full"}
                    
                    2xl:static 2xl:translate-x-0
                    `}>
                <div className="flex justify-between">
                    <h2 className="flex justify-center">List of tasks</h2>
                    <button
                    ><Plus /></button> 
                </div>

                <TaskGroupModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsmodalOpen(false)
                    setEditingTaskGroup(null)
                }}
                onSubmit={(taskGroup) => createTaskGroup(taskGroup)}
                mode={editingTaskGroup ? "edit" : "create"}
                taskGroup={editingTaskGroup}
                />

                <div className="
                        flex flex-col gap-4
                        border border-neutral-700
                        rounded-2xl
                        p-2 m-1
                        hover:border-indigo-500">
                    Task list 1
                </div>
                <div className="
                        flex flex-col gap-4
                        border border-neutral-700
                        rounded-2xl
                        p-2 m-1
                        hover:border-indigo-500">
                    Task list 2
                </div>
                <div className="
                        flex flex-col gap-4
                        border border-neutral-700
                        rounded-2xl
                        p-2 m-1
                        hover:border-indigo-500">
                    Task list 3
                </div>
            </aside>
        </>
        
    )
}