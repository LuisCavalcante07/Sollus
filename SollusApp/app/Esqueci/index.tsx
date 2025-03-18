import React, { useState } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  StatusBar,
} from 'react-native';
import styles from './StylesEsqueci'; 
import { Input } from '../../Components/Input/Input'; 
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../../styles'; 

const Esqueci = () => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    Alert.alert('Login', `Email: ${user}\nSenha: ${password}`);
  };

  const voltar = () => {
    router.push('/Login'); 
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <MaterialCommunityIcons
          name="arrow-left-circle"
          size={39}
          color={colors.StrongGreen}
          style={{ position: 'absolute', top: 17, left: 25, marginTop: 50 }}
          onPress={voltar}
        />
        <View style={styles.logoContainer}>
          <Image source={require('../../assets/logo.png')} style={styles.logo} />
        </View>
        <Text style={styles.title}>Alterar sua senha</Text>

        <View style={styles.inputContainer}>
          <Input
            label="Nova senha"
            icone="person-outline"
            placeholder="Escreva sua nova senha"
            onChangeText={setUser}
            value={user}
          />
          <Input
            label="Confirme sua senha"
            icone="lock-outline"
            placeholder="Confirme sua senha"
            secureTextEntry={true}
            onChangeText={setPassword}
            value={password}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Confirmar</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Esqueci;