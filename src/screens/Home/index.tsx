import { useIsFocused, useNavigation } from '@react-navigation/core';
import React, { useCallback, useEffect, useState } from 'react';
import { Button, FlatList } from 'react-native';

import { IContract, useContract } from '../../contexts/contract';
import { useUser } from '../../contexts/user';

import CustomButton from '../../components/CustomButton'
import FloatCreateButton from '../../components/FloatCreateButton';
import { Text, View } from '../../components/Themed';

import { ITrip } from '../TripForm/api';

import { GetTrips } from './api';
import { styles } from './styles';

export default function Login() {
  const { navigate } = useNavigation();
  const { user, setUser } = useUser();
  const { setContract } = useContract();

  const [trips, setTrips] = useState<Array<ITrip>>(Array(0));

  const handleLogout = (() => {
    setUser(null);
    navigate('Login')
  });

  const handleChooseTrip = ((trip: IContract) => {
    setContract(trip);
    navigate('TripNavigator');
  });

  const LoadTrips = useCallback(async () => {
    await GetTrips(user.id).then((response) => {
      setTrips(response.data);
    }).catch ((err) => {
      console.log(err);
    });
  }, []);

  useEffect(() => {
    LoadTrips();
  }, [useIsFocused()]);

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <CustomButton
          title={user.name}
          onPress={() => navigate('Profile')}
        />
        <Button
          title='Sair'
          onPress={handleLogout}
        />
      </View>
      <View style={styles.row}>
        <Text style={{ fontSize: 20 }}>Lista de viagens</Text>
        <Button title='Refresh' onPress={() => LoadTrips()} />
      </View>
      <FlatList
        data={trips}
        renderItem={({item}) => (
          <CustomButton
            key={item.id}
            title={item.name}
            onPress={() => handleChooseTrip(item)}
          />
        )}
        keyExtractor={({id}: IContract) => id }
      />
      <FloatCreateButton title='Criar viagem' form='TripForm' />
    </View>
  );
}
