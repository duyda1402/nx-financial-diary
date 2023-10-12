import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Text } from '@nfd/ui';
type Props = {
  //PressEvent
  onPress?: () => void;
  label: string;
};
const CustomButton = ({ onPress, label }: Props) => {
  return (
    <Pressable onPress={onPress} style={stylesButton.container}>
      <Text style={stylesButton.text}>{label}</Text>
    </Pressable>
  );
};

export default CustomButton;

const stylesButton = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 5,
    backgroundColor: '#3b82f6',
    marginVertical: 5,
    alignItems: 'center',
    padding: 15,
  },

  text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
