import { StyleSheet } from "react-native";
import { colors } from '../../styles';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.DarkBlue,
      alignItems: 'center',
      paddingTop: 20,
      width: '100%',
    },
    logoContainer: {
      width: 345,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      marginTop: 126,
    },
    logo: {
      width: '100%',
      height: 98,
      resizeMode: 'contain',
    },
    title: {
      color: colors.White,
      fontSize: 24,
      fontWeight: '400',
    },
    inputContainer: {
      marginTop: 20,
      width: '90%',
    },
    forgotPassword: {
      color: colors.White,
      fontSize: 16,
      fontWeight: '200',
      textDecorationLine: 'underline',
      marginTop: 10,
      alignSelf: 'flex-start',
      marginLeft: '5%',
    },
    button: {
      width: '90%',
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 16,
      backgroundColor: colors.StrongGreen,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.25,
      shadowRadius: 12,
      elevation: 5,
      marginTop: 70,
    },
    buttonText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: colors.White,
    },
    signupContainer: {
      flexDirection: 'row',
      marginTop: 68,
      alignItems: 'center',
    },
    signupText: {
      color: colors.White,
      fontSize: 18,
      fontWeight: '300',
    },
    signupLink: {
      color: colors.White,
      fontSize: 18,
      fontWeight: '300',
      textDecorationLine: 'underline',
      marginLeft: 5,
    },
  });

export default styles;