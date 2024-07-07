'use client'

import { ReactNode } from "react";
import LayoutProvider from "./LayoutProvider";

interface ProvidersProps {
    children: ReactNode;
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
    return (
        <LayoutProvider>
            {children}
        </LayoutProvider>
    )
}

export default Providers;