import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get('window');

const DarkBackground = '#0D141C';
const StrongGreen = '#00B15E';
const SecondaryBackground = '#21242D';
const White = '#FFFEFF';
const ShadowColor = '#000';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DarkBackground,
    alignItems: 'center',
  },
  header: {
    width: '100%',
    height: height * 0.08,
    paddingHorizontal: width * 0.05,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: SecondaryBackground,
    justifyContent: 'space-between',
    shadowColor: ShadowColor,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
  arrowButton: {
    padding: 8,
  },
  viewBem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bemVindo: {
    color: White,
    fontSize: width * 0.05,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  logoimagem: {
    width: width * 0.1,
    height: width * 0.1,
  },
  retangulo: {
    width: width * 0.9,
    height: height * 0.7,
    backgroundColor: '#2C333D',
    borderRadius: 30,
    marginTop: height * 0.1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: height * 0.05,
  },
  retangulo2: {
    width: '60%',
    height: '50%',
    backgroundColor: DarkBackground,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arquivo: {
    width: '70%',
    height: '70%',
    resizeMode: 'contain',
  },
  button: {
    width: '70%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: StrongGreen,
    shadowColor: ShadowColor,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: White,
  },
});

export default styles;