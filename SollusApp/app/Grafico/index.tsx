import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  ScrollView,
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

const Container: React.FC<{ children: React.ReactNode }> = ({ children }) =>
  Platform.OS === 'ios' ? (
    <SafeAreaView style={styles.safeArea}>{children}</SafeAreaView>
  ) : (
    <View style={styles.safeArea}>{children}</View>
  );

const GraficosScreen = () => {
  const { isLoadingHistory, fetchHistory} = useDataStore();
  const { param } = useLocalSearchParams();

  const initialIndex = parametros.indexOf(param as string);
  const [currentIndex, setCurrentIndex] = useState(initialIndex >= 0 ? initialIndex : 0);

  useEffect(()=> {
    fetchHistory();
  }, [fetchHistory])

  const nextGraph = () => setCurrentIndex((prev) => (prev + 1) % parametros.length);

  const previousGraph = () =>
    setCurrentIndex((prev) => (prev - 1 + parametros.length) % parametros.length);

  if (isLoadingHistory) {
    return (
      <Container>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={styles.loadingText.color} />
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
        <TouchableOpacity onPress={previousGraph} accessibilityLabel="Gráfico anterior">
          <AntDesign name="left" size={28} color="#fff" />
        </TouchableOpacity>

        <Text
          style={styles.titleGrafico}
          accessibilityRole="header"
          accessibilityLabel={`Gráfico de ${parametroAtual}`}
        >
          Gráfico de {parametroAtual}
        </Text>

        <TouchableOpacity onPress={nextGraph} accessibilityLabel="Próximo gráfico">
          <AntDesign name="right" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.graphScrollContainer}
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}
        showsVerticalScrollIndicator={true}
        horizontal={true}
      >
        <View style={styles.graphContainer}>
          <GraphParams parametro={parametroAtual} />
        </View>
      </ScrollView>
    </Container>
  );
};

export default GraficosScreen;