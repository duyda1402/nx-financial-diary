import React from 'react';

import { TextInput } from 'react-native';
import { StyleSheet } from 'react-native';
import { View } from '@nfd/ui';

const CustomInput = ({
  value,
  onChange,
  placeholder,
  secureTextEntry,
}: any) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={onChange}
        value={value}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    minWidth: 200,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#e8e8e8',
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  input: {
    margin: 10,
    height: 25,
  },
});
