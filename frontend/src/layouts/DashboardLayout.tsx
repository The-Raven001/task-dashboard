import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer"
import { Sidebar } from "../components/Sidebar";
import PageContainer from "./PageContainer";

export default function DashboardLayout() {
    return (
        <>
        <Navbar />
        
        <PageContainer>
            <div className="flex w-full">
                <Sidebar />
                <main className="flex-1 min-w-0"> 
                    <Outlet />
                </main>
            </div>
        </PageContainer>
        <Footer />
        </>
    );
}