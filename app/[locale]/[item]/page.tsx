'use client';


import CardComponent from '@/components/card';
import Sidebar from '@/components/homepage/sidebar';
import JobsFilter from '@/components/jobs-filter';
import Container from '@/components/ui-components/containter';
import Text from '@/components/ui-components/text';
import { GET_EVENTS, GET_JOBS, GET_TENDERS, GET_OPPORTUNITIES } from '@/graphql/queries';
import { Job, Tender, Event as EventType, Opportunity } from '@/utils/Types';
import { DocumentNode, useQuery } from '@apollo/client';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

type ItemsType = {
    dataItems: DataItems;
    industries: string[];
    jobTypes: string[];
}

const initialState: ItemsType = {
    dataItems: [],
    industries: [],
    jobTypes: [],
}

type DataItems = Tender[] | Job[] | EventType[] | Opportunity[]

export type JobFilterItemsType = {
    industry: string | null;
    jobType: string | null;
}

const filterInitialState: JobFilterItemsType = {
    industry: null,
    jobType: null
}

const ItemsPage = () => {
    const pathname = usePathname();
    const t = useTranslations('item page');
    const limit = 10;

    const [items, setItems] = useState<ItemsType>(initialState);
    const [jobFilterItems, setJobFilterItems] = useState<JobFilterItemsType>(filterInitialState)

    type QueryPaths = '/employment' | '/tenders' | '/events' | '/opportunities';

    const queries: Record<QueryPaths, DocumentNode> = {
        '/employment': GET_JOBS,
        '/tenders': GET_TENDERS,
        '/events': GET_EVENTS,
        '/opportunities': GET_OPPORTUNITIES,
    };

    const { data, loading, error, refetch } = pathname in queries
        ? useQuery(queries[pathname as QueryPaths])
        : { data: null, loading: false, error: null, refetch: () => Promise.resolve() };

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
                const updatedItems = { ...prev, dataItems: fetchedItems };

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

    const { data: jobsData, loading: jobsLoading, fetchMore: fetchmoreJobs, refetch: refetchJobs } = useQuery(GET_JOBS, {
        variables: { limit, skip: 0, industry: jobFilterItems?.industry || null, type: jobFilterItems?.jobType || null },
        notifyOnNetworkStatusChange: true,
    });
    useEffect(() => {
        if (data && pathname === '/employment') {
            const fetchedItems = jobsData?.jobCollection?.items || [];
            setItems((prev) => ({
                ...prev,
                dataItems: fetchedItems
            }))
        }
    }, [jobsData, pathname])



    const onFilterChange = (type: 'jobType' | 'industry', value: string | null) => {
        setJobFilterItems((prev) => ({
            ...prev,
            [type]: value,
        }));

        refetchJobs({
            skip: 0,
            industry: jobFilterItems.industry || null,
            type: jobFilterItems.jobType || null,
        })
            .then(({ data }) => {
                const refetchedJobs = data?.jobCollection?.items || [];
                setItems((prev) => ({
                    ...prev,
                    dataItems: refetchedJobs,
                }));
            })
            .catch((error) => {
                console.error("Error refetching jobs:", error);
            });
    };
    if (loading && items.dataItems.length === 0) {
        return (
            <Container className="min-h-[70vh] mb-4 md:mb-12 !py-0">
                <SkeletonLoader />
            </Container>
        );
    }

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
                    {pathname === '/employment' &&
                        <JobsFilter
                            industries={items.industries}
                            jobTypes={items.jobTypes}
                            filterItems={jobFilterItems}
                            onFilterChange={onFilterChange}
                        />}

                    <Container className="!p-0 mt-4 grid grid-cols-1 lg:grid-cols-2 w-full gap-4">
                        {items?.dataItems?.map((article, index) => (
                            <CardComponent article={article} key={index} />
                        ))}
                    </Container>
                </div>
            </Container>
        </Container>
    );
};

export default ItemsPage;

const SkeletonLoader = () => {
    return (
        <Container className="min-h-[70vh] mb-4 md:mb-12">
            <div className="grid grid-cols-1 md:grid-cols-7 md:gap-4">

                <div className="hidden md:block md:col-span-2">
                    <div className="space-y-4">
                        <div className="w-full h-60 bg-gray-200 rounded animate-pulse"></div>
                        <div className="w-full h-60 bg-gray-200 rounded animate-pulse"></div>
                        <div className="w-full h-60 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                </div>
                <div className="md:col-span-5 space-y-8">
                    <div className="w-1/2 h-20 bg-gray-300 rounded-md mb-4 animate-pulse"></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[...Array(4)].map((_, index) => (
                            <div key={index} className="">
                                <div className="bg-gray-1 hover:bg-gray-2 relative p-4 mb-4 animate-pulse">
                                    <div className="flex justify-between items-center w-full mb-4">
                                        <div className="w-3/4 h-6 bg-gray-300 rounded-md animate-pulse"></div>
                                        <div className="w-1/4 h-4 bg-gray-300 rounded-md animate-pulse"></div>
                                    </div>
                                    <div className="flex justify-start items-center gap-4 mb-4">
                                        <div className="w-6 h-6 bg-gray-300 rounded-full animate-pulse"></div>
                                        <div className="w-1/2 h-4 bg-gray-300 rounded-md animate-pulse"></div>
                                    </div>
                                    <div className="flex justify-start items-center gap-4 mb-4">
                                        <div className="w-6 h-6 bg-gray-300 rounded-full animate-pulse"></div>
                                        <div className="w-1/2 h-4 bg-gray-300 rounded-md animate-pulse"></div>
                                    </div>
                                    <div className="flex justify-start items-center gap-4 mb-4">
                                        <div className="w-6 h-6 bg-gray-300 rounded-full animate-pulse"></div>
                                        <div className="w-1/2 h-4 bg-gray-300 rounded-md animate-pulse"></div>
                                    </div>
                                    <div className="absolute bottom-4 right-4 bg-gray-300 text-transparent px-2 py-1 text-[14px] w-16 h-6 rounded-md animate-pulse"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Container>
    );
};