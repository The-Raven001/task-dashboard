import type { ReactNode } from "react";

type Props = {
    children: ReactNode;
};

export default function PageContainer({ children }: {children: React.ReactNode}) {
    return(
        <main className="page-container">
            {children}
        </main>
    );
}