import React, { useEffect, useState } from 'react';
import { TextInput } from 'react-native-gesture-handler';
import { Button, StyleSheet } from 'react-native';
import { useFormik, getIn } from 'formik';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import sobre12Api from '../services/api';
import { RootTabScreenProps } from '../../types';
import { loginResponse, user } from './api';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {

  const [failure, setFailure] = useState<boolean>(false);
  const [id, setId] = useState<string>();
  
  const handleSubmit = ((values: user) => {
    sobre12Api.post<loginResponse>("/users/login", {
      email: values.email,
      password: values.password,
    })
    .then(response  => {
      setId(response.data.id);
      setFailure(false);
    })
    .catch(error => {
      setFailure(true);
      setId('');
    })
  });

  const userFormik = useFormik<user>({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: handleSubmit
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tela de Login</Text>
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  row: {
    justifyContent: 'center',
    flexDirection: 'row'
  }
});
