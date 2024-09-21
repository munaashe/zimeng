import React, { useState, useMemo } from 'react';
import CardComponent from '@/components/card';
import Filter from '@/components/filter-component';
import Container from '@/components/ui-components/containter';
import { Article, Category } from '@/utils/Types';

interface Props {
    articles: Article[];
    categories: Category[];
    onCategorySelect: (category: Category | null) => void;
    selectedCategory: Category | null;
}



const Articles: React.FC<Props> = ({ articles = [], categories = [], selectedCategory, onCategorySelect = () => { } }) => {



    return (
        <>
            <Filter categories={categories} onCategorySelect={onCategorySelect} selectedCategory={selectedCategory} />
            <Container className="!p-0 grid grid-cols-1 lg:grid-cols-2 w-full gap-4">
                {articles.map((article, index) => (
                    <CardComponent article={article} key={index} />
                ))}
            </Container>
        </>
    );
};

export default Articles;