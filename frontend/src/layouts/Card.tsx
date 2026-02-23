type CardProps = {
    children: React.ReactNode;
    className?: string;
};

export function Card({children, className = ""}: CardProps) {
    return (
        <div className={`bg-white p-6 rounded-2xl shadow-sn hover:shadow-md transition duration-200 ${className}`}>
            {children} 
        </div>
    )
}