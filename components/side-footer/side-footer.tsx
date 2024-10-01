import React from 'react'
import Container from '../ui-components/containter'
import { useTranslations } from 'next-intl';
import Link from 'next/link';

const SideFooter = () => {
    const currentYear = new Date().getFullYear();
    const t = useTranslations('footer')
    return (
        <Container className='flex flex-col items-center justify-center mt-12'>
            <img
                src='/assets/images/logo.png'
                alt="Flowbite Logo"
                className="h-[80px] mb-4"
            />
            <span className="text-sm text-gray-500 sm:text-center  mdLflex-1">
                © {currentYear}{' '}
                ZimEng™
                . {t('rights')}
            </span>
            <div className="w-full mx-auto p-4 md:flex items-center justify-center text-center">

                <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 text-center  sm:mt-0">
                    <li>
                        <Link href="/terms" className="hover:underline me-4">
                            {t('terms')}
                        </Link>
                    </li>
                    <li>
                        <Link href="/privacy" className="hover:underline me-4 ">
                            {t('privacy')}
                        </Link>
                    </li>
                    <li>
                        <Link href="/contact" className="hover:underline">
                            {t('contact')}
                        </Link>
                    </li>
                </ul>
            </div>
        </Container>
    )
}

export default SideFooter
