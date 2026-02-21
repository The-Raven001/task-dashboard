import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { TaskModal } from "../components/TaskModal";
import { Trash2, Pencil, Plus} from "lucide-react";
import toast from "react-hot-toast";

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
            <p>Welcome {user?.email}</p>

            <button onClick={() => 
                {setEditingTask(null);
                setIsModalOpen(true)}} className="text-white flex  items-stretch gap-6 my-2 text-black">
                <Plus /> New Task
            </button>

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
                <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {tasks.map(task => (
                        <li key={task.id} className="text-black bg-gray-300 p-6 rounded-3xl">
                            
                            <strong>{task.title} </strong>
                            
                            <div className="p-2">
                                {task.description}
                            </div>
                           <div className="flex flex-raw gap-2">
                            <button onClick={() => updateTaskState(task)}>{task.completed ? "✅" : "❌"}</button> 
                            <button onClick={() => {
                                setEditingTask(task);
                                setIsModalOpen(true)
                            }}><Pencil className="text-white"size={15} /></button>
                             <button onClick={() => deleteTask(task.id)}><Trash2 className="text-white" size={15} /></button> 
                           </div>
                        </li>
                        
                    ))}
                </ul>
            )} 
        </div>
    )
}

/* 


                            

*/