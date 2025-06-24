import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import GraphParams from '../../Components/GraphParams';
import Header from '../../Components/Header';
import { useDataStore } from '../../store/dataStore';
import { useLocalSearchParams } from 'expo-router';
import styles from '../../styles/Grafico.styles';

const parametros = [
  'Nitrogênio',
  'Fósforo',
  'Potássio',
  'pH',
  'Umidade',
  'Condutividade',
  'Temperatura',
];


// Componente Container para usar SafeAreaView só no iOS
const Container: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  if (Platform.OS === 'ios') {
    return <SafeAreaView style={styles.safeArea}>{children}</SafeAreaView>;
  }
  return <View style={styles.safeArea}>{children}</View>;
};

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
      <Container>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={styles.loadingText}>Carregando gráficos...</Text>
        </View>
      </Container>
    );
  }

  const parametroAtual = parametros[currentIndex];

  return (
    <Container>
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
    </Container>
  );
};

export default GraficosScreen;