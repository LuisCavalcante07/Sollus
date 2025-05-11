import React from 'react';
import { View, StyleSheet, Text, Image, Dimensions, ScrollView } from 'react-native';
import SugestaoCard from '../../Components/SugestaoCard'
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../Components/Header';

const { width, height } = Dimensions.get('window');

const Sugestao = () => {
  return (
    <SafeAreaView style={styles.container}>
      
      {/* <View style={styles.header}>
        <Image source={require('../../assets/Person.png')} style={styles.person} />
        <View style={styles.viewHisto}>
          <Text style={styles.HistoricoMedicoes}>Sugestões</Text>
        </View>
        <Image source={require('../../assets/logo.png')} style={styles.logoimagem} />
      </View> */}

        <Header title='Suguestões de plantio'/>

      <Text style={styles.texthistorico}>O que você pode plantar?</Text>

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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D141C',
    alignItems: 'center',
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
