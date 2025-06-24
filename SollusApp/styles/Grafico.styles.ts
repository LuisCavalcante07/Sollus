import { StyleSheet, Dimensions, Platform } from 'react-native';

const { height } = Dimensions.get('window');

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0D141C',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    color: '#fff',
    fontSize: 16,
  },
  menuContainer: {
    width: '90%',
    marginTop: 15,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    alignItems: 'center',
    marginLeft: 20,
  },
  titleGrafico: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  graphScrollContainer: {
    flex: 1,
    width: '100%',
  },
  graphContainer: {
    paddingHorizontal: 15,
    paddingBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: height * 0.7,
  },
});