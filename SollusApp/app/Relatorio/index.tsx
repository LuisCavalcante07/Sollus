import React, { useRef } from 'react';
import { View, StyleSheet, Text, Image, Dimensions, TouchableOpacity, Animated, Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { useDataStore } from '../../store/dataStore';
import Header  from '../../Components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');
const StrongGreen = '#00B15E';
const DarkBackground = '#0D141C';
const SecondaryBackground = '#21242D';
const White = '#FFFEFF';
const ShadowColor = '#000';

const Relatorio = () => {
    const { fetchMedia, medias } = useDataStore();

    // const fetchMedia = useDataStore((state) => state.fetchData);
    // const medias = useDataStore((state) => state.medias);

    const scaleAnim = useRef(new Animated.Value(1)).current;
    const translateYAnim = useRef(new Animated.Value(0)).current;

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

        const store = useDataStore;

    const aoPressionarBotao = async () => {
        animateButton();
        console.log('Função chamada');

        try {
            await store.getState().fetchMedia();
            const medias = store.getState().medias;
            console.log("Médias atualizadas:", medias);

        if (!medias || Object.keys(medias).length === 0) {
          alert("Médias ainda não carregadas.");
          return;
        }

         const dados: { [key: string]: string } = {
            Nitrogênio: `${medias?.MediaNitrogenio?.toFixed(2) ?? 'N/A'} g/kg`,
            Fósforo: `${medias?.MediaFosfoto?.toFixed(2) ?? 'N/A'} mg/dm³`,
            Potássio: `${medias?.MediaPotassio?.toFixed(2) ?? 'N/A'} mg/dm³`,
            pH: `${medias?.MediaPH?.toFixed(2) ?? 'N/A'}`,
            Umidade: `${medias?.MediaUmidade?.toFixed(2) ?? 'N/A'}%`,
            Condutividade: `${medias?.MediaCondutividade?.toFixed(2) ?? 'N/A'} dS/m`,
            Temperatura: `${medias?.MediaTemperatura?.toFixed(2) ?? 'N/A'} °C`,
        };

        console.log('Dados formatados: ', dados)

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

            <Animated.View style={[
                styles.retangulo,
                {
                    transform: [{ translateY: translateYAnim }],
                    shadowColor: ShadowColor,
                    shadowOffset: { width: 0, height: 8 },
                    shadowOpacity: 0.3,
                    shadowRadius: 15,
                    elevation: 10,
                },
            ]}>
                <View style={[styles.retangulo2, {
                    backgroundColor: SecondaryBackground,
                    shadowColor: ShadowColor,
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.2,
                    shadowRadius: 8,
                    elevation: 6,
                }]}>
                    <Image source={require('../../assets/arquivo.png')} style={styles.arquivo} />
                </View>

                <TouchableOpacity
                    style={[styles.button, { backgroundColor: StrongGreen }]}
                    onPress={aoPressionarBotao}
                    activeOpacity={0.8}
                >
                    <Animated.Text style=   {[styles.buttonText, { transform: [{ scale: scaleAnim }] }]}>
                        <Feather name="download" size={18} color={White} />
                        {'  '}Baixar Relatório
                    </Animated.Text>
                </TouchableOpacity>
                
            </Animated.View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: DarkBackground,
        alignItems: 'center',
    },
    header: {
        width: '100%',
        height: height * 0.08,
        paddingHorizontal: width * 0.05,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: SecondaryBackground,
        justifyContent: 'space-between',
        shadowColor: ShadowColor,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
        elevation: 5,
    },
    arrowButton: {
        padding: 8,
    },
    viewBem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bemVindo: {
        color: White,
        fontSize: width * 0.05,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    logoimagem: {
        width: width * 0.1,
        height: width * 0.1,
    },
    retangulo: {
        width: width * 0.9,
        height: height * 0.7,
        backgroundColor: '#2C333D',
        borderRadius: 30,
        marginTop: height * 0.1,
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingVertical: height * 0.05,
    },
    retangulo2: {
        width: '60%',
        height: '50%',
        backgroundColor: DarkBackground,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    arquivo: {
        width: '70%',
        height: '70%',
        resizeMode: 'contain',
    },
    button: {
        width: '70%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        backgroundColor: StrongGreen,
        shadowColor: ShadowColor,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 8,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: White,
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default Relatorio;
