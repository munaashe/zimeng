import React from "react";
import LayoutProvider from "./layout-provider";

export default function Providers({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <LayoutProvider>
            {children}
        </LayoutProvider>
    );
}
