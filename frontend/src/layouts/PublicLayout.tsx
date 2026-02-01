import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import PageContainer from "./PageContainer";

export default function PublicLayout() {
    return (
        <>
        <Navbar />
        <PageContainer>
            <Outlet />
        </PageContainer>
        </>
    )
}