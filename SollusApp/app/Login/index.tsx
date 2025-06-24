import { useState } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import styles from '../../styles/Login.styles';
import { Input } from '../../Components/Input/Input';
import { useRouter } from 'expo-router';
import { useAuthStore } from '../../store/authStore';

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isNavigating, setIsNavigating] = useState(false);
  const { login, error } = useAuthStore();

  const handleLogin = async () => {
    if (isNavigating) return;
    setIsNavigating(true);

    try {
      await login(email, password);
      router.push('Home');
    } catch (error) {
      Alert.alert('Erro', 'Falha ao realizar login. Verifique suas credenciais.');
      console.error('Erro no login:', error);
      setIsNavigating(false);
    }
  };

  const handleForgotPassword = () => router.push('Esqueci');
  const goToSignup = () => router.push('Cadastro');

  const Content = (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <StatusBar barStyle="light-content" />
      <View style={styles.logoContainer}>
        <Image source={require('../../assets/logotext.png')} style={styles.logo} />
      </View>

      <Text style={styles.title}>Entre no seu perfil</Text>

      <View style={styles.inputContainer}>
        <Input
          label="Usuário"
          icone="person-outline"
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

        <TouchableOpacity onPress={handleForgotPassword}>
          <Text style={styles.forgotPassword}>Esqueci minha senha</Text>
          {error && <Text style={styles.error}>{error}</Text>}
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.button, isNavigating && { opacity: 0.6 }]}
        onPress={handleLogin}
        disabled={isNavigating}
      >
        <Text style={styles.buttonText}>
          {isNavigating ? 'Entrando...' : 'Entrar'}
        </Text>
      </TouchableOpacity>

      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Não tem conta?</Text>
        <TouchableOpacity onPress={goToSignup}>
          <Text style={styles.signupLink}>Criar</Text>
        </TouchableOpacity>
      </View>
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

export default Login;