import CardComponent from '@/components/card';
import Container from '@/components/ui-components/containter';
import { Article } from '@/utils/Types'
import React from 'react'

interface Props {
    articles: Article[];
}

const Articles: React.FC<Props> = ({ articles = [] }) => {
    return (
        <Container className='!p-0 grid grid-cols-1 lg:grid-cols-2 w-full'>
            {articles.map((article) => (
                <CardComponent article={article} />
            ))}
        </Container>
    )
}

export default Articles
