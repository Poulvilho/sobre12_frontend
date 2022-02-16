import React, { useState } from 'react';
import { TextInput } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/core';
import { Button } from 'react-native';
import { useFormik, getIn } from 'formik';

import { Text, View } from '../../components/Themed';
import BoxContainer from '../../components/BoxContainer';

import sobre12Api from '../../services/api';

import { login, loginResponse } from './api';
import { styles } from './styles';

export default function Login() {
  const { navigate } = useNavigation();

  const [failure, setFailure] = useState<boolean>(false);
  const [id, setId] = useState<string>();
  
  const handleSubmit = ((values: login) => {
    sobre12Api.post<loginResponse>("/users/login", {
      email: values.email,
      password: values.password,
    })
    .then(response  => {
      setId(response.data.id);
      setFailure(false);
      navigate('Home');
    })
    .catch(error => {
      setFailure(true);
      setId('');
    })
  });

  const userFormik = useFormik<login>({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: handleSubmit
  });

  return (
    <View style={styles.container}>
      <BoxContainer title='Login'>
        <View style={styles.userBox}>
          <View style={styles.row}> 
            <Text>Email: </Text>
            <TextInput
              onChangeText={userFormik.handleChange('email')}
              onBlur={userFormik.handleBlur('email')}
              value={getIn(userFormik.values, 'email')}
            />
          </View>
          <View style={styles.row}> 
            <Text>Password: </Text>
            <TextInput
              secureTextEntry={true}
              onChangeText={userFormik.handleChange('password')}
              onBlur={userFormik.handleBlur('password')}
              value={userFormik.values.password}
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
        <Button
          title='Loguei'
          onPress={() => navigate('Home')}
        />
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        {failure && (
          <Text style={{ color:'red' }}>
            E-mail ou senha incorretos
          </Text>
        )}
        {id && (
          <Text style={{ color:'green' }}>
            Bem-vindo, {id}
          </Text>
        )}
        </View>
      </BoxContainer>
    </View>
  );
}
