import { sx } from "@nfd/styles";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Input } from "@ui-kitten/components";
import { ScreenName } from "apps/expo-app/src/common/enum";
import { AvatarUI, ButtonUI, Group, Stack, TextUI } from "apps/expo-app/src/components/atom";
import IconChevronRight from "apps/expo-app/src/components/atom/icons/IconChevronRight";
import IconTextPlus from "apps/expo-app/src/components/atom/icons/IconTextPlus";
import { RootState } from "apps/expo-app/src/store";
import { mapUrlAsset } from "apps/expo-app/src/utils";
import { useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";

export interface AddNewTabProps {
  navigation?: any;
}

function AddNewTab({ navigation }: AddNewTabProps) {
  // State Init
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);
  // Store Init
  const selectorStore = useSelector((state: RootState) => state.selector);
  const { wallet, category } = selectorStore;
  // Form Init
  const { control, handleSubmit, setValue, reset } = useForm({
    defaultValues: {
      timestamp: new Date(),
      amount: "0",
      description: "",
    },
  });
  //Effect Init

  //Function handler
  const onSubmit = async (data: any) => {
    setLoadingSubmit(() => true);
    try {
      console.log({ ...data, walletId: wallet?.walletId });
    } catch (err) {
    } finally {
      reset();
      setLoadingSubmit(() => false);
    }
  };
  const redirectToSelectWallet = useCallback(() => {
    navigation.navigate(ScreenName.SELECT_WALLET_LIST, { replace: true });
  }, [navigation]);

  return (
    <>
      <Stack style={{ height: 100 }} bg="orange400" justify="flex-end">
        <Group position="between" style={[sx.pySm]}>
          <View></View>
          <TextUI fw="bold" size="xl" color="white">
            New Transaction
          </TextUI>
          <View></View>
        </Group>
      </Stack>
      <ScrollView keyboardShouldPersistTaps="handled">
        <Stack style={[sx.mtMd]} spacing="lg">
          <Stack style={[sx.pMd]} bg="white" spacing="xl">
            <TouchableOpacity onPress={redirectToSelectWallet}>
              <Group align="center" noWrap position="between">
                <AvatarUI radius="full" uri={mapUrlAsset(wallet?.thumbnail)} />
                {!wallet ? (
                  <TextUI fw="bold" size="lg" color="gray200">
                    Select wallet
                  </TextUI>
                ) : (
                  <TextUI fw="bold" size="lg" color="gray700" lineClamp={1}>
                    {wallet.name}
                  </TextUI>
                )}
                <IconChevronRight />
              </Group>
            </TouchableOpacity>
            <TouchableOpacity>
              <Group align="center" noWrap position="between">
                <AvatarUI radius="full" uri={mapUrlAsset(category?.thumbnail)} />
                {!category ? (
                  <TextUI fw="bold" size="lg" color="gray200">
                    Select category
                  </TextUI>
                ) : (
                  <TextUI fw="bold" size="lg" color="gray700" lineClamp={1}>
                    {category.name}
                  </TextUI>
                )}
                <IconChevronRight />
              </Group>
            </TouchableOpacity>
            <Controller
              control={control}
              name="amount"
              render={({ field: { onChange, value } }) => (
                <Input
                  onChange={(event) => onChange(event.nativeEvent.text)}
                  value={value}
                  status="info"
                  size="large"
                  label="Amount"
                  placeholder="Enter Amount"
                  keyboardType="decimal-pad"
                />
              )}
            />
            <Controller
              control={control}
              name="description"
              render={({ field: { onChange, value } }) => (
                <Input
                  onChange={(event) => onChange(event.nativeEvent.text)}
                  value={value}
                  status="info"
                  label="Description"
                  placeholder="Enter description"
                  numberOfLines={4}
                  maxLength={40}
                  editable
                  multiline
                />
              )}
            />
            <Controller
              control={control}
              name="timestamp"
              render={({ field: { onChange, value } }) => (
                <DateTimePicker
                  mode="datetime"
                  value={value}
                  onChange={(event) => onChange(new Date(event.nativeEvent?.timestamp || new Date()))}
                />
              )}
            />
          </Stack>
          <Stack style={[sx.pMd]}>
            <ButtonUI
              loading={loadingSubmit}
              onPress={handleSubmit(onSubmit)}
              size="md"
              radius="xl"
              color="orange"
              leftSection={<IconTextPlus color="white" />}
            >
              Save
            </ButtonUI>
          </Stack>
        </Stack>
      </ScrollView>
    </>
  );
}

export default AddNewTab;
