import { StyleSheet, Dimensions } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0D141C',
  },
  container: {
    flex: 1,
    backgroundColor: '#0D141C',
    paddingTop: 20,
  },
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  titleGrafico: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  graphContainer: {
    width: SCREEN_WIDTH,
    flex: 1,
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#0D141C',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#fff',
    marginTop: 10,
    fontSize: 16,
  },
});

export default styles;