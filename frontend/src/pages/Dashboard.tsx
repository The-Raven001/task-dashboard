import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { TaskModal } from "../components/TaskModal";
import { Trash2, Pencil} from "lucide-react";

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
            const response = await fetch("http://localhost:8000/tasks", {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
        if(!response.ok){
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
    /* Edit portion */
    if (task.id) {
  
        const response = await fetch(`http://localhost:8000/tasks/${task.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(task),
        });
        const updatedTask = await response.json();

        setTasks(prev => prev.map(t => t.id === editingTask?.id ? {...t, ...updatedTask} : t))
        setEditingTask(null)

    } else {

        const response = await fetch("http://localhost:8000/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(task),
        });
        const newTask = await response.json();

   
        setTasks(prev => [...prev, newTask]);
    }
}

    async function deleteTask(id: number){

        const token = localStorage.getItem("token");

        if(!token) return;

        const response = await fetch(`http://localhost:8000/tasks/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ id })
        })
        
        if (!response.ok){
            throw new Error("Failed to delete task");
        }
        setTasks(prev => prev.filter(task => task.id !==id))
    }




    return (
        <div>
            <h1 className="flex justify-center mb-5">Dashboard</h1>
            <p>Welcome {user?.email}</p>

            <button onClick={() => 
                {setEditingTask(null);
                setIsModalOpen(true)}}>
                ➕ New Task
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
                <ul>
                    {tasks.map(task => (
                        <li key={task.id} className="flex flex-row">
                            {task.title} {task.completed ? "✅" : "❌"} 
                            
                            {task.description}
                            <button onClick={() => deleteTask(task.id)}><Trash2 size={15} /></button> 
                            <button onClick={() => {
                                setEditingTask(task);
                                setIsModalOpen(true)
                            }}><Pencil size={15} /></button>
                        </li>
                        
                    ))}
                </ul>
            )}
    
        </div>
    )
}

/* 


                            

*/