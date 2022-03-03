import React from 'react';
import { useFormik } from 'formik';
import { Button } from 'react-native';

import { View } from '../../components/Themed';
import CustomTextInput from '../../components/CustomTextInput';

import { IUser } from '../Register/api';

import { UpdateProfile } from './api';
import { styles } from './styles';
import { authResult } from '../../hooks/auth';

export default function Profile() {

  const handleSubmit = ((values: IUser) => {
    UpdateProfile(values);
  });

  const userFormik = useFormik<IUser>({
    initialValues: {
      name: authResult.name,
      email: authResult.email,
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
    </View>
  );
}
