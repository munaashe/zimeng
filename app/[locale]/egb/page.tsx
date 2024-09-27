'use client'

import React, { useEffect, useState } from 'react'
import { GetStaticProps } from 'next';
import { GET_EGB } from '@/graphql/queries';
import { useQuery } from '@apollo/client';
import { Egb } from '@/utils/Types';
import Container from '@/components/ui-components/containter';
import Text from '@/components/ui-components/text';
import Image from 'next/image';
import RichText from '@/components/ui-components/rich-text';
import Banner from './banner';

const filterItems = (items: Egb[]) => {
    const message = items.find(item => item.type === 'message') || null;
    const projects = items.filter(item => item.type === 'projects');
    const reports = items.filter(item => item.type === 'reports');
    return { message, projects, reports };
};


const GivingBack = () => {
    const { data, loading, error } = useQuery(GET_EGB);
    const [egbData, setEgbData] = useState<{ message: Egb | null; projects: Egb[]; reports: Egb[] }>({
        message: null,
        projects: [],
        reports: []
    });

    useEffect(() => {
        if (data?.egbCollection?.items) {
            setEgbData(filterItems(data.egbCollection.items));
        }
    }, [data]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading data</p>;
    return (
        <Container className='grid grid-cols-1 md:grid-cols-7 gap-4'>
            <div className='md:col-span-5'>
                <Banner />
            </div>
            <Container className='hidden md:block md:col-span-2 !py-0'>
                <Text variant='title5' additional=''>
                    {egbData.message?.title}
                </Text>
                <Image
                    src={egbData.message?.featuredImage.url!}
                    alt=''
                    width={400}
                    height={400}
                    className='h-[300px]  w-auto object-contain'
                />
                <RichText content={egbData.message?.details} />
            </Container>
        </Container>
    )
}

export default GivingBack
