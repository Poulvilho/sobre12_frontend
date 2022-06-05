import React from 'react';
import { useFormik } from 'formik';
import { Button } from 'react-native';

import { useUser } from '../../contexts/user';

import { View } from '../../components/Themed';
import CustomTextInput from '../../components/CustomTextInput';

import { IRegister } from '../Register/api';
import { UpdateProfile } from './api';
import { styles } from './styles';

export default function Profile() {
  const { user } = useUser();

  const handleSubmit = ((values: IRegister) => {
    UpdateProfile(user.id, values);
  });

  const userFormik = useFormik<IRegister>({
    initialValues: {
      name: user.name,
      email: user.email,
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
