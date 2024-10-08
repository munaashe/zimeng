import { DocumentNode } from 'graphql';
import {
  GET_JOB_BY_SLUG,
  GET_TENDER_BY_SLUG,
  GET_EVENT_BY_SLUG,
  GET_OPPORTUNITY_BY_SLUG,
  GET_SUGGESTED_JOBS,
  GET_SUGGESTED_ARTICLES,
  GET_ARTICLE_BY_SLUG,
} from '@/graphql/queries';
import PageRender from './page-render';
import apolloClient from '@/lib/apolloClient';
import { Metadata } from 'next';
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';

// Type for query paths
type QueryPaths = '/employment' | '/tenders' | '/events' | '/opportunities' | '/articles';

// Define the queries outside the component to avoid repetition
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

const getRichTextPlainText = (richText: any): string => {
  return documentToPlainTextString(richText);
};


// Generate metadata for SEO
export const generateMetadata = async ({ params }: { params: { slug: string; item: string } }): Promise<Metadata> => {
  const { slug, item } = params;
  const pathname = `/${item}` as QueryPaths;

  const query = queries[pathname];

  // Fetch the data for the metadata generation
  const { data } = await apolloClient.query({
    query,
    variables: { slug },
  });

  const singularKeyMap: Record<string, string> = {
    employment: 'jobCollection',
    tenders: 'tenderCollection',
    events: 'eventCollection',
    opportunities: 'opportunityCollection',
    articles: 'engineeringMagazineCollection',
  };

  const key = pathname.slice(1);
  const singularKey = singularKeyMap[key];
  const itemData = data?.[singularKey]?.items[0];

  if (!itemData) {
    return {
      title: 'Not Found',
      description: 'The requested item was not found.',
    };
  }

  // Destructure fields from the fetched data
  const { title, featuredImage, slug: itemSlug, poster } = itemData;

  let description = '';
  let imageUrl = featuredImage?.url;

  // Handle description and image URL based on the item type
  switch (item) {
    case 'employment': // Jobs: Use description in rich text format
      description = getRichTextPlainText(itemData.qualifications?.json);
      break;
    case 'tenders': // Tenders: Use details in rich text format
      description = getRichTextPlainText(itemData.details?.json);
      break;
    case 'events': // Events: Use description and poster for image
      description = getRichTextPlainText(itemData.description?.json);
      imageUrl = poster?.url ?? 'https://images.ctfassets.net/x9qfewrt309k/27XpWIwqZ5QjJw069l12RF/de152f627be2c5f294c5ee3b75c8276e/WhatsApp_Image_2024-09-28_at_21.19.53.jpeg'
      break;
    case 'opportunities': // Opportunities: Use description in rich text format
      description = getRichTextPlainText(itemData.description?.json);
      break;
    case 'articles': // Articles: Use excerpt field directly
      description = itemData.excerpt;
      break;
    default:
      description = 'No description available.';
  }

  const truncatedDescription = description?.length > 160 ? `${description.substring(0, 157)}...` : description;

  let prefixedTitle = title;
  switch (item) {
    case 'employment':
      prefixedTitle = `Job: ${title}`;
      break;
    case 'tenders':
      prefixedTitle = `Tender: ${title}`;
      break;
    case 'events':
      prefixedTitle = `Event: ${title}`;
      break;
    case 'opportunities':
      prefixedTitle = `Opportunity: ${title}`;
      break;
  }

  // Return the metadata with the relevant information

  console.log(truncatedDescription)
  return {
    title: prefixedTitle,
    description: truncatedDescription,
    openGraph: {
      title: prefixedTitle,
      description: truncatedDescription,
      url: `https://zimeng.org/${item}/${itemSlug}`,
      images: [
        {
          url: imageUrl || 'https://images.ctfassets.net/x9qfewrt309k/27XpWIwqZ5QjJw069l12RF/de152f627be2c5f294c5ee3b75c8276e/WhatsApp_Image_2024-09-28_at_21.19.53.jpeg',
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: prefixedTitle,
      description: truncatedDescription,
      images: [imageUrl || 'https://images.ctfassets.net/x9qfewrt309k/27XpWIwqZ5QjJw069l12RF/de152f627be2c5f294c5ee3b75c8276e/WhatsApp_Image_2024-09-28_at_21.19.53.jpeg'],
    },
  };
};

const SingleItemPage = async ({ params }: { params: { slug: string; item: string } }) => {
  const { slug, item } = params;
  const pathname = `/${item}` as QueryPaths;

  const query = queries[pathname];
  const suggestedQuery = suggestedQueries[pathname];

  const { data } = await apolloClient.query({
    query,
    variables: { slug },
  });

  const suggestedData = suggestedQuery
    ? await apolloClient.query({
      query: suggestedQuery,
      variables: {
        industry: data?.jobCollection?.items[0]?.industry,
        slug: slug,
        type: data?.jobCollection?.items[0]?.type,
        category: data?.engineeringMagazineCollection?.items[0]?.category,
        limit: 2,
      },
    })
    : { data: null };

  return <PageRender data={data} suggestedData={suggestedData} pathname={pathname} />;
};

export default SingleItemPage;