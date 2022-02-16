import { getIn, useFormik } from 'formik';
import React from 'react';
import { Button, TextInput } from 'react-native';

import { Text, View } from '../../components/Themed';

import sobre12Api from '../../services/api';
import { user } from '../Register/api';

import { styles } from './styles';

export default function Profile() {

  const handleSubmit = ((values: user) => {
    sobre12Api.put<number>(`/users`, {
      name: values.name,
      email: values.email,
      password: values.password,
    })
    .then(response  => {
      console.log(response);
    })
  });

  const userFormik = useFormik<user>({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    onSubmit: handleSubmit
  });

  return (
    <View style={styles.container}>
      <View style={styles.row}> 
        <Text>Name: </Text>
        <TextInput
          onChangeText={userFormik.handleChange('name')}
          onBlur={userFormik.handleBlur('name')}
          value={getIn(userFormik.values, 'name')}
        />
      </View>
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
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    </View>
  );
}
