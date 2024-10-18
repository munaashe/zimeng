'use client'

import { useTranslations } from 'next-intl';
import React, { useState } from 'react'
import Container from '../ui-components/containter';
import { JobFilterItemsType } from '@/app/[locale]/[item]/page';

interface Props {
    industries: string[];
    jobTypes: string[];
    filterItems: JobFilterItemsType
    onFilterChange: (type: 'jobType' | 'industry', value: string | null) => void;
}

const JobsFilter = ({ industries = [], jobTypes = [], filterItems, onFilterChange }: Props) => {
    const [selectedTab, setSelectedTab] = useState<'industries' | 'job types'>('industries')
    const [filtersOpen, setFiltersOpen] = useState<boolean>(false)
    const t = useTranslations()

    return (
        <div className='mt-8 '>
            <div className='flex justify-start items-end w-full gap-2'>
                <div className={`px-2 flex justify-center items-center gap-4 py-4 cursor-pointer duration-300 ${filtersOpen ? 'bg-gray-2 hover:bg-gray-2 text-stone-800' : 'bg-brown hover:bg-green-500 text-white '}`}
                    onClick={() => setFiltersOpen(!filtersOpen)}
                >
                    {/* Filter Toggle Icon */}
                    <svg width="30px" height="30px" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                        <g id="Layer_2">
                            <g id="icons_Q2">
                                <path d="M24,7.7,29.3,16H18.6L24,7.7M24,2a2.1,2.1,0,0,0-1.7,1L13.2,17a2.3,2.3,0,0,0,0,2,1.9,1.9,0,0,0,1.7,1H33a2.1,2.1,0,0,0,1.7-1,1.8,1.8,0,0,0,0-2l-9-14A1.9,1.9,0,0,0,24,2Z" fill={`${filtersOpen ? '#292524' : 'white'}`} />
                                <path d="M43,43H29a2,2,0,0,1-2-2V27a2,2,0,0,1,2-2H43a2,2,0,0,1,2,2V41A2,2,0,0,1,43,43ZM31,39H41V29H31Z" fill={`${filtersOpen ? '#292524' : '#ffffff'}`} />
                                <path d="M13,28a6,6,0,1,1-6,6,6,6,0,0,1,6-6m0-4A10,10,0,1,0,23,34,10,10,0,0,0,13,24Z" fill={`${filtersOpen ? '#292524' : '#ffffff'}`} />
                            </g>
                        </g>
                    </svg>
                    <div className='font-semibold text-[20px]'>
                        {t('filters')}
                    </div>
                    <svg className={`${filtersOpen ? 'rotate-180' : ''}`} fill="#000000" width="20px" height="20px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.125 16.313l7.688-7.688 3.594 3.719-11.094 11.063-11.313-11.313 3.5-3.531z" fill={`${filtersOpen ? '#292524' : 'white'}`} />
                    </svg>
                </div>

                {filtersOpen && <>
                    {/* Industry and Job Type Tab Selector */}
                    <div className={`flex justify-center items-center gap-2 p-2 cursor-pointer duration-300 text-white ${selectedTab === 'industries' ? 'bg-green-500 hover:bg-green-700' : 'bg-brown hover:bg-[#6F401F]'}`}
                        onClick={() => setSelectedTab('industries')}
                    >
                         <svg fill="#ffffff" height='20px' width='25px' viewBox="0 -35.58 122.88 122.88" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff">
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                            <g id="SVGRepo_iconCarrier"> <style type="text/css"></style>
                                <g>
                                    <path className="st0" d="M16.55,3.48c0.57-4.79,7.86-4.47,7.86,0v1.01c5.29,10.8,15.2,16.77,26.06,19c5.66,1.17,11.59,1.32,17.27,0.63 c5.67-0.69,11.08-2.23,15.7-4.46c7.2-3.47,12.5-8.59,13.91-14.73V3.48c0.57-4.79,7.86-4.47,7.86,0v2.4 c2.18,4.3,5.17,7.74,8.52,10.51c2.87,2.37,6.01,4.28,9.15,5.83v2.98c-1.16-0.55-2.33-1.13-3.48-1.77v9.1h3.48v4.59h-17.67v14.62 h-7.86V37.11H24.41v14.62h-7.86V37.11H0v-4.59h2.91v-9.4C1.95,23.67,0.97,24.18,0,24.67v-3.01c2.75-1.45,5.47-3.17,7.97-5.26 c3.39-2.84,6.39-6.36,8.58-10.79V3.48L16.55,3.48z M66.73,26.93v5.59h-2.69v-5.38c-2.04,0.11-4.09,0.11-6.15,0v5.38h-2.69v-5.6 c-1.77-0.18-3.53-0.45-5.27-0.81c-0.32-0.07-0.64-0.13-0.95-0.21v6.61h-2.69v-7.3c-2.11-0.6-4.16-1.35-6.15-2.25v9.55h-2.69V21.64 c-2.2-1.19-4.29-2.59-6.22-4.2v15.08h-2.69V14.96c-1.51-1.54-2.9-3.24-4.14-5.1v22.67h72.95V11.58c-1.08,1.66-2.41,3.21-3.96,4.65 v16.29H90.7V18.44c-1.84,1.35-3.89,2.57-6.09,3.63l-0.13,0.06v10.39h-2.69v-9.2c-1.96,0.79-4.02,1.47-6.15,2.03v7.18h-2.69v-6.54 c-1.6,0.34-3.24,0.61-4.89,0.81C67.62,26.84,67.18,26.89,66.73,26.93L66.73,26.93z M111.88,18.34v14.19h4.83V21.84 c-1.61-1.01-3.18-2.14-4.69-3.39L111.88,18.34L111.88,18.34z M109.19,32.53V15.87c-1.43-1.45-2.77-3.03-3.98-4.78v21.43H109.19 L109.19,32.53z M13.11,15.21v17.32h3.44V10.91C15.5,12.47,14.34,13.89,13.11,15.21L13.11,15.21z M10.42,32.53V17.82 c-0.24,0.21-0.49,0.43-0.74,0.63C8.37,19.55,7,20.56,5.6,21.48v11.05H10.42L10.42,32.53z"></path>
                                </g>
                            </g>
                        </svg>
                        <div className='font-semibold text-[18px] hidden md:block'>
                            {t('industries')}
                        </div>
                    </div>
                    <div className={`flex justify-center items-center gap-2 p-2 cursor-pointer duration-300 text-white ${selectedTab === 'job types' ? 'bg-green-500 hover:bg-green-700' : 'bg-brown hover:bg-[#6F401F]'}`}
                        onClick={() => setSelectedTab('job types')}
                    >
                           <svg viewBox="0 0 24 24" width='25px' height='20px' fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff">
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                                <path d="M8.75 13.5C10.2869 13.5 11.5747 14.5668 11.9131 16.0003L21.25 16C21.6642 16 22 16.3358 22 16.75C22 17.1297 21.7178 17.4435 21.3518 17.4932L21.25 17.5L11.9129 17.5007C11.5741 18.9337 10.2866 20 8.75 20C7.21345 20 5.92594 18.9337 5.58712 17.5007L2.75 17.5C2.33579 17.5 2 17.1642 2 16.75C2 16.3703 2.28215 16.0565 2.64823 16.0068L2.75 16L5.58688 16.0003C5.92534 14.5668 7.21309 13.5 8.75 13.5ZM15.25 4C16.7869 4 18.0747 5.06682 18.4131 6.50034L21.25 6.5C21.6642 6.5 22 6.83579 22 7.25C22 7.6297 21.7178 7.94349 21.3518 7.99315L21.25 8L18.4129 8.00066C18.0741 9.43368 16.7866 10.5 15.25 10.5C13.7134 10.5 12.4259 9.43368 12.0871 8.00066L2.75 8C2.33579 8 2 7.66421 2 7.25C2 6.8703 2.28215 6.55651 2.64823 6.50685L2.75 6.5L12.0869 6.50034C12.4253 5.06682 13.7131 4 15.25 4Z" fill="#ffffff"></path>
                            </g>
                        </svg>
                        <div className='font-semibold text-[18px] whitespace-nowrap hidden md:block'>
                            {t('job types')}
                        </div>
                    </div>
                </>}
            </div>

            {/* Industries and Job Types */}
            {filtersOpen && <>
                {selectedTab === 'industries' && (
                    <Container className='w-full bg-gray-2 flex flex-wrap gap-4'>
                        <div onClick={() => onFilterChange('industry', null)}
                            className={`p-2 bg-brown text-white text-[14px] md:text-[16px] font-semibold cursor-pointer ${filterItems.industry === null ? 'bg-green-500 hover:bg-green-700' : 'hover:bg-[#653b1e]'}`}>
                            {t('all')}
                        </div>
                        {industries.map((industry, index) => (
                            <div key={index} onClick={() => onFilterChange('industry', industry)}
                                className={`p-2 bg-brown text-white text-[14px] md:text-[16px] font-semibold cursor-pointer ${filterItems.industry === industry ? 'bg-green-500 hover:bg-green-700' : 'hover:bg-[#653b1e]'}`}>
                                {industry?.charAt(0).toUpperCase() + industry?.slice(1)}
                            </div>
                        ))}
                    </Container>
                )}

                {selectedTab === 'job types' && (
                    <Container className='w-full bg-gray-2 flex flex-wrap gap-4'>
                        <div onClick={() => onFilterChange('jobType', null)}
                            className={`p-2 bg-brown text-white text-[14px] md:text-[16px] font-semibold cursor-pointer ${filterItems.jobType === null ? 'bg-green-500 hover:bg-green-700' : 'hover:bg-[#653b1e]'}`}>
                            {t('all')}
                        </div>
                        {jobTypes.map((job, index) => (
                            <div key={index} onClick={() => onFilterChange('jobType', job)}
                                className={`p-2 bg-brown text-white text-[14px] md:text-[16px] font-semibold cursor-pointer ${filterItems.jobType === job ? 'bg-green-500 hover:bg-green-700' : 'hover:bg-[#653b1e]'}`}>
                                {job?.charAt(0).toUpperCase() + job?.slice(1)}
                            </div>
                        ))}
                    </Container>
                )}
            </>}
        </div>
    )
}

export default JobsFilter