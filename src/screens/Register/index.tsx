import * as React from 'react';
import { useNavigation } from '@react-navigation/core';
import { Button } from 'react-native';
import { useFormik } from 'formik';

import { View } from '../../components/Themed';
import BoxContainer from '../../components/BoxContainer';
import CustomTextInput from '../../components/CustomTextInput';

import { IRegister, RegisterRequest } from './api';
import { styles } from './styles';

export default function Register() {
  const { navigate } = useNavigation()

  const handleSubmit = ((values: IRegister) => {
    RegisterRequest(values);
  });

  const userFormik = useFormik<IRegister>({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    onSubmit: handleSubmit,
  });

  return (
    <View style={styles.container}>
      <Button
        title='Já possuo login'
        onPress={() => navigate('Login')}
      />
      <BoxContainer title='Registro'>
        <View style={styles.userBox}>
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
            title='Criar usuário'
            onPress={userFormik.submitForm}
          />
        </View>
      </BoxContainer>
    </View>
  );
}
