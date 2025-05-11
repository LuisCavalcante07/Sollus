import React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { useDataStore } from '../store/dataStore';

const screenWidth = Dimensions.get('window').width;

interface GraphParamsProps {
  parametro: string; // ex: "nitrogenio", "pH"
}

interface Dados {
  nitrogenio?: number;
  fosforo?: number;
  potassio?: number;
  temperatura?: number;
  condutividade?: number;
  umidade?: number;
  pH?: number;
  ReadDate?: string;
}

const PARAM_KEYS: Record<string, keyof Dados> = {
  Nitrogênio: "nitrogenio",
  Fósforo: "fosforo",
  Potássio: "potassio",
  Temperatura: "temperatura",
  Condutividade: "condutividade",
  Umidade: "umidade",
  pH: "pH",
};

const GraphParams: React.FC<GraphParamsProps> = ({ parametro }) => {
  const { dados } = useDataStore();

  // Proteção para evitar erro se dados estiverem vazios
  if (!dados || dados.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Carregando dados...</Text>
      </View>
    );
  }

  // Filtra apenas os que contêm o parâmetro e ele não está undefined
  const chave = PARAM_KEYS[parametro];

  const dadosFiltrados = dados
    .filter(item => item[chave] !== undefined)
    .map(item => ({
      value: item[chave],
      timestamp: item.ReadDate,
    }))
    .reverse(); // Reversão dos dados para exibir os mais recentes à direita

  if (dadosFiltrados.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Sem dados para {parametro}</Text>
      </View>
    );
  }

  const chartData = {
    labels: dadosFiltrados.map((item) =>
      item.timestamp ? new Date(item.timestamp).toLocaleDateString() : 'Data inválida'
    ),
    datasets: [
      {
        data: dadosFiltrados.map((item) => item.value).filter((value): value is number => typeof value === 'number'),
      },
    ],
  };

  // Defina um valor fixo para o espaço entre as datas (em pixels)
  const spaceBetweenLabels = 100; // Espaço fixo entre as datas
  const dataLength = chartData.labels.length;

  // Calcular a largura do gráfico de acordo com a quantidade de entradas e o espaço fixo entre elas
  const chartWidth = Math.max(dataLength * spaceBetweenLabels, screenWidth); // Garante que o gráfico ocupe a largura mínima da tela

  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.scrollContainer}>
        <LineChart
          data={chartData}
          width={chartWidth} // Largura ajustada do gráfico
          height={360}
          yAxisSuffix=""
          chartConfig={{
            backgroundColor: '#0D141C',
            backgroundGradientFrom: '#0D141C',
            backgroundGradientTo: '#0D141C',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(0, 177, 94, ${opacity})`,
            labelColor: () => '#fff',
          }}
          style={styles.chart}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 30,
  },
  chart: {
    borderRadius: 16,
  },
  text: {
    color: '#fff',
    fontSize: 16,
  },
  scrollContainer: {
    alignItems: 'center',
    paddingBottom: 20,
  },
});

export default GraphParams;
