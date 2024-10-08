import { GET_EGB_BY_SLUG } from '@/graphql/queries';
import PageRender from './page-render';
import apolloClient from '@/lib/apolloClient';
import { Metadata } from 'next';
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';

const getRichTextPlainText = (richText: any): string => {
    return documentToPlainTextString(richText);
};

export const generateMetadata = async ({ params }: { params: { slug: string; } }): Promise<Metadata> => {
    const { slug } = params;

    const { data } = await apolloClient.query({
        query: GET_EGB_BY_SLUG,
        variables: { slug },
    });

    const itemData = data?.egbCollection?.items[0];

    if (!itemData) {
        return {
            title: 'Not Found',
            description: 'The requested item was not found.',
        };
    }

    const { title, details, featuredImage, slug: itemSlug } = itemData;

    console.log(itemData)

    return {
        title: title,
        description: JSON.stringify(details),
        openGraph: {
            title: title,
            description: getRichTextPlainText(details.json),
            url: `https://zimeng.org/egb/${itemSlug}`,
            images: [
                {
                    url: featuredImage?.url ?? 'https://images.ctfassets.net/x9qfewrt309k/5i8P1UI9TGSpG8HEft8CT0/d062daa6b652a9d6534b2b83aab7b9e2/egb.jpeg',
                    alt: title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: title,
            description: getRichTextPlainText(details.json),
            images: [featuredImage?.url ?? 'https://images.ctfassets.net/x9qfewrt309k/5i8P1UI9TGSpG8HEft8CT0/d062daa6b652a9d6534b2b83aab7b9e2/egb.jpeg'],
        },
    };
};
const ItemPage = async ({ params }: { params: { slug: string; item: string } }) => {
    const { slug } = params;

    const { data } = await apolloClient.query({
        query: GET_EGB_BY_SLUG,
        variables: { slug },
    });

    return <PageRender data={data} />
}

export default ItemPage
