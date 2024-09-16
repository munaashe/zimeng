
'use client'

import { useQuery } from "@apollo/client";
import client from "@/apollo-cient";
import { GET_ARTICLES } from "@/graphql/queries";

export default function Home() {
  /*const { loading, error, data } = useQuery(GET_ARTICLES, { client });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  console.log(data)*/
  return (
    <main className="min-h-[70vh]">
      here we go
    </main>
  );
}
