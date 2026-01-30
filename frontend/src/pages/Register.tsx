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
        const response = await fetch("http://localhost:8000/users/", {
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

        console.log("USER CREATED!")

        window.location.href = "/login"

    } catch (err){
        setError("Registration failed");
    } finally {
        setLoading(false);
    };
    }

    

    return (
        <div>
            <h1>User register</h1>

            <form onSubmit={handleSubmit}>

                <input type="text"
                placeholder="username"
                value={username}
                onChange={(event) => setUsername(event.target.value)} />

                <input 
                type="email"
                placeholder="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)} />

                <input type="password"
                placeholder="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)} />
                
                <button type="submit" disabled={loading}
                >{loading ? "Creating account..." : "Register"}</button>
            </form>
            {error && <p>{error}</p>}
            <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>
    );
}