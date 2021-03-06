import React, { useState } from 'react';
import { Button, View, Text } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {format} from 'date-fns';

type PickerModes = 'date' | 'datetime' | 'time' | undefined;

export interface ICustomDateTimePickerProps {
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
  mode: PickerModes;
  title?: string | undefined;
  error?: boolean;
  width?: string;
  [propName: string]: unknown;
}

const CustomDateTimePicker = ({
  date,
  setDate,
  mode = 'datetime',
  title = undefined,
  error = false,
  width = '80%',
}: ICustomDateTimePickerProps) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    hideDatePicker();
    setDate(date);
  };

  return (
    <View
      style={{ width, borderColor: error ? 'red' : 'black', borderRadius: 1 }}
    >
      {title && <Text style={{alignSelf: 'flex-start'}}>{title}</Text>}
      <Button
        title={
          format(
            date,
            mode === 'datetime'
              ? 'dd/MM/yyyy HH:mm'
              : mode === 'date'
                ? 'dd/MM/yyyy'
                : 'HH:mm',
          )
        }
        onPress={showDatePicker}
      />
      <DateTimePickerModal
        date={date}
        isVisible={isDatePickerVisible}
        mode={mode}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};

export default CustomDateTimePicker;
