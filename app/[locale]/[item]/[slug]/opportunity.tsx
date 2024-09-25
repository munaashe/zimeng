import Container from '@/components/ui-components/containter'
import Text from '@/components/ui-components/text'
import { Opportunity } from '@/utils/Types'
import React from 'react'

type Props = {
    opportunity: Opportunity
}

const OpportunityPage = ({ opportunity }: Props) => {
    return (
        <Container>
            <Text>
                {opportunity.title}
            </Text>
        </Container>
    )
}

export default OpportunityPage
