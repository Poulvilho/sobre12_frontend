import React from 'react';
import { FormikProps, getIn } from 'formik';
import { Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

import { styles } from './styles';

interface ICustomTextInput<T> {
  formikHelpers: FormikProps<T>;
  fieldName: string;
  width?: string;
  title?: string | undefined;
  disabled?: boolean;
  [propName: string]: unknown;
}

const CustomTextInput = <T,>({
  formikHelpers,
  fieldName,
  width = '80%',
  title = undefined,
  disabled = false,
  ...rest
}: ICustomTextInput<T>) => {
  
  return (
    <View style={{width}}>
      {title && <Text style={{alignSelf: 'flex-start'}}>{title}</Text>}
      <TextInput
        onChangeText={formikHelpers.handleChange(fieldName)}
        onBlur={formikHelpers.handleBlur(fieldName) as () => void}
        value={getIn(formikHelpers.values, fieldName)}
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
        editable={!disabled}
        {...rest}
      />
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
  
export default CustomTextInput;
  
