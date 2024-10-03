'use client'

import CardComponent from '@/components/card';
import { Job, Opportunity, Tender, Article, Event } from '@/utils/Types';
import { __typename } from 'graphql-request/alpha/schema';
import React, { useState, useEffect } from 'react'
import ArticlePage from './article';
import EventPage from './event';
import JobPage from './job';
import OpportunityPage from './opportunity';
import TenderPage from './tender';
import Text from '@/components/ui-components/text';
import Container from '@/components/ui-components/containter';
import { useTranslations } from 'next-intl';
import { SkeletonLoader } from '../skeleton-loader';

type Props = {
    pathname: string;
    data: any;
    suggestedData: any;
}
export type SingleItemType = {
    item: Job | Tender | Event | Opportunity | Article | null;
    suggestedItems: Job[] | Article[];
};

const initialState: SingleItemType = {
    item: null,
    suggestedItems: [],
};

const PageRender = ({ data, pathname, suggestedData }: Props) => {
    const [itemData, setItemData] = useState<SingleItemType>(initialState);
    const t = useTranslations('item page');
    useEffect(() => {
        if (data) {
            const singularKeyMap: Record<string, string> = {
                employment: 'jobCollection',
                tenders: 'tenderCollection',
                events: 'eventCollection',
                opportunities: 'opportunityCollection',
                articles: 'engineeringMagazineCollection',
            };

            const key = pathname.slice(1);
            const singularKey = singularKeyMap[key];

            const fetchedItem = data[`${singularKey}`]?.items[0] || null;
            const fetchedSuggestions = suggestedData?.[`suggested${singularKey}`]?.items || [];


            setItemData({
                item: fetchedItem,
                suggestedItems: fetchedSuggestions,
            });
        }
    }, [data, suggestedData, pathname]);

    useEffect(() => {
        if (suggestedData) {
            const singularKeyMap: Record<string, string> = {
                employment: 'jobCollection',
                articles: 'engineeringMagazineCollection',
            };
            const key = pathname.slice(1);
            const singularKey = singularKeyMap[key];
            const fetchedSuggestions = suggestedData?.[singularKey]?.items || [];
            setItemData((prev) => ({
                ...prev,
                suggestedItems: fetchedSuggestions
            }))
        }
    }, [suggestedData])
    const { __typename } = itemData?.item || {};
    if (!itemData?.item) return (
        <Container className="min-h-[70vh] mb-4 md:mb-12 !py-0">
            <SkeletonLoader />
        </Container>
    );
    return (
        <Container className='min-h-[78vh]'>
            {__typename === 'Job' && <JobPage job={itemData?.item as Job} />}
            {__typename === 'Event' && <EventPage event={itemData?.item as Event} />}
            {__typename === 'Opportunity' && <OpportunityPage opportunity={itemData?.item as Opportunity} />}
            {__typename === 'Tender' && <TenderPage tender={itemData?.item as Tender} />}
            {__typename === 'EngineeringMagazine' && <ArticlePage article={itemData?.item as Article} />}

            {itemData?.suggestedItems.length > 0 && <Container>
                <Text variant='title5' additional='mt-8 md:mt-12'>
                    {t('related')}
                </Text>

                <Container className="!p-0 mt-4 grid grid-cols-1 lg:grid-cols-2 w-full gap-4">
                    {itemData?.suggestedItems?.map((article, index) => (
                        <CardComponent article={article} key={index} />
                    ))}
                </Container>
            </Container>}
        </Container>
    )
}

export default PageRender
