import { useRouter } from 'expo-router';
import styles from '../../styles/Home.styles';
import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
import { useDataStore } from '../../store/dataStore';

const Container: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  if (Platform.OS === 'ios') {
    return <SafeAreaView style={styles.container}>{children}</SafeAreaView>;
  }
  return <View style={styles.container}>{children}</View>;
};

const Home = () => {
  const router = useRouter();
  const { ultimaLeitura, isLoading, fetchData, sendData } = useDataStore();

  useEffect(() => {
    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const data = [
    {
      name: 'Nitrogênio',
      icon: require('../../assets/nitrogen.png'),
      unit: 'PPM',
      value: ultimaLeitura?.nitrogenio,
    },
    {
      name: 'Fósforo',
      icon: require('../../assets/Fosforo.png'),
      unit: 'PPM',
      value: ultimaLeitura?.fosforo,
    },
    {
      name: 'Potássio',
      icon: require('../../assets/Potassio.png'),
      unit: 'PPM',
      value: ultimaLeitura?.potassio,
    },
    {
      name: 'Temperatura',
      icon: require('../../assets/Temperature.png'),
      unit: '°C',
      value: ultimaLeitura?.temperatura,
    },
    {
      name: 'Condutividade',
      icon: require('../../assets/Condutividade.png'),
      unit: 'uS/m',
      value: ultimaLeitura?.condutividade,
    },
    {
      name: 'Umidade',
      icon: require('../../assets/Umidade.png'),
      unit: '%',
      value: ultimaLeitura?.umidade,
    },
    {
      name: 'pH',
      icon: require('../../assets/pH.png'),
      unit: '',
      value: ultimaLeitura?.pH,
    },
  ];

  return (
    <Container>
      <StatusBar barStyle="light-content" backgroundColor="#21242D" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('Perfil')}>
          <Image source={require('../../assets/Person.png')} style={styles.person} />
        </TouchableOpacity>
        <View style={styles.viewBem}>
          <Text style={styles.bemVindo}>Bem Vindo</Text>
        </View>
        <Image source={require('../../assets/logo.png')} style={styles.logoimagem} />
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity style={styles.btn} activeOpacity={0.7} onPress={() => router.push('Relatorio')}>
          <View style={styles.bola}>
            <Image source={require('../../assets/Relatorio.png')} style={styles.icon} />
          </View>
          <Text style={styles.btnText}>Relatório</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} activeOpacity={0.7} onPress={() => router.push('Grafico')}>
          <View style={styles.bola}>
            <Image source={require('../../assets/Grafico.png')} style={styles.icon} />
          </View>
          <Text style={styles.btnText}>Gráfico</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} activeOpacity={0.7} onPress={() => router.push('Historico')}>
          <View style={styles.bola}>
            <Image source={require('../../assets/Historico.png')} style={styles.icon} />
          </View>
          <Text style={styles.btnText}>Histórico</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} activeOpacity={0.7} onPress={() => router.push('Sugestoes')}>
          <View style={styles.bola}>
            <Image source={require('../../assets/Sugestao.png')} style={styles.sugestaoIcon} />
          </View>
          <Text style={styles.btnText}>Sugestão</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} activeOpacity={0.7} onPress={() => router.push('Tutorial')}>
          <View style={styles.bola}>
            <Image source={require('../../assets/Comousar.png')} style={styles.comoUsarIcon} />
          </View>
          <Text style={styles.btnText}>Como usar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.viewMaior}>
        <View style={styles.dados}>
          <View style={styles.dadosRecentes}>
            <Text style={styles.textDadosRecentes}>Dados Recentes</Text>
            <Image source={require('../../assets/Dados.png')} style={styles.imgdados} />
          </View>

          {data.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                router.push(`Grafico?param=${item.name}`);
              }}
            >
              <View
                style={[
                  styles.rectangle,
                  {
                    borderLeftColor: index % 2 === 0 ? '#00B15E' : '#FF8C42',
                    borderLeftWidth: 5,
                  },
                ]}
              >
                <Image source={item.icon} style={styles.iconeRectangle} />
                <Text style={styles.dataName}>{item.name}</Text>
                <Text
                  style={[
                    styles.unidade,
                    { color: index % 2 === 0 ? '#00B15E' : '#FF8C42' },
                  ]}
                >
                  {item.value} {item.unit}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* 
      <TouchableOpacity style={styles.btn} activeOpacity={0.7} onPress={sendData}>
        <View style={styles.bola}>
          <Text style={styles.btnText}>{isLoading ? 'Enviando...' : 'Enviar Dados Aleatórios'}</Text>
        </View>
      </TouchableOpacity> 
      */}
    </Container>
  );
};

export default Home;