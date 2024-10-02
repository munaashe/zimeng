import Container from '@/components/ui-components/containter'
import { Egb } from '@/utils/Types'
import Link from 'next/link'
import Image from 'next/image'
import Text from '@/components/ui-components/text'
import React from 'react'
interface Props {
    item: Egb
}

const ItemCard = ({ item }: Props) => {
    return (
        <Link href={`/egb/${item.slug}`}>
            <Container className='!p-0 grid grid-cols-1 sm:grid-cols-3 bg-gray-1 hover:bg-gray-2 !sm:h-[220px] gap-4 md:gap-8'>
                <div className='flex items-center justify-center'>
                    <Image
                        alt=''
                        src={item.featuredImage.url}
                        width={100}
                        height={220}
                        objectFit='contain'
                        className='h-[220px] w-auto object-cover'
                    />
                </div>
                <Container className='sm:col-span-2'>
                    <Text variant='title5' additional=''>
                        {item.title}
                    </Text>
                    <Text variant='body2' additional='mt-4'>
                        {item.excerpt}
                    </Text>
                </Container>
            </Container>
        </Link>
    )
}

export default ItemCard
