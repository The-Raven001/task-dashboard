type CardProps = {
    children: React.ReactNode;
    className?: string;
};

export function Card({children, className = ""}: CardProps) {
    return (
        <div className={`
                bg-neutral-900 
                border border-neutral-800
                p-6 
                rounded-2xl 
                shadow-sm
                hover:shadow-lg
                hover:border-neutral-700
                transition-all
                duration-300 
                ${className}`}>
            {children} 
        </div>
    )
}