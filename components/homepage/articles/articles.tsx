import CardComponent from '@/components/card';
import Filter from '@/components/filter-component';
import Container from '@/components/ui-components/containter';
import { Article } from '@/utils/Types'
import React from 'react'

interface Props {
    articles: Article[];
}

const Articles: React.FC<Props> = ({ articles = [] }) => {
    return <>
        <Filter />
        <Container className='!p-0 grid grid-cols-1 lg:grid-cols-2 w-full gap-4'>

            {articles.map((article, index) => (
                <CardComponent article={article} key={index} />
            ))}
        </Container>
    </>
}
export default Articles
