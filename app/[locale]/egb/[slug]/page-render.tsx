'use client'

import React, { useState, useEffect } from 'react'
import Text from '@/components/ui-components/text';
import Image from 'next/image';
import RichText from '@/components/ui-components/rich-text';
import Container from '@/components/ui-components/containter';
import { Egb } from '@/utils/Types';
import { SkeletonLoader } from '../../[item]/skeleton-loader';

type Props = {
    data: any
}

const PageRender = ({ data }: Props) => {
    const [item, setItem] = useState<Egb | null>(null)
    useEffect(() => {
        if (data) {
            const fetchedItem = data.egbCollection.items[0]
            setItem(fetchedItem)
        }
    }, [data])
    if (!item) return (
        <Container className="min-h-[70vh] mb-4 md:mb-12 !py-0">
            <SkeletonLoader />
        </Container>
    );
    return (
        <Container className=''>
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
        </Container>
    )
}

export default PageRender
