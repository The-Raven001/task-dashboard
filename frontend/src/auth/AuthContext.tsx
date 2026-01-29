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
        //placeholder
        setUser({id: 1, email: "example.email.com"})
        console.log(email, password);
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

    useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
        setUser(JSON.parse(storedUser) as User);
    }
    setLoading(false)
    }, []) // The brackets at the end make sure it renders at the begining

    useEffect(() => {
        if(user) {
            localStorage.setItem("user", JSON.stringify(user));
        } else {
            localStorage.removeItem("user")
        }
    }, [user])

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

