'use client'

import React from "react";
import LayoutProvider from "./layout-provider";
import I18nProvider from "./i18n-provider";

export default function Providers({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className='z-50'>
            <I18nProvider>
                <LayoutProvider>
                    {children}
                </LayoutProvider>
            </I18nProvider>

        </div>
    );
}
