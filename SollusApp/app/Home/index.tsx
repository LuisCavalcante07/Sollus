import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { View, StyleSheet, Text, Image, Dimensions, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { useDataStore } from '../../store/dataStore';

const { width, height } = Dimensions.get('window');

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
  { name: 'Nitrogênio', icon: require('../../assets/nitrogen.png'), unit: 'PPM', value: ultimaLeitura?.nitrogenio },
  { name: 'Fósforo', icon: require('../../assets/Fosforo.png'), unit: 'PPM', value: ultimaLeitura?.fosforo },
  { name: 'Potássio', icon: require('../../assets/Potassio.png'), unit: 'PPM', value: ultimaLeitura?.potassio },
  { name: 'Temperatura', icon: require('../../assets/Temperature.png'), unit: '°C', value: ultimaLeitura?.temperatura },
  { name: 'Condutividade', icon: require('../../assets/Condutividade.png'), unit: 'uS/m', value: ultimaLeitura?.condutividade },
  { name: 'Umidade', icon: require('../../assets/Umidade.png'), unit: '%', value: ultimaLeitura?.umidade },
  { name: 'pH', icon: require('../../assets/pH.png'), unit: '', value: ultimaLeitura?.pH },
  ];

  return (
    <SafeAreaView style={styles.container}>
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
        <TouchableOpacity style={styles.btn} activeOpacity={0.7} onPress={() => router.push("Relatorio")}>
          <View style={styles.bola}>
            <Image source={require('../../assets/Relatorio.png')} style={styles.icon} />
          </View>
          <Text style={styles.btnText}>Relatório</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} activeOpacity={0.7} onPress={() => router.push("Grafico")}>
          <View style={styles.bola}>
            <Image source={require('../../assets/Grafico.png')} style={styles.icon} />
          </View>
          <Text style={styles.btnText}>Gráfico</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} activeOpacity={0.7} onPress={() => router.push("Historico")}>
          <View style={styles.bola}>
            <Image source={require('../../assets/Historico.png')} style={styles.icon} />
          </View>
          <Text style={styles.btnText}>Histórico</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} activeOpacity={0.7} onPress={() => router.push("Sugestoes")}>
          <View style={styles.bola}>
            <Image source={require('../../assets/Sugestao.png')} style={styles.sugestaoIcon} />
          </View>
          <Text style={styles.btnText}>Sugestão</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} activeOpacity={0.7} onPress={() => router.push("Tutorial")}>
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
      </TouchableOpacity>  */}

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D141C',
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
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: width * 0.02,
    marginTop: height * 0.05,
  },
  dados: {
    padding: width * 0.05,
    alignItems: 'center',
    width: width * 0.8,
    height: height * 0.6,
    borderRadius: width * 0.05,
    backgroundColor: '#21242D',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 24,
    elevation: 5,
  },
  bemVindo: {
    color: '#FFFEFF',
    fontSize: width * 0.05,
    fontWeight: '600',
  },
  viewBem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoimagem: {
    width: width * 0.1,
    height: width * 0.1,
  },
  btn: {
    alignItems: 'center',
  },
  bola: {
    width: width * 0.14,
    height: width * 0.14,
    borderRadius: width * 0.07,
    backgroundColor: '#00B15E',
    marginBottom: height * 0.01,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    textAlign: 'center',
    fontSize: width * 0.03,
  },
  icon: {
    width: width * 0.06,
    height: width * 0.06,
    aspectRatio: 1,
  },
  dadosRecentes: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: height * 0.03,
  },
  viewMaior: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgdados: {
    width: width * 0.06,
    height: width * 0.06,
  },
  textDadosRecentes: {
    color: '#FF8C42',
    marginRight: width * 0.02,
    fontSize: width * 0.05,
    fontWeight: 'bold',
  },
  rectangle: {
    width: width * 0.6,
    height: height * 0.06,
    borderRadius: width * 0.02,
    backgroundColor: '#fff',
    marginBottom: height * 0.015,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: width * 0.02,
  },
  person: {
    width: width * 0.08,
    height: width * 0.08,
    aspectRatio: 1,
  },
  iconeRectangle: {
    width: width * 0.06,
    height: width * 0.06,
    marginRight: width * 0.02,
    tintColor: '#14AE5C',
  },
  unidade: {
    color: '#00B15E',
    fontSize: width * 0.035,
  },
  dataName: {
    flex: 1,
  },
  sugestaoIcon: {
    width: width * 0.03,
    height: width * 0.04,
  },
  comoUsarIcon: {
    width: width * 0.04,
    height: width * 0.06,
  },
});

export default Home;