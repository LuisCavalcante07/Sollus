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
  Dimensions,
} from 'react-native';
import styles from '../../styles/Esqueci.styles';
import { Input } from '../../Components/Input/Input';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../../styles';

const { width, height } = Dimensions.get('window');

const Esqueci = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();

  const handleConfirm = () => {
    if (!newPassword || !confirmPassword) {
      Alert.alert('Erro', 'Por favor, preencha ambos os campos');
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem');
      return;
    }
    Alert.alert('Sucesso', 'Senha alterada com sucesso!');
    // Aqui você pode chamar sua função para atualizar senha via API
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
          style={[styles.backIcon, { top: height * 0.05, left: width * 0.035 }]}
          onPress={voltar}
        />
        <View style={styles.logoContainer}>
          <Image source={require('../../assets/logo.png')} style={styles.logo} />
        </View>
        <Text style={styles.title}>Alterar sua senha</Text>

        <View style={styles.inputContainer}>
          <Input
            label="Nova senha"
            icone="lock-outline"
            placeholder="Escreva sua nova senha"
            onChangeText={setNewPassword}
            value={newPassword}
            secureTextEntry
          />
          <Input
            label="Confirme sua senha"
            icone="lock-outline"
            placeholder="Confirme sua senha"
            secureTextEntry
            onChangeText={setConfirmPassword}
            value={confirmPassword}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleConfirm}>
          <Text style={styles.buttonText}>Confirmar</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Esqueci;