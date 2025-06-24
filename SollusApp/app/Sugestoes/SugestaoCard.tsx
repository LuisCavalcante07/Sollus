import React, { useMemo } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

type ElementoInfo = {
  sigla: string;
  valor: number;
  unidade: string;
  min: number;
  max: number;
};

type SugestaoCardProps = {
  data: string;
  elementos: ElementoInfo[];
  testID?: string;
  accessible?: boolean;
  accessibilityLabel?: string;
};

const ProgressBar = ({ 
  valor, 
  min, 
  max, 
  dentroDaFaixa 
}: { 
  valor: number; 
  min: number; 
  max: number; 
  dentroDaFaixa: boolean; 
}) => {
  const largura = useMemo(() => {
    return Math.min(Math.max(((valor - min) / (max - min)) * 100, 0), 100);
  }, [valor, min, max]);

  const getBarColor = () => {
    if (!dentroDaFaixa) {
      const distancia = valor < min 
        ? (min - valor) / min 
        : (valor - max) / max;
      return distancia > 0.3 ? '#FF3131' : '#FF9800';
    }

    const centralidade = 1 - 2 * Math.abs((valor - min) / (max - min) - 0.5);
    return centralidade > 0.7 ? '#4CAF50' : '#8BC34A';
  };

  return (
    <View 
      style={styles.barraContainer}
      accessible={true}
      accessibilityLabel={`Barra de progresso: ${Math.round(largura)}% do ideal`}
    >
      <View
        style={[
          styles.barra,
          {
            width: `${largura}%`,
            backgroundColor: getBarColor(),
          },
        ]}
      />
      <View style={styles.marcadores}>
        <View style={styles.marcador} />
        <View style={[styles.marcador, styles.marcadorDireita]} />
      </View>
    </View>
  );
};

export default function SugestaoCard({ 
  data, 
  elementos, 
  testID, 
  accessible = false, 
  accessibilityLabel 
}: SugestaoCardProps) {
  const acessibilidadeResumo = useMemo(() => {
    return elementos
      .map(el => {
        const status = el.valor >= el.min && el.valor <= el.max 
          ? "dentro do intervalo ideal" 
          : "fora do intervalo ideal";
        return `${el.sigla}: ${el.valor} ${el.unidade}, ${status}`;
      })
      .join(". ");
  }, [elementos]);

  const dentro = useMemo(() => elementos.filter(el => el.valor >= el.min && el.valor <= el.max), [elementos]);
  const abaixo = useMemo(() => elementos.filter(el => el.valor < el.min), [elementos]);
  const acima = useMemo(() => elementos.filter(el => el.valor > el.max), [elementos]);

  return (
    <View 
      style={styles.card}
      testID={testID}
      accessible={accessible}
      accessibilityLabel={accessibilityLabel || `Planta ${data}. ${acessibilidadeResumo}`}
    >
      <Text style={styles.titulo}>{data}</Text>

      {elementos.map((el) => {
        const dentroDaFaixa = el.valor >= el.min && el.valor <= el.max;

        return (
          <View key={el.sigla} style={styles.item}>
            <View style={styles.headerRow}>
              <Text style={styles.sigla}>
                {el.sigla}: {el.valor} {el.unidade}
              </Text>
              {!dentroDaFaixa && (
                <Text style={styles.status}>
                  {el.valor < el.min ? 'Abaixo' : 'Acima'}
                </Text>
              )}
            </View>

            <ProgressBar 
              valor={el.valor} 
              min={el.min} 
              max={el.max} 
              dentroDaFaixa={dentroDaFaixa} 
            />

            <View style={styles.legendaContainer}>
              <Text style={styles.legenda}>{el.min}{el.unidade}</Text>
              <Text style={styles.legenda}>{el.max}{el.unidade}</Text>
            </View>

            {!dentroDaFaixa && (
              <Text style={styles.faixa}>
                Intervalo ideal: {el.min} - {el.max} {el.unidade}
              </Text>
            )}
          </View>
        );
      })}

      <View style={styles.resumoContainer}>
        <Text style={styles.resumoTitulo}>Resumo:</Text>
        <View style={styles.indicadores}>
          {dentro.length > 0 && (
            <View style={styles.indicadorRow}>
              <View style={[styles.indicador, { backgroundColor: '#4CAF50' }]} />
              <Text style={styles.indicadorText}>
                {dentro.length} elementos em níveis ideais
              </Text>
            </View>
          )}
          {abaixo.length > 0 && (
            <View style={styles.indicadorRow}>
              <View style={[styles.indicador, { backgroundColor: '#FF9800' }]} />
              <Text style={styles.indicadorText}>
                {abaixo.length} elementos abaixo do ideal
              </Text>
            </View>
          )}
          {acima.length > 0 && (
            <View style={styles.indicadorRow}>
              <View style={[styles.indicador, { backgroundColor: '#FF5252' }]} />
              <Text style={styles.indicadorText}>
                {acima.length} elementos acima do ideal
              </Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '90%',
    maxWidth: 600,
    backgroundColor: '#1E1E2E',
    borderRadius: 12,
    padding: 16,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  titulo: {
    fontSize: width > 400 ? 22 : 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
    textAlign: 'center',
  },
  item: {
    marginBottom: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  sigla: {
    color: '#fff',
    fontSize: width > 400 ? 16 : 14,
    fontWeight: '500',
  },
  status: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FF5252',
    backgroundColor: 'rgba(255, 82, 82, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  barraContainer: {
    width: '100%',
    height: 12,
    backgroundColor: '#444',
    borderRadius: 6,
    overflow: 'hidden',
    position: 'relative',
  },
  barra: {
    height: 12,
    borderRadius: 6,
  },
  marcadores: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  marcador: {
    width: 2,
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  marcadorDireita: {
    alignSelf: 'flex-end',
  },
  legendaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 2,
    marginTop: 2,
  },
  legenda: {
    fontSize: 10,
    color: '#bbb',
  },
  faixa: {
    fontSize: 12,
    color: '#FF9F9F',
    marginTop: 4,
    fontStyle: 'italic',
  },
  resumoContainer: {
    marginTop: 20,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  resumoTitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  indicadores: {
    marginTop: 5,
  },
  indicadorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  indicador: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  indicadorText: {
    fontSize: 12,
    color: '#ddd',
  },
});