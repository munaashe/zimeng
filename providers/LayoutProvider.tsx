'use client'

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { usePathname } from "next/navigation";


const LayoutProvider = ({
    children,
}: {
    children: React.ReactNode
}) => {
    return (

        <>
            <Header />
            {children}
            <Footer />
        </>
    )
};

export default LayoutProvider


