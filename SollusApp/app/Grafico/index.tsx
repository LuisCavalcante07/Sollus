import { View, StyleSheet, TouchableOpacity, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../Components/Header";
import AntDesign from '@expo/vector-icons/AntDesign';
import GraphParams from "../../Components/GraphParams";
import { useState, useEffect } from "react";
import { useDataStore } from "../../store/dataStore";
import { useLocalSearchParams } from "expo-router";

export default function Grafico() {
  const { fetchHistory } = useDataStore();
  const parametros = ["Nitrogênio", "Fósforo", "Potássio", "Temperatura", "Condutividade", "Umidade", "pH"];

  // Captura o parâmetro da URL
  const { param } = useLocalSearchParams();

  // Definir o índice do gráfico a partir do parâmetro passado
  const [currentGraph, setCurrentGraph] = useState<number>(
    parametros.indexOf(param as string) !== -1 ? parametros.indexOf(param as string) : 0
  );

  const nextGraph = () => {
    if (currentGraph < parametros.length - 1) {
      setCurrentGraph(currentGraph + 1);
    }
  };

  const previousGraph = () => {
    if (currentGraph > 0) {
      setCurrentGraph(currentGraph - 1);
    }
  };

  useEffect(() => {
    fetchHistory();
    setTimeout(() => {
      console.log('DADOS ATUAIS DO HISTÓRICO:', useDataStore.getState().dados);
    }, 2000);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header title='Gráfico de Leituras' />

      <View style={styles.containerMenu}>
        <TouchableOpacity onPress={previousGraph}>
          <AntDesign name="left" size={24} color="white" />
        </TouchableOpacity>

        <Text style={styles.titleGrafico}>Gráfico de {parametros[currentGraph]}</Text>

        <TouchableOpacity onPress={nextGraph}>
          <AntDesign name="right" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <GraphParams parametro={parametros[currentGraph]} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D141C',
    alignItems: 'center',
  },
  containerMenu: {
    flexDirection: 'row',
    paddingTop: 50,
    gap: 20,
    alignItems: 'center', // Certificando-se que os itens fiquem alinhados
  },
  titleGrafico: {
    color: 'white',
    fontSize: 25,
  }
});
