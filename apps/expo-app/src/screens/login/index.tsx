import { View, Text } from '@nfd/ui';
import { StyleSheet, Image } from 'react-native';
import CustomButton from 'ui/src/lib/button/button';
import CustomInput from 'ui/src/lib/inputs/inputs';

export interface LoginScreenProps {
  navigation: any;
}

function LoginScreen({ navigation }: LoginScreenProps) {
  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Image
          style={styles.image}
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/512/1087/1087171.png',
          }}
        />
        <Text style={styles.textName}>{process.env.NAME_APP}</Text>
      </View>
      <View style={styles.stack}>
        <CustomInput placeholder="example@test.app" />
        <CustomButton
          label="Login"
          onPress={() => navigation.navigate('Home')}
        />
      </View>
    </View>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  hero: {
    borderRadius: 12,
    backgroundColor: '#143055',
    padding: 36,
    marginBottom: 24,
  },
  stack: {
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'center',
    gap: 1,
    display: 'flex',
  },
  section: {
    marginVertical: 24,
    marginHorizontal: 12,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  image: {
    width: 120,
    height: 120,
  },

  textName: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  header: {
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
  },
  textLink: {
    fontSize: 16,
    color: '#2563eb',
  },
  select: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
