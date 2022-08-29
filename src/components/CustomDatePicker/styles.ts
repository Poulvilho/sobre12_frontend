import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

export const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.light.primaryColor,
    padding: 10,
    borderRadius: 12,
    elevation: 7,
    flexDirection: 'row',
    width: 120,
  },
  text: {
    alignSelf: 'center',
    color: Colors.light.secondaryButton,
  },
  icon:{
    marginLeft: 10,
    color: Colors.light.secondaryButton,
  },
});
