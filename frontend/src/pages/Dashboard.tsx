import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { TaskModal } from "../components/TaskModal";

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

    useEffect (() => {
        loadTasks()}, [])

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

    async function createTask(title: string, description: string) {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await fetch("http://localhost:8000/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ title, description }),
        });

        if (!response.ok){
            throw new Error("Failed to create task");
        }

        const newTask = await response.json();
        setTasks(prev => [...prev, newTask]);
    }


    return (
        <div>
            <h1 className="flex justify-center mb-5">Dashboard</h1>
            <p>Welcome {user?.email}</p>

            <button onClick={() => setIsModalOpen(true)}>
                ➕ New Task
            </button>

            < TaskModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onCreate={createTask}
            />

            {loading && <p>Loading tasks...</p>}

            {!loading && tasks.length === 0 && <p>No tasks yet</p>}

            {!loading && tasks.length > 0 && (
                <ul>
                    {tasks.map(task => (
                        <li key={task.id}>
                            {task.title} {task.completed ? "✅" : "❌"}
                            {task.description}
                        </li>
                        
                    ))}
                </ul>
            )}
    
        </div>
    )
}