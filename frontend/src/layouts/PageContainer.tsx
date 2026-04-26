export default function PageContainer({ children }: {children: React.ReactNode}) {
    return(
        <main className="flex min-h-[calc(100vh-64px)] w-full p-4">
            {children}
        </main>
    );
}