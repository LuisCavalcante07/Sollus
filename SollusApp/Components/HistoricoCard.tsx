import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

type Elemento = {
  sigla: string;
  valor: number;
  unidade: string;
};

interface HistoricoCardProps {
  data: string;
  elementos: Elemento[];
}

const HistoricoCard: React.FC<HistoricoCardProps> = ({ data, elementos }) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Image source={require('../assets/calendar.png')} style={styles.icon} />
        <Text style={styles.date}>{data}</Text>
      </View>

      <View style={styles.timeline}>
        {elementos.map((elemento, index) => (
          <View key={index} style={styles.item}>
            <View style={styles.dot} />
            <View style={styles.content}>
              <Text style={styles.sigla}>{elemento.sigla}</Text>
              <Text style={styles.valor}>{elemento.valor} <Text style={styles.unidade}>{elemento.unidade}</Text></Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1C1F26',
    borderRadius: 16,
    padding: 16,
    marginVertical: 12,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
    width: width * 0.9,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  icon: {
    width: 18,
    height: 18,
    marginRight: 8,
    tintColor: '#00B15E',
  },
  date: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  timeline: {
    borderLeftWidth: 2,
    borderLeftColor: '#00B15E',
    paddingLeft: 12,
  },
  item: {
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#00B15E',
    position: 'absolute',
    left: -6,
    top: 4,
  },
  content: {
    marginLeft: 12,
  },
  sigla: {
    fontSize: 14,
    color: '#00B15E',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  valor: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  unidade: {
    fontSize: 12,
    color: '#CCCCCC',
  },
});

export default HistoricoCard;