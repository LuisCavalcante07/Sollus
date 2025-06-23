import React, { useState, useRef, useEffect } from 'react';
import {
    View, StyleSheet, Text, Image, Dimensions,
    TouchableOpacity, StatusBar, SafeAreaView, Modal,
    Animated, TextInput, ScrollView, KeyboardAvoidingView, Platform,
    KeyboardTypeOptions, Alert
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import Fontisto from '@expo/vector-icons/Fontisto';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuthStore } from '../../store/authStore';
import { router } from 'expo-router';
import ConfirmChanges from '../../Components/ConfirmChanges';

const { width, height } = Dimensions.get('window');

const Perfil = () => {
    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [zoomVisible, setZoomVisible] = useState(false);
    const [profileImage, setProfileImage] = useState(require('../../assets/Person2.png'));
    const [confirmScreen, setConfirmScreen] = useState(false);

    const { userUpdate, isLoading, error, user } = useAuthStore();

    const scaleValue = useRef(new Animated.Value(1)).current;
    const modalAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const loadProfileData = async () => {
            try {
                if (user) {
                    setNome(user.name || '');
                    setSobrenome(user.lastname || '');
                    setEmail(user.email || '');
                    setTelefone(user.phone || '');
                }

                const uri = await AsyncStorage.getItem('@profile_image');
                if (uri) {
                    setProfileImage({ uri });
                }
            } catch (err) {
                console.log('Erro ao carregar dados do perfil:', err);
            }
        };
        loadProfileData();
    }, [user]);

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

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Precisamos de permissão para acessar suas fotos!');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled && result.assets.length > 0) {
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

        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled && result.assets.length > 0) {
            const uri = result.assets[0].uri;
            setProfileImage({ uri });
            await salvarImagem(uri);
            closeEditModal();
        }
    };

    const handleSubmit = async () => {
        try {
            await userUpdate( nome, sobrenome, email, telefone );
            setConfirmScreen(true);
        } catch (err) {
            console.error(err);
            Alert.alert('Erro', 'Não foi possível atualizar as informações.');
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar backgroundColor="#21242D" barStyle="light-content" />
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
                    <View style={styles.header}>
                        <TouchableOpacity style={styles.arrowButton} onPress={() => router.back()}>
                            <Feather name="arrow-left-circle" size={35} color="#00B15E" />
                        </TouchableOpacity>
                        <View style={styles.viewBem}>
                            <Text style={styles.bemVindo}>Perfil do Usuário</Text>
                        </View>
                        <Image source={require('../../assets/logo.png')} style={styles.logoimagem} />
                    </View>

                    <TouchableOpacity
                        onPress={() => setZoomVisible(true)}
                        activeOpacity={0.9}
                        onPressIn={handleProfilePressIn}
                        onPressOut={handleProfilePressOut}>
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
                        {[{
                            icon: <Feather name="user" size={24} color="#00B15E" />, placeholder: "Nome", value: nome, setter: setNome
                        }, {
                            icon: <Feather name="user" size={24} color="#00B15E" />, placeholder: "Sobrenome", value: sobrenome, setter: setSobrenome
                        }, {
                            icon: <Fontisto name="email" size={24} color="#00B15E" />, placeholder: "Email", value: email, setter: setEmail,
                            keyboardType: "email-address"
                        }, {
                            icon: <Feather name="phone" size={24} color="#00B15E" />, placeholder: "Telefone", value: telefone, setter: setTelefone,
                            keyboardType: "phone-pad"
                            
                        }].map(({ icon, placeholder, value, setter, keyboardType = "default" }, i) => (
                            <View key={i} style={styles.infoItem}>
                                <View style={styles.Icon}>{icon}</View>
                                <TextInput
                                    placeholder={placeholder}
                                    placeholderTextColor="#888"
                                    style={styles.input}
                                    value={value}
                                    onChangeText={setter}
                                    keyboardType={keyboardType as KeyboardTypeOptions}
                                    autoCapitalize="none"
                                />
                            </View>
                        ))}
                    </View>

                    <View style={styles.botoes}>
                        <TouchableOpacity style={styles.Editar} activeOpacity={0.7} onPress={handleSubmit}>
                            <Text style={styles.botaoTexto}>{isLoading ? 'Salvando...' : 'Confirmar alterações'}</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#0D141C' },
    container: { backgroundColor: '#0D141C', alignItems: 'center', paddingBottom: 100 },
    header: {
        width: '100%', height: height * 0.08, paddingHorizontal: width * 0.05,
        flexDirection: 'row', alignItems: 'center', backgroundColor: '#21242D', justifyContent: 'space-between', elevation: 10
    },
    arrowButton: { padding: 5 },
    viewBem: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    bemVindo: { color: '#FFFEFF', fontSize: width * 0.05, fontWeight: '600' },
    logoimagem: { width: width * 0.1, height: width * 0.1 },
    Foto: { marginTop: 30, alignItems: 'center', justifyContent: 'center' },
    wrapperFoto: {
        width: 166, height: 166, borderRadius: 999, backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center',
        position: 'relative', shadowColor: '#00B15E', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.8,
        shadowRadius: 20, elevation: 12
    },
    imagemPerfil: { width: '100%', height: '100%', borderRadius: 999, overflow: 'hidden' },
    botaoEditar: {
        position: 'absolute', bottom: 0, right: 0, backgroundColor: '#00B15E', borderRadius: 999,
        width: 40, height: 40, justifyContent: 'center', alignItems: 'center', borderWidth: 2,
        borderColor: '#FFF', elevation: 5
    },
    info: { marginTop: 50, width: '90%' },
    infoItem: {
        backgroundColor: '#21242D', borderRadius: 12, flexDirection: 'row', alignItems: 'center', padding: 12, marginVertical: 8
    },
    Icon: { marginRight: 10 },
    input: {
        flex: 1, color: '#FFF', fontSize: 16, borderBottomWidth: 1,
        borderBottomColor: '#00B15E', paddingVertical: 4
    },
    botoes: { marginTop: 30, marginBottom: 40, alignItems: 'center' },
    Editar: {
        borderRadius: 16, backgroundColor: "#00B15E", width: 170, height: 53,
        justifyContent: "center", alignItems: "center", elevation: 8
    },
    botaoTexto: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
});

export default Perfil;