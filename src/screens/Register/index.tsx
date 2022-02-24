import * as React from 'react';
import { useNavigation } from '@react-navigation/core';
import { Button } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useFormik, getIn } from 'formik';

import { Text, View } from '../../components/Themed';
import { user } from './api';
import sobre12Api from '../../services/api';
import BoxContainer from '../../components/BoxContainer';
import { styles } from './styles';
import CustomTextInput from '../../components/CustomTextInput';

export default function Register() {
  const { navigate } = useNavigation()

  const handleSubmit = ((values: user) => {
    sobre12Api.post<user>('/users/register', {
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
