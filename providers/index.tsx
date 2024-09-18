'use client';

import React from 'react';
import LayoutProvider from './layout-provider';
import ApolloProviderWrapper from './apollo-provider';

interface ProvidersProps {
    children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
    return (
        <div className="z-50">
            <ApolloProviderWrapper>
                <LayoutProvider>
                    {children}
                </LayoutProvider>
            </ApolloProviderWrapper>
        </div>
    );
}