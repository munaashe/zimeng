import Link from 'next/link'
import React from 'react'

const Footer = () => {
    return (
        <div className='flex flex-col items-center justify-center mx-4'>
            <hr className='p-4 pb-0 w-full' />
            <div className="my-4 text-center">
                <p className="text-gray-400">
                    &copy; {new Date().getFullYear()} ZimEng. All rights reserved.
                    <Link
                        href="/terms"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-4 text-secondary hover:text-primary mr-4 text-[14px]"
                    >
                        Terms &amp; Conditions
                    </Link>
                    <Link
                        href="/privacy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-secondary hover:text-primary text-[14px]"
                    >
                        Privacy Policy
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Footer
