'use client'

import Link from 'next/link';
import { FC } from 'react';
import { useTranslation, UseTranslation } from 'next-i18next';

const Footer: FC = () => {
    const currentYear = new Date().getFullYear();
    const { t } = useTranslation()

    return (
        <footer className="bg-white shadow">
            <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
                <span className="text-sm text-gray-500 sm:text-center  mdLflex-1">
                    © {currentYear}{' '}
                    ZimEng™
                    . {t('footer.rights')}
                </span>
                <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500  sm:mt-0">
                    <li>
                        <Link href="/terms" className="hover:underline me-4">
                            {t('footer.terms')}
                        </Link>
                    </li>
                    <li>
                        <Link href="/privacy" className="hover:underline me-4 ">
                            {t('footer.privacy')}
                        </Link>
                    </li>
                    <li>
                        <Link href="/contact" className="hover:underline">
                            {t('footer.contact')}
                        </Link>
                    </li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;