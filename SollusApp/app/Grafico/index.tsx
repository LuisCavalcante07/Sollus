import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import GraphParams from '../../Components/GraphParams';
import Header from '../../Components/Header';
import { useDataStore } from '../../store/dataStore';
import { useLocalSearchParams } from 'expo-router';

const parametros = [
  'Nitrogênio',
  'Fósforo',
  'Potássio',
  'pH',
  'Umidade',
  'Condutividade',
  'Temperatura',
];

const SCREEN_WIDTH = Dimensions.get('window').width;

const GraficosScreen = () => {
  const isLoadingHistory = useDataStore((state) => state.isLoadingHistory);
  const { param } = useLocalSearchParams();

  const InitialIndex = parametros.indexOf(param as string);
  const [currentIndex, setCurrentIndex] = useState(() => {
    return InitialIndex >= 0 ? InitialIndex : 0;
  });

  const nextGraph = () => {
    setCurrentIndex((prev) => (prev + 1) % parametros.length);
  };

  const previousGraph = () => {
    setCurrentIndex((prev) => (prev - 1 + parametros.length) % parametros.length);
  };

  if (isLoadingHistory) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={styles.loadingText}>Carregando gráficos...</Text>
      </View>
    );
  }

  const parametroAtual = parametros[currentIndex];

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Gráfico de Leituras" />

      <View style={styles.menuContainer}>
        <TouchableOpacity onPress={previousGraph}>
          <AntDesign name="left" size={28} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.titleGrafico}>Gráfico de {parametroAtual}</Text>

        <TouchableOpacity onPress={nextGraph}>
          <AntDesign name="right" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.graphContainer}>
        <GraphParams parametro={parametroAtual} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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

export default GraficosScreen;