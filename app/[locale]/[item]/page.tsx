'use client';

import { GET_EVENTS, GET_JOBS, GET_TENDERS } from '@/graphql/queries';
import { Job, Tender, Event as EventType } from '@/utils/Types';
import { useQuery } from '@apollo/client';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const ItemsPage = () => {
    const pathname = usePathname();

    const [tenders, setTenders] = useState<Tender[]>([]);
    const [jobs, setJobs] = useState<Job[]>([]);
    const [events, setEvents] = useState<EventType[]>([]);

    // employment data
    const {
        data: jobsData,
        loading: jobsLoading,
        error: jobsLoadingError,
        refetch: refetchJobs,
    } = useQuery(GET_JOBS, { skip: pathname !== '/employment' });

    useEffect(() => {
        if (pathname === '/employment' && jobsData) {
            const fetchedJobs = jobsData?.jobCollection?.items || [];
            setJobs(fetchedJobs);
        }
    }, [jobsData, pathname]);

    // tenders data
    const {
        data: tendersData,
        loading: tendersLoading,
        error: tendersLoadingError,
        refetch: refetchTenders,
    } = useQuery(GET_TENDERS, { skip: pathname !== '/tenders' });

    useEffect(() => {
        if (pathname === '/tenders' && tendersData) {
            const fetchedTenders = tendersData?.tenderCollection?.items || [];
            setTenders(fetchedTenders);
        }
    }, [tendersData, pathname]);

    // events data
    const {
        data: eventsData,
        loading: eventsLoading,
        error: eventsLoadingError,
        refetch: refetchEvents,
    } = useQuery(GET_EVENTS, { skip: pathname !== '/events' });

    useEffect(() => {
        if (pathname === '/events' && eventsData) {
            const fetchedEvents = eventsData?.eventCollection?.items || [];
            setEvents(fetchedEvents);
        }
    }, [eventsData, pathname]);

    console.log(tenders)

    return (
        <div className='min-h-[78vh]'>
            {pathname === '/events' && <p>Events</p>}
            {pathname === '/tenders' && <p>Tenders</p>}
            {pathname === '/employment' && <p>Employment</p>}
        </div>
    );
};

export default ItemsPage;