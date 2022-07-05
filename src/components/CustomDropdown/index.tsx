import React from 'react';
import { Text, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { FormikProps, getIn } from 'formik';

import { styles } from './styles';

export interface ILOV {
  label: string;
  value: string;
}

export const CustomItem = (props: ILOV) => {
  const {label, value, ...other} = props;

  return <Picker.Item label={label} value={value} {...other} />;
};

interface ICustomDropdown<T> {
  formikHelpers: FormikProps<T>;
  fieldName: string;
  children: React.ReactNode;
  title?: string;
  width?: string;
}

const CustomDropdown = <T,>({
  formikHelpers,
  fieldName,
  title = undefined,
  children,
  width = '100%',
}: ICustomDropdown<T>) => {
  return (
    <View style={{width}}>
      {title && <Text style={styles.titleText}>{title}</Text>}
      <View
        style={{
          borderColor:
            getIn(formikHelpers.touched, fieldName)
            && getIn(formikHelpers.errors, fieldName)
              ? 'red' : 'black',
          borderRadius: 1,
          borderWidth: 1,
        }}
      >
        <Picker
          selectedValue={getIn(formikHelpers.values, fieldName)}
          onValueChange={formikHelpers.handleChange(fieldName)}
        >
          {children}
        </Picker>
      </View>
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
