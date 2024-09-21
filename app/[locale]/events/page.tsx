'use client'

import React from 'react'
import { useQuery } from "@apollo/client";
import { GET_EVENTS } from "@/graphql/queries";
import { useEffect, useState } from "react";
import { Event } from '@/utils/Types';
import Container from '@/components/ui-components/containter';
import Filter from '@/components/filter-component';
import CardComponent from '@/components/card';

const Events = () => {
    const { data, loading, error } = useQuery(GET_EVENTS);
    const [events, setEvents] = useState<Event[]>([]);

    useEffect(() => {
        if (data) {
            const fetchedEvents = data?.eventCollection?.items || [];
            setEvents(fetchedEvents);

        }
    }, [data]);
    console.log(events)
    if (loading) return <p>Loading articles...</p>;
    if (error) return <p>Error loading articles: {error.message}</p>;

    return (
        <Container>
            {/*<Filter />*/}
            <div>
                {events.map((event, index) => (
                    <CardComponent article={event} key={index} />
                ))}
            </div>
        </Container>
    )
}

export default Events
