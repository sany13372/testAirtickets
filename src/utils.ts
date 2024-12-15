export const calculateFlightDuration = (departureTime: string, arrivalTime: string): number => {
    const parseTime = (time: string): number => {
        const [hours, minutes] = time.split(':').map(Number);
        return hours * 60 + minutes; // Преобразуем в минуты
    };

    const departureMinutes = parseTime(departureTime);
    const arrivalMinutes = parseTime(arrivalTime);

    // Если время прилета на следующий день
    if (arrivalMinutes < departureMinutes) {
        return (24 * 60 - departureMinutes) + arrivalMinutes;
    }

    return arrivalMinutes - departureMinutes;
}