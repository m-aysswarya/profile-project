export const formatMonthYear = (date) => {
    if (!date) return "";

    const d = new Date(date);
    if (isNaN(d)) return "";

    return d.toLocaleString("default", { month: "short", year: "numeric" });
};