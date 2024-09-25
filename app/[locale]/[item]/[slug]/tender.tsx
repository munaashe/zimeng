import Container from '@/components/ui-components/containter'
import RichText from '@/components/ui-components/rich-text'
import Text from '@/components/ui-components/text'
import { formatDate } from '@/utils/formatDate'
import { Tender } from '@/utils/Types'
import { useTranslations } from 'next-intl'
import React from 'react'

type Props = {
    tender: Tender
}

const TenderPage = ({ tender }: Props) => {
    const t = useTranslations()
    return (
        <Container className='min-h-[78vh]'>
            <Text variant='title3'>
                {tender.title}
            </Text>
            <div className='flex justify-start items-center gap-4 pt-4'>
                <img src="/assets/images/company.svg" alt="" className='w-6 h-6' />
                <Text variant='body2' weight='bold'>
                    {tender.institution}
                </Text>
            </div>
            <div className='flex justify-start items-center gap-4 pt-2'>
                <img src="/assets/images/deadline.svg" alt="" className='w-6 h-6' />
                <Text variant='body2'>
                    {formatDate(tender.deadline)}
                </Text>
            </div>
            <Text variant='title4' additional='mt-8 md:mt-12'>
                {t('details')}
            </Text>
            <RichText content={tender.details} />
            <Text variant='title4' additional='mt-8 md:mt-12'>
                {t('bid')}
            </Text>
            <RichText content={tender.bid} />
        </Container>
    )
}

export default TenderPage
