export function Sidebar({isOpen, onClose}: { isOpen: boolean; onClose: () => void }) {

    return (
        <>
            {/* Overlay (mobile only) */}
            {isOpen && (
                <div 
                className="fixed inset-0 bg-black/40 z-40 2xl:hidden"
                onClick={onClose}
                />
            )}

            <aside className={`
                    fixed top-0 left-0 h-full w-64 z-50
                    bg-neutral-900 p-4
                    transform transition-transform duration-300

                    ${isOpen ? "translate-x-0" : "-translate-x-full"}
                    `}>
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
        </>
        
    )
}