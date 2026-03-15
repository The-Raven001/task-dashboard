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
            <Sidebar />
           <main> 
            <Outlet />
            </main>
        </PageContainer>
        <Footer />
        </>
    );
}