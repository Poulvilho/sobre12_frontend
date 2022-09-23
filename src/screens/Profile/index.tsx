import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useUser } from '../../contexts/user';

import CustomButton from '../../components/CustomButton';
import CustomTextInput from '../../components/CustomTextInput';
import { View } from '../../components/Themed';

import { IEditUser, UpdateProfile } from './api';
import { styles } from './styles';

export default function Profile() {
  const { user, setUser } = useUser();

  const handleSubmit = (async (values: IEditUser) => {
    await UpdateProfile(user!.id, values).then(() => {
      setUser((user) => {
        user!.name = values.name;
        return user;
      });
    });
  });

  const userFormik = useFormik<IEditUser>({
    initialValues: {
      email: user!.email,
      name: user!.name,
      oldPassword: '',
      password: '',
      passwordConfirm: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Insira um nome!'),
      oldPassword: Yup.string().required('Insira sua senha atual'),
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
      <CustomButton
        title='Salvar'
        onPress={userFormik.submitForm}
      />
    </View>
  );
}
