import React, { useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import HistoricoCard from '../../Components/HistoricoCard';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Header from '../../Components/Header';
import { useDataStore } from '../../store/dataStore';

const Historico = () => {
  const { dados, fetchHistory, deleteData } = useDataStore();

  const DeleteHistorico = () => {
    Alert.alert(
      'Confirmação',
      'Tem certeza que deseja deletar todo o histórico?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Deletar',
          style: 'destructive',
          onPress: () => {
            deleteData();
          },
        },
      ],
      { cancelable: true }
    );
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header title='Historico das medições' />

      <View style={styles.containerDeleteBt}>
        <TouchableOpacity style={styles.deleteButton} onPress={DeleteHistorico}>
          <FontAwesome5 name="trash-alt" size={18} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {dados.map((item, index) => (
          <HistoricoCard
            key={item.id || index}
            data={new Date(item.ReadDate || '').toLocaleString()}
            elementos={[
              { sigla: 'N', valor: item.nitrogenio, unidade: 'mg/kg' },
              { sigla: 'P', valor: item.fosforo, unidade: 'mg/kg' },
              { sigla: 'K', valor: item.potassio, unidade: 'mg/kg' },
              { sigla: 'H', valor: item.umidade, unidade: '%' },
              { sigla: 'T', valor: item.temperatura, unidade: 'C°' },
              { sigla: 'CE', valor: item.condutividade, unidade: 'uS/cm' },
              { sigla: 'PH', valor: item.pH, unidade: '' },
            ]}
          />
        ))}
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
  scrollContainer: {
    paddingBottom: 30,
    paddingTop: 10,
    alignItems: 'center',
  },
  deleteButton: {
    flexDirection: 'row',
    alignContent: 'center',
    backgroundColor: '#ff4d4d',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  textBt: {
    color: '#fff',
    paddingLeft: 10,
    fontSize: 16,
    fontFamily: 'Roboto-Bold',
  },
  containerDeleteBt: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 20,
    width: '100%',
    paddingBottom: 10,
  },
});

export default Historico;
