import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import { Button } from 'react-native';
import { useFormik } from 'formik';

import { Text, View } from '../../components/Themed';
import BoxContainer from '../../components/BoxContainer';
import CustomTextInput from '../../components/CustomTextInput';

import { ILogin, LoginRequest } from './api';
import { styles } from './styles';
import { useUser } from '../../contexts/user';

export default function Login() {
  const { navigate } = useNavigation();
  const { setUser } = useUser()

  const [failure, setFailure] = useState<boolean>(false);
  
  const handleSubmit = (async (values: ILogin) => {
    await LoginRequest(values)
      .then((response) => {
        setUser(response.data);
        navigate('Home');
      })
      .catch(() => setFailure(true))
  });

  const userFormik = useFormik<ILogin>({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: handleSubmit,
  });

  return (
    <View style={styles.container}>
      <BoxContainer title='Login'>
        <View style={styles.userBox}>
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
            title='Entrar'
            onPress={userFormik.submitForm}
          />
          <Button
            title='Cadastre-se aqui'
            onPress={() => navigate('Register')}
          />
          <View
            style={styles.separator}
            lightColor="#eee"
            darkColor="rgba(255,255,255,0.1)"
          />
          {failure && (
            <Text style={{ color:'red' }}>E-mail ou senha incorretos</Text>
          )}
        </View>
      </BoxContainer>
    </View>
  );
}
