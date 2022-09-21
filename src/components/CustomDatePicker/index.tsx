import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
// import DatePicker from 'react-date-picker';
import { FontAwesome5 } from '@expo/vector-icons';
import {format} from 'date-fns';

import { View, Text } from '../../components/Themed';

import { styles } from './styles';

type PickerModes = 'date' | 'datetime' | 'time' | undefined;

export interface ICustomDateTimePickerProps {
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
  mode: PickerModes;
  title?: string | undefined;
  error?: boolean;
  width?: string;
  maximumDate?: Date;
  [propName: string]: unknown;
}

const CustomDateTimePicker = ({
  date,
  setDate,
  mode = 'datetime',
  title = undefined,
  error = false,
  // width = '80%',
  maximumDate,
}: ICustomDateTimePickerProps) => {
  const [isDatePickerVisible, setDatePickerVisibility] =
    useState<boolean>(false);

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
    <View style={{
      borderColor: error ? 'red' : 'black', borderRadius: 1,
    }}>
      {title && <Text style={{alignSelf: 'flex-start'}}>{title}</Text>}
      {/* {Platform.OS === 'web' ? (
        <DatePicker
          value={date}
          onChange={(date: Date) => setDate(date)}
          format='dd/MM/yyyy'
          clearIcon={null}
        />
      ): (
        <> */}
      <TouchableOpacity
        onPress={showDatePicker}
        style={styles.button}
      >
        <Text style={styles.text}>
          {format(
            date,
            mode === 'datetime'
              ? 'dd/MM/yyyy HH:mm'
              : mode === 'date'
                ? 'dd/MM/yyyy'
                : 'HH:mm',
          )}
        </Text>
        <FontAwesome5 
          name={'calendar-alt'}
          size={15} 
          style={styles.icon} 
        />
      </TouchableOpacity>
      {maximumDate ? (
        <DateTimePickerModal
          date={date}
          isVisible={isDatePickerVisible}
          mode={mode}
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          maximumDate = {maximumDate}
        />
      ) : (
        <DateTimePickerModal
          date={date}
          isVisible={isDatePickerVisible}
          mode={mode}
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      )}
      {/* </>
      )} */}
    </View>
  );
};

export default CustomDateTimePicker;
