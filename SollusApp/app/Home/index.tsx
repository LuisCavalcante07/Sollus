import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import IconRelatorio from './IconRelatorio'; // Importe o componente SVG

const Home = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Svg width={32} height={32} viewBox="0 0 32 32" fill="none">
          <Path
            d="M10.6667 5.12012C12.0812 5.12012 13.4377 5.68202 14.4379 6.68221C15.4381 7.68241 16 9.03896 16 10.4535C16 11.8679 15.4381 13.2245 14.4379 14.2247C13.4377 15.2249 12.0812 15.7868 10.6667 15.7868C9.25218 15.7868 7.89562 15.2249 6.89543 14.2247C5.89524 13.2245 5.33333 11.8679 5.33333 10.4535C5.33333 9.03896 5.89524 7.68241 6.89543 6.68221C7.89562 5.68202 9.25218 5.12012 10.6667 5.12012ZM10.6667 18.4534C16.56 18.4534 21.3333 20.8401 21.3333 23.7868V26.4534H0V23.7868C0 20.8401 4.77333 18.4534 10.6667 18.4534Z"
            fill="#00B15E"
          />
        </Svg>
        <View style={styles.viewBem}>
          <Text style={styles.BemVindo}>Bem Vindo</Text>
        </View>
      </View>
      <View style={styles.frame16}>
        <View style={styles.Relatorio}>
          <IconRelatorio />
        </View>
        <View style={[styles.commonItem, styles.Graph]} />
        <View style={[styles.commonItem, styles.Historic]} />
        <View style={[styles.commonItem, styles.Sugest]} />
        <View style={[styles.commonItem, styles.Tutorial]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D141C',
  },
  header: {
    display: 'flex',
    width: '100%',
    height: 56,
    paddingLeft: 12,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 12,
    backgroundColor: '#21242D',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 9,
    elevation: 9,
  },
  BemVindo: {
    color: '#FFFEFF',
    fontFamily: 'Inter',
    fontSize: 20,
    fontWeight: '600',
  },
  viewBem: {
    marginLeft: 72,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  frame16: {
    display: 'flex',
    width: 393,
    justifyContent: 'center',
    alignItems: 'flex-end',
    gap: 17,
    backgroundColor: '#fff',
    marginTop: 48,
  },
  Relatorio: {
    display: 'flex',
    width: 54,
    height:54,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent:'center',
    gap: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 9,
    elevation: 9,
    backgroundColor: '#f0f0f0', 
  },
  commonItem: {
    display: 'flex',
    width: 54,
    flexDirection: 'column',
    alignItems: 'center',
    gap: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 9,
    elevation: 9,
  },
  Graph: {},
  Historic: {},
  Sugest: {},
  Tutorial: {},
});

export default Home;