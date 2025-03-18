import React, { ReactNode } from 'react';
import { Text, StyleSheet, TextStyle } from 'react-native';

interface LabelProps {
  children: ReactNode;
  style?: TextStyle;
}

const Label: React.FC<LabelProps> = ({ children, style }) => {
  return <Text style={[styles.label, style]}>{children}</Text>;
};

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    color: '#FFFEFF',
  },
});

export default Label;