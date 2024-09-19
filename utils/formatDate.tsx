const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
    "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"
];

export const formatDate = (date: string | Date): string => {
    const dateObj = typeof date === "string" ? new Date(date) : date;

    const day = dateObj.getDate();
    const month = months[dateObj.getMonth()];
    const year = dateObj.getFullYear();

    return `${day} ${month} ${year}`;
};