import React, { useCallback, useEffect, useState } from 'react';
import { FlatList } from 'react-native';

import { useContract } from '../../contexts/contract';

import { View } from '../../components/Themed';
import CustomModal from '../../components/CustomModal';
import CustomButton from '../../components/CustomButton';

import { GetGuests, IGuest, IGuestUser } from '../Guest/api';
import GuestInCostItem from '../../components/GuestInCostItem';

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
      setGuests(response.data.filter((guest) => 
        guest.User.id !== contract!.guest,
      ));
    });
  }, [contract]);

  const handleOk = () => {
    setParticipants(guestsSelected);
    setModalVisible(false);
  };

  const handleClickParticipant = useCallback((guest: IGuestUser) => {
    const guestindex = guestsSelected.indexOf(guest);
    setGuestsSelected((oldSelecteds) => {
      if (guestindex != -1)
        oldSelecteds.splice(guestindex,1);
      else
        oldSelecteds.push(guest);
      return oldSelecteds;
    });
  }, [guestsSelected]);

  const renderGuest = useCallback((guest: IGuestUser) => {
    const isParticipant = guestsSelected.includes(guest);
    return (
      <GuestInCostItem
        key={guest.id}
        guest={guest}
        onPress={() => 
          handleClickParticipant(guest)
        }
        isParticipant={isParticipant}
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
            renderItem={({item}) =>
              renderGuest(item.User)
            }
            keyExtractor={({User}: IGuest) => User.id }
          />
          <CustomButton
            title='Finalizar'
            onPress={handleOk}
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

export default AddParticipant;
