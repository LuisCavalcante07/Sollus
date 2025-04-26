import React from 'react';
import { View, StyleSheet, Text, Image, Dimensions, ScrollView } from 'react-native';
import SugestaoCard from './SugestaoCard'

const { width, height } = Dimensions.get('window');

const Sugestao = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../../assets/Person.png')} style={styles.person} />
        <View style={styles.viewHisto}>
          <Text style={styles.HistoricoMedicoes}>Sugestões</Text>
        </View>
        <Image source={require('../../assets/logo.png')} style={styles.logoimagem} />
      </View>

      <Text style={styles.texthistorico}>O que voçê pode plantar?</Text>

      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <SugestaoCard
          data="Milho"
          elementos={[
            { sigla: 'N', valor: 87, unidade: 'mg/kg' },
            { sigla: 'P', valor: 54, unidade: 'mg/kg' },
            { sigla: 'K', valor: 29, unidade: 'mg/kg' },
            { sigla: 'H', valor: 13, unidade: '%' },
            { sigla: 'T', valor: 44, unidade: 'C°' },
            { sigla: 'CE', valor: 26, unidade: 'uS/cm' },
            { sigla: 'PH', valor: 12, unidade: '' },
          ]}
        />

        <SugestaoCard
          data="Trigo"
          elementos={[
            { sigla: 'N', valor: 80, unidade: 'mg/kg' },
            { sigla: 'P', valor: 45, unidade: 'mg/kg' },
            { sigla: 'K', valor: 33, unidade: 'mg/kg' },
            { sigla: 'H', valor: 12, unidade: '%' },
            { sigla: 'T', valor: 40, unidade: 'C°' },
            { sigla: 'CE', valor: 28, unidade: 'uS/cm' },
            { sigla: 'PH', valor: 11, unidade: '' },
          ]} 
        />


<SugestaoCard
          data="Feijão"
          elementos={[
            { sigla: 'N', valor: 87, unidade: 'mg/kg' },
            { sigla: 'P', valor: 54, unidade: 'mg/kg' },
            { sigla: 'K', valor: 29, unidade: 'mg/kg' },
            { sigla: 'H', valor: 13, unidade: '%' },
            { sigla: 'T', valor: 44, unidade: 'C°' },
            { sigla: 'CE', valor: 26, unidade: 'uS/cm' },
            { sigla: 'PH', valor: 12, unidade: '' },
          ]}
        />



<SugestaoCard
          data="Batata"
          elementos={[
            { sigla: 'N', valor: 87, unidade: 'mg/kg' },
            { sigla: 'P', valor: 54, unidade: 'mg/kg' },
            { sigla: 'K', valor: 29, unidade: 'mg/kg' },
            { sigla: 'H', valor: 13, unidade: '%' },
            { sigla: 'T', valor: 44, unidade: 'C°' },
            { sigla: 'CE', valor: 26, unidade: 'uS/cm' },
            { sigla: 'PH', valor: 12, unidade: '' },
          ]}
        />



<SugestaoCard
          data="Merda"
          elementos={[
            { sigla: 'N', valor: 87, unidade: 'mg/kg' },
            { sigla: 'P', valor: 54, unidade: 'mg/kg' },
            { sigla: 'K', valor: 29, unidade: 'mg/kg' },
            { sigla: 'H', valor: 13, unidade: '%' },
            { sigla: 'T', valor: 44, unidade: 'C°' },
            { sigla: 'CE', valor: 26, unidade: 'uS/cm' },
            { sigla: 'PH', valor: 12, unidade: '' },
          ]}
        />


<SugestaoCard
          data="Merda2"
          elementos={[
            { sigla: 'N', valor: 87, unidade: 'mg/kg' },
            { sigla: 'P', valor: 54, unidade: 'mg/kg' },
            { sigla: 'K', valor: 29, unidade: 'mg/kg' },
            { sigla: 'H', valor: 13, unidade: '%' },
            { sigla: 'T', valor: 44, unidade: 'C°' },
            { sigla: 'CE', valor: 26, unidade: 'uS/cm' },
            { sigla: 'PH', valor: 12, unidade: '' },
          ]}
        />


<SugestaoCard
          data="Merda3"
          elementos={[
            { sigla: 'N', valor: 87, unidade: 'mg/kg' },
            { sigla: 'P', valor: 54, unidade: 'mg/kg' },
            { sigla: 'K', valor: 29, unidade: 'mg/kg' },
            { sigla: 'H', valor: 13, unidade: '%' },
            { sigla: 'T', valor: 44, unidade: 'C°' },
            { sigla: 'CE', valor: 26, unidade: 'uS/cm' },
            { sigla: 'PH', valor: 12, unidade: '' },
          ]}
        />
      </ScrollView>
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
  viewHisto: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  HistoricoMedicoes: {
    color: '#FFFEFF',
    fontSize: width * 0.05,
    fontWeight: '600',
  },
  logoimagem: {
    width: width * 0.1,
    height: width * 0.1,
  },
  person: {
    width: 32,
    height: 32,
    aspectRatio: 1,
  },
  texthistorico: {
    fontSize: 30,
    fontFamily: 'Roboto-Regular',
    color: '#fff',
    textAlign: 'left',
    marginTop: 14.5,
  },
  scrollContainer: {
    paddingBottom: 30,
    paddingTop: 10,
    alignItems: 'center',
  },
});

export default Sugestao;
