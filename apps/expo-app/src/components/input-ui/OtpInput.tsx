import { Input } from "@ui-kitten/components";
import React, { useRef, useState } from "react";
import { Control, FieldValues, useController } from "react-hook-form";
import { StyleProp, TextStyle } from "react-native";
import Group from "../layout/Group";

export interface OtpInputProps {
  name: string;
  pinCount?: number;
  control: Control<FieldValues, any>;
  style?: StyleProp<TextStyle>;
  placeholder?: string;
  required?: boolean;
}

const OtpInput = ({ name, control, pinCount = 6, style, required = false }: OtpInputProps) => {
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
    <Group position="center">
      {[...new Array(pinCount)].map((_value, index: number) => (
        <React.Fragment key={`${name}_${index}`}>
          <Input
            ref={(ref) => {
              if (ref && !inputRefs.current.includes(ref)) {
                inputRefs.current = [...inputRefs.current, ref];
              }
            }}
            status={invalid && (!curValue[index] || !/^[0-9]{1}$/.test(curValue[index])) ? "danger" : "info"}
            keyboardType="decimal-pad"
            selectTextOnFocus
            maxLength={1}
            onChangeText={(text) => onChangeValue(text, index)}
            contextMenuHidden
          />
        </React.Fragment>
      ))}
    </Group>
  );
};

export default OtpInput;
