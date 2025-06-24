import React, { useState } from 'react';
import {
  Text, View, TouchableOpacity, Alert, Platform,
  KeyboardAvoidingView, ScrollView, Keyboard, StatusBar, Image, TouchableWithoutFeedback
} from 'react-native';
import styles from '../../styles/Cadastro.styles';
import { Input } from '../../Components/Input/Input';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../../styles';
import { useAuthStore } from '../../store/authStore';

const Cadastro = () => {
  const router = useRouter();
  const { signup, error, isLoading } = useAuthStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleCadastro = async () => {
    if (password !== confirmpassword) {
      setPasswordError('As senhas não coincidem');
      return;
    }

    setPasswordError('');
    router.push({
      pathname: 'Cadastro2',
      params: { email, password, confirmpassword },
    });
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
          label="Email"
          icone="mail-outline"
          placeholder="Digite seu email"
          onChangeText={setEmail}
          value={email}
        />
        <Input
          label="Senha"
          icone="lock-outline"
          isPassword
          placeholder="Digite sua senha"
          secureTextEntry
          onChangeText={setPassword}
          value={password}
        />
        <Input
          label="Confirmar senha"
          icone="lock-outline"
          isPassword
          placeholder="Digite novamente sua senha"
          secureTextEntry
          onChangeText={setConfirmPassword}
          value={confirmpassword}
        />
        {!!passwordError && <Text style={styles.errorText}>{passwordError}</Text>}
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={handleCadastro}
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>Avançar</Text>
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

export default Cadastro;