import React from 'react';
import { useFormik } from 'formik';
import { Button } from 'react-native';

import { View } from '../../components/Themed';
import CustomTextInput from '../../components/CustomTextInput';

import sobre12Api from '../../services/api';
import { user } from '../Register/api';

import { styles } from './styles';

export default function Profile() {

  const handleSubmit = ((values: user) => {
    sobre12Api.put<number>('/users', {
      name: values.name,
      email: values.email,
      password: values.password,
    });
  });

  const userFormik = useFormik<user>({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    onSubmit: handleSubmit,
  });

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <CustomTextInput
          title='Nome'
          fieldName='name'
          formikHelpers={userFormik}
          width='80%'
          mode='outlined'
        />
      </View>
      <View style={styles.row}> 
        <CustomTextInput
          title='Email'
          fieldName='email'
          formikHelpers={userFormik}
          width='80%'
          mode='outlined'
        />
      </View>
      <View style={styles.row}>
        <CustomTextInput
          title='Senha'
          fieldName='password'
          formikHelpers={userFormik}
          width='80%'
          mode='outlined'
          secureTextEntry={true}
        />
      </View>
      <Button
        title='Salvar'
        onPress={userFormik.submitForm}
      />
      <View style={styles.separator} lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
    </View>
  );
}
