import { styles } from '@nfd/styles';
import { Button, Layout, Text } from '@ui-kitten/components';
import { useForm } from 'react-hook-form';
import { Alert, Image, View } from 'react-native';
import EmailInput from '../../components/input-ui/EmailInput';
import { useState } from 'react';
import LoadingIndicator from '../../components/loader/LoaderIndicator';
export interface LoginScreenProps {
  navigation?: any;
}

type Form = {
  email: string;
};

function LoginScreen({ navigation }: LoginScreenProps) {
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);
  const { control, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    setLoadingSubmit(() => true);
    Alert.alert(JSON.stringify(data));
    setLoadingSubmit(() => false);
  };

  return (
    <Layout style={styles.container}>
      <View style={styles.stackCenter}>
        <Image
          style={{ height: 80, width: 80 }}
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/512/1087/1087171.png',
          }}
        />
        {/* <Text style={[styles.textLg, styles.textSemiBold]}>
          {process.env.EXPO_PUBLIC_NAME_APP}
        </Text> */}
      </View>

      <View style={[styles.stackCenter]}>
        <EmailInput name="email" control={control} withAsterisk />

        {loadingSubmit ? (
          <Button
            status="info"
            accessoryLeft={() => <LoadingIndicator />}
            appearance="outline"
          >
            Continue
          </Button>
        ) : (
          <Button
            status="info"
            onPress={handleSubmit(onSubmit)}
            appearance="outline"
          >
            Continue
          </Button>
        )}
      </View>
    </Layout>
  );
}

export default LoginScreen;
