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

const SugestaoCard: React.FC<HistoricoCardProps> = ({ data, elementos }) => {
  return (
    <View style={styles.card}>
      <View style={styles.infoHeader}>
        <Image source={require("../../assets/calendar.png")} style={styles.calendarIcon}/>
        <Text style={styles.dataTexto}>{data}</Text>
      </View>

      <View style={styles.rectangules}>
        {elementos.map((elemento, index) => (
          <View key={index} style={styles.barra}>
            <Text style={styles.sigla}>{elemento.sigla}</Text>
            <Text style={styles.valor}>{elemento.valor}</Text>
            <Text style={styles.unidade}>{elemento.unidade}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 350,
    height: 160,
    backgroundColor: '#21242D',
    marginTop: 20,
    borderRadius: 16,
    padding: 10,
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  calendarIcon: {
    width: 18,
    height: 20,
    marginRight: 8,
  },
  dataTexto: {
    color: '#fff',
    fontSize: 14,
  },
  rectangules: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    paddingHorizontal: 4,
  },
  barra: {
    width: 43,
    height: 107,
    backgroundColor: '#00B15E',
    borderRadius: 10,
    alignItems: 'center',
    paddingTop: 8,
  },
  sigla: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  valor: {
    marginTop: 10,
    fontSize: 14,
    color: '#fff',
  },
  unidade: {
    marginTop: 8,
    fontSize: 10,
    color: '#fff',
  },
});

export default SugestaoCard;
