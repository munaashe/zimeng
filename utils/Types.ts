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

export interface Event {
    __typename: string;
    title: string;
    date: string;
    venue: string;
    slug: string;
    description: JSON;
    rsvp: JSON;
    poster: FeaturedImage
};

export interface Job {
    __typename: string;
    title: string;
    company: string;
    type: string;
    industry: string | null;
    location: string;
    advertisedDate: string;
    deadline: string;
    qualifications: JSON;
    responsibilities: JSON;
    slug: string;
    apply: JSON;
}

export interface Tender {
    __typename: "Tender";
    title: string;
    slug: string;
    deadline: string;
    institution: string;
    details: {
        __typename: "TenderDetails";
        json: any;
    };
    bid: {
        __typename: "TenderBid";
        json: any;
    };
}