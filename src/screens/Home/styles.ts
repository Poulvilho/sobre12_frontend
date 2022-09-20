import { Platform, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: Colors.light.background,
    marginTop: Platform.OS === 'android' ? '7%' : 0,
  },
  row: {
    margin: 10,
  },
  title: {
    width: '100%',
    backgroundColor: Colors.light.primaryColor,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  user:{
    marginLeft: 130,
  },
  icon:{
    color: Colors.light.text,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  exit:{
    backgroundColor: Colors.light.secondaryColor,
    borderRadius: 100,
    marginRight: 10,
  },
  trip: {
    width: '90%',
  },
});
