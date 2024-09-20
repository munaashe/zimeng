import { Article } from '@/utils/Types'
import React from 'react'
import Slider from 'react-slick';
import Image from 'next/image';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Text from '@/components/ui-components/text';
import { formatDate } from '@/utils/formatDate';
import Link from 'next/link';


type Props = {
    articles: Article[];
}


const NextArrow = ({ onClick }: { onClick?: () => void }) => (
    <div className="slick-arrow slick-next" onClick={onClick}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
    </div>
);

const PrevArrow = ({ onClick }: { onClick?: () => void }) => (
    <div className="slick-arrow slick-prev" onClick={onClick}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
    </div>
);



const HeroCarousel: React.FC<Props> = ({ articles }) => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    };

    return (
        <div className="hero-carousel !p-0 !m-0">
            <Slider {...settings}>
                {articles.map((article, index) => (
                    <Link href={`/articles/${article.slug}`} key={index} className="relative w-full h-[480px] lg:h-[540px] -mt-4">
                        <Image
                            src={article.featuredImage.url}
                            alt={article.featuredImage.title}
                            layout="fill"
                            objectFit="cover"
                            className="rounded-md"
                        />
                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white transition-opacity duration-500 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 hover:opacity-100">
                            <Text variant='title1' color='white' additional='p-4 lg:p-12 pb-0 !opacity-100 !text-white'>
                                {article.title}
                            </Text>
                            <Text color='white' variant='body2' additional="transition-opacity duration-500 opacity-80 hover:opacity-100 lg:text-right w-full p-4">
                                {formatDate(article.publishedDate)}
                            </Text>
                        </div>
                    </Link>
                ))}
            </Slider>
        </div>
    );
};
export default HeroCarousel;