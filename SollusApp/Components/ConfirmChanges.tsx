import React from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Text, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ConfirmChanges = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <AntDesign name="checkcircle" size={208} color="#4CAF50" />
        <Text style={styles.text}>Informações alteradas</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D141C',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 20,
    marginTop: 20,
  },
});

export default ConfirmChanges;
