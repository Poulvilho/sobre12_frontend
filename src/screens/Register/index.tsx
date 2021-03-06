import  React, { useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import { Button } from 'react-native';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useUser } from '../../contexts/user';

import { Text, View } from '../../components/Themed';
import BoxContainer from '../../components/BoxContainer';
import CustomTextInput from '../../components/CustomTextInput';

import { IRegister, RegisterRequest } from './api';
import { styles } from './styles';

export default function Register() {
  const { navigate } = useNavigation();
  const { setUser } = useUser();

  const [failure, setFailure] = useState<boolean>(false);

  const handleSubmit = (async (values: IRegister) => {
    setFailure(false);
    await RegisterRequest(values)
      .then((response) => {
        setUser(response.data);
        navigate('Home');
      })
      .catch(() => setFailure(true));
  });

  const userFormik = useFormik<IRegister>({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Insira um nome!'),
      email: Yup.string().required('Insira um email!')
        .email('Insira um email no formato correto'),
      password: Yup.string().required('Insira uma senha!'),
    }),
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
          <View
            style={styles.separator}
          />
          {failure && (
            <Text style={{ color:'red' }}>Email já cadastrado!</Text>
          )}
        </View>
      </BoxContainer>
    </View>
  );
}
