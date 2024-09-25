import React from 'react'
import { Event } from '@/utils/Types'

type Props = {
    event: Event;
}

const EventPage = ({ event }: Props) => {
    return (
        <div>
            Event here
        </div>
    )
}

export default EventPage
