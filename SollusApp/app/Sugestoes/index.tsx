import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Dimensions, ScrollView } from 'react-native';
import SugestaoCard from './SugestaoCard';
import Header from '../../Components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDataStore } from '../../store/dataStore';

// const { width, height } = Dimensions.get('window');

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
    N: medias?.MediaNitrogenio?.toFixed(2),
    P: medias?.MediaFosforo?.toFixed(2),
    K: medias?.MediaPotassio?.toFixed(2),
    H: medias?.MediaUmidade?.toFixed(2),
    T: medias?.MediaTemperatura?.toFixed(2),
    CE: medias?.MediaCondutividade?.toFixed(2),
    PH: medias?.MediaPH?.toFixed(2),
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
    Object.entries(planta.requisitos).every(([chave, [min, max]]) => {
      const valorSensor = dadosSensor[chave as keyof typeof dadosSensor];
      return Number(valorSensor) >= min && Number(valorSensor) <= max;
    })
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Sugestões" />

      <Text style={styles.texthistorico}>O que você pode plantar?</Text>

      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {plantasCompatíveis.length > 0 ? (
          plantasCompatíveis.map((planta, index) => (
            <SugestaoCard
              key={index}
              data={planta.nome}
              elementos={Object.entries(planta.requisitos).map(([sigla, [min, max]]) => ({
                sigla,
                valor: Number(dadosSensor[sigla as keyof typeof dadosSensor]),
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
          <Text style={{ color: 'white', marginTop: 20, fontSize: 20, marginHorizontal: 20 }}>
            Nenhuma planta compatível encontrada com os valores atuais do solo.
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D141C',
  },
  texthistorico: {
    fontSize: 30,
    fontFamily: 'Roboto-Regular',
    color: '#fff',
    textAlign: 'center',
    marginTop: 14.5,
    fontWeight: 'bold',
  },
  scrollContainer: {
    paddingBottom: 30,
    paddingTop: 10,
    alignItems: 'center',
  },
});

export default Sugestao;
