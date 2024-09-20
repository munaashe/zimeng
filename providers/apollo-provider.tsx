'use client';

import React from 'react';
import { ApolloProvider } from '@apollo/client';
import apolloClient from '@/lib/apolloClient';

interface ApolloProviderProps {
    children: React.ReactNode;
}

export default function ApolloProviderWrapper({ children }: ApolloProviderProps) {
    return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
}