import { useAuth } from "../auth/AuthContext";

export function AuthDebug() {
    const { user, isAuthenticated, login, logout} = useAuth();
    
    return (
        <div style={{ padding: "1rem", border: "1px solid #ccc" }}>
            <h3>
                Auth Debug
            </h3>
            <p>
                <strong>Authenticated:</strong> {isAuthenticated ? "Yes" : "No"}
            </p>

            <p>
                <strong>User:</strong>{" "}
                {user ? JSON.stringify(user) : "null"}
            </p>

            <button onClick={() => login("test@test.com", "1234")}>
                Login (fake)
            </button>

            <button onClick={logout} style={{ marginLeft: "0.5rem" }}>
                Logout
            </button>

        </div>
    )
}