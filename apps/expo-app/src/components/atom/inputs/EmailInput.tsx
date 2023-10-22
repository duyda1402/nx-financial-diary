import { Input } from "@ui-kitten/components";
import { Control, FieldValues, useController } from "react-hook-form";
import { StyleProp, TextStyle, View } from "react-native";
import TextBase from "../typography/Text";

export interface EmailInput {
  name: string;
  defaultValue?: string;
  control: Control<FieldValues, any>;
  style?: StyleProp<TextStyle>;
  required?: boolean;
  placeholder?: string;
}

const EmailInput = ({ name, control, style, required = false, placeholder = "email@example.com" }: EmailInput) => {
  const {
    field: { value, onBlur, onChange },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
    rules: {
      pattern: {
        value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
        message: "Invalid email address",
      },
      required: {
        value: required,
        message: 'The "email" field is required',
      },
    },
  });
  return (
    <View
      style={{
        alignItems: "stretch",
        flexDirection: "column",
        width: "100%",
        display: "flex",
      }}
    >
      {invalid && (
        <TextBase fw="light" size="xs" color="rose500">
          {error?.message as string}
        </TextBase>
      )}
      <Input
        status={invalid ? "danger" : "info"}
        value={value}
        onChangeText={onChange}
        onBlur={onBlur}
        style={style}
        placeholder={placeholder}
      />
    </View>
  );
};

export default EmailInput;
