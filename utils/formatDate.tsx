import { useTranslations } from 'next-intl';
const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"
];

export const formatDate = (date: string | Date): string => {
    const t = useTranslations('months');
    const dateObj = typeof date === "string" ? new Date(date) : date;

    const day = dateObj.getDate();
    const month = months[dateObj.getMonth()];
    const year = dateObj.getFullYear();

    return `${day} ${t(month)} ${year}`;
};
