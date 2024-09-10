import Footer from "@/components/footer";
import Header from "@/components/header";
import React from "react";

export default function LayoutProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main>
            <Header />
            {children}
            <Footer />
        </main>
    );
}
