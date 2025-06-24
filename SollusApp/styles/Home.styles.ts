import { Dimensions, StyleSheet, Platform } from "react-native";

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D141C',
    // Para iOS pode querer considerar SafeArea, mas você já usou componente Container
  },

  header: {
    width: '100%',
    height: height * 0.08,
    paddingHorizontal: width * 0.05,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#21242D',
    justifyContent: 'space-between',
    // Sombra para iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 9,
    // Elevação para Android
    elevation: 9,
  },

  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: width * 0.02,
    marginTop: height * 0.05,
  },

  dados: {
    padding: width * 0.05,
    alignItems: 'center',
    width: width * 0.8,
    height: height * 0.6,
    borderRadius: width * 0.05,
    backgroundColor: '#21242D',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 24,
    elevation: 5,
  },

  bemVindo: {
    color: '#FFFEFF',
    fontSize: width * 0.05,
    fontWeight: '600',
  },

  viewBem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  logoimagem: {
    width: width * 0.1,
    height: width * 0.1,
    resizeMode: 'contain',
  },

  btn: {
    alignItems: 'center',
  },

  bola: {
    width: width * 0.14,
    height: width * 0.14,
    borderRadius: width * 0.07,
    backgroundColor: '#00B15E',
    marginBottom: height * 0.01,
    justifyContent: 'center',
    alignItems: 'center',
  },

  btnText: {
    color: 'white',
    textAlign: 'center',
    fontSize: width * 0.03,
  },

  icon: {
    width: width * 0.06,
    height: width * 0.06,
    aspectRatio: 1,
    resizeMode: 'contain',
  },

  dadosRecentes: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: height * 0.03,
  },

  viewMaior: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  imgdados: {
    width: width * 0.06,
    height: width * 0.06,
    resizeMode: 'contain',
  },

  textDadosRecentes: {
    color: '#FF8C42',
    marginRight: width * 0.02,
    fontSize: width * 0.05,
    fontWeight: 'bold',
  },

  rectangle: {
    width: width * 0.6,
    height: height * 0.06,
    borderRadius: width * 0.02,
    backgroundColor: '#fff',
    marginBottom: height * 0.015,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: width * 0.02,
  },

  person: {
    width: width * 0.08,
    height: width * 0.08,
    aspectRatio: 1,
    resizeMode: 'contain',
  },

  iconeRectangle: {
    width: width * 0.06,
    height: width * 0.06,
    marginRight: width * 0.02,
    tintColor: '#14AE5C',
    resizeMode: 'contain',
  },

  unidade: {
    color: '#00B15E',
    fontSize: width * 0.035,
  },

  dataName: {
    flex: 1,
  },

  sugestaoIcon: {
    width: width * 0.03,
    height: width * 0.04,
    resizeMode: 'contain',
  },

  comoUsarIcon: {
    width: width * 0.04,
    height: width * 0.06,
    resizeMode: 'contain',
  },
});

export default styles;