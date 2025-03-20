import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Alert, TouchableWithoutFeedback, Keyboard, StatusBar, Image } from 'react-native';
import styles from './StyleCadastro2';
import { Input } from '../../Components/Input/Input';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../../styles';

const Cadastro2 = () => {
    const router = useRouter();
    const params = useLocalSearchParams();

    // Função para garantir que o valor recebido é uma string
    const getParam = (param: string | string[] | undefined) => {
        return param ? decodeURIComponent(Array.isArray(param) ? param[0] : param) : '';
    };

    // Pegando os valores passados da tela anterior
    const nome = getParam(params.nome);
    const sobrenome = getParam(params.sobrenome);
    const numero = getParam(params.numero);

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordc, setPasswordc] = useState<string>('');

    // Exibir um alert ao carregar a tela com os dados recebidos
    useEffect(() => {
        Alert.alert("Dados Recuperados", `Nome: ${nome}\nSobrenome: ${sobrenome}\nNúmero: ${numero}`);
    }, []);

    const handleCadastro = () => {
        if (!email || !password || !passwordc) {
            Alert.alert("Erro", "Todos os campos devem ser preenchidos");
            return;
        }

        if (password !== passwordc) {
            Alert.alert("Erro", "As senhas não coincidem");
            return;
        }


        Alert.alert(
            "Cadastro",
            `Nome: ${nome}\nSobrenome: ${sobrenome}\nNúmero: ${numero}\nEmail: ${email}\nSenha: ${password}`
        );
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
                    onPress={() => router.push("Cadastro")}
                />

                <View style={[styles.logoContainer, { marginTop: 80 }]}>
                    <Image source={require('../../assets/logo.png')} style={styles.logo} />
                    <Text style={styles.title}>Criar conta</Text>
                </View>

                <View style={styles.inputContainer}>
                    <Input label="Email" icone="mail-outline" placeholder="Digite seu email" onChangeText={setEmail} value={email} />
                    <Input label="Senha" icone="lock-outline" placeholder="Digite sua senha" secureTextEntry={true} onChangeText={setPassword} value={password} />
                    <Input label="Confirmar senha" icone="lock-outline" placeholder="Confirme sua senha" secureTextEntry={true} onChangeText={setPasswordc} value={passwordc} />
                </View>

                <TouchableOpacity style={styles.button} onPress={handleCadastro}>
                    <Text style={styles.buttonText}>Cadastrar</Text>
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default Cadastro2;
