import React, { useEffect, useState } from 'react';
import styles from '../../styles/Sugestao.styles';
import { View, Text, ScrollView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SugestaoCard from './SugestaoCard';
import Header from '../../Components/Header';
import { useDataStore } from '../../store/dataStore';

const Container: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return Platform.OS === 'ios' ? (
    <SafeAreaView style={styles.container}>{children}</SafeAreaView>
  ) : (
    <View style={styles.container}>{children}</View>
  );
};

const Sugestao = () => {
  const store = useDataStore();
  const [medias, setMedias] = useState(store.medias);

  useEffect(() => {
    const fetchData = async () => {
      await store.fetchMedia();
      setMedias(store.medias);
    };

    fetchData();
  }, []);

  const dadosSensor = {
    N: (medias?.MediaNitrogenio ?? 0).toFixed(2),
    P: (medias?.MediaFosforo ?? 0).toFixed(2),
    K: (medias?.MediaPotassio ?? 0).toFixed(2),
    H: (medias?.MediaUmidade ?? 0).toFixed(2),
    T: (medias?.MediaTemperatura ?? 0).toFixed(2),
    CE: (medias?.MediaCondutividade ?? 0).toFixed(2),
    PH: (medias?.MediaPH ?? 0).toFixed(2),
  };

  const plantas = [
    {
      nome: 'Milho',
      requisitos: {
        N: [1, 6],
        P: [10, 20],
        K: [10, 22],
        H: [8, 19],
        T: [13, 20],
        CE: [12, 23],
        PH: [8, 20],
      },
    },
    {
      nome: 'Trigo',
      requisitos: {
        N: [2, 10],
        P: [22, 33],
        K: [25, 35],
        H: [30, 60],
        T: [30, 45],
        CE: [35, 50],
        PH: [6, 8],
      },
    },
    {
      nome: 'Feijão',
      requisitos: {
        N: [1, 5],
        P: [23, 35],
        K: [15, 27],
        H: [38, 78],
        T: [30, 45],
        CE: [35, 50],
        PH: [6, 8],
      },
    },
    {
      nome: 'Batata',
      requisitos: {
        N: [1, 6],
        P: [20, 30],
        K: [25, 35],
        H: [30, 60],
        T: [30, 45],
        CE: [35, 50],
        PH: [6, 8],
      },
    },
  ];

  const plantasCompatíveis = plantas.filter((planta) =>
    Object.entries(planta.requisitos).every(([sigla, [min, max]]) => {
      const valor = parseFloat(dadosSensor[sigla as keyof typeof dadosSensor]);
      return valor >= min && valor <= max;
    })
  );

  return (
    <Container>
      <Header title="Sugestões" />
      <Text style={styles.texthistorico}>O que você pode plantar?</Text>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {plantasCompatíveis.length > 0 ? (
          plantasCompatíveis.map((planta, index) => (
            <SugestaoCard
              key={index}
              data={planta.nome}
              elementos={Object.entries(planta.requisitos).map(([sigla, [min, max]]) => ({
                sigla,
                valor: parseFloat(dadosSensor[sigla as keyof typeof dadosSensor]),
                unidade:
                  sigla === 'PH'
                    ? ''
                    : sigla === 'T'
                    ? 'C°'
                    : sigla === 'H'
                    ? '%'
                    : sigla === 'CE'
                    ? 'uS/cm'
                    : 'mg/kg',
                min,
                max,
              }))}
            />
          ))
        ) : (
          <Text style={styles.noResultsText}>
            Nenhuma planta compatível encontrada com os valores atuais do solo.
          </Text>
        )}
      </ScrollView>
    </Container>
  );
};

export default Sugestao;