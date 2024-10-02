import { ReactNode } from 'react';

interface Props {
    children: ReactNode;
    params: { item: string };
}

export async function generateMetadata({ params }: Props) {
    const { item } = params;

    let title = 'Zim Engineering Community';
    let description =
        'Connecting innovators, engineers, and tech enthusiasts in Zimbabwe. Join us to collaborate, learn, and shape the future together!';
    let keywords =
        'Zimbabwe, engineering, technology, community, collaboration, innovation, engineers, tech enthusiasts, learning, networking, Zim Engineering';
    let imageUrl = 'https://images.ctfassets.net/x9qfewrt309k/27XpWIwqZ5QjJw069l12RF/de152f627be2c5f294c5ee3b75c8276e/WhatsApp_Image_2024-09-28_at_21.19.53.jpeg'
    let pageUrl = `https://zimeng/${item}`;

    switch (item) {
        case 'events':
            title = 'Upcoming Engineering Events';
            description =
                'Explore upcoming events in the Zimbabwean engineering community, from conferences to workshops.';
            keywords = 'events, Zimbabwe, engineering, workshops, conferences';
            break;
        case 'tenders':
            title = 'Engineering Tenders in Zimbabwe';
            description =
                'Stay updated with the latest engineering tenders and opportunities in Zimbabwe.';
            keywords = 'tenders, engineering, Zimbabwe, opportunities';
            break;
        case 'employment':
            title = 'Engineering Jobs in Zimbabwe';
            description =
                'Find the latest engineering job opportunities and career prospects in Zimbabwe.';
            keywords = 'jobs, employment, engineering, Zimbabwe, careers';
            break;
        case 'opportunities':
            title = 'Engineering Opportunities for Zimbabweans';
            description =
                'Find the latest engineering opportunities and prospects in Zimbabwe.';
            keywords = 'scholarships, grants, engineering, Zimbabwe, academics, researches';
            break;
        default:
            break;
    }

    return {
        title,
        description,
        keywords,
        openGraph: {
            title,
            description,
            url: pageUrl,
            type: 'website',
            images: [
                {
                    url: imageUrl,
                    width: 800,
                    height: 600,
                    alt: 'Zim Engineering Logo',
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            image: imageUrl,
        },
    };
}

export default function Layout({ children }: Props) {
    return <>{children}</>;
}