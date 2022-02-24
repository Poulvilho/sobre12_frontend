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
              secureTextEntry={true}
              onChangeText={userFormik.handleChange('password')}
              onBlur={userFormik.handleBlur('password')}
              value={userFormik.values.password}
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
