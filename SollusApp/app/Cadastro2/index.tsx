import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Alert, TouchableWithoutFeedback, Keyboard, StatusBar, Image } from 'react-native';
import styles from '../../styles/StyleCadastro2';
import { Input } from '../../Components/Input/Input';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../../styles';
import { useAuthStore } from '../../store/authStore';

const Cadastro2 = () => { 
    const router = useRouter();
    const { signup, error, isLoading } = useAuthStore();
    const {email, password, confirmpassword} = useLocalSearchParams();
    const [name, setName] = useState<string>('');
    const [lastname, setLastname] = useState<string>('');
    const [phone, setPhone] = useState<string>(''); // Alterado para string para evitar erro

    const handlePerfil = async () => {
        if (!name || !lastname || !phone) {
            Alert.alert("Erro", "Todos os campos devem ser preenchidos");
            return;
        }
        console.log(name, lastname, phone, email, password, confirmpassword);
        try {
            await signup(name, lastname, phone, email, password, confirmpassword);
            Alert.alert("Sucesso", "Cadastro realizado com sucesso")
            router.push("Login");
        } catch (error) {
            console.error("Erro no cadastro:", error);
            const errorMessage = (error as any).response?.data?.message || "Erro desconhecido";
            Alert.alert("Erro no cadastro", errorMessage);
        }
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

                    <View style={styles.logoContainer}>
                        <Image source={require('../../assets/logotext.png')} style={styles.logo} />
                        <Text style={styles.title}>Criar conta</Text>
                    </View>

                    <View style={styles.inputContainer}>
                        <Input label="Nome" icone="person-outline" placeholder="Digite seu nome" onChangeText={setName} value={name} />
                        <Input label="Sobrenome" icone="person-outline" placeholder="Digite seu sobrenome" onChangeText={setLastname} value={lastname} />
                        <Input label="Número" icone="phone" placeholder="Digite seu número" onChangeText={setPhone} value={phone} />
                    </View>
                

                <TouchableOpacity style={styles.button} onPress={handlePerfil}>
                    <Text style={styles.buttonText}>Cadastrar</Text>
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default Cadastro2;