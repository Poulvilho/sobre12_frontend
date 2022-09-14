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
  tab:{
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderLeftWidth: 0.1,
    borderRightWidth: 0.1,
    elevation: 7,
  },
  selected:{
    borderBottomWidth: 2,
    borderBottomColor: Colors.light.primaryColor,
    elevation: 0,

  },
  selectedText:{
    color: Colors.light.primaryColor,
  },
  notSelected:{
    backgroundColor: Colors.light.secondaryColor,
  },
  notSelectedText:{
    color: Colors.light.text,
  },
});
