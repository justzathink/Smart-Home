export interface DataPoint {
    date: string;
    value: number;
}

export interface ChartKitData {
    labels: string[];
    datasets: {
        data: number[];
        color?: () => string;
        strokeWidth?: number;
    }[];
    legend?: string[];
}

export const processData = (data: DataPoint[]): ChartKitData => {
    let labels: string[] = [];
    let temperatureData: number[] = [];
    let currentHour = 8;
    let currentSum = 0;
    let currentCount = 0;

    data.forEach((item) => {
        const hour = new Date(item.date).getHours();
        if (hour >= currentHour && hour < currentHour + 2) {
            currentSum += item.value;
            currentCount += 1;
        } else {
            if (currentCount > 0) {
                labels.push(`${currentHour}h`);
                temperatureData.push(currentSum / currentCount);
            }
            currentHour = hour;
            currentSum = item.value;
            currentCount = 1;
        }
    });

    if (currentCount > 0) {
        labels.push(`${currentHour}h`);
        temperatureData.push(currentSum / currentCount);
    }

    return {
        labels,
        datasets: [
            { data: temperatureData, color: () => "red", strokeWidth: 2 },
        ],
        legend: ["Nhiệt độ (°C)"],
    };
};

export const generateLabels = (data: { date: string; value: number }[]) => {
    const labels: string[] = [];
    let currentHour = 8;
    let count = 0;

    data.forEach((item) => {
        const hour = new Date(item.date).getHours();
        if (hour >= currentHour && hour < currentHour + 2) {
            if (count === 0) {
                labels.push(`${currentHour}h`);
            }
            count++;
        } else {
            currentHour = hour;
            labels.push(`${currentHour}h`);
            count = 1;
        }
    });

    return labels;
};

export const processValues = (data: { date: string; value: number }[]) => {
    const values: number[] = [];
    let currentSlotStart: Date | null = null;
    let currentSum = 0;
    let currentCount = 0;

    data.forEach((item) => {
        const date = new Date(item.date);
        const slotStart = new Date(date);
        slotStart.setMinutes(date.getMinutes() < 30 ? 0 : 30, 0, 0);

        if (
            currentSlotStart === null ||
            slotStart.getTime() !== currentSlotStart.getTime()
        ) {
            // Push average of previous slot
            if (currentCount > 0) {
                values.push(currentSum / currentCount);
            }

            currentSlotStart = slotStart;
            currentSum = item.value;
            currentCount = 1;
        } else {
            currentSum += item.value;
            currentCount += 1;
        }
    });

    // Push last slot
    if (currentCount > 0) {
        values.push(currentSum / currentCount);
    }

    return values;
};
