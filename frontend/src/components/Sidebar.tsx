export function Sidebar() {

    return (
        <aside className="
                w-64
                bg-neutral-900
                rounded-xl 
                p-4 mx-2
                min-h-screen
                shrink-0
                hidden
                2xl:block">
            <h2 className="flex justify-center">List of tasks</h2>
            <div className="
                    flex flex-col gap-4
                    border border-neutral-700
                    rounded-2xl
                    p-2 m-1
                    hover:border-indigo-500">
                Task list 1
            </div>
            <div className="
                    flex flex-col gap-4
                    border border-neutral-700
                    rounded-2xl
                    p-2 m-1
                    hover:border-indigo-500">
                Task list 2
            </div>
            <div className="
                    flex flex-col gap-4
                    border border-neutral-700
                    rounded-2xl
                    p-2 m-1
                    hover:border-indigo-500">
                Task list 3
            </div>
        </aside>
    )
}