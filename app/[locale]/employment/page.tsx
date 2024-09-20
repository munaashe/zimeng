'use client'

import React from 'react'
import { useQuery } from "@apollo/client";
import { GET_JOBS } from "@/graphql/queries";
import { useEffect, useState } from "react";
import { Event, Job } from '@/utils/Types';
import Container from '@/components/ui-components/containter';
import Filter from '@/components/filter-component';
import CardComponent from '@/components/card';

const Employment = () => {
    const { data, loading, error } = useQuery(GET_JOBS);
    const [jobs, setJobs] = useState<Job[]>([])

    useEffect(() => {
        if (data) {
            const fetchedJobs = data?.jobCollection?.items || [];
            setJobs(fetchedJobs);

        }
    }, [data]);
    if (loading) return <p>Loading articles...</p>;
    if (error) return <p>Error loading articles: {error.message}</p>;
    return (
        <Container>
            <Filter />
            <div>
                {jobs.map((job, index) => (
                    <CardComponent article={job} key={index} />
                ))}
            </div>
        </Container>
    )
}

export default Employment


