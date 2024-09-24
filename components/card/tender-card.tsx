import { Tender } from '@/utils/Types'
import Link from 'next/link';
import React from 'react'
import Container from '../ui-components/containter';
import Text from '../ui-components/text';
import { formatDate } from '@/utils/formatDate';

interface Props {
    tender: Tender;
}

const TenderCard = ({ tender }: Props) => {
    const {
        title,
        slug,
        deadline,
        institution
    } = tender || [];
    return (
        <Link href={`/tenders/${slug}`} className='bg-[#333333]'>
            <Container className='bg-gray-1 hover:bg-gray-2 relative'>
                <div className='flex justify-between items-center w-full'>
                    <Text variant='title5'>
                        {title}
                    </Text>
                </div>
                <div className='flex justify-start items-center gap-4 pt-4'>
                    <img src="/assets/images/company.svg" alt="" className='w-6 h-6' />
                    <Text variant='body2'>
                        {institution}
                    </Text>
                </div>
                <div className='flex justify-start items-center gap-4 pt-2'>
                    <img src="/assets/images/deadline.svg" alt="" className='w-6 h-6' />
                    <Text variant='body2'>
                        {formatDate(deadline)}
                    </Text>
                </div>
            </Container>
        </Link>
    )
}

export default TenderCard
