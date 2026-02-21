import { useAuth } from "../auth/AuthContext"

export function Navbar() {
    const {user, logout} = useAuth();

    return (
        <nav>
            {user && (
                <div className="flex justify-between p-4 ">
                <span className="my-2 mx-2">{user.username}</span>
                <button onClick={logout}>Logout</button>
                </div>
            )}
            <hr className="border-zinc-900"/>
        </nav>
    )
    
}