import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useUser } from '../../contexts/user';

import { Text, View } from '../../components/Themed';
import BoxContainer from '../../components/BoxContainer';
import CustomTextInput from '../../components/CustomTextInput';

import { ILogin, LoginRequest } from './api';
import { styles } from './styles';
import CustomButton from '../../components/CustomButton';

export default function Login() {
  const { navigate } = useNavigation();
  const { setUser } = useUser();

  const [failure, setFailure] = useState<boolean>(false);

  const handleSubmit = (async (values: ILogin) => {
    setFailure(false);
    await LoginRequest(values)
      .then((response) => {
        setUser(response.data);
        navigate('Home');
      })
      .catch(() => setFailure(true));
    // const usermock = {
    //   'id': '12c06dd6-187a-4a50-927f-5d08b367ee89',
    //   'name': 'João Pedro Mota Jardim',
    //   'email': 'jpmota.unb@gmail.com',
    //   'validated': true,
    //   'createdAt': '2022-08-07T17:33:15.526Z',
    //   'updatedAt': '2022-08-07T17:33:15.526Z',
    // }
    // setUser(usermock);
    // navigate('Home');
  });

  const userFormik = useFormik<ILogin>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().required('Insira um email!')
        .email('Insira um email no formato correto'),
      password: Yup.string().required('Insira uma senha!'),
    }),
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
          <View style={styles.ButtonContainer}>
            <CustomButton
              title='Entrar'
              onPress={userFormik.submitForm}
            />
            <CustomButton
              isSecondary
              title='Cadastre-se aqui'
              onPress={() => navigate('Register')}
            />
          </View>
          <View
            style={styles.separator}
          />
          {failure && (
            <Text style={{ color:'red' }}>E-mail ou senha incorretos</Text>
          )}
        </View>
      </BoxContainer>
    </View>
  );
}
