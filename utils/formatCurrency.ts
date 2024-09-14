export function formatCurrency(amount: number | string): string {
    const numericAmount: number = typeof amount === 'string' ? parseFloat(amount) : amount;

    if (isNaN(numericAmount)) {
        throw new TypeError('Invalid input. Amount must be a number.');
    }

    const formattedAmount: string = numericAmount.toFixed(2);
    const parts: string[] = formattedAmount.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
}