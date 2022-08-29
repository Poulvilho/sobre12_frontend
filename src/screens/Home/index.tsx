import { useIsFocused, useNavigation } from '@react-navigation/core';
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';

import { IContract, useContract } from '../../contexts/contract';
import { useUser } from '../../contexts/user';

import CustomButton from '../../components/CustomButton'
import FloatCreateButton from '../../components/FloatCreateButton';
import { Text, View } from '../../components/Themed';

import { GetTrips } from './api';
import { styles } from './styles';
import TripSelector from '../../components/TripSelector';
import { FontAwesome5 } from '@expo/vector-icons';

export default function Login() {
  const { navigate } = useNavigation();
  const { user, setUser } = useUser();
  const { setContract } = useContract();

  const [trips, setTrips] = useState<Array<IContract>>(Array(0));

  const handleLogout = (() => {
    setUser(null);
    navigate('Login')
  });

  const handleChooseTrip = ((trip: IContract) => {
    setContract(trip);
    navigate('TripNavigator');
  });

  const LoadTrips = useCallback(async () => {
    await GetTrips(user!.id).then((response) => {
      setTrips(response.data);
    }).catch ((err) => {
      console.log(err);
    });
    // let tripMock = [
    //   {
    //     id: '1',
    //     name: 'Viagem Top',
    //     description: 'Rumo a Curitiba',
    //     dtstart: new Date(),
    //     dtend: new Date(),
    //     user: '1',
    //   },
    //   {
    //     id: '2',
    //     name: 'Viagenzinha um pouco maior',
    //     description: 'Com uma descrição generica mas ok',
    //     dtstart: new Date(),
    //     dtend: new Date(),
    //     user: '1',
    //   },
    // ];
    // setTrips(tripMock);

  }, []);

  useEffect(() => {
    LoadTrips();
  }, [useIsFocused()]);

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <CustomButton
          style={styles.user}
          title={user!.name}
          onPress={() => navigate('Profile')}
        />
        <TouchableOpacity 
          style={styles.exit}
          onPress={handleLogout}
        >
          <FontAwesome5 
            name={'sign-out-alt'}
            size={15} 
            style={styles.icon} 
          />
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <Text style={{ fontSize: 20 }}>Lista de viagens</Text>
      </View>
      <FlatList
        style={styles.trip}
        data={trips}
        renderItem={({item}) => (
          <TripSelector
            key={item.id}
            name={item.name}
            dtstart={item.dtstart}
            dtend={item.dtend}
            onPress={() => handleChooseTrip(item)}
          />
        )}
        keyExtractor={({id}: IContract) => id }
      />
      <FloatCreateButton 
        title='Criar nova viagem' 
        form={'TripForm'} />
    </View>
  );
}
