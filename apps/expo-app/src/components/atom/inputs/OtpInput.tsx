import { colors, sx } from "@nfd/styles";
import React, { useRef, useState } from "react";
import { Control, FieldValues, useController } from "react-hook-form";
import { StyleProp, TextInput, TextStyle } from "react-native";
import Group from "../layout/Group";

export interface OtpInputProps {
  name: string;
  pinCount?: number;
  control: Control<FieldValues, any>;
  style?: StyleProp<TextStyle>;
  placeholder?: string;
  required?: boolean;
  noWrap?: boolean;
}

const OtpInput = ({ name, control, pinCount = 6, style, required = false, noWrap }: OtpInputProps) => {
  const [curValue, setCurValue] = useState<string[]>([]);
  const {
    field: { onChange },
    fieldState: { invalid },
  } = useController({
    name,
    control,
    rules: {
      required: {
        value: required,
        message: 'The "otp" field is required',
      },
      pattern: {
        value: /^[0-9]{6}$/,
        message: "Invalid otp address",
      },
      minLength: {
        value: pinCount,
        message: 'The "otp" field is required',
      },
      maxLength: {
        value: pinCount,
        message: 'The "otp" field is required',
      },
    },
  });
  const inputRefs = useRef<Array<any>>([]);
  const onChangeValue = (text: string, index: number) => {
    setCurValue((pre) => {
      const newValue = pre;
      newValue[index] = text;
      return newValue;
    });
    onChange(curValue.join(""));
    if (text.length !== 0) {
      return inputRefs?.current[index + 1]?.focus();
    }

    return inputRefs?.current[index - 1]?.focus();
  };

  return (
    <Group position="center" noWrap={noWrap} spacing="xs">
      {[...new Array(pinCount)].map((_value, index: number) => (
        <TextInput
          key={`${name}_${index}`}
          style={[
            style,
            {
              backgroundColor: colors.gray50,
              textAlign: "center",
              borderRadius: 10,
              borderWidth: 1.5,
              borderColor:
                invalid && (!curValue[index] || !/^[0-9]{1}$/.test(curValue[index])) ? colors.rose400 : colors.blue300,
              fontSize: 18,
              minWidth: 45,
              minHeight: 50,
            },
            sx.pXs,
          ]}
          ref={(ref) => (inputRefs.current[index] = ref)}
          keyboardType="decimal-pad"
          selectTextOnFocus
          maxLength={1}
          onChangeText={(text) => onChangeValue(text, index)}
          contextMenuHidden
          placeholder="•"
        />
      ))}
    </Group>
  );
};

export default OtpInput;
