import { Plus } from "lucide-react";
import type { TaskGroup } from "../types/taskGroup";
import { Pencil } from "lucide-react";
import { Trash } from "lucide-react";


type SidebarProps = {
    isOpen: boolean,
    onClose: () => void;
    onCreateGroup: () => void
    onEditGroup: (group: TaskGroup) => void;
    taskGroups: TaskGroup[];
    onSelectGroup: (groupId: number | null) => void;

}


export function Sidebar({isOpen, onClose, onCreateGroup, onEditGroup, taskGroups, onSelectGroup} : SidebarProps) {

    
    
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
                    onClick={onCreateGroup}
                    className="
                        text-white
                        flex
                        items-stretch
                        my-2
                        flex-items-center
                        gap-2
                        transition
                        hover:scale-105
                        hover:border-indigo-500
                        focues:border-indigo-500" 
                    ><Plus />
                    </button> 
                </div>
                <div >
                    <button onClick={() => onSelectGroup(null)}>All tasks</button>
                </div>

            {taskGroups.map(group => (
                <div
                    key={group.id}
                    onClick={() => onSelectGroup(group.id)}
                    className="
                        flex flex-col gap-4
                        border border-neutral-700
                        rounded-2xl
                        p-2 m-1
                        hover:border-indigo-500
                        cursor-pointer
                    "
                >
                    <div className="flex justify-between items-center">
                        {group.name}  
                        <div>
                            <button
                            onClick={() => onEditGroup(group)}>
                            <Pencil />
                            </button>
                        </div>
                    </div> 
                </div>
            ))}
            </aside>
        </>
        
    )
}