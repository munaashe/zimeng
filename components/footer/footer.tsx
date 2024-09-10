import Link from 'next/link';
import { FC } from 'react';

const Footer: FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white shadow">
            <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
                <span className="text-sm text-gray-500 sm:text-center  mdLflex-1">
                    © {currentYear}{' '}
                    ZimEng™
                    . All Rights Reserved.
                </span>
                <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500  sm:mt-0">
                    <li>
                        <Link href="/terms" className="hover:underline me-4">
                            Terms & Conditions
                        </Link>
                    </li>
                    <li>
                        <Link href="/privacy" className="hover:underline me-4 ">
                            Privacy Policy
                        </Link>
                    </li>
                    <li>
                        <Link href="/contact" className="hover:underline">
                            Contact
                        </Link>
                    </li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;