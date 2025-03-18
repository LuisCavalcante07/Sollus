import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Alert, TouchableWithoutFeedback, Keyboard, StatusBar, Image } from 'react-native';
import styles from './StyleCadastro2';
import { Input } from '../../Components/Input/Input';
import Svg, { Path } from 'react-native-svg';

const Cadastro2 = () => {
    const [nome, setNome] = useState('');
    const [password, setPassword] = useState('');
    const [passwordc, setPasswordc] = useState('');

    const handleCadastro = () => {
        Alert.alert('Cadastro', `Nome: ${nome}\nPassword: ${password}\nPasswordc: ${passwordc}`);
    };

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
                <StatusBar barStyle="light-content" />

                <Svg
                    width="53"
                    height="53"
                    viewBox="0 0 53 53"
                    fill="none"
                    style={{ position: 'absolute', top: 17, left: 25 }}
                >
                    <Path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M11 15.2376L11 29.7641C11 34.8246 14.5843 38 19.6565 38H33.3435C38.4157 38 42 34.8414 42 29.7641L42 15.2376C42 10.1603 38.4157 7 33.3435 7L19.6565 7C14.5843 7 11 10.1603 11 15.2376Z"
                        stroke="#00B15E"
                        strokeWidth="2.51351"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <Path d="M19.6532 22.5L33.3468 22.5" stroke="#00B15E" strokeWidth="2.51351" strokeLinecap="round" strokeLinejoin="round" />
                    <Path d="M25.96 28.7805L19.6527 22.5L25.96 16.2196" stroke="#00B15E" strokeWidth="2.51351" strokeLinecap="round" strokeLinejoin="round" />
                </Svg>

                <View style={[styles.logoContainer, { marginTop: 80 }]}>
                    <Image source={require('../../assets/logo.png')} style={styles.logo} />
                    <Text style={styles.title}>Criar conta</Text>
                </View>

                <View style={styles.inputContainer}>
                    <Input label="Email" icone="person-outline" placeholder="Digite seu email" onChangeText={setNome} value={nome} />
                    <Input label="Senha" icone="lock-outline" placeholder="Digite sua senha" secureTextEntry={true} onChangeText={setPassword} value={password}/>
                    <Input label="Confirmar senha" icone="lock-outline" placeholder="Confirme sua senha" secureTextEntry={true} onChangeText={setPasswordc} value={passwordc}/>
                </View>

                <TouchableOpacity style={styles.button} onPress={handleCadastro}>
                    <Text style={styles.buttonText}>Cadastrar</Text>
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default Cadastro2;