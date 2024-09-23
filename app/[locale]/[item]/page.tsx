'use client';

import Sidebar from '@/components/homepage/sidebar';
import Container from '@/components/ui-components/containter';
import Text from '@/components/ui-components/text';
import { GET_EVENTS, GET_JOBS, GET_TENDERS, GET_OPPORTUNITIES } from '@/graphql/queries';
import { Job, Tender, Event as EventType, Opportunity } from '@/utils/Types';
import { DocumentNode, useQuery } from '@apollo/client';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

type ItemsType = {
    tenders: Tender[];
    jobs: Job[];
    events: EventType[];
    opportunities: Opportunity[];
    industries: string[];
    jobTypes: string[];
}

const initialState: ItemsType = {
    tenders: [],
    jobs: [],
    events: [],
    opportunities: [],
    industries: [],
    jobTypes: [],
}

const ItemsPage = () => {
    const pathname = usePathname();
    const t = useTranslations('item page');

    const [items, setItems] = useState<ItemsType>(initialState)

    type QueryPaths = '/employment' | '/tenders' | '/events' | '/opportunities';

    const queries: Record<QueryPaths, DocumentNode> = {
        '/employment': GET_JOBS,
        '/tenders': GET_TENDERS,
        '/events': GET_EVENTS,
        '/opportunities': GET_OPPORTUNITIES,
    };

    const { data, loading, error } = pathname in queries ? useQuery(queries[pathname as QueryPaths]) : { data: null, loading: false, error: null };

    useEffect(() => {
        if (data) {
            const singularKeyMap: Record<string, string> = {
                employment: 'jobCollection',
                tenders: 'tenderCollection',
                events: 'eventCollection',
                opportunities: 'opportunityCollection',
            };

            const key = pathname === '/employment' ? 'jobs' : pathname.slice(1);
            const singularKey = singularKeyMap[key] as string;

            const fetchedItems = data[`${singularKey}`]?.items || [];

            setItems(prev => {
                const updatedItems = { ...prev, [key]: fetchedItems };
                if (key === 'jobs') {
                    const fetchedIndustries: string[] = Array.from(
                        new Set(
                            data.industries?.items.flatMap((job: { industry: string[] }) => job.industry) || []
                        )
                    );
                    const fetchedJobTypes: string[] = Array.from(
                        new Set(
                            data.types?.items.map((job: { type: string }) => job.type) || []
                        )
                    );

                    updatedItems.industries = fetchedIndustries;
                    updatedItems.jobTypes = fetchedJobTypes;
                }

                return updatedItems;
            });
        }
    }, [data, pathname]);
    useEffect(() => {
        if (data && pathname === '/employment') {
            const fetchedItems = data?.jobCollection?.items || [];
            setItems((prev) => ({
                ...prev,
                jobs: fetchedItems
            }))
        }
    }, [data, pathname])

    return (
        <Container className="min-h-[70vh] mb-4 md:mb-12 !py-0">
            <Container className="grid grid-cols-1 md:grid-cols-7 md:gap-4">
                <div className="hidden md:block md:col-span-2">
                    <Sidebar />
                </div>
                <div className="md:col-span-5">
                    <Text>
                        {t(pathname.slice(1))}
                    </Text>
                    <div>
                        Filter here
                    </div>
                </div>
            </Container>
        </Container>
    );
};

export default ItemsPage;