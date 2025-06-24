import React, { useEffect } from 'react';
import {
  View,
  ScrollView,
  Alert,
  Platform,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import HistoricoCard from '../../Components/HistoricoCard';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Header from '../../Components/Header';
import { useDataStore } from '../../store/dataStore';
import styles from '../../styles/Historico.styles';

const Container: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return Platform.OS === 'ios' ? (
    <SafeAreaView style={styles.container}>{children}</SafeAreaView>
  ) : (
    <View style={styles.container}>{children}</View>
  );
};

const Historico = () => {
  const { dados, fetchHistory, deleteData } = useDataStore();

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const handleDeleteHistorico = () => {
    if (Platform.OS === 'web') {
      const confirm = window.confirm('Tem certeza que deseja deletar o histórico?');
      if(confirm){
        deleteData();
      }
    } else {
      Alert.alert(
      'Confirmação',
      'Tem certeza que deseja deletar todo o histórico?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Deletar', style: 'destructive', onPress: () => deleteData() },
      ],
      { cancelable: true }
    );
    }
  };

  return (
    <Container>
      <Header title="Histórico das medições" />

      <TouchableOpacity style={styles.containerDeleteBt}>
        <FontAwesome5.Button
          name="trash-alt"
          size={18}
          backgroundColor="#ff4d4d"
          onPress={handleDeleteHistorico}
          borderRadius={12}
          iconStyle={{ marginRight: 0 }}
          underlayColor="#e04343"
          accessibilityLabel="Deletar histórico"
        />
      </TouchableOpacity>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {dados.map((item) => {
          // Usa id único se existir, senão índice como fallback
          const key = item.id?.toString() ?? item.ReadDate?.toString() ?? Math.random().toString();

          return (
            <HistoricoCard
              key={key}
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
          );
        })}
      </ScrollView>
    </Container>
  );
};

export default Historico;