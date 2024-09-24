import { Job } from '@/utils/Types'
import React from 'react'
import Text from '../ui-components/text'
import Link from 'next/link'
import Container from '../ui-components/containter'
import { formatDate } from '@/utils/formatDate'

interface Props {
    job: Job
}

const JobCard = ({ job }: Props) => {
    console.log(job)
    return (
        <Link href={`/employment/${job.slug}`} className='bg-[#333333]'>
            <Container className='bg-gray-1 hover:bg-gray-2 relative'>
                <div className='flex justify-between items-center w-full'>
                    <Text variant='title5'>
                        {job.title}
                    </Text>
                    <Text variant='label1' additional='italic !text-[16px]'>
                        {formatDate(job.advertisedDate)}
                    </Text>
                </div>
                <div className='flex justify-start items-center gap-4 pt-4'>
                    <img src="/assets/images/company.svg" alt="" className='w-6 h-6' />
                    <Text variant='body2'>
                        {job.company}
                    </Text>
                </div>
                {job.location && <div className='flex justify-start items-center gap-4'>
                    <img src="/assets/images/category.svg" alt="" className='w-6 h-6' />
                    <Text variant='body2'>
                        {job.industry.join(', ')}
                    </Text>
                </div>}
                {job.location && <div className='flex justify-start items-center gap-4'>
                    <img src="/assets/images/location-pin.svg" alt="" className='w-6 h-6' />
                    <Text variant='body2'>
                        {job.location}
                    </Text>
                </div>}

                <div className='flex justify-start items-center gap-4'>
                    <img src="/assets/images/deadline.svg" alt="" className='w-6 h-6' />
                    <Text variant='body2'>
                        {formatDate(job.deadline)}
                    </Text>
                </div>
                <div className='absolute bottom-4 right-4 bg-brown text-white px-2 py-1 text-[14px]'>
                    {job.type}
                </div>
            </Container>
        </Link>
    )
}

export default JobCard
