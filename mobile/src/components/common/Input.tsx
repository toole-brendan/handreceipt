import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { TextInput, TextInputProps } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';

interface InputProps extends Omit<TextInputProps, 'theme' | 'render'> {
  errorText?: string;
  icon?: string;
  containerStyle?: ViewStyle;
}

export const Input = ({
  errorText,
  icon,
  containerStyle,
  style,
  error,
  ...props
}: InputProps) => {
  return (
    <TextInput
      mode="outlined"
      error={error || !!errorText}
      left={icon ? <TextInput.Icon icon={({ size, color }) => <Icon name={icon} size={size} color={color} />} /> : undefined}
      style={[styles.input, style]}
      outlineStyle={styles.outline}
      contentStyle={styles.content}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#fff',
    marginVertical: 8,
  },
  outline: {
    borderRadius: 8,
  },
  content: {
    paddingHorizontal: 12,
  },
});

export default Input; 