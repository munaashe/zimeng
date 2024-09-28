'use client'

import Container from '@/components/ui-components/containter';
import { GET_EGB_BY_SLUG } from '@/graphql/queries';
import { Egb } from '@/utils/Types';
import { useQuery } from '@apollo/client';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { SkeletonLoader } from '../../[item]/skeleton-loader';
import Text from '@/components/ui-components/text';
import Image from 'next/image';
import RichText from '@/components/ui-components/rich-text';

const ItemPage = () => {
    const params = useParams();
    const { slug } = params;
    const { data, loading, error } = useQuery(GET_EGB_BY_SLUG, {
        variables: { slug },
    });
    const [item, setItem] = useState<Egb | null>(null)
    useEffect(() => {
        if (data) {
            const fetchedItem = data.egbCollection.items[0]
            setItem(fetchedItem)
        }
    }, [data])

    if (loading) return (
        <Container className="min-h-[70vh] mb-4 md:mb-12 !py-0">
            <SkeletonLoader />
        </Container>
    );
    return (
        <Container className=''>
            <div className='grid grid-cols-1 md:grid-cols-7 md:gap-4 h-full'>
                <div className='md:col-span-5'>
                    {item && <>
                        <Text variant='title4'>
                            {item.title}
                        </Text>
                        <Image
                            src={item.featuredImage.url}
                            alt={item.featuredImage.title}
                            width={100}
                            height={100}
                            className='mt-4 md:mt-8 h-[500px] w-auto'
                        />
                        <Container className='!pl-0'>
                            <RichText content={item.details} />

                        </Container>
                    </>}
                </div>
                <Container className='h-full w-full bg-gray-1 md:col-span-2 hidden md:block'>
                    sidebar
                </Container>
            </div>
        </Container>
    )
}

export default ItemPage
