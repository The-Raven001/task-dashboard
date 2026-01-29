import React from "react";
import { useAuth } from "../auth/AuthContext";

export function Dashboard(){
    const { user, logout } = useAuth();

    return (
        <div>
            <h1>Dashboard</h1>
            <p>Welcom {user?.email}</p>
            <button onClick={logout}>Logout</button>
        </div>
    )
}