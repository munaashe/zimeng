'use client';

import CardComponent from '@/components/card';
import JobsFilter from '@/components/jobs-filter';
import Container from '@/components/ui-components/containter';
import Text from '@/components/ui-components/text';
import { GET_JOBS, GET_TENDERS, GET_EVENTS, GET_OPPORTUNITIES, GET_ARTICLES_WITH_CATEGORIES } from '@/graphql/queries';
import { Job, Tender, Event as EventType, Opportunity } from '@/utils/Types';
import { DocumentNode, useQuery } from '@apollo/client';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState, useCallback, useRef } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { SkeletonLoader } from './skeleton-loader';

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
type QueryPaths = '/employment' | '/tenders' | '/events' | '/opportunities' | '/articles';

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
    const [hasMore, setHasMore] = useState(true);
    const [items, setItems] = useState<ItemsType>(initialState);
    const [jobFilterItems, setJobFilterItems] = useState<JobFilterItemsType>(filterInitialState);
    const [skip, setSkip] = useState(0);

    const queries: Partial<Record<QueryPaths, DocumentNode>> = {
        '/employment': GET_JOBS,
        '/tenders': GET_TENDERS,
        '/events': GET_EVENTS,
        '/opportunities': GET_OPPORTUNITIES,
        '/articles': GET_ARTICLES_WITH_CATEGORIES,
    };

    const query = queries[pathname as QueryPaths];

    const { data, loading, error, fetchMore, refetch } = query
        ? useQuery(query, {
            variables: { limit, skip },
            notifyOnNetworkStatusChange: true,
        })
        : { data: null, loading: false, error: null, fetchMore: null, refetch: () => Promise.resolve() };

    useEffect(() => {
        if (data) {
            const singularKeyMap: Record<string, string> = {
                employment: 'jobCollection',
                tenders: 'tenderCollection',
                events: 'eventCollection',
                opportunities: 'opportunityCollection',
                articles: 'magazineArticlesCollection'
            };

            const key = pathname === '/employment' ? 'employment' : pathname.slice(1);
            const singularKey = singularKeyMap[key] as string;

            const fetchedItems = data[`${singularKey}`]?.items || [];
            let fetchedIndustries: string[] = [];
            let fetchedTypes: string[] = [];
            if (pathname === '/employment') {
                fetchedIndustries = Array.from(new Set(data.industries?.items.flatMap((job: { industry: string[] }) => job.industry) || []));
                fetchedTypes = Array.from(new Set(data.types?.items.map((job: { type: string }) => job.type) || []));
            }

            setItems(prev => ({
                ...prev,
                dataItems: fetchedItems,
                industries: fetchedIndustries,
                jobTypes: fetchedTypes
            }));
        }
    }, [data, pathname]);

    useEffect(() => {
        setSkip(0); 
        refetch({
            limit,
            skip: 0,
            industry: jobFilterItems.industry || null,
            type: jobFilterItems.jobType || null,
        });
    }, [jobFilterItems, refetch]);

    const loadMoreItems = useCallback(() => {
        if (!fetchMore) return;

        fetchMore({
            variables: {
                limit,
                skip: items.dataItems.length,
            },
        }).then(({ data }) => {
            const singularKeyMap: Record<string, string> = {
                employment: 'jobCollection',
                tenders: 'tenderCollection',
                events: 'eventCollection',
                opportunities: 'opportunityCollection',
                articles: 'magazineArticlesCollection'
            };

            const key = pathname === '/employment' ? 'jobs' : pathname.slice(1);
            const singularKey = singularKeyMap[key] as string;
            const newItems = data?.[singularKey]?.items || [];

            if (newItems.length < limit) {
                setHasMore(false);
            }

            setItems(prev => ({
                ...prev,
                dataItems: [...prev.dataItems, ...newItems],
            }));
        });
    }, [fetchMore, items.dataItems.length, pathname]);

    if (loading && items.dataItems.length === 0) {
        return (
            <Container className="min-h-[70vh] mb-4 md:mb-12 !py-0">
                <SkeletonLoader />
            </Container>
        );
    }

    return (
        <Container className="min-h-[70vh] mb-4 md:mb-12 !py-0 !md:px-8">
            <Text>{t(pathname.slice(1))}</Text>

            {pathname === '/employment' && (
                <JobsFilter
                    industries={items.industries}
                    jobTypes={items.jobTypes}
                    filterItems={jobFilterItems}
                    onFilterChange={(type, value) => {
                        setJobFilterItems(prev => ({
                            ...prev,
                            [type]: value,
                        }));
                    }}
                />
            )}

            <InfiniteScroll
                dataLength={items.dataItems.length}
                next={loadMoreItems}
                hasMore={hasMore}
                loader={<Text variant="body2" additional="pt-4 md:pt-12 text-center !text-gray-300">{t('loading')}</Text>}
                endMessage={<Text variant="body2" additional="pt-4 md:pt-12 text-center !text-gray-300">{t('no more')}</Text>}
            >
                <Container className="!p-0 mt-4 grid grid-cols-1 lg:grid-cols-2 w-full gap-4">
                    {items.dataItems.map((article, index) => (
                        <CardComponent article={article} key={index} />
                    ))}
                </Container>
            </InfiniteScroll>
        </Container>
    );
};

export default ItemsPage;