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
    };

export function Dashboard(){
    const { user, logout } = useAuth();

    const [ tasks, setTasks ] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | null>(null);

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




    return (
        <div className="p-6 min-h-screen">
            <h1 className="flex justify-center mb-5 font-bold mb-6 text-2xl">Dashboard</h1>
            <div className="flex items-center justify-between">
                <p>Welcome {user?.email}</p>

            <button onClick={() => 
                {setEditingTask(null);
                setIsModalOpen(true)}} className="text-white flex  items-stretch gap-6 my-2 text-black">
                <Plus /> New Task
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

            {!loading && tasks.length === 0 && <p>No tasks yet</p>}

            {!loading && tasks.length > 0 && (
                
                <div className="bg-zinc-600 rounded-3xl p-7 pt-3">
                    <h2 className="font-bold text-2xl pb-4">Tasks:</h2>
                    <ul className="grid 
                            grid-cols-1 
                            sm:grid-cols-2
                            lg:grid-cols-3
                            xl:grid-cols-4 
                            gap-6">
                                
                    {tasks.map(task => (
                        <li key={task.id} className="text-black bg-gray-300 p-3 rounded-3xl">
                            <Card>
                                <div className="flex justify-between items-start">
                                    <strong className="text-lg">{task.title}</strong>
                                    <button className="p-0" onClick={() => updateTaskState(task)}>{task.completed ? <Check className="text-white hover:text-green-500" /> : <X className="text-red-500 hover:text-red-900"/>}</button> 
                                </div>
                                <p className="p-2">
                                    {task.description}
                                </p>
                                <div className="flex gap-3 mt-4">
                                     <button onClick={() => {
                                    setEditingTask(task);
                                    setIsModalOpen(true)
                                }}
                                className="text-blue-500 hover:text-blue-900 transition"
                                ><Pencil className="text-white hover:text-blue-500"size={16} /></button>
                                <button onClick={() => deleteTask(task.id)}><Trash2 className="text-red-500 hover:text-red-900 transition" size={16} /></button> 
                                </div>
                                
                           </Card>
                        </li>
                    ))}
                </ul>
                </div>
            )} 
        </div>
    )
}

/* 

*/