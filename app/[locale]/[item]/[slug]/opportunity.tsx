import Container from '@/components/ui-components/containter'
import RichText from '@/components/ui-components/rich-text'
import Text from '@/components/ui-components/text'
import { formatDate } from '@/utils/formatDate'
import { Opportunity } from '@/utils/Types'
import React from 'react'
import { useTranslations } from 'next-intl'

type Props = {
    opportunity: Opportunity
}

const OpportunityPage = ({ opportunity }: Props) => {
    const t = useTranslations()
    return (
        <Container className=''>
            <Text variant='title3'>
                {opportunity.title}
            </Text>
            <div className='flex justify-start items-center gap-4 pt-4'>
                <img src="/assets/images/company.svg" alt="" className='w-6 h-6' />
                <Text variant='body2' weight='bold'>
                    {opportunity.institution}
                </Text>
            </div>

            <div className='flex justify-start items-center gap-4'>
                <img src="/assets/images/deadline.svg" alt="" className='w-6 h-6' />
                <Text variant='body2' weight='bold'>
                    {formatDate(opportunity.deadline)}
                </Text>
            </div>
            <Text variant='title5' additional='mt-8 md:mt-12'>
                {t('details')}
            </Text>
            <RichText content={opportunity.description} />
        </Container>
    )
}

export default OpportunityPage
