import React, { useCallback, useEffect, useState } from 'react';
import { Button, FlatList } from 'react-native';

import { useContract } from '../../contexts/contract';

import { View } from '../../components/Themed';
import CustomModal from '../../components/CustomModal';
import CustomButton from '../../components/CustomButton';

import { GetGuests, IGuest, IGuestUser } from '../Guest/api';

interface IAddParticipant {
  participants: Array<IGuestUser>;
  setParticipants: React.Dispatch<React.SetStateAction<Array<IGuestUser>>>;
}

const AddParticipant = ({
  participants = [],
  setParticipants,
}: IAddParticipant) => {
  const { contract } = useContract();
  
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [guests, setGuests] = useState<Array<IGuest>>();
  const [guestsSelected, setGuestsSelected] =
    useState<Array<IGuestUser>>(participants);

  const LoadGuests = useCallback(async () => {
    await GetGuests(contract!.id).then((response) => {
      setGuests(response.data);
    });
  }, [contract]);

  const handleOk = () => {
    setParticipants(guestsSelected);
    setModalVisible(false);
  };

  const handleClickParticipant = useCallback((guest: IGuestUser) => {
    setGuestsSelected((oldSelecteds) => {
      if (oldSelecteds.includes(guest))
        oldSelecteds = oldSelecteds.filter(element => element !== guest);
      else
        oldSelecteds.push(guest);
      return oldSelecteds;
    });
  }, [guestsSelected]);

  const renderGuest = useCallback((guest: IGuestUser) => {
    const color = guestsSelected.includes(guest) ? 'blue' : 'gray';
    return (
      <Button
        key={guest.id}
        title={guest.name}
        onPress={() => handleClickParticipant(guest)}
        color={color}
      />
    );
  }, [handleClickParticipant]);

  useEffect(() => {
    LoadGuests();
  }, [LoadGuests]);

  return (
    <View>
      <CustomModal modalVisible={modalVisible}>
        <>
          <FlatList
            data={guests}
            renderItem={({item}) => renderGuest(item.User)}
            keyExtractor={({User}: IGuest) => User.id }
          />
          <Button title='Finalizar' onPress={handleOk} />
        </>
      </CustomModal>
      <CustomButton
        title='Adicionar participante'
        onPress={() => setModalVisible(true)}
      />
    </View>
  );
};

export default AddParticipant;
