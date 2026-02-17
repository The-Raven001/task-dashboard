import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";


export function Login() {
    const {login, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        setLoading(true)
        
        const success = await login(email, password);

        setLoading(false)

        if (success) {
            toast.success("Welcome back");
        } else {
            toast.error("Invalid email or password");
        }

    }

    if (isAuthenticated){
        return (
            <Navigate to="/dashboard" replace/>
        )
    }

    return (
        <div className="flex flex-col items-center mt-20">
            <h1 className="text-2x1 mb-6">Login</h1>
            <form onSubmit={handleSubmit}
            className="flex flex-col gap-4 w-80"
            >
            <input 
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="border p-2 rounded"
            required />

            <input 
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="border p-2 rounded"
            required />
            <button type="submit"
            disabled={loading}
            className="bg-black text-white p-2 rounded"
            >{loading ? "Logging in..." : "Login"} </button>
            </form>
            <div className="mt-6 text-center">
                <p>Don't have an account yet?</p>
                <p><Link to="/Register">Create one</Link></p>
            </div>
        </div>
    )
}