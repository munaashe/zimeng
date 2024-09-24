import { Article, Event, Job, Opportunity, Tender } from '@/utils/Types';
import React from 'react';
import Container from '../ui-components/containter';
import ArticleCard from './article-card';
import EventCard from './event-card';
import JobCard from './job-card';
import TenderCard from './tender-card';
import OpportunityCard from './opportunity-card';

interface Props {
    article: Article | Event | Job | Tender | Opportunity;
}

// Helper function to determine the type of the article
const getArticleType = (article: Article | Event | Job | Tender | Opportunity): 'Article' | 'Event' | 'Job' | 'Tender' | 'Opportunity' | null => {
    switch (article.__typename) {
        case 'EngineeringMagazine':
            return 'Article';
        case 'Event':
            return 'Event';
        case "Job":
            return 'Job';
        case "Tender":
            return 'Tender';
        case "Opportunity":
            return 'Opportunity'
        default:
            return null;
    }
};

const CardComponent = ({ article }: Props) => {
    const articleType = getArticleType(article);

    return (
        <Container className='!p-0'>
            {articleType === 'Article' && <ArticleCard article={article as Article} />}
            {articleType === 'Event' && <EventCard event={article as Event} />}
            {articleType === 'Job' && <JobCard job={article as Job} />}
            {articleType === 'Tender' && <TenderCard tender={article as Tender} />}
            {articleType === 'Opportunity' && <OpportunityCard opportunity={article as Opportunity} />}
        </Container>
    );
};

export default CardComponent;