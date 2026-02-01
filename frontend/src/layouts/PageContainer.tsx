import type { ReactNode } from "react";

type Props = {
    children: ReactNode;
};

export default function PageContainer({ children }: Props) {
    return(
        <main className="page-container">
            {children}
        </main>
    );
}