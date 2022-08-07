import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  centeredView: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 35,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.12,
    shadowRadius: 60,
    elevation: 5,
  },
});

export default styles;
