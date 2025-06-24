import React, { useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import styles from '../../styles/Home.styles';
import { useDataStore } from '../../store/dataStore';

const Container: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return Platform.OS === 'ios' ? (
    <SafeAreaView style={styles.container}>{children}</SafeAreaView>
  ) : (
    <View style={styles.container}>{children}</View>
  );
};

const Home = () => {
  const router = useRouter();
  const { ultimaLeitura, fetchData } = useDataStore();

  useEffect(() => {
    fetchData();
    const interval = setInterval(() => fetchData(), 5000);
    return () => clearInterval(interval);
  }, [fetchData]);

  const data = [
    { name: 'Nitrogênio', icon: require('../../assets/nitrogen.png'), unit: 'PPM', value: ultimaLeitura?.nitrogenio },
    { name: 'Fósforo', icon: require('../../assets/Fosforo.png'), unit: 'PPM', value: ultimaLeitura?.fosforo },
    { name: 'Potássio', icon: require('../../assets/Potassio.png'), unit: 'PPM', value: ultimaLeitura?.potassio },
    { name: 'Temperatura', icon: require('../../assets/Temperature.png'), unit: '°C', value: ultimaLeitura?.temperatura },
    { name: 'Condutividade', icon: require('../../assets/Condutividade.png'), unit: 'uS/m', value: ultimaLeitura?.condutividade },
    { name: 'Umidade', icon: require('../../assets/Umidade.png'), unit: '%', value: ultimaLeitura?.umidade },
    { name: 'pH', icon: require('../../assets/pH.png'), unit: '', value: ultimaLeitura?.pH },
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
        {[
          { screen: 'Relatorio', icon: require('../../assets/Relatorio.png'), label: 'Relatório' },
          { screen: 'Grafico', icon: require('../../assets/Grafico.png'), label: 'Gráfico' },
          { screen: 'Historico', icon: require('../../assets/Historico.png'), label: 'Histórico' },
          { screen: 'Sugestoes', icon: require('../../assets/Sugestao.png'), label: 'Sugestão', iconStyle: styles.sugestaoIcon },
          { screen: 'Tutorial', icon: require('../../assets/Comousar.png'), label: 'Como usar', iconStyle: styles.comoUsarIcon },
        ].map(({ screen, icon, label, iconStyle }, idx) => (
          <TouchableOpacity key={idx} style={styles.btn} activeOpacity={0.7} onPress={() => router.push(screen)}>
            <View style={styles.bola}>
              <Image source={icon} style={iconStyle ?? styles.icon} />
            </View>
            <Text style={styles.btnText}>{label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.viewMaior}>
        <View style={styles.dados}>
          <View style={styles.dadosRecentes}>
            <Text style={styles.textDadosRecentes}>Dados Recentes</Text>
            <Image source={require('../../assets/Dados.png')} style={styles.imgdados} />
          </View>

          {data.map(({ name, icon, unit, value }, index) => (
            <TouchableOpacity
              key={name}
              onPress={() => router.push(`Grafico?param=${name}`)}
              activeOpacity={0.7}
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
                <Image source={icon} style={styles.iconeRectangle} />
                <Text style={styles.dataName}>{name}</Text>
                <Text
                  style={[
                    styles.unidade,
                    { color: index % 2 === 0 ? '#00B15E' : '#FF8C42' },
                  ]}
                >
                  {value ?? '-'} {unit}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Container>
  );
};

export default Home;