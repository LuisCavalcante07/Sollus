import React from 'react';
import { View, StyleSheet, Text, Image, Dimensions, TouchableOpacity } from 'react-native';
import { colors } from '../../styles';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');
const Relatorio = () => {
  const router = useRouter();
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.arrowButton}>
          <Feather name="arrow-left-circle" size={35} color="#00B15E" />
        </TouchableOpacity>
        <View style={styles.viewBem}>
          <Text style={styles.bemVindo}>Relatório atual</Text>
        </View>
        <Image source={require('../../assets/logo.png')} style={styles.logoimagem} />
      </View>
      <View style={styles.retangulo}>
        <View style={styles.retangulo2}>
          <Image source={require('../../assets/arquivo.png')} style={styles.arquivo} />
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Baixar PDF</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D141C',
    alignItems: 'center',
  },
  header: {
    width: '100%',
    height: height * 0.08,
    paddingHorizontal: width * 0.05,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#21242D',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 9,
    elevation: 9,
  },
  arrowButton: {
    // Adicionado para controlar o tamanho do botão da seta
    padding: 5, // Adiciona um pouco de espaço ao redor do ícone
  },
  viewBem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bemVindo: {
    color: '#FFFEFF',
    fontSize: width * 0.05,
    fontWeight: '600',
  },
  logoimagem: {
    width: width * 0.1,
    height: width * 0.1,
  },
  retangulo: {
    width: 361,
    height: 608,
    backgroundColor: '#3D414D',
    borderRadius: 28,
    marginTop: 136,
    alignItems: 'center',
  },
  retangulo2: {
    marginTop: 96,
    width: 248,
    height: 376,
    backgroundColor: '#0D141C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  arquivo: {
    width: 193,
    height: 193,
  },
  button: {
    width: 272,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    backgroundColor: colors.StrongGreen,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 5,
    marginTop: 48,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.White,
  },
});

export default Relatorio;