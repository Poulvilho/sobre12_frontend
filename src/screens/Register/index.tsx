import  React, { useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useUser } from '../../contexts/user';

import { Text, View } from '../../components/Themed';
import BoxContainer from '../../components/BoxContainer';
import CustomButton from '../../components/CustomButton';
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
      passwordConfirm: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Insira um nome!'),
      email: Yup.string().required('Insira um email!')
        .email('Insira um email no formato correto'),
      password: Yup.string().required('Insira uma senha!'),
      passwordConfirm: Yup.string().required('Insira novamente sua senha!')
        .equals([Yup.ref('password')], 'Senhas diferentes'),
    }),
    onSubmit: handleSubmit,
  });

  return (
    <View style={styles.container}>
      <CustomButton
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
          <View style={styles.row}>
            <CustomTextInput
              title='Confirme sua senha'
              fieldName='passwordConfirm'
              formikHelpers={userFormik}
              width='80%'
              mode='outlined'
              secureTextEntry={true}
            />
          </View>
          <CustomButton
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
