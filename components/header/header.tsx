'use client'

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import LocaleSwitcher from '../locale-switcher';
import { useRouter } from "next/navigation";

type MenuItem = {
    name: string;
    href: string;
};

const Header: React.FC = () => {
    const t = useTranslations('header');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();
    const { locale } = useParams();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };


    const menuItems: MenuItem[] = [
        { name: 'Articles', href: `/` },
        { name: 'Employment', href: `/employment` },
        { name: 'Tenders', href: `/tenders` },
        { name: 'Events', href: `/events` },
        { name: 'Opportunities', href: `/opportunities` },
        { name: 'Giving Back', href: `/egb` },
    ];

    return (
        <>
            <header className=' mb-4 border-b-[2px] border-slate-200 mr-4 h-[60px]'>
                <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
                    <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                        <Link href='/' className="flex items-center flex-1">
                            <img
                                src='/assets/images/logo.png'
                                alt="Flowbite Logo"
                                className="h-[80px]"
                            />
                        </Link>
                        <div className="flex items-center lg:order-2 gap-2">
                            <button
                                onClick={toggleMobileMenu}
                                type="button"
                                className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                                aria-controls="mobile-menu-2"
                                aria-expanded={isMobileMenuOpen}
                            >
                                {isMobileMenuOpen ? (
                                    <svg className='h-6 w-6' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g id="style=linear">
                                            <g id="close">
                                                <path id="vector" d="M6.75024 6.74512L17.2551 17.25" stroke="#895129" strokeWidth="1.5" strokeLinecap="round" />
                                                <path id="vector_2" d="M17.255 6.74512L6.75006 17.2499" stroke="#895129" strokeWidth="1.5" strokeLinecap="round" />
                                            </g>
                                        </g>
                                    </svg>
                                ) : (
                                    <svg className='h-6 w-6' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g id="style=linear">
                                            <g id="menu-fries">
                                                <path id="vector" d="M3 6H21" stroke="#895129" strokeWidth="1.5" strokeLinecap="round" />
                                                <path id="vector_2" d="M9 12L21 12" stroke="#895129" strokeWidth="1.5" strokeLinecap="round" />
                                                <path id="vector_3" d="M3 18H21" stroke="#895129" strokeWidth="1.5" strokeLinecap="round" />
                                            </g>
                                        </g>
                                    </svg>
                                )}
                            </button>
                        </div>
                        <div
                            className={`${isMobileMenuOpen ? 'block' : 'hidden'
                                } justify-between items-center w-full lg:flex lg:w-auto lg:order-1 bg-white z-[100]`}
                            id="mobile-menu-2"
                        >
                            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-4 lg:mt-0 h-screen w-screen md:h-[60px] md:w-full !bg-white sticky top-0 md:relative">
                                {menuItems.map((item) => {
                                    const isActive = pathname === item.href;
                                    return (
                                        <li key={item.name}>
                                            <Link
                                                href={item.href}
                                                className={`relative block py-2 pr-4 pl-3 border-b-4 border-transparent font-bold max-w-32 mt-4 md:mt-0 text-[14px] md:text-[18px] whitespace-nowrap
                                         ${isActive
                                                        ? 'text-green-600 border-green-500'
                                                        : 'text-gray-700 border-gray-300 border-b-2 md:border-transparent hover:border-b-4 hover:text-brown hover:border-brown'
                                                    } transition-all duration-300 ease-in-out`}
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                {t(item.name)}
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                            <LocaleSwitcher />
                        </div>
                    </div>
                </nav>
            </header>
        </>
    );
};

export default Header;

