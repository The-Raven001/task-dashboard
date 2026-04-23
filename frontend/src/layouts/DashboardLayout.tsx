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
    const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null)

    useEffect(() => {
        loadTaskGroups();
    }, [])

    async function loadTaskGroups() {
        const token = localStorage.getItem("token");
        if (!token) return
    
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks-groups`, {
                headers: {
                    "Content-Type": "application/json", 
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
            toast.error("Something went wrong")
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

            if (!response.ok){
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

    async function deleteTaskGroup(id: number) {
        const token = localStorage.getItem("token");
        
        if (!token) return;

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks-groups/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },

            })

           if (!response.ok) {
                throw new Error("Failed to delete task")
           }

           setTaskGroups(prev => prev.filter(tg => tg.id !== id) )
           toast.success("Task group has been deleted successfully")

           setSelectedGroupId(prev => (prev === id ? null : prev))

        } catch (error) {
            console.error(error)
            toast.error("Something went wrong")
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
                    onSelectGroup={(groupId) => setSelectedGroupId(groupId)}
                    onDeleteGroup={(groupId) => deleteTaskGroup(groupId)}
                    selectedGroupId={selectedGroupId}
                    />
                <main className="flex-1 min-w-0"> 
                    <Outlet context={{ selectedGroupId, taskGroups }}/>
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
