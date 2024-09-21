'use client';

import { useQuery } from "@apollo/client";
import { GET_ARTICLES_WITH_CATEGORIES } from "@/graphql/queries";
import { useEffect, useState, useCallback, useRef } from "react";
import Container from "@/components/ui-components/containter";
import { Article, Category } from "@/utils/Types";
import HeroCarousel from "@/components/homepage/hero-carousel";
import Articles from "@/components/homepage/articles";
import Sidebar from "@/components/homepage/sidebar";
import InfiniteScroll from 'react-infinite-scroll-component';
import Text from "@/components/ui-components/text";

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [heroArticles, setHeroArticles] = useState<Article[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [skip, setSkip] = useState(0);
  const limit = 10;

  const { data, loading, error, fetchMore, refetch } = useQuery(GET_ARTICLES_WITH_CATEGORIES, {
    variables: { limit, skip: 0, category: selectedCategory?.category || null },
    notifyOnNetworkStatusChange: true,
  });

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (data && isFirstRender.current) {
      const fetchedArticles = data.engineeringMagazineCollection?.items || [];
      const fetchedCategories = data.categories?.items || [];

      setArticles(fetchedArticles);
      setCategories(fetchedCategories);
      setHeroArticles(fetchedArticles.slice(0, 3));

      isFirstRender.current = false;
    }
  }, [data]);

  const loadMoreArticles = useCallback(() => {
    fetchMore({
      variables: {
        limit,
        skip: articles.length,
        category: selectedCategory?.category || null,
      },
    }).then(({ data }) => {
      const newArticles = data?.engineeringMagazineCollection?.items || [];
      if (newArticles.length < limit) {
        setHasMore(false);
      }
      setArticles((prevArticles) => [...prevArticles, ...newArticles]);
    });
  }, [articles.length, fetchMore, selectedCategory]);

  const handleCategorySelect = (category: Category | null) => {
    setSelectedCategory(category);
    setSkip(0);
    setHasMore(true);
    refetch({
      limit,
      skip: 0,
      category: category?.category || null,
    }).then(({ data }) => {
      const refetchedArticles = data?.engineeringMagazineCollection?.items || [];
      setArticles(refetchedArticles);
    }).catch((error) => {
      console.error("Error refetching articles:", error);
    });
  };

  if (loading && articles.length === 0) {
    return <p>Loading articles...</p>;
  }

  if (error) {
    return <p>Error loading articles: {error.message}</p>;
  }

  // Main render
  return (
    <Container className="min-h-[70vh] mb-4 md:mb-12 !py-0">
      <Container className="!p-0 grid grid-cols-1 md:grid-cols-7 md:gap-4">
        <div className="md:col-span-5 ">
          <HeroCarousel articles={heroArticles} />
          <InfiniteScroll
            dataLength={articles.length}
            next={loadMoreArticles}
            hasMore={hasMore}
            loader={<p>Loading more articles...</p>}
            endMessage={<Text variant="body2" additional="pt-4 md:pt-12 text-center !text-gray-300">No more articles to load</Text>}
          >
            <Articles
              articles={articles}
              categories={categories}
              selectedCategory={selectedCategory}
              onCategorySelect={handleCategorySelect}
            />
          </InfiniteScroll>
        </div>
        <div className="md:col-span-2">
          <Sidebar />
        </div>
      </Container>
    </Container>
  );
}