import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D141C',
    alignItems: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 30,
    paddingTop: 10,
    alignItems: 'center',
  },
  deleteButton: {
    flexDirection: 'row',
    alignContent: 'center',
    backgroundColor: '#ff4d4d',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  textBt: {
    color: '#fff',
    paddingLeft: 10,
    fontSize: 16,
    fontFamily: 'Roboto-Bold',
  },
  containerDeleteBt: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 20,
    width: '100%',
    paddingBottom: 10,
  },
});

export default styles;