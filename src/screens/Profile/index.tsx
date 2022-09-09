import React from 'react';
import { useFormik } from 'formik';
import { Button } from 'react-native';
import * as Yup from 'yup';

import { useUser } from '../../contexts/user';

import { View } from '../../components/Themed';
import CustomTextInput from '../../components/CustomTextInput';

import { IEditUser, UpdateProfile } from './api';
import { styles } from './styles';

export default function Profile() {
  const { user, setUser } = useUser();

  const handleSubmit = ((values: IEditUser) => {
    UpdateProfile(values).then((response) => {
      setUser(response.data);
    });
  });

  const userFormik = useFormik<IEditUser>({
    initialValues: {
      id: user!.id,
      email: user!.email,
      name: user!.name,
      oldPassword: '',
      password: '',
      passwordConfirm: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Insira um nome!'),
      oldpassword: Yup.string().required('Insira sua senha atual'),
      password: Yup.string(),
      passwordConfirm: Yup.string()
        .equals([Yup.ref('password')], 'Senhas diferentes'),
    }),
    onSubmit: handleSubmit,
  });

  return (
    <View style={styles.container}>
      <View style={styles.row}> 
        <CustomTextInput
          title='Email'
          fieldName='email'
          formikHelpers={userFormik}
          width='80%'
          mode='outlined'
          disabled
        />
      </View>
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
          title='Senha atual'
          fieldName='oldPassword'
          formikHelpers={userFormik}
          width='80%'
          mode='outlined'
          secureTextEntry={true}
        />
      </View>
      <View style={styles.row}>
        <CustomTextInput
          title='Nova senha'
          fieldName='password'
          formikHelpers={userFormik}
          width='80%'
          mode='outlined'
          secureTextEntry={true}
        />
      </View>
      <View style={styles.row}>
        <CustomTextInput
          title='Confirme nova senha'
          fieldName='passwordConfirm'
          formikHelpers={userFormik}
          width='80%'
          mode='outlined'
          secureTextEntry={true}
        />
      </View>
      <Button
        title='Salvar'
        onPress={userFormik.submitForm}
      />
    </View>
  );
}
