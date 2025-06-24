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
  iconBack: {
    position: 'absolute',
    top: height * 0.05,
    left: width * 0.05,
    zIndex: 10,
  },
  logoContainer: {
    width: '90%',
    alignItems: 'center',
    marginTop: height * 0.1,
  },
  logo: {
    width: '100%',
    height: height * 0.12,
  },
  title: {
    color: colors.White,
    fontSize: width * 0.06,
    fontWeight: '400',
    marginTop: 8,
  },
  inputContainer: {
    marginTop: 20,
    width: '90%',
  },
  button: {
    width: '90%',
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    backgroundColor: colors.StrongGreen,
    marginTop: height * 0.05,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 5,
  },
  buttonText: {
    fontSize: width * 0.045,
    fontWeight: 'bold',
    color: colors.White,
  },
  errorText: {
    color: '#E40606',
    fontSize: width * 0.04,
    textAlign: 'center',
    marginTop: 10,
  },
});

export default styles;