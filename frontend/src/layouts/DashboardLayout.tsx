import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer"
import { Sidebar } from "../components/Sidebar";
import { TaskGroupModal } from "../components/TaskGroupModal";
import type { TaskGroup } from "../types/taskGroup";
import PageContainer from "./PageContainer";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function DashboardLayout() {

    const [taskGroups, setTaskGroups] = useState<TaskGroup[]>([]);
    const [editingTaskGroup, setEditingTaskGroup] = useState<TaskGroup | null>(null);
    const [isGroupModalOpen, setIsGroupModalOpen] = useState(false)
    const [isSideBarOpen, setIsSidebarOpen] = useState(false)

    useEffect(() => {
        loadTaskGroups();
    }, [])

    async function loadTaskGroups() {
        const token = localStorage.getItem("token");
        if (!token) return

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks-groups`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                toast.error("Failed to load task groups");
                throw new Error("Failed to fetch task groups");
            }
            
            const data = await response.json();
            setTaskGroups(data);
        
        } catch (error){
            console.error(error)
        }
    }

    async function createTaskGroup(taskGroup: { id?: number;  name: string;}) {
        const token = localStorage.getItem("token");
        if (!token) return;

        /* Edit task group */

        if (taskGroup.id){
            const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks-groups/${taskGroup.id}`, {
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
            setTaskGroups(prev => prev.map(tg => tg.id === editingTaskGroup?.id ? {...tg, ...updatedTaskGroup} : tg))
            setEditingTaskGroup(null)
        } else {
            /* Create group task */
          const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks-groups`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(taskGroup)
          });

          if(!response.ok){
            toast.error("Something went wrong")
            throw new Error("Failed to create a task")
          }

          const newTaskGroup = await response.json();

          toast.success("Task group created successfully")
          setTaskGroups(prev => [...prev, newTaskGroup])

        }

    }

    return (
        <>
        <Navbar onMenuClick={() => setIsSidebarOpen(true)} />
        <PageContainer>
            <div className="flex w-full">
                <Sidebar 
                    isOpen={isSideBarOpen} 
                    onClose={() => setIsSidebarOpen(false)}
                    onCreateGroup={() => {
                        setEditingTaskGroup(null);
                        setIsGroupModalOpen(true)
                    }}
                    onEditGroup={(group) => {
                        setEditingTaskGroup(group);
                        setIsGroupModalOpen(true)
                    }} 
                    taskGroups={taskGroups}
                    />
                <main className="flex-1 min-w-0"> 
                    <Outlet />
                </main>
            </div>
        </PageContainer>

            <TaskGroupModal
                isOpen={isGroupModalOpen}
                onClose={() => {
                    setIsGroupModalOpen(false)
                    setEditingTaskGroup(null)
                    }}
                onSubmit={(taskGroup) => createTaskGroup(taskGroup)}
                mode={editingTaskGroup ? "edit" : "create"}
                taskGroup={editingTaskGroup}
                />


        <Footer /> 
        </>
    );
}