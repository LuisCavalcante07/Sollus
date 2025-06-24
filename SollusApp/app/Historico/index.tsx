import React, { useEffect } from 'react';
import styles from '../../styles/Historico.styles';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import HistoricoCard from '../../Components/HistoricoCard';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Header from '../../Components/Header';
import { useDataStore } from '../../store/dataStore';

// Container para SafeAreaView no iOS, View no Android/Web
const Container: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  if (Platform.OS === 'ios') {
    return <SafeAreaView style={styles.container}>{children}</SafeAreaView>;
  }
  return <View style={styles.container}>{children}</View>;
};

const Historico = () => {
  const { dados, fetchHistory, deleteData } = useDataStore();

  const DeleteHistorico = () => {
    Alert.alert(
      'Confirmação',
      'Tem certeza que deseja deletar todo o histórico?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Deletar', style: 'destructive', onPress: () => deleteData() },
      ],
      { cancelable: true }
    );
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <Container>
      <Header title="Historico das medições" />

      <View style={styles.containerDeleteBt}>
        <TouchableOpacity style={styles.deleteButton} onPress={DeleteHistorico}>
          <FontAwesome5 name="trash-alt" size={18} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
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
    </Container>
  );
};


export default Historico;