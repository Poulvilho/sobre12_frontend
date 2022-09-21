import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  row: {
    flexDirection: 'row',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  datepicker: {
    marginTop: 12,
  },
  save:{
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 0,
    borderRadius:0,
    position: 'absolute',
    top: '75%',
  },
});
