import { useState } from 'react';
import { Text, View, Image, TouchableOpacity, Alert, TouchableWithoutFeedback, Keyboard, StatusBar } from 'react-native';
import styles from './StyleLogin';
import { Input } from '../../Components/Input/Input';
import { useRouter } from 'expo-router';

const Login = () => {
  const router = useRouter();
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
    
  const handleLogin = () => {
    router.push("Cadastro");
  };
  const cad = () => {
    router.push("Home");
  };
  const merda = () =>{
    router.push("Esqueci");
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <StatusBar barStyle="light-content"/>
        <View style={styles.logoContainer}>
          <Image source={require('../../assets/logo.png')} style={styles.logo} />
        </View>
        <Text style={styles.title}>Entre no seu perfil</Text>

        <View style={styles.inputContainer}>

          <Input label="Usuário" icone="person-outline" placeholder="Digite seu email" onChangeText={setUser} value={user} />
          <Input label="Senha" icone="lock-outline" placeholder="Digite sua senha" secureTextEntry={true} onChangeText={setPassword} value={password}/>
        </View>
        <TouchableOpacity onPress={merda}>
        <Text style={styles.forgotPassword}>Esqueci minha senha</Text>
        </TouchableOpacity>
        

        <TouchableOpacity style={styles.button} onPress={cad}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Não tem conta?</Text>
          <TouchableOpacity onPress={handleLogin}>
          <Text style={styles.signupLink}>Criar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Login;