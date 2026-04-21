import { Plus } from "lucide-react";
import type { TaskGroup } from "../types/taskGroup";
import { Pencil } from "lucide-react";
import { Trash } from "lucide-react";


type SidebarProps = {
    isOpen: boolean,
    onClose: () => void;
    onCreateGroup: () => void;
    onEditGroup: (group: TaskGroup) => void;
    taskGroups: TaskGroup[];
    onSelectGroup: (groupId: number | null) => void;
    onDeleteGroup: (groupId: number) => void;
    selectedGroupId: number | null
}


export function Sidebar({isOpen, onClose, onCreateGroup, onEditGroup, taskGroups, onSelectGroup, onDeleteGroup, selectedGroupId} : SidebarProps) {

    
    
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
                    bg-neutral-900 
                    p-4 mx-2
                    rounded-xl 
                    transform transition-transform duration-300
                    

                    ${isOpen ? "translate-x-0" : "-translate-x-full"}
                    
                    2xl:static 2xl:translate-x-0
                    `}>

                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-neutral-200 flex justify-center">
                        Task Groups
                    </h2>

                    <button
                    onClick={onCreateGroup}
                    className="
                        p-2
                        rounded-lg
                        hover:bg-neutral-800
                        transition
                        " 
                    ><Plus />
                    </button> 
                </div>
                <div >
                    
                    <button onClick={() => onSelectGroup(null)}
                            className="
                                w-full
                                text-left 
                                px-3 py-2
                                rounded-xl
                                hover:bg-neutral-800
                                transition 
                            "
                        >All tasks</button>
                </div>

            {taskGroups.map(group => (
                <div
                    key={group.id}
                    onClick={() => onSelectGroup(group.id)}
                    className={`
                        group
                        items-center justify-between
                        px-3 py-2 my-2
                        rounded-xl
                        p-2 m-1
                        cursor-pointer
                        transition-all duration-200
                        
                        ${group.id === selectedGroupId
                            ? "bg-neutral-800 border-neutral-600"
                            : "bg-neutral-900 border-neutral-800 hover:bg-neutral-800 hover:border-neutral-600"
                        }
                        
                    `}
                >
                    <div className="flex flex-1 justify-between items-center truncate min-w-0">
                        <span className="text-sm truncate">
                            {group.name}  
                        </span>
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">
                            <button 
                                onClick={() => onEditGroup(group)}
                                className="hover:text-blue-400 transition"
                                >
                            <Pencil size={16}/>
                            </button>
                            <button 
                                onClick={(e) =>  {e.stopPropagation(); onDeleteGroup(group.id)}}
                                className="hover:text-red-500 transition"
                                >
                                <Trash size={16}/>
                            </button>
                        </div>
                    </div> 
                </div>
            ))}
            </aside>
        </>
        
    )
}