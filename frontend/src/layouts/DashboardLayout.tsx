import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer"
import PageContainer from "./PageContainer";

export default function DashboardLayout() {
    return (
        <>
        <Navbar />
        <PageContainer>
            <Outlet />
        </PageContainer>
        <Footer />
        </>
    );
}