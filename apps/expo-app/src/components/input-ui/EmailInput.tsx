import { styles } from '@nfd/styles';
import { Input, Text } from '@ui-kitten/components';
import { Control, FieldValues, useController } from 'react-hook-form';
import { StyleProp, TextStyle, View } from 'react-native';
export interface EmailInput {
  name: string;
  defaultValue?: string;
  control: Control<FieldValues, any>;
  style?: StyleProp<TextStyle>;
  withAsterisk?: boolean;
}

const EmailInput = ({
  name,
  control,
  defaultValue = '',
  style,
  withAsterisk = false,
}: EmailInput) => {
  const {
    field: { value, onBlur, onChange },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
    defaultValue,
    rules: {
      pattern: {
        value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
        message: 'Invalid email address',
      },
      required: {
        value: withAsterisk,
        message: 'The "email" field is required',
      },
    },
  });
  return (
    <View
      style={{
        alignItems: 'stretch',
        flexDirection: 'column',
        width: '100%',
        display: 'flex',
      }}
    >
      {invalid && (
        <Text style={[styles.textXs, styles.textLight]} status="danger">
          {error?.message as string}
        </Text>
      )}
      <Input
        status={invalid ? 'danger' : 'info'}
        value={value}
        onChangeText={onChange}
        onBlur={onBlur}
        style={style}
        placeholder="example@example.com"
      />
    </View>
  );
};

export default EmailInput;
