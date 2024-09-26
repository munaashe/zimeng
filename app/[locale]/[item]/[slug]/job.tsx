import Container from '@/components/ui-components/containter'
import RichText from '@/components/ui-components/rich-text'
import Text from '@/components/ui-components/text'
import { formatDate } from '@/utils/formatDate'
import { Job } from '@/utils/Types'
import { useTranslations } from 'next-intl'
import React from 'react'

type Props = {
    job: Job
}

const JobPage = ({ job }: Props) => {
    const t = useTranslations()

    return (
        <Container className='min-h-[78vh]'>
            <div className='flex justify-between items-center w-full'>
                <Text variant='title3'>
                    {job.title}
                </Text>
                <Text variant='label1' additional='italic !text-[16px]'>
                    {formatDate(job.advertisedDate)}
                </Text>
            </div>
            <div className='flex justify-start items-center gap-4 pt-4'>
                <img src="/assets/images/company.svg" alt="" className='w-6 h-6' />
                <Text variant='body2' weight='bold'>
                    {job.company}
                </Text>
            </div>
            <div className='flex justify-start items-center gap-4 pt-2'>
                <img src="/assets/images/deadline.svg" alt="" className='w-6 h-6' />
                <Text variant='body2'>
                    {formatDate(job.deadline)}
                </Text>
            </div>
            <div className='flex justify-start items-center gap-4'>
                <img src="/assets/images/category.svg" alt="" className='w-6 h-6' />
                <Text variant='body2'>
                    {job.industry.join(', ')}

                </Text>
                <div className='bg-brown text-white px-2 py-1 text-[14px] ml-8'>
                    {job.type}
                </div>
            </div>
            <Text variant='title4' additional='mt-8 md:mt-12'>
                {t('responsibilities')}
            </Text>
            <RichText content={job.responsibilities} />
            <Text variant='title4' additional='mt-8 md:mt-12'>
                {t('qualifications')}
            </Text>
            <RichText content={job.qualifications} />
            <Text variant='title4' additional='mt-8 md:mt-12'>
                {t('apply')}
            </Text>
            <RichText content={job.apply} />
        </Container>
    )
}

export default JobPage
