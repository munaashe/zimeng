'use client'

import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
const locales = ["en", "sh", 'nd', 'sn'];
type Locale = (typeof locales)[number];

export const LocaleSwitcher: React.FC = () => {
    const locale = useLocale() as Locale;
    const router = useRouter();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const t = useTranslations('header')

    function handleLocaleChange(newLocale: Locale): void {
        document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
        router.refresh();
        setIsDropdownOpen(false)
        console.log(newLocale)
    }

    function toggleDropdown(): void {
        setIsDropdownOpen((prevState) => !prevState);
    }

    return (
        <div className="relative md:w-[120px] lg:ml-8">
            <button
                type="button"
                className=" p-4 md:p-2 px-8 rounded-full hover:bg-green-500 bg-brown text-white focus:outline-none whitespace-nowrap text-[12px] lg:text-[14px] font-bold px-4"
                onClick={toggleDropdown}
            >

                {t('language')}
            </button>

            {isDropdownOpen && (
                <div className="absolute right-0 mt-2 bg-white rounded shadow-lg">
                    <div className="border-t border-gray-200">
                        <button
                            className={`${locale === "en" ? "font-medium" : ""
                                } block w-full px-4 py-2 text-sm text-left text-gray-900`}
                            onClick={() => handleLocaleChange("en")}
                        >
                            English
                        </button>
                        <button
                            className={`${locale === "sh" ? "font-medium" : ""
                                } block w-full px-4 py-2 text-sm text-left text-gray-900`}
                            onClick={() => handleLocaleChange("sn")}
                        >
                            ChiShona
                        </button>
                        <button
                            className={`${locale === "nd" ? "font-medium" : ""
                                } block w-full px-4 py-2 text-sm text-left text-gray-900`}
                            onClick={() => handleLocaleChange("nd")}
                        >
                            isiNdebele
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};