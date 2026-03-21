import { Link } from "react-router-dom";

export function Landing () {

    return (
       <div className="min-h-[100dvh] flex items-center justify-center px-4">
            <div className="
                    w-full
                    max-w-xl
                    bg-neutral-900
                    border border-neutral-800
                    rounded-2xl
                    p-8
                    shadow-xl
                    text-center
                    transition-all duration-300">
                <h1 className="text-3xl sm:text-4xl font-bold mb-4">
                    Task Manager
                </h1>
                <p className="text-neutral-400 mb-8">
                    Keep track of your tasks, stay organized, and get things done.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        to="/register"
                        className="
                            px-6 py-2
                            rounded-xl
                            border border-neutral-700
                            bg-neutral-800
                            hover:border-indigo-500
                            hover:scale-105
                            transition
                            !text-white
                            ">
                        Create Account
                    </Link>
                    <Link
                        to="/login"
                        className="
                            px-6 py-2
                            rounded-xl
                            border border-neutral-700
                            hover:border-indigo-500
                            hover:scale-105
                            transition
                            !text-white
                            "   >
                        Login
                    </Link>
                </div>
            </div>
       </div>
    );
}
