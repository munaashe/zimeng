"server-only"

import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";
import { type AbstractIntlMessages } from "next-intl";

export const supportedLocales = ["en", "sh"];
export const defaultLocale = "en";
type Locale = (typeof supportedLocales)[number];



export function isValidLocale(locale: unknown): locale is Locale {
    return supportedLocales.some((l) => l === locale);
}

export default getRequestConfig(async (params) => {
    const baseLocale = new Intl.Locale(params.locale).baseName;
    if (!isValidLocale(baseLocale)) notFound();

    const messages = (await import(`./locales/${params.locale}.json`)).default;
    return {
        messages,
    };
});
