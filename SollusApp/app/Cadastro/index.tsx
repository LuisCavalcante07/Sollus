import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Alert, TouchableWithoutFeedback, Keyboard, StatusBar, Image } from 'react-native';
import styles from './StyleCadastro';
import { Input } from '../../Components/Input/Input';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../../styles';

const Cadastro = () => {
    const router = useRouter();
    const [nome, setNome] = useState<string>('');
    const [sobrenome, setSobrenome] = useState<string>('');
    const [numero, setNumero] = useState<string>(''); // Alterado para string para evitar erro

    const handleAvancar = () => {
        if (!nome || !sobrenome || !numero) {
            Alert.alert("Erro", "Todos os campos devem ser preenchidos");
            return;
        }

        // Passando os dados corretamente na URL
        router.push(`/Cadastro2?nome=${encodeURIComponent(nome)}&sobrenome=${encodeURIComponent(sobrenome)}&numero=${encodeURIComponent(numero)}`);
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

                <View style={styles.Maior}>
                    <View style={styles.logoContainer}>
                        <Image source={require('../../assets/logo.png')} style={styles.logo} />
                        <Text style={styles.title}>Criar conta</Text>
                    </View>

                    <View style={styles.inputContainer}>
                        <Input label="Nome" icone="person-outline" placeholder="Digite seu nome" onChangeText={setNome} value={nome} />
                        <Input label="Sobrenome" icone="person-outline" placeholder="Digite seu sobrenome" onChangeText={setSobrenome} value={sobrenome} />
                        <Input label="Número" icone="phone" placeholder="Digite seu número" onChangeText={setNumero} value={numero} />
                    </View>
                </View>

                <TouchableOpacity style={styles.button} onPress={handleAvancar}>
                    <Text style={styles.buttonText}>Avançar</Text>
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default Cadastro;