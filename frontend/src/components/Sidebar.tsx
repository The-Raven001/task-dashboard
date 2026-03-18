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
                md:block">
            <h2 className="flex justify-center">Menu</h2>
            <div className="flex flex-col gap-4">
                List of tasks
            </div>
        </aside>
    )
}