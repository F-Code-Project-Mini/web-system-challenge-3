class Helper {
    // BE trả về date dạng: 2025-12-17T08:30:00Z
    static formatDate(date: string): string {
        return new Date(date).toLocaleDateString("vi-VN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    }
    static isInRangeDate(date: Date, startDate: string, endDate: string): boolean {
        return date >= new Date(startDate) && date <= new Date(endDate);
    }
}
export default Helper;
