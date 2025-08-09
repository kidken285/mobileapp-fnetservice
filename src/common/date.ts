export const formatDateString = (dateString: string) => {
    const dateObject = new Date(dateString);
    const day = dateObject.getDate();
    const month = dateObject.getMonth() + 1;
    const year = dateObject.getFullYear();
    return `${day}/${month}/${year}`;
}

export const timeAgo = (dateString: string): string => {
    const now = new Date();
    const date = new Date(dateString);

    // If invalid date, return empty string
    if (isNaN(date.getTime())) return '';

    const diffMs = now.getTime() - date.getTime();

    // In the future
    if (diffMs < 0) return 'Vừa xong';

    const diffSeconds = Math.floor(diffMs / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);
    const diffMonths = Math.floor(diffDays / 30);
    const diffYears = Math.floor(diffDays / 365);

    if (diffYears > 0) {
        return `${diffYears} năm trước`;
    } else if (diffMonths > 0) {
        return `${diffMonths} tháng trước`;
    } else if (diffDays > 0) {
        return `${diffDays} ngày trước`;
    } else if (diffHours > 0) {
        return `${diffHours} giờ trước`;
    } else if (diffMinutes > 0) {
        return `${diffMinutes} phút trước`;
    } else {
        return 'Vừa xong';
    }
};
