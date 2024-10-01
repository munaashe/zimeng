'use client'

import SideFooter from '@/components/side-footer';
import Container from '@/components/ui-components/containter'
import Text from '@/components/ui-components/text';
import { GET_ADS, } from '@/graphql/queries';
import { Ad } from '@/utils/Types';
import { useQuery } from '@apollo/client';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const Sidebar = () => {
    const { data, loading, error } = useQuery(GET_ADS);
    const [ads, setAds] = useState<Ad[]>([])
    useEffect(() => {
        if (data) {
            const fetchedItem = data.adCollection.items
            setAds(fetchedItem)
        }
    }, [data])
    const t = useTranslations()
    return (
        <Container className='hidden md:block h-full w-full bg-gray-1 flex flex-col justify-center items-center'>
            <div className="sticky top-0 flex flex-col justify-start items-start ">
                {ads.length > 0 && <Text variant='body2' additional='italic ml-4'>
                    {t('sponsored')}
                </Text>}
                <div className='flex flex-col items-center justify-center w-full'>
                    {ads.map((ad) => (
                        <Link href={ad.link} target='_blank' className='my-4'>
                            <Image
                                src={ad.poster.url}
                                alt=''
                                width={100}
                                height={100}
                                className='max-h-[350px] min-w-[280px] h-full w-auto object-contain my-4 rounded'
                            />
                        </Link>
                    ))}
                </div>
                <SideFooter />
            </div>
        </Container>
    )
}

export default Sidebar
