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
    const pathname = usePathname();

    // Define routes where the sidebar should not be shown
    const noSidebarRoutes = ["/privacy", "/contact", "/egb", "/terms"];

    // Check if the current route is in the list of routes without a sidebar
    const shouldShowSidebar = !noSidebarRoutes.includes(pathname);

    return (
        <main>
            <Header />
            <Container>
                <div className={`layout-wrapper`}>
                    {/* Main content */}
                    <div className={`main-content ${shouldShowSidebar ? 'with-sidebar' : 'full-width'}`}>
                        {children}
                    </div>

                    {/* Sidebar */}
                    {shouldShowSidebar && (
                        <div className="sidebar">
                            <Sidebar />
                        </div>
                    )}
                </div>
            </Container>
            {!shouldShowSidebar && <Footer />}
        </main>
    );
}