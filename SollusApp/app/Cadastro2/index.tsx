import React, { useState } from 'react';
import {
  Text, View, TouchableOpacity, Alert, Platform,
  KeyboardAvoidingView, ScrollView, Keyboard, StatusBar, Image, TouchableWithoutFeedback
} from 'react-native';
import styles from '../../styles/Cadastro2.styles';
import { Input } from '../../Components/Input/Input';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../../styles';
import { useAuthStore } from '../../store/authStore';

const Cadastro2 = () => {
  const router = useRouter();
  const { signup, error, isLoading } = useAuthStore();
  const { email, password, confirmpassword } = useLocalSearchParams();

  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [phone, setPhone] = useState('');

  const handlePerfil = async () => {
    if (!name || !lastname || !phone) {
      Alert.alert('Erro', 'Todos os campos devem ser preenchidos');
      return;
    }

    try {
      await signup(name, lastname, phone, email, password, confirmpassword);
      Alert.alert('Sucesso', 'Cadastro realizado com sucesso');
      router.push('Login');
    } catch (error) {
      console.error('Erro no cadastro:', error);
      const errorMessage =
        (error as any)?.response?.data?.message || 'Erro desconhecido';
      Alert.alert('Erro no cadastro', errorMessage);
    }
  };

  const Content = (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      {Platform.OS !== 'web' && (
        <StatusBar barStyle="light-content" backgroundColor={colors.DarkBlue} />
      )}

      <MaterialCommunityIcons
        name="arrow-left-circle"
        size={39}
        color={colors.StrongGreen}
        style={styles.iconBack}
        onPress={() => router.push('Login')}
      />

      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/logotext.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Criar conta</Text>
      </View>

      <View style={styles.inputContainer}>
        <Input
          label="Nome"
          icone="person-outline"
          placeholder="Digite seu nome"
          onChangeText={setName}
          value={name}
        />
        <Input
          label="Sobrenome"
          icone="person-outline"
          placeholder="Digite seu sobrenome"
          onChangeText={setLastname}
          value={lastname}
        />
        <Input
          label="Número"
          icone="phone"
          placeholder="Digite seu número"
          onChangeText={setPhone}
          value={phone}
        />
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={handlePerfil}
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      {!!error && <Text style={styles.errorText}>{error}</Text>}
    </ScrollView>
  );

  if (Platform.OS === 'web') {
    return <View style={{ flex: 1 }}>{Content}</View>;
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      >
        {Content}
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default Cadastro2;