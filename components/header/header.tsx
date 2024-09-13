'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import Dropdown from '../ui-system/dropdown';
type MenuItem = {
    name: string;
    href: string;
};

const menuItems: MenuItem[] = [
    { name: 'Articles', href: '/' },
    { name: 'Employment', href: '/employment' },
    { name: 'Tenders', href: '/tenders' },
    { name: 'Events', href: '/events' },
    { name: 'Giving Back', href: '/egb' },
];
const ZimFlagSVG = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M19.69 11.21l-1.98-3.65a1 1 0 0 0-1.72-.19L12 11.31l-3.99-3.65a1 1 0 0 0-1.72.19L5.31 11.21 3.33 8.9a1 1 0 0 0-1.72.19L0 11.31l3.64 3.65a1 1 0 0 0 1.71-.19l2.97-3.65 3.99 3.65a1 1 0 0 0 1.72-.19l2.99-3.65 3.69 3.65a1 1 0 0 0 1.72-.19L24 11.31l-3.64-3.65a1 1 0 0 0-1.72.19l-2.97 3.65-3.99-3.65a1 1 0 0 0-1.72.19l-2.99 3.65-2.98-3.65a1 1 0 0 0-1.72.19L0 11.31l3.69 3.65a1 1 0 0 0 1.71-.19L8.64 11.31l4.35-4.1 4.35 4.1z" />
    </svg>
);
const languages = [
    { name: 'English', code: 'en', flag: <ZimFlagSVG /> },
    { name: 'Shona', code: 'sn', flag: <ZimFlagSVG /> },
    { name: 'Ndebele', code: 'nd', flag: <ZimFlagSVG /> }
];


const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const { t } = useTranslation();

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const { i18n } = useTranslation();
    const router = useRouter(); // Use router from next/router

    const changeLanguage = (lang: string) => {
        i18n.changeLanguage(lang);
        router.push(router.asPath, router.asPath, { locale: lang });
    };

    const languageItems = languages.map((lang) => ({
        name: lang.name,
        icon: lang.flag, // Optional icon
        onClick: () => changeLanguage(lang.code)
    }));

    return (
        <header className=' mb-4 border-b-[2px] border-slate-200'>
            <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    <Link href='/' className="flex items-center">
                        <img
                            src='/assets/images/logo.png'
                            alt="Flowbite Logo"
                            className="h-[80px]"
                        />
                    </Link>
                    <div className="flex items-center lg:order-2">
                        <Dropdown items={languageItems} />
                        <button
                            onClick={toggleMobileMenu}
                            type="button"
                            className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                            aria-controls="mobile-menu-2"
                            aria-expanded={isMobileMenuOpen}
                        >
                            {isMobileMenuOpen ? (
                                <svg
                                    className="w-6 h-6"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 1 1.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    className="w-6 h-6"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            )}
                        </button>
                    </div>
                    <div
                        className={`${isMobileMenuOpen ? 'block' : 'hidden'
                            } justify-between items-center w-full lg:flex lg:w-auto lg:order-1 bg-white z-[100]`}
                        id="mobile-menu-2"
                    >
                        <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                            {menuItems.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <li key={item.name}>
                                        <Link
                                            href={item.href}
                                            className={`relative block py-2 pr-4 pl-3 border-b-4 border-transparent font-bold max-w-32 mt-4 md:mt-0
                                            ${isActive
                                                    ? 'text-green-600 border-green-500'
                                                    : 'text-gray-700 border-gray-300 border-b-2 md:border-transparent hover:border-b-4 hover:text-purple-700 hover:border-purple-700'
                                                } transition-all duration-300 ease-in-out`}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            {t(`header.${item.name}`)}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;


