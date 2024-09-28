'use client'

import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client';
import { GET_EGB } from '@/graphql/queries';
import { Egb } from '@/utils/Types';
import Container from '@/components/ui-components/containter';
import Text from '@/components/ui-components/text';
import Image from 'next/image';
import RichText from '@/components/ui-components/rich-text';
import Banner from './banner';
import { useTranslations } from 'next-intl';
import ItemCard from './item-card';
import { SkeletonLoader } from '../[item]/skeleton-loader';

const filterItems = (items: Egb[]) => {
    const message = items.find(item => item.type === 'message') || null;
    const projects = items.filter(item => item.type === 'project');
    const reports = items.filter(item => item.type === 'report');
    return { message, projects, reports };
};

const GivingBack = () => {
    const { data, loading, error } = useQuery(GET_EGB);
    const [egbData, setEgbData] = useState<{ message: Egb | null; projects: Egb[]; reports: Egb[] }>({
        message: null,
        projects: [],
        reports: []
    });
    const t = useTranslations('egb');

    useEffect(() => {
        if (data?.egbCollection?.items) {
            setEgbData(filterItems(data.egbCollection.items));
        }
    }, [data]);

    if (loading) return (
        <Container className="min-h-[70vh] mb-4 md:mb-12 !py-0">
            <SkeletonLoader />
        </Container>
    );

    if (error) return <p>Error loading data</p>;

    return (
        <Container className='grid grid-cols-1 lg:grid-cols-7 gap-4 md:gap-8 lg:gap-12'>
            <div className='lg:col-span-5'>
                <Banner />
                {egbData.projects.length > 0 && (
                    <>
                        <Text variant='title4' additional='md:mt-8 my-4'>
                            {t('projects')}
                        </Text>
                        <div className='grid grid-cols-1 w-full gap-4 md:gap-8'>
                            {egbData.projects.map((project, index) => (
                                <ItemCard item={project} key={index} />
                            ))}
                        </div>
                    </>
                )}

                {egbData.reports.length > 0 && (
                    <>
                        <Text variant='title4' additional='md:mt-8 my-4'>
                            {t('reports')}
                        </Text>
                        <div className='grid grid-cols-1  w-full gap-4 md:gap-8'>
                            {egbData.reports.map((report, index) => (
                                <ItemCard item={report} key={index} />
                            ))}
                        </div>
                    </>
                )}
            </div>

            {/* Fixed Sidebar */}
            <div className='hidden lg:block lg:col-span-2 !py-0'>
                <div className="sticky top-0 h-[100vh] flex flex-col justify-start items-start overflow-hidden">
                    <Text variant='title5' additional=''>
                        {egbData.message?.title}
                    </Text>
                    <Image
                        src={egbData.message?.featuredImage.url!}
                        alt={egbData.message?.featuredImage.title || ''}
                        width={400}
                        height={400}
                        className='h-[300px] w-auto object-contain'
                    />
                    <RichText content={egbData.message?.details} />
                </div>
            </div>
        </Container>
    );
}

export default GivingBack;