import { SafeAreaView, StyleSheet } from "react-native";
import Header from "../../Components/Header";

const Tutorial = () => {
    return(
        <SafeAreaView style={styles.container}>
            <Header title="Como usar"/>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0D141C',
    }
})

export default Tutorial