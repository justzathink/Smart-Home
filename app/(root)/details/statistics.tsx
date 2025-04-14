import React, { useEffect, useState } from "react";
import { View, Text, Dimensions, Button, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LineChart } from "react-native-chart-kit";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Stack } from "expo-router";
import { processData, ChartKitData, processValues, generateLabels } from "../../../api/statistic";

const screenWidth = Dimensions.get("window").width;

const Statistic = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [chartData, setChartData] = useState<ChartKitData>({
        labels: [],
        datasets: [],
    });
    const [lineColors, setLineColors] = useState({
        temperature: "#E70031",
        humidity: "#98F5F9",
        light: "#FFECA1",
    });

    const showDatePicker = () => setDatePickerVisibility(true);
    const hideDatePicker = () => setDatePickerVisibility(false);
    const handleConfirm = (date: Date) => {
        setSelectedDate(date);
        hideDatePicker();
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

            setChartData({
                labels: generateLabels(tempData),
                datasets: [
                    {
                        data: processValues(tempData),
                        color: () => lineColors.temperature,
                        strokeWidth: 2,
                    },
                    {
                        data: processValues(humidityData),
                        color: () => lineColors.humidity,
                        strokeWidth: 2,
                    },
                    {
                        data: processValues(lightData),
                        color: () => lineColors.light,
                        strokeWidth: 2,
                    },
                ],
                legend: ["Nhiệt độ (°C)", "Độ ẩm (%)", "Ánh sáng (lux)"],
            });
        };

        fetchData();
    }, [selectedDate]);

    return (
        <SafeAreaView style={{ flex: 1, padding: 16 }}>
            <Stack.Screen options={{ headerShown: true, title: "Thống kê dữ liệu" }} />

            <Button title="Chọn ngày" onPress={showDatePicker} />
            <Text style={styles.dateText}>Ngày: {selectedDate.toLocaleDateString()}</Text>

            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                date={selectedDate}
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />

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
                <Text style={{ textAlign: 'center', marginTop: 32, fontSize: 16 }}>
                    Không có dữ liệu
                </Text>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    dateText: {
        fontSize: 16,
        marginBottom: 8,
        fontWeight: "bold",
    },
});

export default Statistic;
