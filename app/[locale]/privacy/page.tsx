'use client'

import Container from '@/components/ui-components/containter';
import RichText from '@/components/ui-components/rich-text';
import { GET_PAGE_DATA } from '@/graphql/queries';
import { useQuery } from '@apollo/client';
import React, { useState, useEffect } from 'react'

const Privacy = () => {
    const { data, loading, error } = useQuery(GET_PAGE_DATA, {
        variables: { slug: 'privacy' },
    });
    const [item, setItem] = useState<{ title: string; slug: string; details: JSON } | null>(null)
    useEffect(() => {
        if (data) {
            const fetchedItem = data.pageCollection.items[0]
            setItem(fetchedItem)
        }
    }, [data])
    return (
        <div className='flex justify-center  min-h-[78vh]'>
            <Container className='w-full md:w-2/3'>
                <RichText content={item?.details} />
            </Container>
        </div>
    )
}

export default Privacy
