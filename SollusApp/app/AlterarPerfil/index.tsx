import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, Image, TouchableOpacity, SafeAreaView, Modal,
  Animated, TextInput, ScrollView, KeyboardAvoidingView, Platform, Alert, StatusBar
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import Fontisto from '@expo/vector-icons/Fontisto';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuthStore } from '../../store/authStore';
import { router } from 'expo-router';
import styles from '../../styles/AterarPerfil.styles';
import { useWindowDimensions } from 'react-native';
import ConfirmChanges from '../../Components/ConfirmChanges';

const MudarPerfil = () => {
  const [nome, setNome] = useState('');
  const [showConfirmChanges, setShowConfirmChanges] = useState(false);
  const [sobrenome, setSobrenome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [zoomVisible, setZoomVisible] = useState(false);
  const [profileImage, setProfileImage] = useState(require('../../assets/Person2.png'));

  const { userUpdate, isLoading, user, uploadFotoPerfil } = useAuthStore();

  const scaleValue = useRef(new Animated.Value(1)).current;
  const modalAnim = useRef(new Animated.Value(0)).current;
  const { height } = useWindowDimensions();

  useEffect(() => {
    const loadProfileData = async () => {
      if (user) {
        setNome(user.name || '');
        setSobrenome(user.lastname || '');
        setEmail(user.email || '');
        setTelefone(user.phone || '');
      }
      const uri = await AsyncStorage.getItem('@profile_image');
      if (uri) setProfileImage({ uri });
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
        setModalVisible(false);
      }
    };
    input.click();
  };

  const pickImage = async () => {
    if (Platform.OS === 'web') return pickImageWeb();

    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') return alert('Permissão negada!');

    const result = await ImagePicker.launchImageLibraryAsync({ allowsEditing: true, aspect: [1, 1], quality: 1 });
    if (!result.canceled && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      setProfileImage({ uri });
      await salvarImagem(uri);
      try {
        await uploadFotoPerfil(uri);
      } catch {
        Alert.alert('Erro', 'Não foi possível enviar a foto.');
      }
      setModalVisible(false);
    }
  };

  const takePhoto = async () => {
    if (Platform.OS === 'web') return alert('Não suportado no navegador.');
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') return alert('Permissão de câmera negada!');

    const result = await ImagePicker.launchCameraAsync({ allowsEditing: true, aspect: [1, 1], quality: 1 });
    if (!result.canceled && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      setProfileImage({ uri });
      await salvarImagem(uri);
      try {
        await uploadFotoPerfil(uri);
      } catch {
        Alert.alert('Erro', 'Falha ao enviar foto.');
      }
      setModalVisible(false);
    }
  };

  const handleSubmit = async () => {
    try {
      await userUpdate(nome, sobrenome, email, telefone);
      Alert.alert('Sucesso', 'Dados atualizados com sucesso!');
      router.push("/Perfil")
    } catch (err) {
      console.error(err);
      Alert.alert('Erro', 'Erro ao atualizar dados.');
    }
  };

  const modalTranslateY = modalAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [height, 0],
  });

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
          style={{ flex: 1 }}
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <TouchableOpacity style={styles.arrowButton} onPress={() => router.back()}>
              <Feather name="arrow-left-circle" size={35} color="#00B15E" />
            </TouchableOpacity>
            <View style={styles.viewBem}>
              <Text style={styles.bemVindo}>Perfil do Usuário</Text>
            </View>
            <Image source={require('../../assets/logo.png')} style={styles.logoimagem} />
          </View>

          <TouchableOpacity onPress={() => setZoomVisible(true)}>
            <Animated.View style={[styles.Foto, { transform: [{ scale: scaleValue }] }]}>
              <View style={styles.wrapperFoto}>
                <Image source={profileImage} style={styles.imagemPerfil} />
                <TouchableOpacity style={styles.botaoEditar} onPress={() => setModalVisible(true)}>
                  <Feather name="edit-2" size={18} color="#0D141C" />
                </TouchableOpacity>
              </View>
            </Animated.View>
          </TouchableOpacity>

          <View style={styles.info}>
            {[
              { icon: <Feather name="user" size={24} color="#00B15E" />, value: nome, set: setNome, placeholder: 'Nome' },
              { icon: <Feather name="user" size={24} color="#00B15E" />, value: sobrenome, set: setSobrenome, placeholder: 'Sobrenome' },
              { icon: <Fontisto name="email" size={24} color="#00B15E" />, value: email, set: setEmail, placeholder: 'Email', keyboardType: 'email-address' as const },
              { icon: <Feather name="phone" size={24} color="#00B15E" />, value: telefone, set: setTelefone, placeholder: 'Telefone', keyboardType: 'phone-pad' as const },
            ].map(({ icon, value, set, placeholder, keyboardType }, i) => (
              <View key={i} style={styles.infoItem}>
                <View style={styles.Icon}>{icon}</View>
                <TextInput
                  style={styles.input}
                  placeholder={placeholder}
                  placeholderTextColor="#FFF"
                  value={value}
                  onChangeText={set}
                  keyboardType={keyboardType}
                  autoCapitalize="none"
                />
              </View>
            ))}
          </View>

          <View style={styles.botoes}>
            <TouchableOpacity style={styles.Editar} onPress={handleSubmit}>
              <Text style={styles.botaoTexto}>
                {isLoading ? 'Salvando...' : 'Confirmar alterações'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Modal de foto */}
          <Modal transparent visible={modalVisible} animationType="none">
            <View style={styles.modalContainer}>
              <Animated.View style={[styles.modalContent, { transform: [{ translateY: modalTranslateY }] }]}>
                <Text style={styles.modalTitle}>Editar Foto de Perfil</Text>
                <TouchableOpacity style={styles.modalButton} onPress={pickImage}>
                  <Text style={styles.modalButtonText}>Escolher da galeria</Text>
                </TouchableOpacity>
                {Platform.OS !== 'web' && (
                  <TouchableOpacity style={[styles.modalButton, { backgroundColor: '#4A5568', marginTop: 10 }]} onPress={takePhoto}>
                    <Text style={styles.modalButtonText}>Tirar foto</Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity style={[styles.modalButton, { backgroundColor: '#FF3B30', marginTop: 15 }]} onPress={() => setModalVisible(false)}>
                  <Text style={styles.modalButtonText}>Cancelar</Text>
                </TouchableOpacity>
              </Animated.View>
            </View>
          </Modal>

          {/* Modal zoom */}
          <Modal visible={zoomVisible} transparent animationType="fade">
            <TouchableOpacity style={styles.zoomOverlay} onPress={() => setZoomVisible(false)}>
              <View style={styles.zoomContent}>
                <Image source={profileImage} style={styles.zoomedImage} resizeMode="contain" />
              </View>
            </TouchableOpacity>
          </Modal>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default MudarPerfil;