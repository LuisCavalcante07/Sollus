
import React, { useState, useRef, useEffect, JSX } from 'react';
import {
    View, StyleSheet, Text, Image, Dimensions,
    TouchableOpacity, StatusBar, SafeAreaView, Modal, Animated,
    Alert,
    Button
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import Fontisto from '@expo/vector-icons/Fontisto';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../../Components/Header';
import { router } from 'expo-router';
import { useAuthStore } from '../../store/authStore';
const { width, height } = Dimensions.get('window');

const Perfil = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [zoomVisible, setZoomVisible] = useState(false);
    const [signOutModalVisible, setSignOutModalVisible] = useState(false);
    const [profileImage, setProfileImage] = useState(require('../../assets/Person2.png'));

    const {user, viewPerfil, logout} = useAuthStore();

    const scaleValue = useRef(new Animated.Value(1)).current;
    const modalAnim = useRef(new Animated.Value(0)).current;
    const signOutModalAnim = useRef(new Animated.Value(0)).current;

    
    useEffect(() => {
    const loadProfileImage = async () => {
        try {
            const uri = await AsyncStorage.getItem('@profile_image');
            if (uri) {
                setProfileImage({ uri });
            }
        } catch (error) {
            console.log('Erro ao carregar imagem:', error);
        }
    };

    const fetchUserData = async () => {
        try {
            await viewPerfil();
        } catch (error) {
            console.log('Erro ao buscar dados do usuário:', error);
        }
    };

    loadProfileImage();
    fetchUserData();
}, []); 


    const salvarImagem = async (uri: string) => {
        try {
            await AsyncStorage.setItem('@profile_image', uri);
        } catch (error) {
            console.log('Erro ao salvar imagem:', error);
        }
    };

    const handleProfilePressIn = () => {
        Animated.spring(scaleValue, {
            toValue: 0.95,
            useNativeDriver: true,
        }).start();
    };

    const handleProfilePressOut = () => {
        Animated.spring(scaleValue, {
            toValue: 1,
            friction: 5,
            tension: 50,
            useNativeDriver: true,
        }).start();
    };

    const openEditModal = () => {
        setModalVisible(true);
        Animated.timing(modalAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    const closeEditModal = () => {
        Animated.timing(modalAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start(() => setModalVisible(false));
    };

    const openSignOutModal = () => {
        setSignOutModalVisible(true);
        Animated.timing(signOutModalAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    const closeSignOutModal = () => {
        Animated.timing(signOutModalAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start(() => setSignOutModalVisible(false));
    };

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Precisamos de permissão para acessar suas fotos!');
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled && result.assets && result.assets.length > 0) {
            const uri = result.assets[0].uri;
            setProfileImage({ uri });
            await salvarImagem(uri);
            closeEditModal();
        }
    };

    const takePhoto = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            alert('Precisamos de permissão para usar sua câmera!');
            return;
        }

        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled && result.assets && result.assets.length > 0) {
            const uri = result.assets[0].uri;
            setProfileImage({ uri });
            await salvarImagem(uri);
            closeEditModal();
        }
    };

    const modalTranslateY = modalAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [height, 0],
    });

    const signOutModalTranslateY = signOutModalAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [height, 0],
    });



    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar backgroundColor="#21242D" barStyle="light-content" />
            <View style={styles.container}>

                
                <Header title="Perfil do Usuário"/>
                
                <TouchableOpacity
                    onPress={() => setZoomVisible(true)}
                    activeOpacity={0.9}
                    onPressIn={handleProfilePressIn}
                    onPressOut={handleProfilePressOut}
                >
                    <Animated.View style={[styles.Foto, { transform: [{ scale: scaleValue }] }]}>
                        <View style={styles.wrapperFoto}>
                            <Image source={profileImage} style={styles.imagemPerfil} />
                            <TouchableOpacity style={styles.botaoEditar} onPress={openEditModal}>
                                <Feather name="edit-2" size={18} color="#0D141C" />
                            </TouchableOpacity>
                        </View>
                    </Animated.View>
                </TouchableOpacity>

              
              
                <View style={styles.info}>
    {[
        { icon: <Feather name="user" size={24} color="#00B15E" />, label: 'Nome:', value: user?.name || '' },
        { icon: <Feather name="user" size={24} color="#00B15E" />, label: 'Sobrenome:', value: user?.lastname || '' },
        { icon: <Fontisto name="email" size={24} color="#00B15E" />, label: 'Email:', value: user?.email || '' },
        { icon: <Feather name="phone" size={24} color="#00B15E" />, label: 'Telefone:', value: user?.phone || '' },
    ].map((item, index) => (
        <View key={index} style={styles.infoItem}>
            <View style={styles.Icon}>
                {item.icon}
            </View>

            <View>
                <Text style={styles.InfoNome}>{item.label}</Text>
                <Text style={{ color: '#FFF', fontSize: 16 }}>
                    {item.value ? item.value : 'Não informado'}
                </Text>
            </View>
        </View>
    ))}
</View>
                <View style={styles.botoes}>
                    <TouchableOpacity
                        style={styles.Sair}
                        activeOpacity={0.7}
                        onPress={openSignOutModal}
                    >
                        <Text style={styles.botaoTexto}>Sair</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.Editar}
                        activeOpacity={0.7}
                        onPress={() => router.push("AlterarPerfil")}
                    >
                        <Text style={styles.botaoTexto}>Editar</Text>
                    </TouchableOpacity>
                </View>

             
                <Modal transparent visible={modalVisible} animationType="none" onRequestClose={closeEditModal}>
                    <View style={styles.modalContainer}>
                        <Animated.View style={[styles.modalContent, { transform: [{ translateY: modalTranslateY }] }]}>
                            <Text style={styles.modalTitle}>Editar Foto de Perfil</Text>
                            <TouchableOpacity style={styles.modalButton} onPress={pickImage}>
                                <Text style={styles.modalButtonText}>Escolher da galeria</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.modalButton, { marginTop: 10, backgroundColor: '#4A5568' }]} onPress={takePhoto}>
                                <Text style={styles.modalButtonText}>Tirar foto</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.modalButton, { backgroundColor: '#FF3B30', marginTop: 15 }]}
                                onPress={closeEditModal}
                            >
                                <Text style={styles.modalButtonText}>Cancelar</Text>
                            </TouchableOpacity>
                        </Animated.View>
                    </View>
                </Modal>

              
                <Modal transparent visible={signOutModalVisible} animationType="none" onRequestClose={closeSignOutModal}>
                    <View style={styles.modalContainer}>
                        <Animated.View style={[styles.modalContent, { transform: [{ translateY: signOutModalTranslateY }] }]}>

                            <Text style={styles.modalTitle}>Sair da sua conta?</Text>

                            <TouchableOpacity 
                            style={styles.modalButton} 
                            onPress={async () => {
                                await logout();
                                closeSignOutModal();
                                router.push('/Login');
                            }}
                            >
                                <Text style={styles.modalButtonText}>Sair</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.modalButton, { backgroundColor: '#4A5568', marginTop: 10 }]}
                                onPress={closeSignOutModal}
                            >
                                <Text style={styles.modalButtonText}>Cancelar</Text>
                            </TouchableOpacity>
                        </Animated.View>
                    </View>
                </Modal>

               
                <Modal visible={zoomVisible} transparent animationType="fade">
                    <TouchableOpacity style={styles.zoomOverlay} onPress={() => setZoomVisible(false)} activeOpacity={1}>
                        <View style={styles.zoomContent}>
                            <Image
                                source={profileImage}
                                style={styles.zoomedImage}
                                resizeMode="contain"
                            />
                        </View>
                    </TouchableOpacity>
                </Modal>
            </View>
        </SafeAreaView>

    );
};


const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#0D141C',
    },
    container: {
        flex: 1,
        backgroundColor: '#0D141C',
        alignItems: 'center',
    },
    header: {
        width: '100%',
        height: height * 0.08,
        paddingHorizontal: width * 0.05,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#21242D',
        justifyContent: 'space-between',
        elevation: 10,
    },
    arrowButton: {
        padding: 5,
    },
    viewBem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bemVindo: {
        color: '#FFFEFF',
        fontSize: width * 0.05,
        fontWeight: '600',
    },
    logoimagem: {
        width: width * 0.1,
        height: width * 0.1,
    },
    Foto: {
        marginTop: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    wrapperFoto: {
        width: 166,
        height: 166,
        borderRadius: 999,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        shadowColor: '#00B15E',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 20,
        elevation: 12,
    },
    imagemPerfil: {
        width: '100%',
        height: '100%',
        borderRadius: 999,
        overflow: 'hidden',
    },
    botaoEditar: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: '#00B15E',
        borderRadius: 999,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#FFF',
        elevation: 5,
    },
    info: {
        marginTop: 50,
        width: '90%',
    },
    infoItem: {
        backgroundColor: '#21242D',
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        marginVertical: 8,
    },
    iconInfo: {
        width: 24,
        height: 24,
        marginRight: 12,
    },
    InfoNome: {
        color: "#00B15E",
        fontSize: 18,
        fontWeight: '600',
    },
    botoes: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 60,
        alignSelf: 'center',
    },
    Sair: {
        borderRadius: 16,
        backgroundColor: "#ab2424",
        width: 170,
        height: 53,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 8,
        elevation: 8,
    },
    Editar: {
        borderRadius: 16,
        backgroundColor: "#00B15E",
        width: 170,
        height: 53,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 8,
        elevation: 8,
    },
    botaoTexto: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '80%',
        backgroundColor: '#FFF',
        padding: 25,
        borderRadius: 20,
        alignItems: 'center',
        elevation: 10,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#0D141C',
    },
    modalButton: {
        backgroundColor: '#00B15E',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 12,
        width: '100%',
        alignItems: 'center',
    },
    modalButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    zoomOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    zoomContent: {
        width: '90%',
        height: '70%',
        borderRadius: 20,
        overflow: 'hidden',
        backgroundColor: '#121212',
        borderWidth: 1,
        borderColor: '#00B15E',
    },
    zoomedImage: {
        width: '100%',
        height: '100%',
        borderRadius: 20,
    },
    Icon: {
        marginRight: 10,
    }
});

export default Perfil;