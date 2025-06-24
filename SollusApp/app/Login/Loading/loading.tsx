import { View, Text, StyleSheet, Image } from "react-native";
import { colors } from "../../../styles";

export default function Loading() {
    return(
        <View style={styles.container}>
            <Text style={styles.text}>Olá</Text>
            <Image
                source={require('../../../assets/logo.png')}
                style= {{width: 250, height: 100}}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.DarkBlue,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
      },
    text: {
        color: colors.StrongGreen,
        fontSize: 20,
    }
});