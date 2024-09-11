import { getRequestConfig } from 'next-intl/server';
import { getUserLocale } from './services/locale';

export type Locale = (typeof locales)[number];

export const locales = ['en', 'sh'] as const;
export const defaultLocale: Locale = 'en';



export default getRequestConfig(async () => {
    const locale = await getUserLocale();

    return {
        locale,
        messages: (await import(`@/locales/${locale}.json`)).default
    };
});