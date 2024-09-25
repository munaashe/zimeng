import Container from '@/components/ui-components/containter'
import Text from '@/components/ui-components/text'
import { Tender } from '@/utils/Types'
import React from 'react'

type Props = {
    tender: Tender
}

const TenderPage = ({ tender }: Props) => {
    return (
        <Container>
            <Text>
                {tender.title}
            </Text>
        </Container>
    )
}

export default TenderPage
