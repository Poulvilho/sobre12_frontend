import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

export const styles = StyleSheet.create({
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginBottom: 16,
  },
  selected:{
    // backgroundColor: Colors.light.primaryColor,
    padding: 8,
    width: '50%',
    alignItems: 'center',
    borderBottomColor: Colors.light.primaryColor,
    borderBottomWidth: 2,
  },
  selectedText:{
    color: Colors.light.primaryColor,
  },
  notSelected:{
    backgroundColor: Colors.light.secondaryColor,
    padding: 8,
    width: '50%',
    alignItems: 'center',
  },
  notSelectedText:{
    color: Colors.light.text,
  },
});
