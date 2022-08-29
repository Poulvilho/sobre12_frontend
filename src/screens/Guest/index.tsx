import React, { useCallback, useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useContract } from '../../contexts/contract';
import { useUser } from '../../contexts/user';

import CustomButton from '../../components/CustomButton';
import CustomTextInput from '../../components/CustomTextInput';
import { Text, View } from '../../components/Themed';

import {
  CreateGuest,
  GetGuests,
  IGuestForm,
  IGuest,
} from './api';
import { styles } from './styles';
import GuestItem from '../../components/GuestItem';

export default function Guest() {
  const { user } = useUser();
  const { contract } = useContract();

  const [guests, setGuests] = useState<Array<IGuest>>();

  const LoadGuests = useCallback(async () => {
    await GetGuests(contract!.id).then((response) => {
      setGuests(response.data);
    });
    // let guestMock = [
    //   {
    //     User: {
    //       id: '1',
    //       name: 'Joãozinho',
    //     },
    //   },
    //   {
    //     User: {
    //       id: '2',
    //       name: 'Pedro da Silva Sauro',
    //     },
    //   },
    //   {
    //     User: {
    //       id: '3',
    //       name: 'Robert de Niro Cleison',
    //     },
    //   },
    // ];
    // setGuests(guestMock);

  }, [contract]);

  const handleSubmit = (async (values: IGuestForm) => {
    await CreateGuest(values);
  });

  const guestFormik = useFormik<IGuestForm>({
    initialValues: {
      email: '',
      trip: contract!.id,
    },
    validationSchema: Yup.object({
      email: Yup.string().required('Insira um email!')
        .email('Insira um email no formato correto'),
    }),
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    LoadGuests();
  }, [LoadGuests]);

  return (
    <View style={styles.container}>
      <FlatList
        data={guests}
        renderItem={({item}) => (
          <GuestItem
            key={item.User.id}
            name={item.User.name}
            icon={'user'}
            onPress={() => {}}
          />
        )}
        keyExtractor={({User}: IGuest) => User.id }
      />
      {user!.id === contract!.user && (
        <>
          <Text style={styles.title}>Adicionar participante</Text>
          <CustomTextInput
            title='Email'
            fieldName='email'
            formikHelpers={guestFormik}
            width='80%'
            mode='outlined'
          />
          <CustomButton
            title='Salvar'
            onPress={guestFormik.submitForm}
          />
        </>
      )}
    </View>
  );
}
