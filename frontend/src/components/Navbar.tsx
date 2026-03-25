import { useAuth } from "../auth/AuthContext"

export function Navbar() {
    const {user, logout} = useAuth();

    return (
        <nav>
            {user && (
                <div className="flex justify-between p-4">
                    <div className="flex items-center">
                        <button className="my-2 mx-2 2xl:hidden">Menu</button>
                        <span className="my-2 mx-2">{user.email}</span>
                    </div>
                <button onClick={logout} 
                className="
                     text-white 
                     flex  
                     items-stretch 
                     my-2 
                     flex items-center
                     gap-2
                     transition
                     hover:scale-105
                     hover:border-indigo-500
                     focus:border-indigo-500
                ">Logout</button>
                </div>
            )}
            <hr className="border-zinc-900"/>
        </nav>
    )
    
}