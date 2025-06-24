import React from 'react';
import { View, Text } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import styles from '../../styles/Confirmacao.styles';

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

export default Confirmação;