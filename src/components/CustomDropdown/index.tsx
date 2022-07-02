import React from 'react';
import { Text, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { FormikProps, getIn } from 'formik';

import { styles } from './styles';

export interface ILOV {
  label: string;
  value: string;
}

interface ICustomDropdown<T> {
  formikHelpers: FormikProps<T>;
  fieldName: string;
  list: Array<ILOV>;
  title?: string;
  width?: string;
}

const CustomDropdown = <T,>({
  formikHelpers,
  fieldName,
  title = undefined,
  list = [],
  width = '100%',
}: ICustomDropdown<T>) => {
  return (
    <View style={{width}}>
      {title && <Text style={styles.titleText}>{title}</Text>}
      <Picker
        selectedValue={getIn(formikHelpers.values, fieldName)}
        onValueChange={formikHelpers.handleChange(fieldName)}
        style={{
          width: '100%',
          borderWidth: 1,
          borderColor:
            getIn(formikHelpers.touched, fieldName) &&
            getIn(formikHelpers.errors, fieldName)
              ? 'red'
              : 'black',
          borderRadius: 1,
          paddingHorizontal: 10,
        }}
      >
        {list.map((item) => {
          <Picker.Item label={item.label} value={item.value} />
        })}
      </Picker>
      {getIn(formikHelpers.touched, fieldName) &&
       getIn(formikHelpers.errors, fieldName) && (
        <Text style={styles.errorText}>
          {getIn(formikHelpers.touched, fieldName) &&
            getIn(formikHelpers.errors, fieldName)}
        </Text>
      )}
    </View>
  );
};

export default CustomDropdown;
