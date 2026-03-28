import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer"
import { Sidebar } from "../components/Sidebar";
import PageContainer from "./PageContainer";
import { useState } from "react";


export default function DashboardLayout() {

    const [isSideBarOpen, setIsSidebarOpen] = useState(false);

    return (
        <>
        <Navbar onMenuClick={() => setIsSidebarOpen(true)} />
        <PageContainer>
            <div className="flex w-full">
                <Sidebar isOpen={isSideBarOpen} onClose={() => setIsSidebarOpen(false)}/>
                <main className="flex-1 min-w-0"> 
                    <Outlet />
                </main>
            </div>
        </PageContainer>
        <Footer /> 
        </>
    );
}