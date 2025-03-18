import { colors } from "../../styles";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { TextInput, View } from "react-native";
import Label from "../../Label";
import styles from "./StyleInput";

type InputProps = {
  label: string;
  icone: keyof typeof MaterialIcons.glyphMap;
  placeholder: string;
  secureTextEntry?: boolean;
  value: string;
  onChangeText: (text: string) => void;
};

export const Input = ({ label, icone, placeholder, secureTextEntry, value, onChangeText }: InputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View>
      <Label style={styles.label}>{label}</Label>
      <View style={styles.inputWrapper}>
        <MaterialIcons name={icone} size={24} color={isFocused ? colors.White : '#999'} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={isFocused ? colors.White : '#999'}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChangeText={onChangeText}
          value={value} 
          secureTextEntry={secureTextEntry}
        />
      </View>
    </View>
  );
};
