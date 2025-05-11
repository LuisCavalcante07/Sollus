import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import { InteractionManager } from "react-native";

export default function Layout() {
    const router = useRouter();
    useEffect(() =>{
        InteractionManager.runAfterInteractions(() => {
            router.replace("/Login");
        });
    }, [router]);


    return(
        <Stack screenOptions={{headerShown: false}}>
            <Stack.Screen name="Login/index"/>
            <Stack.Screen name="Cadastro/index"/>
            <Stack.Screen name="Cadastro2/index"/>
            <Stack.Screen name="Esqueci/index"/>
            <Stack.Screen name="Home/index"/>
            <Stack.Screen name="Relatorio/index"/>
            <Stack.Screen name="Historico/index"/>
            <Stack.Screen name="Grafico/index"/>
            <Stack.Screen name="Sugestoes/index"/>
            <Stack.Screen name="Tutorial/index"/>
        </Stack>
    );
}