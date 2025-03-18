import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const Confirmação = () => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
       
        <View style={styles.svgPosition}>
          <Svg width="75" height="76" viewBox="0 0 75 76">
            <Path d="M26.227 76L0 39.9751L6.55675 30.9688L26.227 57.9875L68.4433 0L75 9.00624L26.227 76Z" fill="black" />
          </Svg>
        </View>
      </View>
      <Text style={styles.senha}>Senha alterada!</Text>
    </View>
  );
};

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
    width: 208, 
    height: 208, 
    borderRadius: 104, 
    backgroundColor: '#00B15E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  svgPosition: {
    position: 'absolute', 
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

export default Confirmação;