'use client'
import React, { useState } from 'react';
import Link from 'next/link';

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-blue-600 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white text-lg font-bold cursor-pointer">
                    <Link href="/">
                        MyWebsite
                    </Link>
                </div>
                <div className="md:hidden">
                    <button
                        onClick={toggleMenu}
                        className="text-white focus:outline-none"
                    >
                        {isOpen ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16m-7 6h7"
                                />
                            </svg>
                        )}
                    </button>
                </div>
                <div className="hidden md:flex md:items-center">
                    <Link href="/" className="block md:inline-block text-white px-2 py-1 md:py-0">
                        Home
                    </Link>
                    <Link href="/opportunities" className="block md:inline-block text-white px-2 py-1 md:py-0">
                        Opportunities
                    </Link>
                    <Link href="/events" className="block md:inline-block text-white px-2 py-1 md:py-0">
                        Events
                    </Link>
                    <Link href="/publications" className="block md:inline-block text-white px-2 py-1 md:py-0">
                        Publications
                    </Link>
                </div>
            </div>
            {isOpen && (
                <div className="md:hidden fixed inset-0 bg-blue-600 z-50 flex flex-col items-center justify-center">
                    <button
                        onClick={toggleMenu}
                        className="absolute top-4 right-4 text-white focus:outline-none"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-8 w-8"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                    <Link href="/" className="block text-white text-2xl py-2" onClick={toggleMenu}>
                        Home
                    </Link>
                    <Link href="/opportunities" className="block text-white text-2xl py-2" onClick={toggleMenu}>
                        Opportunities
                    </Link>
                    <Link href="/events" className="block text-white text-2xl py-2" onClick={toggleMenu}>
                        Events
                    </Link>
                    <Link href="/publications" className="block text-white text-2xl py-2" onClick={toggleMenu}>
                        Publications
                    </Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
