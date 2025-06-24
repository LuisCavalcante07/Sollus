import { StyleSheet, Dimensions } from "react-native";
import { colors } from '../styles';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
  flex: 1,
  backgroundColor: colors.DarkBlue,
  alignItems: 'center',
  width: '100%',
  paddingBottom: 40,
  },
  logoContainer: {
    width: width * 0.85, 
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
    fontSize: width * 0.065, 
    fontWeight: '400',
  },
  inputContainer: {
    marginTop: height * 0.025,
    width: '90%',
  },
  forgotPassword: {
    color: colors.White,
    fontSize: width * 0.04,
    fontWeight: '200',
    textDecorationLine: 'underline',
    marginTop: 10,
    alignSelf: 'flex-start',
    marginLeft: 15,
  },
  error: {
    color: "#E40606",
    marginTop: 2,
    fontWeight: '600',
  },
  button: {
    width: '90%',
    height: height * 0.055,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    backgroundColor: colors.StrongGreen,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 5,
    marginTop: height * 0.08,
  },
  buttonText: {
    fontSize: width * 0.045,
    fontWeight: 'bold',
    color: colors.White,
  },
  signupContainer: {
    flexDirection: 'row',
    marginTop: height * 0.09,
    alignItems: 'center',
  },
  signupText: {
    color: colors.White,
    fontSize: width * 0.05,
    fontWeight: '300',
  },
  signupLink: {
    color: colors.White,
    fontSize: width * 0.05,
    fontWeight: '300',
    textDecorationLine: 'underline',
    marginLeft: 5,
  },
});

export default styles;