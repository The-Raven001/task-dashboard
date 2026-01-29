import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";


export function Login() {
    const {login, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        await login(email, password);
        navigate("/dashboard");
    }

    if (isAuthenticated){
        return (
            <Navigate to="/dashboard" replace/>
        )
    }

    return (
        <div>
            <form onSubmit={handleSubmit}
            className="flex justify-center"
            >
            <input 
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)} />

            <input 
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)} />
            <button type="submit">Login </button>
            </form>
        </div>
    )
}