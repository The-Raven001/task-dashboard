import { useAuth } from "../auth/AuthContext";

export function Dashboard(){
    const { user, logout } = useAuth();

    return (
        <div>
            <h1 className="flex justify-center mb-5">Dashboard</h1>
            <p>Welcome {user?.email}</p>
            <button onClick={logout}>Logout</button>
        </div>
    )
}