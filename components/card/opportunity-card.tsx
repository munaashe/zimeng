import React from 'react'
import { Opportunity } from '@/utils/Types'
import Link from 'next/link';
import Container from '../ui-components/containter';
import Text from '../ui-components/text';
import { formatDate } from '@/utils/formatDate';

interface Props {
    opportunity: Opportunity;
}

const OpportunityCard = ({ opportunity }: Props) => {
    const {
        slug,
        title,
        deadline,
        institution
    } = opportunity || [];
    return (
        <Link href={`/opportunities/${slug}`} className='bg-[#333333]'>
            <Container className='bg-gray-1 hover:bg-gray-2 relative'>
                <Text variant='title5'>
                    {title}
                </Text>
                <div className='flex justify-start items-center gap-4 pt-4'>
                    <img src="/assets/images/company.svg" alt="" className='w-6 h-6' />
                    <Text variant='body2'>
                        {institution}
                    </Text>
                </div>

                <div className='flex justify-start items-center gap-4'>
                    <img src="/assets/images/deadline.svg" alt="" className='w-6 h-6' />
                    <Text variant='body2'>
                        {formatDate(deadline)}
                    </Text>
                </div>
            </Container>
        </Link>
    )
}

export default OpportunityCard
