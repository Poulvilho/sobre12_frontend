import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5E5E5',
    width: '100%',
    height: 100,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  PrimaryText:{
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
  },
  content: {
    width: '80%',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
  },
  value: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
  },
  image:{
    width: 60,
    height: '100%',
    backgroundColor: '#42A4E8',
    borderRadius: 60,
    alignContent: 'center',
    alignItems: 'center',
  },
  data:{
    width: '80%',
    marginLeft: 10,
  },
})
