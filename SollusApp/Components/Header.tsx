import React, { useRef } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const { width, height } = Dimensions.get('window');

type TitleProps = {
  title: string;
};

const Header = ({ title }: TitleProps) => {
  const router = useRouter();
  const StrongGreen = '#00B15E';

  const isNavigatingRef = useRef(false); 

  const handleBack = () => {
    if (isNavigatingRef.current) return; 

    isNavigatingRef.current = true;
    router.push('/Home');
    
    setTimeout(() => {
      isNavigatingRef.current = false;
    }, 1000);
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.arrowButton} onPress={handleBack}>
        <Feather name="arrow-left-circle" size={35} color={StrongGreen} />
      </TouchableOpacity>
      <View style={styles.viewTitle}>
        <Text style={styles.TitleStyle}>{title}</Text>
      </View>
      <Image source={require('../assets/logo.png')} style={styles.logoimagem} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: height * 0.08,
    paddingHorizontal: width * 0.05,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#21242D',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 9,
    elevation: 9,
  },
  arrowButton: {
    padding: 8,
  },
  viewTitle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  TitleStyle: {
    color: '#FFFEFF',
    fontSize: width * 0.05,
    fontWeight: '600',
  },
  logoimagem: {
    width: width * 0.1,
    height: width * 0.1,
  },
});

export default Header;