import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

const App = () => {
  const [lightTime, setLightTime] = useState(new Date());
  const [fanTime, setFanTime] = useState(new Date());
  const [showLightPicker, setShowLightPicker] = useState(false);
  const [showFanPicker, setShowFanPicker] = useState(false);

  
  const onLightTimeChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowLightPicker(false);
    if (selectedDate) {
      setLightTime(selectedDate);
    }
  };


  const onFanTimeChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowFanPicker(false);
    if (selectedDate) {
      setFanTime(selectedDate);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Đặt Lịch Bật Đèn và Quạt</Text>

      {/* Chọn thời gian bật đèn */}
      <Button title="Chọn thời gian bật đèn" onPress={() => setShowLightPicker(true)} />
      <Text>{lightTime.toLocaleString()}</Text>

      {showLightPicker && (
        <DateTimePicker
          value={lightTime}
          mode="time"
          display="default"
          onChange={onLightTimeChange}
        />
      )}

      {/* Chọn thời gian bật quạt */}
      <Button title="Chọn thời gian bật quạt" onPress={() => setShowFanPicker(true)} />
      <Text>{fanTime.toLocaleString()}</Text>

      {showFanPicker && (
        <DateTimePicker
          value={fanTime}
          mode="time"
          display="default"
          onChange={onFanTimeChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  }
});

export default App;
