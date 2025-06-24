import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../styles';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.DarkBlue,
    alignItems: 'center',
    paddingTop: height * 0.05,
    width: '100%',
  },
  backIcon: {
    position: 'absolute',
  },
  logoContainer: {
    width: width * 0.9,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: height * 0.15,
  },
  logo: {
    width: '100%',
    height: height * 0.12,
    resizeMode: 'contain',
  },
  title: {
    color: colors.White,
    fontSize: width * 0.07,
    fontWeight: '400',
    marginTop: height * 0.05,
  },
  inputContainer: {
    marginTop: height * 0.03,
    width: '90%',
  },
  button: {
    width: '90%',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    backgroundColor: colors.StrongGreen,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 5,
    marginTop: height * 0.07,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.White,
  },
});

export default styles;