import React, { useCallback, useEffect, useState } from 'react';
import { FlatList } from 'react-native';

import { useContract } from '../../contexts/contract';

import { View } from '../../components/Themed';
import CustomModal from '../../components/CustomModal';
import CustomButton from '../../components/CustomButton';

import { GetGuests, IGuest } from '../Guest/api';

const AddParticipantButton = () => {
  const { contract } = useContract();
  
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [guests, setGuests] = useState<Array<IGuest>>();

  const LoadGuests = useCallback(async () => {
    await GetGuests(contract!.id).then((response) => {
      setGuests(response.data);
    });
  }, [contract]);

  useEffect(() => {
    LoadGuests();
  }, [LoadGuests]);

  return (
    <View>
      <CustomModal modalVisible={modalVisible}>
        <>
          <FlatList
            data={guests}
            renderItem={({item}) => (
              <CustomButton
                key={item.User.id}
                title={item.User.name}
                onPress={() => {}}
              />
            )}
            keyExtractor={({User}: IGuest) => User.id }
          />
          <CustomButton
            title='Cancelar'
            onPress={() => setModalVisible(false)}
          />
        </>
      </CustomModal>
      <CustomButton
        title='Adicionar participante'
        onPress={() => setModalVisible(true)}
      />
    </View>
  );
};

export default AddParticipantButton;
