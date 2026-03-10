import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { TaskModal } from "../components/TaskModal";
import { Trash2, Pencil, Plus, Check, X} from "lucide-react";
import toast from "react-hot-toast";
import { Card } from "../layouts/Card";

type Task = {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    created_at: string;
    };

export function Dashboard(){
    const { user, logout } = useAuth();

    const [ tasks, setTasks ] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("newest");
    const [selectedTask, setSelectedTask] = useState<Task | null>(null)


    useEffect (() => {
        loadTasks()}, [user])

    async function loadTasks() {
        const token = localStorage.getItem("token");

         if (!token) return;
        
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
        if(!response.ok){
            toast.error("Something went wrong");
            throw new Error("Failed to fetch tasks");
        }
        const data = await response.json()
        setTasks(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }    
    }

async function createTask(task: { id?: number; title: string; description: string; completed?: boolean }) {
    const token = localStorage.getItem("token");
    if (!token) return;
    /* Edit task*/
    if (task.id) {
  
        const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks/${task.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(task),
        });
        const updatedTask = await response.json();

        toast.success("Task edited successfully")
        setTasks(prev => prev.map(t => t.id === editingTask?.id ? {...t, ...updatedTask} : t))
        setEditingTask(null)

    } else {
    /* Create task */
        const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(task),
        });
        const newTask = await response.json();

        toast.success("Task created successfully")
        setTasks(prev => [...prev, newTask]);
    }
}

async function updateTaskState(task: {id: number; completed: boolean}) {
    const token = localStorage.getItem("token");

    if (!token) return;
 
        const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks/${task.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({completed: !task.completed}),
        
        })
        const updatedTask = await response.json();
        toast.success(task.completed ? "Marked incomplete": "Marked complete")
        setTasks(prev => prev.map(t=> t.id === task.id ? {...t, ...updatedTask} : t))
    }

    async function deleteTask(id: number){

        const token = localStorage.getItem("token");

        if(!token) return;

        const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ id })
        })
        
        if (!response.ok){
            toast.error("Something went wrong");
            throw new Error("Failed to delete task");
        }
        toast.success("Task deleted successfully")
        setTasks(prev => prev.filter(task => task.id !==id))
    }

    // Filter
    const filteredTasks = tasks.filter(task => task.title.toLowerCase().includes(searchTerm.toLowerCase()));

    // Date formatter
    const formatDate = (date: string | Date): string => {
        return new Date(date).toLocaleDateString(undefined, {
            month: "short",
            day: "numeric",
            year: "numeric"
        });
    }
    return (
        <div className="min-h-screen bg-neutral-950 text-white px-4 sm:px-6 lg:px-12 py-8 rounded-3xl">
            <h1 className="text-4xl font-extrabold tracking-light flex justify-center">Dashboard</h1>

            <div className="flex items-center justify-between">
                <p>Welcome {user?.email}</p>

            <button onClick={() => 
                {setEditingTask(null);
                setIsModalOpen(true)}} 
                className="
                    text-white 
                    flex  
                    items-stretch 
                    my-2 
                    flex items-center
                    gap-2
                    transition
                    hover:scale-105
                    hover:border-indigo-500
                    focus:border-indigo-500
                    ">
                <Plus />
                <span className="hidden sm:inline">New Task</span>
            </button>
            </div>

            <TaskModal 
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setEditingTask(null); 
                }}
                onSubmit={(task) => createTask(task)} 
                mode={editingTask ? "edit" : "create"}
                task={editingTask}
            />

            {loading && <p>Loading tasks...</p>}

            {!loading && tasks.length === 0 && <p className="text-neutral-500 mt-4">No tasks yet</p>}

            {!loading && tasks.length > 0 && (
                
                <div className="bg-zinc-800 rounded-3xl p-7 pt-3">
                    <h2 className="font-bold text-2xl pb-4">Tasks:</h2>
                    
                    <div className="flex flex-col sm:flex-row gap-3 sm:justify-between mb-6">
                        <input 
                            type="text"
                            placeholder="Search tasks..."
                            value={searchTerm}
                            onChange={(event) => setSearchTerm(event.target.value)}
                            className="
                            w-full sm:w-80
                            bg-neutral-900
                            border border-neutral-700
                            rounded-xl
                            px-4 py-2
                            text-white
                            placeholder-neutral-500
                            focus:outline-none
                            focus:border-indigo-500
                            transition-all duration-300
                            hover:-translate-y-1
                            hover:shadow-xl
                            hover:border-indigo-500
                            " 
                        />
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-neutral-400">Sort</span>
                            <select
                            onChange={(event) => setSortBy(event.target.value)}
                            className="
                                text-white
                                transition
                                rounded-xl
                                px-4 py-2
                                border border-neutral-700
                                hover:border-indigo-500
                                bg-neutral-900
                                cursor-pointer
                                focus:outline-none
                                focus:border-indigo-500
                                "
                            >
                            <option value="newest" className="text-white">Newest</option>
                            <option value="oldest" className="text-white">Oldest</option>
                            <option value="az" className="text-white">Title A-Z</option>
                            <option value="completed" className="text-white">Completed</option>
                            <option value="incomplete" className="text-white">Incompleted</option>
                        </select>
                        </div>
                    </div>

                    {filteredTasks.length === 0 ? (
                        <p className="text-neutral-500 mt-4">No tasks match your search.</p>
                    ) : (
                    <ul className="
                            grid 
                            grid-cols-1 
                            sm:grid-cols-2
                            lg:grid-cols-3
                            xl:grid-cols-4 
                            gap-6
                            ">    
                    {filteredTasks.map(task => (
                        <li key={task.id} 
                            className={`
                                bg-neutral-900
                                border
                                p-6
                                rounded-2xl
                                transition-all duration-300
                                hover:-translate-y-1
                                hover:shadow-xl
                                ${task.completed ? "border-green-500/40 bg-green-500/5" : "border-neutral-800 hover:border-neutral-600"}
                                `}>
                            <Card>
                                <div className="flex justify-between items-start">
                                    <h3 className="text-lg font-semibold tracking-tight break-words">{task.title}</h3>
                                    <button className="hover:scale-110 active:scale-95 transition p-0" onClick={() => updateTaskState(task)}>{task.completed ? <Check className="text-white hover:text-green-500" /> : <X className="text-red-500 hover:text-red-900"/>}</button> 
                                </div>
                                <p className="text-neutral-400 mt-3 text-sm leading-relaxed line-clamp-4 break-words">
                                    {task.description}
                                </p>
                                {task.description.length > 180 && (
                                    <button 
                                        onClick={() => setSelectedTask(task)}
                                        className="text-sm text-white hover:underline mt-1"
                                    >
                                        Show more
                                    </button>)}
                                <p className="text-xs text-neutral-500 mt-4">
                                    Created {formatDate(task.created_at)}
                                </p>
                                <div className="flex gap-3 mt-4">
                                     <button onClick={() => {
                                    setEditingTask(task);
                                    setIsModalOpen(true)
                                }}
                                className="text-blue-500 hover:text-blue-900 hover:scale-110 active:scale-95 transition"
                                ><Pencil className="text-white hover:text-blue-500"size={16} /></button>
                                <button onClick={() => deleteTask(task.id)} className="transition hover:scale-110 active:scale-95"><Trash2 className="text-red-500 hover:text-red-900 transition" size={16} /></button> 
                                </div>
                                
                           </Card>
                        </li>
                    ))}
                </ul>
            )}
                
                </div>
            )} 
            {selectedTask && (
  <div
    className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/40 z-50 p-4"
    onClick={() => setSelectedTask(null)}
  >
    <div
      className="w-full max-w-lg max-h-[80vh] rounded-xl bg-neutral-800/50 backdrop-blur-md p-6 shadow-xl"
      onClick={(e) => e.stopPropagation()}
    >
    <div>
        <h2 className="text-xl font-bold mb-4">{selectedTask.title}</h2>
        <p className="text-xs text-neutral-500 mt-4">Created {formatDate(selectedTask.created_at)}</p>
    </div>
      <div className="max-h-[60vh] overflow-y-auto mt-4">
        <p className="text-sm text-neutral-300 whitespace-pre-wrap break-words">
          {selectedTask.description}
        </p>
      </div>

      <div className="flex justify-center mt-6">
        <button
          onClick={() => setSelectedTask(null)}
          className="px-4 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 transition"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}
</div>
    )
}

/* 

*/