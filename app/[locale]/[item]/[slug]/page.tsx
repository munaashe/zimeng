'use client'

import { DocumentNode, useQuery } from '@apollo/client';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  GET_JOB_BY_SLUG,
  GET_TENDER_BY_SLUG,
  GET_EVENT_BY_SLUG,
  GET_OPPORTUNITY_BY_SLUG,
} from '@/graphql/queries';
import { Tender, Job, Opportunity, Event } from '@/utils/Types';
import Container from '@/components/ui-components/containter';
import EventPage from './event';
import OpportunityPage from './opportunity';
import TenderPage from './tender';
import JobPage from './job';
import { SkeletonLoader } from '../skeleton-loader';

type SingleItemType = {
  item: Tender | Job | Event | Opportunity | null;
  suggestedItems: any[];
};

const initialState: SingleItemType = {
  item: null,
  suggestedItems: [],
};

const SingleItemPage = () => {
  const params = useParams();
  const { slug, item } = params;
  const t = useTranslations('item page');

  const [itemData, setItemData] = useState<SingleItemType>(initialState);

  const pathname = `/${item}`;
  type QueryPaths = '/employment' | '/tenders' | '/events' | '/opportunities';

  const queries: Record<QueryPaths, DocumentNode> = {
    '/employment': GET_JOB_BY_SLUG,
    '/tenders': GET_TENDER_BY_SLUG,
    '/events': GET_EVENT_BY_SLUG,
    '/opportunities': GET_OPPORTUNITY_BY_SLUG,
  };

  const { data, loading, error } = pathname in queries
    ? useQuery(queries[pathname as QueryPaths], {
      variables: { slug },
    })
    : { data: null, loading: false, error: null };

  useEffect(() => {
    if (data) {
      const singularKeyMap: Record<string, string> = {
        employment: 'jobCollection',
        tenders: 'tenderCollection',
        events: 'eventCollection',
        opportunities: 'opportunityCollection',
      };

      const key = pathname.slice(1);
      const singularKey = singularKeyMap[key];

      const fetchedItem = data[`${singularKey}`]?.items[0] || null;
      const fetchedSuggestions = data[`suggested${singularKey}`]?.items || [];

      setItemData({
        item: fetchedItem,
        suggestedItems: fetchedSuggestions,
      });
    }
  }, [data, pathname]);

  if (loading) return (
    <Container className="min-h-[70vh] mb-4 md:mb-12 !py-0">
      <SkeletonLoader />
    </Container>
  );
  if (error) return <div>error</div>;
  const {
    __typename
  } = itemData?.item || {};


  return (
    <Container className='min-h-[78vh]'>
      <div className='grid grid-cols-1 md:grid-cols-7 md:gap-4'>
        <div className='md:col-span-5'>
          {__typename === 'Event' && <EventPage event={itemData?.item as Event} />}
          {__typename === 'Opportunity' && <OpportunityPage opportunity={itemData?.item as Opportunity} />}
          {__typename === 'Tender' && <TenderPage tender={itemData?.item as Tender} />}
          {__typename === 'Job' && <JobPage job={itemData?.item as Job} />}
        </div>
        <Container className='h-full w-full bg-gray-1 md:col-span-2 hidden md:block'>
          sidebar
        </Container>
      </div>
    </Container>
  );
};

export default SingleItemPage;


