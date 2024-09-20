
'use client'

import { useQuery } from "@apollo/client";
import { GET_ARTICLES } from "@/graphql/queries";
import { useEffect, useState } from "react";
import Container from "@/components/ui-components/containter";
import { Article } from "@/utils/Types";
import HeroCarousel from "@/components/homepage/hero-carousel";
import Articles from "@/components/homepage/articles";
import Sidebar from "@/components/homepage/sidebar";


export default function Home() {
  const { data, loading, error } = useQuery(GET_ARTICLES);
  const [articles, setArticles] = useState<Article[]>([]);
  const [heroArticles, setHeroArticles] = useState<Article[]>([]);

  useEffect(() => {
    if (data) {
      const fetchedArticles = data?.engineeringMagazineCollection?.items || [];
      setArticles(fetchedArticles);

      setHeroArticles(fetchedArticles.slice(0, 3));
    }
  }, [data]);

  if (loading) return <p>Loading articles...</p>;
  if (error) return <p>Error loading articles: {error.message}</p>;

  return (
    <Container className="min-h-[70vh] !py-0">

      <Container className="!p-0 grid grid-cols-1 md:grid-cols-7 md:gap-4">
        <div className="md:col-span-5 ">
          <HeroCarousel articles={heroArticles} />
          <Articles articles={articles} />
        </div>
        <div className="md:col-span-2">
          <Sidebar />
        </div>
      </Container>
    </Container>
  );
}