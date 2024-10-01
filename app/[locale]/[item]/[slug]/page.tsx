'use client';

import { DocumentNode, useQuery } from '@apollo/client';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  GET_JOB_BY_SLUG,
  GET_TENDER_BY_SLUG,
  GET_EVENT_BY_SLUG,
  GET_OPPORTUNITY_BY_SLUG,
  GET_SUGGESTED_JOBS,
  GET_SUGGESTED_ARTICLES,
  GET_ARTICLE_BY_SLUG,
} from '@/graphql/queries';
import { Job, Tender, Event, Opportunity, Article } from '@/utils/Types';
import Container from '@/components/ui-components/containter';
import Text from '@/components/ui-components/text';
import EventPage from './event';
import OpportunityPage from './opportunity';
import TenderPage from './tender';
import JobPage from './job';
import { SkeletonLoader } from '../skeleton-loader';
import CardComponent from '@/components/card';
import ArticlePage from './article';

type SingleItemType = {
  item: Job | Tender | Event | Opportunity | Article | null;
  suggestedItems: Job[] | Article[];
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

  const pathname = `/${item}` as QueryPaths;

  type QueryPaths = '/employment' | '/tenders' | '/events' | '/opportunities' | '/articles';

  const queries: Record<QueryPaths, DocumentNode> = {
    '/employment': GET_JOB_BY_SLUG,
    '/tenders': GET_TENDER_BY_SLUG,
    '/events': GET_EVENT_BY_SLUG,
    '/opportunities': GET_OPPORTUNITY_BY_SLUG,
    '/articles': GET_ARTICLE_BY_SLUG,
  };

  const suggestedQueries: Partial<Record<QueryPaths, DocumentNode>> = {
    '/employment': GET_SUGGESTED_JOBS,
    '/articles': GET_SUGGESTED_ARTICLES,
  };

  const query = queries[pathname as QueryPaths];
  const suggestedQuery = suggestedQueries[pathname as QueryPaths];

  const { data, loading, error } = query
    ? useQuery(query, {
      variables: { slug },
    })
    : { data: null, loading: false, error: null };

  const { data: suggestedData } = suggestedQuery
    ? useQuery(suggestedQuery, {
      variables: {
        industry: data?.jobCollection?.items[0]?.industry,
        slug: slug,
        type: data?.jobCollection?.items[0]?.type,
        category: data?.engineeringMagazineCollection?.items[0]?.category,
        limit: 2
      },
      skip: !data,
    })
    : { data: null };
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

  if (loading) return (
    <Container className="min-h-[70vh] mb-4 md:mb-12 !py-0">
      <SkeletonLoader />
    </Container>
  );
  if (error) return <div>Error loading item</div>;

  const { __typename } = itemData?.item || {};

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
  );
};

export default SingleItemPage;

