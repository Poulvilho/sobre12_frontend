import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: '10%',
  },
  row: {
    margin: 10,
  },
  title: {
    width: '100%',
    backgroundColor: Colors.light.primaryColor,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  exit:{
    // color: Colors.light.secondaryButton,
  },
  trip: {
    width: '90%',
  },
});
