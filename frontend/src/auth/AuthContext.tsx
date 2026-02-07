import { createContext, useContext, useEffect, useState } from "react";
import type {ReactNode} from "react";

//Types
type User = {
    id: number;
    email: string;
};

type AuthContextType = {
    user: User | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    loading: boolean;
};

//Context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

//Provider

export function AuthProvider({children}: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState (true)

    

    const login = async (email: string, password: string) => {

        const response = await fetch("http://localhost:8000/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email, password}),
        });

        if (!response.ok){
            throw new Error("Invalid credentials");
        }
        
        const data = await response.json();

        localStorage.setItem("token", data.access_token)

        await fetchCurrentUser();
    };


    const logout = () => {
        setUser(null)
        localStorage.removeItem("token")
    }
    const value: AuthContextType = {
        user,
        isAuthenticated: !!user,
        login,
        logout,
        loading,
    };

    const fetchCurrentUser = async () => {
        const token = localStorage.getItem("token");

        if (!token){
            setUser(null);
            return
        }

        const response = await fetch("http://localhost:8000/auth/me",
            {headers: {
                Authorization: `Bearer ${token}`,
            }}
        )
        
        if (!response.ok) {
            logout();
            return
        }

        const userData = await response.json();
        setUser(userData)

    }


    useEffect(() => {
    fetchCurrentUser().finally(() => setLoading(false));
    }, [])


    return (
        <AuthContext.Provider value={value}>
            {children}</AuthContext.Provider>
    );
}

//Hook

export function useAuth(){
    const context = useContext(AuthContext);

    if(!context) {
        throw new Error("useAuth must be used inside AuthProvider");
        
    }
    return context;
}

