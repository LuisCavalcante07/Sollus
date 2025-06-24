import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D141C',
  },
  texthistorico: {
    fontSize: width * 0.07,
    color: '#fff',
    textAlign: 'center',
    marginTop: 14,
    fontWeight: 'bold',
  },
  scrollContainer: {
    paddingBottom: 30,
    paddingTop: 10,
    alignItems: 'center',
  },
  noResultsText: {
    color: 'white',
    marginTop: 20,
    fontSize: width * 0.05,
    marginHorizontal: 20,
    textAlign: 'center',
  },
});

export default styles;
