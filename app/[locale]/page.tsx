
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
  const [articles, setArticles] = useState<Article[]>([])

  useEffect(() => {
    if (data) {
      setArticles(data?.engineeringMagazineCollection?.items)
    }
  }, [data])


  if (loading) return <p>Loading articles...</p>;
  if (error) return <p>Error loading articles: {error.message}</p>;
  return (
    <Container className="min-h-[70vh]">
      <HeroCarousel />
      <Container className="!p-0 mt-2 grid grid-cols-1 md:grid-cols-3 md:gap-4">
        <div className="md:col-span-2">
          <Articles articles={articles} />
        </div>
        <Sidebar />
      </Container>
    </Container>
  );
}
