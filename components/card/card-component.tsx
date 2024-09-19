import { Article } from '@/utils/Types'
import React from 'react'
import Container from '../ui-components/containter';
import ArticleCard from './article-card';

interface Props {
    article: Article;
}

const CardComponent = ({ article }: Props) => {
    const {
        __typename = '',
        title = '',
        description,
        publishedDate = '',
        featuredImage,
        excerpt = '',
        slug = '',
        category = '',
        author
    } = article || []
    return (
        <Container className='!p-0'>
            {__typename === 'EngineeringMagazine' && <ArticleCard article={article}/>}
        </Container>
    )
}

export default CardComponent
