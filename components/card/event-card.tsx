import { Event } from '@/utils/Types'
import React from 'react'
import { formatDate } from '@/utils/formatDate'
import Container from '../ui-components/containter';
import Text from '../ui-components/text';
import Link from 'next/link';

type Props = {
    event: Event;
}

const EventCard = ({ event }: Props) => {
    const {
        date,
        title,
        venue,
        slug,
    } = event || [];
    const [day, month] = formatDate(date).split(' ');
    return (
        <Link href={`/events/${slug}`}>
            <Container className='bg-gray-1 hover:bg-gray-2 !px-2'>
                <div className='grid grid-cols-7 gap-4'>
                    <div
                        className="bg-cover bg-center h-[120px] !w-[140px] flex items-center justify-end flex-col col-span-2"
                        style={{ backgroundImage: `url('/assets/images/calendar.svg')` }}
                    >
                        <Text variant='title4'>
                            {day}
                        </Text>
                        <Text variant='body2' additional='uppercase !text-[14px]'>
                            {month}
                        </Text>
                    </div>
                    <Text variant='title5' additional='col-span-5 ml-4 !h-full flex items-center' >
                        {title}
                    </Text>
                </div>
                <div className='flex justify-start items-center gap-4 pt-8'>
                    <img src="/assets/images/location-pin.svg" alt="" className='w-6 h-6' />
                    <Text variant='body2'>
                        {venue}
                    </Text>
                </div>
            </Container>
        </Link>
    )
}

export default EventCard
