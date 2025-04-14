import React, { useEffect, useState } from "react";
import { View, Text, Dimensions, Button, StyleSheet, Touchable, TouchableOpacity, Switch, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LineChart } from "react-native-chart-kit";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Stack } from "expo-router";
import { processData, ChartKitData, Filter, RawData, processValues, generateLabels } from "../../../api/statistic";

const screenWidth = Dimensions.get("window").width;

const Statistic = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isFilterVisible, setFilterVisible] = useState(false)
    const [chartData, setChartData] = useState<ChartKitData>({
        labels: [],
        datasets: [],
    });
    const [rawData, setRawData] = useState({
        temperature: [],
        humidity: [],
        light: [],
    });
    const [lineColors, setLineColors] = useState({
        temperature: "#E70031",
        humidity: "#98F5F9",
        light: "#FFECA1",
    });

    const [filters, setFilters] = useState({
        temperature: true,
        humidity: true,
        light: true,
    });
    const [apllyFilter, setApplyFilter] = useState(false)
    const [temperatureMin, setTemperatureMin] = useState<number | null>(null);
    const [temperatureMax, setTemperatureMax] = useState<number | null>(null);
    const [humidityMin, setHumidityMin] = useState<number | null>(null);
    const [humidityMax, setHumidityMax] = useState<number | null>(null);
    const [lightMin, setLightMin] = useState<number | null>(null);
    const [lightMax, setLightMax] = useState<number | null>(null);

    const showDatePicker = () => setDatePickerVisibility(true);
    const hideDatePicker = () => setDatePickerVisibility(false);
    const handleConfirm = (date: Date) => {
        setSelectedDate(date);
        hideDatePicker();
    };

    const showFilter = () => setFilterVisible(true)
    const hideFilter = () => {
        setApplyFilter(true)
        setFilterVisible(false)
    }
    const handleFilterChange = (filterKey: string, value: boolean) => {
        setFilters((prev) => ({ ...prev, [filterKey]: value }));
    };

    const handleRangeChange = (rangeKey: string, value: number) => {
        if (rangeKey === "temperatureMin") {
            setTemperatureMin(value);
        } else if (rangeKey === "temperatureMax") {
            setTemperatureMax(value);
        } else if (rangeKey === "humidityMin") {
            setHumidityMin(value);
        } else if (rangeKey === "humidityMax") {
            setHumidityMax(value);
        } else if (rangeKey === "lightMin") {
            setLightMin(value);
        } else if (rangeKey === "lightMax") {
            setLightMax(value);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const dateString = selectedDate.toISOString().split("T")[0];
            const startTime = `${dateString}T00:00:00.000Z`;
            const endTime = `${dateString}T23:59:59.999Z`;

            const fetchFeed = async (feedKey: string) => {
                const response = await fetch(
                    `https://io.adafruit.com/api/v2/khangnguyen2k4/feeds/assignment.${feedKey}/data/chart?hours=1&start_time=${startTime}&end_time=${endTime}`
                );
                const json = await response.json();
                return json.data.map((entry: [string, string]) => ({
                    date: entry[0],
                    value: parseFloat(entry[1]),
                }));
            };

            const [tempData, humidityData, lightData] = await Promise.all([
                fetchFeed("nhiet-do"),
                fetchFeed("do-am"),
                fetchFeed("anh-sang"),
            ]);

            const newRawData = {
                temperature: tempData,
                humidity: humidityData,
                light: lightData,
            };

            setRawData(newRawData); // Lưu tất cả data gốc
            updateChartData(newRawData, filters); // Render theo filters ban đầu
        };

        fetchData();
    }, [selectedDate]);

    const formatTime = (iso: string) => {
        const d = new Date(iso);
        const hh = d.getHours().toString().padStart(2, "0");
        const mm = d.getMinutes().toString().padStart(2, "0");
        return `${hh}:${mm}`;
    };
    // Hàm xử lý tạo lại chart data dựa vào filters
    const updateChartData = (data: RawData, filters: Filter) => {
        // Tập hợp nhãn từ tất cả loại dữ liệu
        const labelsSet = new Set<string>();

        // Sử dụng object để lưu value theo label
        const groupedData: {
            temperature?: Record<string, number>;
            humidity?: Record<string, number>;
            light?: Record<string, number>;
        } = {};

        // Tiện ích xử lý trung bình mỗi 30 phút (trả về { [label]: value })
        const processAndGroup = (data: { date: string; value: number }[]) => {
            const map: Record<string, { sum: number; count: number }> = {};

            data.forEach((item) => {
                const date = new Date(item.date);
                date.setMinutes(date.getMinutes() < 30 ? 0 : 30, 0, 0);
                const label = `${date.getHours()}h${date.getMinutes() === 0 ? "" : "30"}`;

                if (!map[label]) {
                    map[label] = { sum: item.value, count: 1 };
                } else {
                    map[label].sum += item.value;
                    map[label].count += 1;
                }
            });

            const averaged: Record<string, number> = {};
            for (const [label, { sum, count }] of Object.entries(map)) {
                averaged[label] = sum / count;
            }
            return averaged;
        };

        // Hàm lọc theo min/max
        const filterByMinMax = (
            map: Record<string, number>,
            min: number | null,
            max: number | null
        ): Record<string, number> => {
            const result: Record<string, number> = {};
            for (const [label, value] of Object.entries(map)) {
                if ((min !== null && value <= min) || (max !== null && value >= max)) continue;
                result[label] = value;
            }
            return result;
        };

        const datasets: any[] = [];
        const legend: string[] = [];

        if (filters.temperature) {
            let grouped = processAndGroup(data.temperature);
            grouped = filterByMinMax(grouped, temperatureMin, temperatureMax);
            groupedData.temperature = grouped;

            Object.keys(grouped).forEach(label => labelsSet.add(label));

            legend.push("Nhiệt độ (°C)");
        }

        if (filters.humidity) {
            let grouped = processAndGroup(data.humidity);
            grouped = filterByMinMax(grouped, humidityMin, humidityMax);
            groupedData.humidity = grouped;

            Object.keys(grouped).forEach(label => labelsSet.add(label));

            legend.push("Độ ẩm (%)");
        }

        if (filters.light) {
            let grouped = processAndGroup(data.light);
            grouped = filterByMinMax(grouped, lightMin, lightMax);
            groupedData.light = grouped;

            Object.keys(grouped).forEach(label => labelsSet.add(label));

            legend.push("Ánh sáng (lux)");
        }

        const sortedLabels = Array.from(labelsSet).sort((a, b) =>
            a.localeCompare(b, undefined, { numeric: true })
        );

        if (filters.temperature && groupedData.temperature) {
            datasets.push({
                data: sortedLabels.map(label => groupedData.temperature?.[label] ?? null),
                color: () => lineColors.temperature,
                strokeWidth: 2,
            });
        }

        if (filters.humidity && groupedData.humidity) {
            datasets.push({
                data: sortedLabels.map(label => groupedData.humidity?.[label] ?? null),
                color: () => lineColors.humidity,
                strokeWidth: 2,
            });
        }

        if (filters.light && groupedData.light) {
            datasets.push({
                data: sortedLabels.map(label => groupedData.light?.[label] ?? null),
                color: () => lineColors.light,
                strokeWidth: 2,
            });
        }

        if (datasets.length === 0) {
            setChartData({
                labels: [],
                datasets: [],
                legend: [],
            });
            return;
        }

        setChartData({
            labels: sortedLabels,
            datasets,
            legend,
        });
    };
    // Khi filters thay đổi thì dùng rawData để update lại chartData
    useEffect(() => {
        if (apllyFilter) {
            updateChartData(rawData, filters);
            setApplyFilter(false)
            setTemperatureMax(null)
            setTemperatureMin(null)
            setHumidityMax(null)
            setHumidityMin(null)
            setLightMax(null)
            setLightMin(null)
        }
    }, [apllyFilter]);

    return (
        <SafeAreaView style={{ flex: 1, padding: 16 }}>
            <Stack.Screen options={{ headerShown: true, title: "Thống kê dữ liệu" }} />
            <View className="flex flex-row justify-between gap-10">
                <View className="w-1/2">
                    <TouchableOpacity onPress={showDatePicker} className="bg-blue-500 rounded-md py-2">
                        <Text className="text-lg w-full text-center text-white font-medium">Chọn ngày</Text>
                    </TouchableOpacity>
                    <Text className="mt-2 font-semibold text-md">Ngày: {selectedDate.toLocaleDateString()}</Text>
                </View>
                <View className="w-1/3">
                    <TouchableOpacity onPress={showFilter} className="bg-blue-500 rounded-md py-2">
                        <Text className="text-lg w-full text-center text-white font-medium">Bộ lọc</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                date={selectedDate}
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />


            {/* Filter */}
            <FilterPanel
                visible={isFilterVisible}
                onClose={hideFilter}
                filters={filters}
                onChange={handleFilterChange}
                onRangeChange={handleRangeChange} />

            {chartData.labels.length > 0 ? (
                <LineChart
                    data={chartData}
                    width={screenWidth - 32}
                    height={280}
                    chartConfig={{
                        backgroundColor: "#ffffff",
                        backgroundGradientFrom: "#ffffff",
                        backgroundGradientTo: "#ffffff",
                        decimalPlaces: 1,
                        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        labelColor: () => "#666",
                        propsForDots: {
                            r: "4",
                        },
                        strokeWidth: 0.5,
                    }}
                    bezier
                    style={{ marginVertical: 16, borderRadius: 12 }}
                />
            ) : (
                <Text className="text-center font-bold mt-4 text-xl">
                    Không có dữ liệu
                </Text>
            )}

        </SafeAreaView>
    );
};

export default Statistic;

interface FilterPanelProps {
    visible: boolean;
    onClose: () => void;
    filters: { temperature: boolean; humidity: boolean; light: boolean };
    onChange: (filterKey: string, value: boolean) => void;
    onRangeChange: (rangeKey: string, value: number) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ visible, onClose, filters, onChange, onRangeChange }) => {
    if (!visible) return null;

    return (
        <View style={styles.overlay}>
            <View style={styles.panel}>
                <Text style={styles.title}>Bộ lọc dữ liệu</Text>

                <View style={styles.option}>
                    <Text style={styles.label}>Nhiệt độ</Text>
                    <Switch
                        value={filters.temperature}
                        onValueChange={(val) => onChange("temperature", val)}
                    />
                </View>

                <View style={styles.option}>
                    <Text style={styles.label}>Độ ẩm</Text>
                    <Switch
                        value={filters.humidity}
                        onValueChange={(val) => onChange("humidity", val)}
                    />
                </View>

                <View style={styles.option}>
                    <Text style={styles.label}>Ánh sáng</Text>
                    <Switch
                        value={filters.light}
                        onValueChange={(val) => onChange("light", val)}
                    />
                </View>

                {/* Range Filter */}
                <View style={styles.rangeOption}>
                    <Text style={styles.label}>Nhiệt độ từ</Text>
                    <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        placeholder="Min"
                        onChangeText={(val) => onRangeChange("temperatureMin", parseFloat(val))}
                    />
                    <Text style={styles.label2}>đến</Text>
                    <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        placeholder="Max"
                        onChangeText={(val) => onRangeChange("temperatureMax", parseFloat(val))}
                    />
                </View>
                <View style={styles.rangeOption}>
                    <Text style={styles.label}>Độ ẩm từ</Text>
                    <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        placeholder="Min"
                        onChangeText={(val) => onRangeChange("humidityMin", parseFloat(val))}
                    />
                    <Text style={styles.label2}>đến</Text>
                    <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        placeholder="Max"
                        onChangeText={(val) => onRangeChange("humidityMax", parseFloat(val))}
                    />
                </View>
                <View style={styles.rangeOption}>
                    <Text style={styles.label}>Ánh sáng từ</Text>
                    <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        placeholder="Min"
                        onChangeText={(val) => onRangeChange("lightMin", parseFloat(val))}
                    />
                    <Text style={styles.label2}>đến</Text>
                    <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        placeholder="Max"
                        onChangeText={(val) => onRangeChange("lightMax", parseFloat(val))}
                    />
                </View>

                <TouchableOpacity style={styles.button} onPress={onClose}>
                    <Text style={styles.buttonText}>Áp dụng</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    overlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.3)",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 10,
    },
    panel: {
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 16,
        width: "90%",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 4,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 16,
    },
    option: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 12,
    },
    label: {
        fontSize: 16,
        width: 100
    },
    label2: {
        fontSize: 16,
        width: "auto"
    },
    button: {
        backgroundColor: "#3B82F6",
        paddingVertical: 12,
        borderRadius: 8,
        marginTop: 16,
    },
    buttonText: {
        color: "#fff",
        textAlign: "center",
        fontWeight: "600",
        fontSize: 16,
    },
    rangeOption: {
        marginTop: 16,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 10
    },
    input: {
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 4,
        padding: 8,
        marginVertical: 8,
        width: "auto",
    },
});