export type Locale = "en" | "sh" | 'nd';

interface Author {
    __typename: string;
    name: string;
    qualification: string;
    jobTitle: string;
    picture: {
        url: string;
    };
}
interface FeaturedImage {
    __typename: string;
    url: string;
    title: string;
}
export interface Article {
    __typename: string;
    title: string;
    description: JSON;
    publishedDate: string;
    featuredImage: FeaturedImage;
    excerpt: string;
    slug: string;
    category: string;
    author: Author;
}