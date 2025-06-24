import React, { useRef } from 'react';
import styles from '../../styles/Relatorio.styles';
import { 
  View, Text, Image, TouchableOpacity, Animated, Platform 
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { useDataStore } from '../../store/dataStore';
import Header from '../../Components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';

const StrongGreen = '#00B15E';
const SecondaryBackground = '#21242D';
const White = '#FFFEFF';
const ShadowColor = '#000';

const Relatorio = () => {
  const fetchMedia = useDataStore(state => state.fetchMedia);
  const medias = useDataStore(state => state.medias);

  const scaleAnim = useRef(new Animated.Value(1)).current;

  const animateButton = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.05,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const aoPressionarBotao = async () => {
    animateButton();

    try {
      await fetchMedia();

      if (!medias || Object.keys(medias).length === 0) {
        alert("Médias ainda não carregadas.");
        return;
      }

      const dados: { [key: string]: string } = {
        Nitrogênio: `${medias?.MediaNitrogenio?.toFixed(2) ?? 'N/A'} g/kg`,
        Fósforo: `${medias?.MediaFosforo?.toFixed(2) ?? 'N/A'} mg/dm³`,
        Potássio: `${medias?.MediaPotassio?.toFixed(2) ?? 'N/A'} mg/dm³`,
        pH: `${medias?.MediaPH?.toFixed(2) ?? 'N/A'}`,
        Umidade: `${medias?.MediaUmidade?.toFixed(2) ?? 'N/A'}%`,
        Condutividade: `${medias?.MediaCondutividade?.toFixed(2) ?? 'N/A'} dS/m`,
        Temperatura: `${medias?.MediaTemperatura?.toFixed(2) ?? 'N/A'} °C`,
      };

      const doc = new jsPDF();
      doc.text('Relatório de Medições', 20, 20);
      autoTable(doc, {
        startY: 30,
        head: [['Parâmetro', 'Valores']],
        body: Object.entries(dados),
        theme: 'grid',
        styles: {
          fontSize: 12,
          halign: 'center',
          cellPadding: 6,
        },
        headStyles: {
          fillColor: [0, 177, 94],
          textColor: 255,
          fontStyle: 'bold',
        },
        alternateRowStyles: {
          fillColor: [240, 240, 240],
        },
        tableLineColor: [0, 0, 0],
        tableLineWidth: 0.1,
      });

      if (Platform.OS === 'web') {
        doc.save('relatorio.pdf');
      } else {
        const pdfBase64 = doc.output('datauristring');
        const path = FileSystem.cacheDirectory + 'relatorio.pdf';
        const base64Data = pdfBase64.split(',')[1];

        await FileSystem.writeAsStringAsync(path, base64Data, {
          encoding: FileSystem.EncodingType.Base64,
        });

        await Sharing.shareAsync(path);
      }
    } catch (e) {
      console.error('Erro ao gerar relatório: ', e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title='Gráfico de Leituras' />

      <Animated.View
        style={[
          styles.retangulo,
          {
            shadowColor: ShadowColor,
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.3,
            shadowRadius: 15,
            elevation: 10,
          },
        ]}
      >
        <View
          style={[
            styles.retangulo2,
            {
              backgroundColor: SecondaryBackground,
              shadowColor: ShadowColor,
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.2,
              shadowRadius: 8,
              elevation: 6,
            },
          ]}
        >
          <Image source={require('../../assets/arquivo.png')} style={styles.arquivo} />
        </View>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: StrongGreen }]}
          onPress={aoPressionarBotao}
          activeOpacity={0.8}
        >
          <Animated.View style={{ transform: [{ scale: scaleAnim }], flexDirection: 'row', alignItems: 'center' }}>
            <Feather name="download" size={18} color={White} />
            <Text style={[styles.buttonText, { marginLeft: 6 }]}>Baixar Relatório</Text>
          </Animated.View>
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
};

export default Relatorio;