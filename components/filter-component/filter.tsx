'use client'

import React, { useEffect, useRef, useState } from 'react'
import Container from '../ui-components/containter'
import { Category } from '@/utils/Types';
import Button from '../ui-components/button';
import { useTranslations } from 'next-intl';

interface Props {
    categories?: Category[];
    onCategorySelect?: (category: Category | null) => void;
    selectedCategory: Category | null;
}

const Filter = ({ categories = [], onCategorySelect = () => { }, selectedCategory }: Props) => {
    const [categoriesOpen, setCategoriesOpen] = useState<boolean>(false)
    const t = useTranslations()

    const containerRef = useRef<HTMLDivElement | null>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
            setCategoriesOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    return (
        <Container className='!p-0 my-8 md:my-12' ref={containerRef}>
            <div className={`max-w-[240px]  flex justify-center items-center gap-4 py-4 cursor-pointer duration-300 ${categoriesOpen ? 'bg-gray-2 hover:bg-gray-2 text-stone-800' : 'bg-brown hover:bg-green-500 text-white '}`}
                onClick={() => setCategoriesOpen(!categoriesOpen)}
            >
                <svg width="30px" height="30px" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                    <g id="Layer_2">
                        <g id="invisible_box">
                            <rect width="48" height="48" fill="none" />
                        </g>
                        <g id="icons_Q2">
                            <path d="M24,7.7,29.3,16H18.6L24,7.7M24,2a2.1,2.1,0,0,0-1.7,1L13.2,17a2.3,2.3,0,0,0,0,2,1.9,1.9,0,0,0,1.7,1H33a2.1,2.1,0,0,0,1.7-1,1.8,1.8,0,0,0,0-2l-9-14A1.9,1.9,0,0,0,24,2Z" fill={`${categoriesOpen ? '#292524' : 'white'}`} />
                            <path d="M43,43H29a2,2,0,0,1-2-2V27a2,2,0,0,1,2-2H43a2,2,0,0,1,2,2V41A2,2,0,0,1,43,43ZM31,39H41V29H31Z" fill={`${categoriesOpen ? '#292524' : 'white'}`} />
                            <path d="M13,28a6,6,0,1,1-6,6,6,6,0,0,1,6-6m0-4A10,10,0,1,0,23,34,10,10,0,0,0,13,24Z" fill={`${categoriesOpen ? '#292524' : 'white'}`} />
                        </g>
                    </g>
                </svg>
                <div className='font-semibold text-[20px]'>
                    {t('categories')}
                </div>
                <svg className={`${categoriesOpen ? 'rotate-180' : ''}`} fill="#000000" width="20px" height="20px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.125 16.313l7.688-7.688 3.594 3.719-11.094 11.063-11.313-11.313 3.5-3.531z" fill={`${categoriesOpen ? '#292524' : 'white'}`} />
                </svg>
            </div>
            {categoriesOpen && <Container className='w-full bg-gray-2 flex gap-4'>
                <div onClick={() => onCategorySelect(null)}
                    className={`p-2 bg-brown  text-white text-[14px] md:text-[16px] font-semibold cursor-pointer ${selectedCategory === null ? 'bg-green-500 hover:bg-green-700' : 'hover:bg-[#653b1e]'}`}>
                    {t('all')}
                </div>
                {categories.map((category, index) => (
                    <div key={index} onClick={() => onCategorySelect(category)}
                        className={`p-2 bg-brown  text-white text-[14px] md:text-[16px] font-semibold cursor-pointer ${selectedCategory?.category === category.category ? 'bg-green-500 hover:bg-green-700' : 'hover:bg-[#653b1e]'}`}>
                        {category?.category?.charAt(0).toUpperCase() + category?.category?.slice(1)}
                    </div>

                ))}
            </Container>}
        </Container>
    )
}

export default Filter



