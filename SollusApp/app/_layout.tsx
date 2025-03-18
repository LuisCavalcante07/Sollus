import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";

export default function Layout() {
    const router = useRouter();
    useEffect(() =>{
        if(router){
            router.replace("Login");
        }   
    }, [router]);


    return(
        <Stack screenOptions={{headerShown: false}}>
            <Stack.Screen name="Login/index"/>
            <Stack.Screen name="Cadastro/index"/>
            <Stack.Screen name="Esqueci/index"/>
            <Stack.Screen name="Home/index"/>

        </Stack>
    );
}