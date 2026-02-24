import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { Link, Navigate } from "react-router-dom"

export function Register() {

    const { isAuthenticated } = useAuth();

    const [email, setEmail ] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace/>
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true)
        setError(null)

        try{
        const response = await fetch(`${import.meta.env.VITE_API_URL}/users/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                email,
                password,
            })
        })

        if (!response.ok){
            throw new Error("Failed to register")
        }
        window.location.href = "/login"

    } catch (err){
        setError("Registration failed");
    } finally {
        setLoading(false);
    };
    }

    

    return (
        <div className="flex flex-col items-center mt-20">
            <h1 className="text-2xl mb-6">User register</h1>

            <form onSubmit={handleSubmit}
            className="flex flex-col gap-4 w-80">

                <input type="text"
                placeholder="username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                className="border p-2 rounded"
                required />

                <input 
                type="email"
                placeholder="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="border p-2 rounded"
                required />

                <input type="password"
                placeholder="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="border p-2 rounded"
                required />
                
                <button type="submit" disabled={loading}
                >{loading ? "Creating account..." : "Register"}</button>
            </form>
            {error && <p>{error}</p>}
            <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>
    );
}