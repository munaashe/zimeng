import Footer from "@/components/footer";
import Header from "@/components/header";
import Sidebar from "@/components/homepage/sidebar";
import Container from "@/components/ui-components/containter";
import { usePathname } from "next/navigation";
import React from "react";

export default function LayoutProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname(); // Use usePathname from next/navigation

    // Define routes where the sidebar should not be shown
    const noSidebarRoutes = ["/privacy", "/contact", "/egb", "/terms"];

    // Check if the current route is in the list of routes without a sidebar
    const shouldShowSidebar = !noSidebarRoutes.includes(pathname);

    return (
        <main>
            <Header />
            <Container className={`!p-0 grid grid-cols-1 ${shouldShowSidebar ? 'md:grid-cols-7' : ''} md:gap-4`}>
                <div className={`${shouldShowSidebar ? 'md:col-span-5' : '!md:col-span-7'}`}>
                    {children}
                </div>
                {shouldShowSidebar && (
                    <div className="md:col-span-2">
                        <Sidebar />
                    </div>
                )}
            </Container>
            {!shouldShowSidebar && <Footer />}
        </main>
    );
}