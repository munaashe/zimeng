import { Article } from '@/utils/Types'
import Container from '@/components/ui-components/containter'
import Text from '@/components/ui-components/text'
import React from 'react'
import { formatDate } from '@/utils/formatDate'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import RichText from '@/components/ui-components/rich-text'
type Props = {
    article: Article
}

const ArticlePage = ({ article }: Props) => {
    const t = useTranslations();
    return (
        <Container className=''>
            <Text variant='title4'>
                {article.title}
            </Text>
            <div className='flex items-end justify-start gap-4'>
                <Text variant='label1' additional='italic !text-[16px] whitespace-nowrap mt-4'>
                    {formatDate(article.publishedDate)}
                </Text>
                <div className='bg-brown text-white px-2 py-1 text-[14px]'>
                    {article.category}
                </div>
            </div>
            <Image
                src={article.featuredImage.url}
                alt={article.featuredImage.url}
                width={100}
                height={100}
                className='mt-4 md:mt-8 h-[500px] w-auto'
            />
            <Text variant='label1' additional='italic !text-[16px] whitespace-nowrap my-4'>
                {t('by') + ' '} {article.author.name}
            </Text>
            <Container className='!pl-0'>
                <RichText content={article.description} />
            </Container>
        </Container>
    )
}

export default ArticlePage
