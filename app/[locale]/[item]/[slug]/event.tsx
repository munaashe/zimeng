import React from 'react'
import { Event } from '@/utils/Types'
import Container from '@/components/ui-components/containter';
import Text from '@/components/ui-components/text';
import RichText from '@/components/ui-components/rich-text';
import { formatDate } from '@/utils/formatDate';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

type Props = {
    event: Event;
}

const EventPage = ({ event }: Props) => {
    const t = useTranslations()
    const [day, month] = formatDate(event.date).split(' ');
    console.log(event)
    return (
        <Container className=''>
            <div className='flex justify-between items-center'>
                <div>
                    <Text variant='title4'>
                        {event.title}
                    </Text>
                    <div className='flex justify-start items-center gap-4 pt-2'>
                        <img src="/assets/images/location-pin.svg" alt="" className='w-6 h-6' />
                        <Text variant='body2'>
                            {event.venue}
                        </Text>
                    </div>
                </div>
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
            </div>
            {event.poster && <Image src={event.poster.url} alt={event.title} height={200} width={200} className='h-[520px] w-auto mt-8' />}
            <Text variant='title5' additional='mt-8 md:mt-12'>
                {t('details')}
            </Text>
            <RichText content={event.description} />
            <Text variant='title5' additional='mt-8 md:mt-12'>
                {t('reservations')}
            </Text>
            <RichText content={event.rsvp} />
        </Container>
    )
}

export default EventPage
