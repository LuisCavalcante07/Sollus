import React, { useState, useRef, useEffect } from 'react';
import {
    View, StyleSheet, Text, Image, Dimensions,
    TouchableOpacity, SafeAreaView, Modal,
    Animated, TextInput, ScrollView, KeyboardAvoidingView, Platform,
    KeyboardTypeOptions, Alert,
    StatusBar
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import Fontisto from '@expo/vector-icons/Fontisto';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuthStore } from '../../store/authStore';
import { router } from 'expo-router';
import styles from '../../styles/AterarPerfil.styles';

const { height } = Dimensions.get('window');

const MudarPerfil = () => {
    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [zoomVisible, setZoomVisible] = useState(false);
    const [profileImage, setProfileImage] = useState(require('../../assets/Person2.png'));

    const { userUpdate, isLoading, user, uploadFotoPerfil } = useAuthStore();

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

    const pickImageWeb = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = async (event: any) => {
            const file = event.target.files[0];
            if (file) {
                const uri = URL.createObjectURL(file);
                setProfileImage({ uri });
                await salvarImagem(uri);
                closeEditModal();
            }
        };
        input.click();
    };

    const pickImage = async () => {
        if (Platform.OS === 'web') {
            pickImageWeb();
            return;
        }

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
            try {
                await uploadFotoPerfil(uri);
            } catch (error) {
                Alert.alert('Erro', 'Não foi possível enviar a foto ao servidor.');
            }
            closeEditModal();
        }
    };

    const takePhoto = async () => {
        if (Platform.OS === 'web') {
            alert('Captura de foto não suportada no navegador.');
            return;
        }

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
            try {
                await uploadFotoPerfil(uri);
            } catch (error) {
                Alert.alert('Erro', 'Não foi possível enviar a foto ao servidor.');
            }
            closeEditModal();
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

    const modalTranslateY = modalAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [height, 0],
    });

    const handleSubmit = async () => {
        try {
            await userUpdate(nome, sobrenome, email, telefone);
            Alert.alert('Sucesso', 'Informações atualizadas com sucesso!');
        } catch (err) {
            console.error(err);
            Alert.alert('Erro', 'Não foi possível atualizar as informações.');
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            {Platform.OS !== 'web' && (
                <StatusBar backgroundColor="#21242D" barStyle="light-content" />
            )}
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={{ flex: 1 }}
            >
                <ScrollView
                    contentContainerStyle={styles.container}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={styles.header}>
                        <TouchableOpacity
                            style={styles.arrowButton}
                            onPress={() => router.back()}
                        >
                            <Feather
                                name="arrow-left-circle"
                                size={35}
                                color="#00B15E"
                            />
                        </TouchableOpacity>
                        <View style={styles.viewBem}>
                            <Text style={styles.bemVindo}>Perfil do Usuário</Text>
                        </View>
                        <Image
                            source={require('../../assets/logo.png')}
                            style={styles.logoimagem}
                        />
                    </View>

                    <TouchableOpacity
                        onPress={() => setZoomVisible(true)}
                        activeOpacity={0.9}
                        onPressIn={handleProfilePressIn}
                        onPressOut={handleProfilePressOut}
                    >
                        <Animated.View
                            style={[styles.Foto, { transform: [{ scale: scaleValue }] }]}
                        >
                            <View style={styles.wrapperFoto}>
                                <Image
                                    source={profileImage}
                                    style={styles.imagemPerfil}
                                />
                                <TouchableOpacity
                                    style={styles.botaoEditar}
                                    onPress={openEditModal}
                                >
                                    <Feather name="edit-2" size={18} color="#0D141C" />
                                </TouchableOpacity>
                            </View>
                        </Animated.View>
                    </TouchableOpacity>

                    <View style={styles.info}>
                        {[
                            {
                                icon: (
                                    <Feather name="user" size={24} color="#00B15E" />
                                ),
                                placeholder: 'Nome',
                                value: nome,
                                setter: setNome,
                            },
                            {
                                icon: (
                                    <Feather name="user" size={24} color="#00B15E" />
                                ),
                                placeholder: 'Sobrenome',
                                value: sobrenome,
                                setter: setSobrenome,
                            },
                            {
                                icon: (
                                    <Fontisto name="email" size={24} color="#00B15E" />
                                ),
                                placeholder: 'Email',
                                value: email,
                                setter: setEmail,
                                keyboardType: 'email-address',
                            },
                            {
                                icon: (
                                    <Feather name="phone" size={24} color="#00B15E" />
                                ),
                                placeholder: 'Telefone',
                                value: telefone,
                                setter: setTelefone,
                                keyboardType: 'phone-pad',
                            },
                        ].map(
                            (
                                { icon, placeholder, value, setter, keyboardType = 'default' },
                                i
                            ) => (
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
                            )
                        )}
                    </View>

                    <View style={styles.botoes}>
                        <TouchableOpacity
                            style={styles.Editar}
                            activeOpacity={0.7}
                            onPress={handleSubmit}
                        >
                            <Text style={styles.botaoTexto}>
                                {isLoading ? 'Salvando...' : 'Confirmar alterações'}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <Modal
                        transparent
                        visible={modalVisible}
                        animationType="none"
                        onRequestClose={closeEditModal}
                    >
                        <View style={styles.modalContainer}>
                            <Animated.View
                                style={[styles.modalContent, { transform: [{ translateY: modalTranslateY }] }]}
                            >
                                <Text style={styles.modalTitle}>Editar Foto de Perfil</Text>
                                <TouchableOpacity
                                    style={styles.modalButton}
                                    onPress={pickImage}
                                >
                                    <Text style={styles.modalButtonText}>
                                        Escolher da galeria
                                    </Text>
                                </TouchableOpacity>
                                {Platform.OS !== 'web' && (
                                    <TouchableOpacity
                                        style={[
                                            styles.modalButton,
                                            { marginTop: 10, backgroundColor: '#4A5568' },
                                        ]}
                                        onPress={takePhoto}
                                    >
                                        <Text style={styles.modalButtonText}>Tirar foto</Text>
                                    </TouchableOpacity>
                                )}
                                <TouchableOpacity
                                    style={[
                                        styles.modalButton,
                                        { backgroundColor: '#FF3B30', marginTop: 15 },
                                    ]}
                                    onPress={closeEditModal}
                                >
                                    <Text style={styles.modalButtonText}>Cancelar</Text>
                                </TouchableOpacity>
                            </Animated.View>
                        </View>
                    </Modal>

                    <Modal visible={zoomVisible} transparent animationType="fade">
                        <TouchableOpacity
                            style={styles.zoomOverlay}
                            onPress={() => setZoomVisible(false)}
                            activeOpacity={1}
                        >
                            <View style={styles.zoomContent}>
                                <Image
                                    source={profileImage}
                                    style={styles.zoomedImage}
                                    resizeMode="contain"
                                />
                            </View>
                        </TouchableOpacity>
                    </Modal>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default MudarPerfil;