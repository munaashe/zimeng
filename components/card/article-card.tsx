import { Article, Event } from '@/utils/Types'
import React from 'react'
import Container from '../ui-components/containter';
import Image from 'next/image';
import Link from 'next/link';
import Text from '../ui-components/text';
import { formatDate } from '@/utils/formatDate';

type Props = {
    article: Article;
}

const ArticleCard = ({ article }: Props) => {
    const {
        title = '',
        publishedDate = '',
        featuredImage,
        slug = '',
        category = '',
        author
    } = article || []
    const truncateText = (text: string, maxLength: number) => {
        return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
    };

    return (
        <Link href={`/articles/${slug}`} className='hover:opacity-[95%]'>
            <Container className='!p-0 bg-gray-1 hover:bg-gray-2'>
                <Image
                    src={featuredImage.url}
                    alt={title}
                    height={100}
                    width={100}
                    className='h-[230px] w-full object-cover'
                />
                <div className='p-2 pt-4'>
                    <Text variant='title5' additional='!h-[70px]' color='black'>
                        {truncateText(title, 80)}
                    </Text>
                    <div className='flex justify-between items-center pt-4 w-full'>
                        <div className='flex justify-start items-center gap-2 w-full'>
                            <img
                                src={author.picture.url}
                                alt={author.name}
                                className='rounded-full w-[40px] h-[40px] object-cover'
                            />
                            <Text variant='body2'>
                                {author.name}
                            </Text>
                        </div>
                        <Text variant='body2' additional='whitespace-nowrap'>
                            {formatDate(publishedDate)}
                        </Text>
                    </div>
                </div>
            </Container>
        </Link>
    )
}

export default ArticleCard
