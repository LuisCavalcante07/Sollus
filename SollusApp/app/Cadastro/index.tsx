import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Alert, TouchableWithoutFeedback, Keyboard, StatusBar, Image } from 'react-native';
import styles from '../../styles/Cadastro.styles';
import { Input } from '../../Components/Input/Input';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../../styles';
import { useAuthStore } from '../../store/authStore';

const Cadastro = () => {
    const router = useRouter();
    const { signup, error, isLoading } = useAuthStore();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmpassword, setConfirmPassword] = useState<string>('');
    const [passwordError, setPasswordError] = useState<string>('');
    const [visiblePassword, setVisiblePassword] = useState<boolean>(false);

    const handleCadastro = async () => {
    
        if (password !== confirmpassword) {
            setPasswordError("As senhas não coincidem");
            return;
        }

        setPasswordError("");
        router.push({
            pathname: "Cadastro2",
            params: {email, password, confirmpassword}
        });
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
                    onPress={() => router.push("Login")}
                />

                <View style={[styles.logoContainer, { marginTop: 80 }]}>
                    <Image source={require('../../assets/logotext.png')} style={styles.logo} />
                    <Text style={styles.title}>Criar conta</Text>
                </View>

                <View style={styles.inputContainer}>
                    <Input label="Email" icone="mail-outline" placeholder="Digite seu email" onChangeText={setEmail} value={email} />
                    <Input label="Senha" icone="lock-outline" isPassword={true} placeholder="Digite sua senha" secureTextEntry={true} onChangeText={setPassword} value={password}/>
                    <Input label="Confirmar senha" icone="lock-outline" isPassword={true} placeholder="Digite novamente sua senha" secureTextEntry={true} onChangeText={setConfirmPassword} value={confirmpassword}/>
                </View>

                {passwordError !== '' && (
                    <Text style={{ fontSize: 19, color: '#E40606', marginTop: 12}}>{passwordError}</Text>
                )}

                <TouchableOpacity style={styles.button} onPress={handleCadastro} disabled={isLoading}>
                    <Text style={styles.buttonText}>Avançar</Text>
                </TouchableOpacity>

                {error && <Text style={{ color: 'red', textAlign: 'center', marginTop: 10 }}>{error}</Text>}
            </View>
        </TouchableWithoutFeedback>
    );
};

export default Cadastro;