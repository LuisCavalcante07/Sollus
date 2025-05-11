import { StyleSheet } from "react-native";
import { colors } from '../../styles';

const styles = StyleSheet.create({
  label: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 15,
    marginTop: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: '#21242D',
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 7,
    elevation: 5,
    marginTop: 5,
  },
  icon: {
    marginRight: 15,
  },
  input: {
    lineHeight: 20,
    paddingVertical: 0,
    fontSize: 16,
    color: colors.White,
    flex: 1,
  },
  eyeIcon: {
    marginLeft: 10,
    padding: 4,
    borderRadius: 20,
    backgroundColor: '#2A2D37',
  },
});

export default styles;