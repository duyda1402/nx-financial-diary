import { colors, sx } from "@nfd/styles";
import DateTimePicker from "@react-native-community/datetimepicker";
import { apiCreateTransaction } from "apps/expo-app/src/api/transaction.api";
import { apiGetTotalBalance, apiWalletByUser } from "apps/expo-app/src/api/wallet.api";
import { TransactionTypeData } from "apps/expo-app/src/common";

import { ScreenName } from "apps/expo-app/src/common/enum";
import { TransactionType } from "apps/expo-app/src/common/types/transaction.type";
import {
  AvatarUI,
  ButtonUI,
  Group,
  IconChevronDown,
  IconCoins,
  IconTextCaption,
  Stack,
  TextUI,
} from "apps/expo-app/src/components/atom";
import IconChevronRight from "apps/expo-app/src/components/atom/icons/IconChevronRight";
import IconTextPlus from "apps/expo-app/src/components/atom/icons/IconTextPlus";
import { RootState } from "apps/expo-app/src/store";
import {
  actionAddTransactions,
  actionSetTotalBalance,
  actionSetWallets,
} from "apps/expo-app/src/store/feature/resources";
import { actionRemoveSelectCategory, actionSelectTransactionType } from "apps/expo-app/src/store/feature/selector";
import { mapUrlAsset, reloadFullData } from "apps/expo-app/src/utils";
import { useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Modal, Pressable, ScrollView, TextInput, TouchableOpacity, View, Image, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
export interface AddNewTabProps {
  navigation?: any;
}

function AddNewTab({ navigation }: AddNewTabProps) {
  // State Init
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  // Store Init
  const selectorStore = useSelector((state: RootState) => state.selector);
  const dispatch = useDispatch();

  const { wallet, category } = selectorStore;
  // Form Init
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      releaseAt: new Date(),
      amount: "0",
      description: "",
    },
  });
  //Effect Init

  //Function handler
  const onSubmit = async (data: any) => {
    setLoadingSubmit(() => true);
    if (selectorStore.transactionType !== "transfer" && !category?.categoryId) {
      setLoadingSubmit(() => false);
      return Alert.alert("Please select a Category");
    }
    if (data.amount <= 0) {
      setLoadingSubmit(() => false);
      return Alert.alert("Amount must be greater than 0");
    }
    try {
      const newTransaction = await apiCreateTransaction({
        releaseAt: data.releaseAt,
        amount: Number(data.amount),
        description: data.description,
        subject: category?.name,
        walletId: wallet?.walletId,
        categoryId: category?.categoryId,
        type: selectorStore.transactionType,
        thumbnail: category?.thumbnail,
      });

      dispatch(actionAddTransactions(newTransaction));
      reset();
      dispatch(actionRemoveSelectCategory());
      reloadFullData(dispatch);
      Alert.alert("Create transaction successfully!");
    } catch (err: any) {
      setLoadingSubmit(() => false);
      Alert.alert("Error: " + err.message);
    }
    setLoadingSubmit(() => false);
  };
  const redirectToSelectWallet = useCallback(() => {
    navigation.navigate(ScreenName.SELECT_WALLET_LIST, { replace: true });
  }, [navigation]);

  const redirectToSelectCategory = useCallback(() => {
    navigation.navigate(ScreenName.SELECT_CATEGORY, { replace: true });
  }, [navigation]);

  return (
    <>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View
          style={{
            top: 100,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
          }}
        >
          <Stack bg="white" style={{ padding: 24 }} spacing="xl">
            {TransactionTypeData.map((i) => (
              <Pressable
                key={i.value}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  if (i.value === TransactionType.TRANSFER) {
                    return Alert.alert("Coming soon!");
                  }
                  return dispatch(actionSelectTransactionType(i.value));
                }}
              >
                <Group align="center" position="between">
                  <Group align="center">
                    {i.value === "expense" && (
                      <Image
                        source={require("../../../../assets/icons/minus.png")}
                        style={{
                          width: 30,
                          height: 30,
                          resizeMode: "contain",
                        }}
                      />
                    )}
                    {i.value === "income" && (
                      <Image
                        source={require("../../../../assets/icons/plus.png")}
                        style={{
                          width: 30,
                          height: 30,
                          resizeMode: "contain",
                        }}
                      />
                    )}
                    {i.value === "transfer" && (
                      <Image
                        source={require("../../../../assets/icons/transfer.png")}
                        style={{
                          width: 30,
                          height: 30,
                          resizeMode: "contain",
                        }}
                      />
                    )}

                    <TextUI size="lg" fw="semi-bold" color="gray500">
                      {i.label}
                    </TextUI>
                  </Group>
                  {selectorStore.transactionType === i.value && (
                    <Image
                      source={require("../../../../assets/icons/checked.png")}
                      style={{
                        width: 20,
                        height: 20,
                        resizeMode: "contain",
                      }}
                    />
                  )}
                </Group>
              </Pressable>
            ))}
          </Stack>
        </View>
      </Modal>
      <Stack style={{ height: 100 }} bg="sky500" justify="flex-end">
        <Group position="between" style={[sx.pySm]}>
          <View></View>
          <View
            style={[{ backgroundColor: colors.sky400, borderRadius: 99, paddingBottom: 6, paddingTop: 6 }, sx.pxLg]}
          >
            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
              <Group align="center">
                <TextUI fw="bold" size="xl" color="white">
                  {TransactionTypeData.find((i) => i.value === selectorStore.transactionType)?.label}
                </TextUI>
                <IconChevronDown strokeWidth={3} color={colors.white} />
              </Group>
            </TouchableOpacity>
          </View>
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

            <TouchableOpacity onPress={redirectToSelectCategory}>
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
            <Group align="center" noWrap position="between">
              <IconCoins color={colors.gray400} size={40} />
              <Controller
                control={control}
                name="amount"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={{
                      width: 250,
                      borderBottomWidth: 1,
                      borderBottomColor: colors.gray200,
                      color: colors.gray600,
                      borderStyle: "solid",
                      paddingBottom: 8,
                      paddingRight: 8,
                      fontSize: 20,
                      textAlign: "right",
                    }}
                    onChange={(event) => onChange(event.nativeEvent.text)}
                    value={value}
                    placeholder="Enter amount"
                    keyboardType="decimal-pad"
                  />
                )}
              />
            </Group>
            <Group noWrap position="between" align="flex-start">
              <IconTextCaption color={colors.gray400} size={40} />
              <Controller
                control={control}
                name="description"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={{
                      width: 250,
                      borderBottomWidth: 1,
                      borderBottomColor: colors.gray200,
                      color: colors.gray600,
                      borderStyle: "solid",
                      paddingBottom: 8,
                      paddingRight: 8,
                      fontSize: 20,
                      textAlign: "right",
                    }}
                    editable
                    multiline
                    numberOfLines={4}
                    maxLength={250}
                    onChange={(event) => onChange(event.nativeEvent.text)}
                    value={value}
                    placeholder="Enter description"
                    keyboardType="default"
                  />
                )}
              />
            </Group>
            <Controller
              control={control}
              name="releaseAt"
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
              color="sky"
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
