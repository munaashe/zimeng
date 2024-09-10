import React from "react";
import LayoutProvider from "./layout-provider";

export default function Providers({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className='z-50'>
            <LayoutProvider>
                {children}
            </LayoutProvider>
        </div>
    );
}
