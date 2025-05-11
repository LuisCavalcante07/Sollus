import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D141C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  ellipseIcon: {
    width: 208, // Definir largura fixa para o círculo
    height: 208, // Definir altura fixa para o círculo
    borderRadius: 104, // Metade da largura/altura para criar um círculo perfeito
    backgroundColor: '#00B15E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  svgPosition: {
    position: 'absolute', // Posicionar o SVG sobre a imagem
    alignItems: 'center',
    justifyContent: 'center',
  },
  senha:{
    fontSize: 40,
fontFamily: "Roboto-Regular",
color: "#fff",
textAlign: "left",
width: 303,
height: 144,
marginTop:72,
alignItems:'center',
justifyContent:'center'
  }
});
export default styles;