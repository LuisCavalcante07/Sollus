import { useState } from 'react';
import { Text, View, Image, TouchableOpacity, Alert, TouchableWithoutFeedback, Keyboard, StatusBar } from 'react-native';
import styles from '../../styles/Login.styles';
import { Input } from '../../Components/Input/Input';
import { useRouter } from 'expo-router';
import { useAuthStore } from '../../store/authStore';

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const[isNavigating, setIsNavigating] = useState(false);

  const {login, error} = useAuthStore();
    
  const handleLogin = async () => {
    if(isNavigating) return;
    setIsNavigating(true);

    try {
      await login(email, password);
      router.push("Home");
    } catch (error) {
      console.error(error);
      console.error("Erro no cadastro:", error);
    }
    
  };

  const TelaCadastro = () => {
    router.push("Cadastro");
  };

  const merda = () =>{
    router.push("Esqueci");
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <StatusBar barStyle="light-content"/>
        <View style={styles.logoContainer}>
          <Image source={require('../../assets/logotext.png')} style={styles.logo} />
        </View>
        <Text style={styles.title}>Entre no seu perfil</Text>

        <View style={styles.inputContainer}>

          <Input label="Usuário" icone="person-outline" placeholder="Digite seu email" onChangeText={setEmail} value={email} />
          <Input label="Senha" icone="lock-outline" isPassword={true} placeholder="Digite sua senha" secureTextEntry={true} onChangeText={setPassword} value={password}/>
        </View>
        <TouchableOpacity onPress={merda}>
        <Text style={styles.forgotPassword}>Esqueci minha senha</Text>
        {error && <Text style={styles.error}>{error}</Text>}
        </TouchableOpacity>
        

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => router.push("Home")}>
          <Text style={styles.buttonText}>Entrar sem login (APAGAR)</Text>
        </TouchableOpacity>

        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Não tem conta?</Text>
          <TouchableOpacity onPress={TelaCadastro}>
          <Text style={styles.signupLink}>Criar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Login;