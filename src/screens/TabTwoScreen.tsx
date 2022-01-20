import * as React from 'react';
import { Button, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useFormik, getIn } from 'formik';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { user } from './api';
import sobre12Api from '../services/api';

export default function TabTwoScreen() {

  const handleSubmit = ((values: user) => {
    sobre12Api.post<user>("/users/register", {
      email: values.email,
      password: values.password,

    })
    .then(response  => {
      console.log(response);
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
      <Text style={styles.title}>Tela de registro</Text>
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
          onChangeText={userFormik.handleChange('password')}
          onBlur={userFormik.handleBlur('password')}
          value={userFormik.values.password}
        />
      </View>
      <Button
        title='Criar usuário'
        onPress={userFormik.submitForm}
      />
      <></>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
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
