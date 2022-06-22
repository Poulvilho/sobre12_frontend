import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userBox: {
    margin: '10%',
    alignSelf: 'flex-start',
    backgroundColor: 'transparent',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  row: {
    margin: '1%',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  ButtonContainer: {
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
    height: 120,
  },
});
