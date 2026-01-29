import { useAuth } from "../auth/AuthContext"

export function Navbar() {
    const {user, logout} = useAuth();

    return (
        <nav>
            {user && (
                <>
                <span>{user.email}</span>
                <button onClick={logout}>Logout</button>
                </>
            )}
        </nav>
    )
    
}