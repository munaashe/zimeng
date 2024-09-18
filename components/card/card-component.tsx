import { Article } from '@/utils/Types'
import React from 'react'
import Container from '../ui-components/containter';

interface Props {
    article: Article;
}

const CardComponent = ({ article }: Props) => {
    return (
        <Container className='!p-0' key={article.slug}>
            card component
        </Container>
    )
}

export default CardComponent
