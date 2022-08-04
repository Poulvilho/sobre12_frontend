import React, { ReactChild } from 'react';
import { Modal, View } from 'react-native';
import styles from './styles';

interface ICustomModal {
  modalVisible: boolean;
  children: ReactChild;
}

const CustomModal = ({
  modalVisible = false,
  children,
}: ICustomModal) => {
  return(
    <Modal
      animationType="slide"
      transparent
      visible={modalVisible}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>{children}</View>
      </View>
    </Modal>
  );
};

export default CustomModal;
