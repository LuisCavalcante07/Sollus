import React, { useState, useRef, useEffect } from 'react';
import styles from '../../styles/Perfil.styles';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  Modal,
  Animated,
  Alert,
  Dimensions,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import Fontisto from '@expo/vector-icons/Fontisto';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../../Components/Header';
import { useRouter } from 'expo-router';
import { useAuthStore } from '../../store/authStore';

const Perfil = () => {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [zoomVisible, setZoomVisible] = useState(false);
  const [signOutModalVisible, setSignOutModalVisible] = useState(false);
  const [profileImage, setProfileImage] = useState(require('../../assets/Person2.png'));

  const { user, viewPerfil, logout, uploadFotoPerfil } = useAuthStore();

  const scaleValue = useRef(new Animated.Value(1)).current;
  const modalAnim = useRef(new Animated.Value(0)).current;
  const signOutModalAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    async function loadData() {
      try {
        const uri = await AsyncStorage.getItem('@profile_image');
        if (uri) setProfileImage({ uri });
        await viewPerfil();
      } catch (error) {
        console.log('Erro ao carregar dados do perfil:', error);
      }
    }
    loadData();
  }, []);

  const salvarImagem = async (uri: string) => {
    try {
      await AsyncStorage.setItem('@profile_image', uri);
    } catch (error) {
      console.log('Erro ao salvar imagem:', error);
    }
  };

  const animateScale = (toValue: number) => {
    Animated.spring(scaleValue, {
      toValue,
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
      Alert.alert('Permissão necessária', 'Precisamos de permissão para acessar suas fotos!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets?.length) {
      const uri = result.assets[0].uri;
      setProfileImage({ uri });
      await salvarImagem(uri);
      try {
        await uploadFotoPerfil(uri);
      } catch {
        Alert.alert('Erro', 'Não foi possível enviar a foto ao servidor.');
      }
      closeEditModal();
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão necessária', 'Precisamos de permissão para usar sua câmera!');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets?.length) {
      const uri = result.assets[0].uri;
      setProfileImage({ uri });
      await salvarImagem(uri);
      try {
        await uploadFotoPerfil(uri);
      } catch {
        Alert.alert('Erro', 'Não foi possível enviar a foto ao servidor.');
      }
      closeEditModal();
    }
  };

  const modalTranslateY = modalAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [Dimensions.get('window').height, 0],
  });

  const signOutModalTranslateY = signOutModalAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [Dimensions.get('window').height, 0],
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#21242D" barStyle="light-content" />
      <View style={styles.container}>
        <Header title="Perfil do Usuário" />

        <TouchableOpacity
          onPress={() => setZoomVisible(true)}
          activeOpacity={0.9}
          onPressIn={() => animateScale(0.95)}
          onPressOut={() => animateScale(1)}
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
            { icon: <Feather name="user" size={24} color="#00B15E" />, label: 'Nome:', value: user?.name || 'Não informado' },
            { icon: <Feather name="user" size={24} color="#00B15E" />, label: 'Sobrenome:', value: user?.lastname || 'Não informado' },
            { icon: <Fontisto name="email" size={24} color="#00B15E" />, label: 'Email:', value: user?.email || 'Não informado' },
            { icon: <Feather name="phone" size={24} color="#00B15E" />, label: 'Telefone:', value: user?.phone || 'Não informado' },
          ].map((item, i) => (
            <View key={i} style={styles.infoItem}>
              <View style={styles.Icon}>{item.icon}</View>
              <View>
                <Text style={styles.InfoNome}>{item.label}</Text>
                <Text style={{ color: '#FFF', fontSize: 16 }}>{item.value}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.botoes}>
          <TouchableOpacity style={styles.Sair} activeOpacity={0.7} onPress={openSignOutModal}>
            <Text style={styles.botaoTexto}>Sair</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.Editar} activeOpacity={0.7} onPress={() => router.push("AlterarPerfil")}>
            <Text style={styles.botaoTexto}>Editar</Text>
          </TouchableOpacity>
        </View>

        {/* Modal para editar foto */}
        <Modal transparent visible={modalVisible} animationType="none" onRequestClose={closeEditModal}>
          <View style={styles.modalContainer}>
            <Animated.View style={[styles.modalContent, { transform: [{ translateY: modalTranslateY }] }]}>
              <Text style={styles.modalTitle}>Editar Foto de Perfil</Text>
              <TouchableOpacity style={styles.modalButton} onPress={pickImage}>
                <Text style={styles.modalButtonText}>Escolher da galeria</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, { marginTop: 10, backgroundColor: '#4A5568' }]}
                onPress={takePhoto}
              >
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

        {/* Modal para confirmar logout */}
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
          <TouchableOpacity
            style={styles.zoomOverlay}
            onPress={() => setZoomVisible(false)}
            activeOpacity={1}
          >
            <View style={styles.zoomContent}>
              <Image source={profileImage} style={styles.zoomedImage} resizeMode="contain" />
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default Perfil;