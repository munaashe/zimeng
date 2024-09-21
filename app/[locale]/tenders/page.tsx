'use client'

import React from 'react'
import { useQuery } from "@apollo/client";
import { GET_TENDERS } from "@/graphql/queries";
import { useEffect, useState } from "react";
import { Event, Tender } from '@/utils/Types';
import Container from '@/components/ui-components/containter';
import Filter from '@/components/filter-component';
import CardComponent from '@/components/card';

const Tenders = () => {
    const { data, loading, error } = useQuery(GET_TENDERS);
    const [tenders, setTenders] = useState<Tender[]>([]);

    useEffect(() => {
        if (data) {
            const fetchedTenders = data?.tenderCollection?.items || [];
            setTenders(fetchedTenders);

        }
    }, [data]);
    if (loading) return <p>Loading articles...</p>;
    if (error) return <p>Error loading articles: {error.message}</p>;

    return (
        <Container>
            {/*<Filter />*/}
            <div>
                {tenders.map((tender, index) => (
                    <CardComponent article={tender} key={index} />
                ))}
            </div>
        </Container>
    )
}

export default Tenders

