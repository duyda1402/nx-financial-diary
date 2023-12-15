import { colors, sx } from "@nfd/styles";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useCallback, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert, ScrollView, TextInput, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { apiDeleteTransaction, apiGetTransactionDetails, apiUpdateTransaction } from "../../api/transaction.api";
import { ScreenName } from "../../common/enum";
import { TransactionInfo } from "../../common/types/transaction.type";
import {
  AvatarUI,
  ButtonUI,
  Group,
  IconChevronRight,
  IconCoins,
  IconTextCaption,
  IconTextPlus,
  IconTrash,
  Stack,
  TextUI,
} from "../../components/atom";
import IconChevronLeft from "../../components/atom/icons/IconChevronLeft";
import { RootState } from "../../store";
import { actionSelectCategory, actionSelectWallet } from "../../store/feature/selector";
import { mapUrlAsset, reloadFullData } from "../../utils";

type Props = {
  navigation?: any;
};

const TransactionDetailScreen = ({ navigation }: Props) => {
  // State Init
  const [transaction, setTransaction] = useState<TransactionInfo | null>(null);
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);
  // Store Init
  const selector = useSelector((state: RootState) => state.selector);
  const resources = useSelector((state: RootState) => state.resources);
  const dispatch = useDispatch();
  // Form Init
  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      releaseAt: new Date(),
      amount: "0",
      description: "",
    },
  });
  const onDelete = async () => {
    setLoadingSubmit(() => true);
    try {
      await apiDeleteTransaction(`${transaction?.transactionId}`);
      reloadFullData(dispatch);
      Alert.alert("Success", "Delete transaction successfully!", [{ text: "OK", onPress: () => navigation.goBack() }]);
    } catch (err: any) {
      setLoadingSubmit(() => false);
      Alert.alert("Error: " + err.message);
    }
    setLoadingSubmit(() => false);
  };
  const onSubmit = async (data: any) => {
    setLoadingSubmit(() => true);
    try {
      await apiUpdateTransaction(`${transaction?.transactionId}`, {
        releaseAt: data.releaseAt,
        amount: Number(data.amount),
        description: data.description,
        subject: selector.category?.name,
        walletId: selector?.wallet?.walletId,
        categoryId: selector?.category?.categoryId,
        thumbnail: selector?.category?.thumbnail,
      });
      reloadFullData(dispatch);
      Alert.alert("Success", "Update transaction successfully!");
    } catch (err: any) {
      setLoadingSubmit(() => false);
      Alert.alert("Error: " + err.message);
    }
    setLoadingSubmit(() => false);
  };

  //Effect Init
  useEffect(() => {
    const fetchData = async () => {
      const transaction = await apiGetTransactionDetails(selector.transactionId);
      if (transaction) {
        dispatch(
          actionSelectCategory(resources.categories.find((i) => i.categoryId === transaction.categoryId) || null),
        );
        dispatch(actionSelectWallet(resources.wallets.find((i) => i.walletId === transaction.walletId) || null));
        setValue("releaseAt", new Date(transaction.releaseAt));
        setValue("amount", `${transaction.amount}`);
        setValue("description", `${transaction.description}`);
      }
      setTransaction(transaction);
    };
    fetchData();
  }, []);

  const redirectToSelectWallet = useCallback(() => {
    navigation.navigate(ScreenName.SELECT_WALLET_LIST, { replace: true });
  }, [navigation]);

  const redirectToSelectCategory = useCallback(() => {
    navigation.navigate(ScreenName.SELECT_CATEGORY, { replace: true });
  }, [navigation]);

  return (
    <>
      <Stack style={{ height: 100 }} bg="sky500" justify="flex-end">
        <Group position="between" style={[sx.pySm, sx.pxMd]} align="center">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <IconChevronLeft color="white" />
          </TouchableOpacity>
          <TextUI fw="bold" size="xl" color="white">
            Transaction Details
          </TextUI>
          <TouchableOpacity>{/* <IconSearch color="white" /> */}</TouchableOpacity>
        </Group>
      </Stack>
      <ScrollView keyboardShouldPersistTaps="handled" style={{ paddingTop: 16, backgroundColor: "#fff" }}>
        <Stack style={[sx.mtMd]} spacing="lg">
          <Stack style={[sx.pMd]} bg="white" spacing="xl">
            <TouchableOpacity onPress={redirectToSelectWallet}>
              <Group align="center" noWrap position="between">
                <AvatarUI radius="full" uri={mapUrlAsset(selector?.wallet?.thumbnail)} />
                {!selector?.wallet ? (
                  <TextUI fw="bold" size="lg" color="gray200">
                    Select wallet
                  </TextUI>
                ) : (
                  <TextUI fw="bold" size="lg" color="gray700" lineClamp={1}>
                    {selector?.wallet?.name}
                  </TextUI>
                )}
                <IconChevronRight />
              </Group>
            </TouchableOpacity>

            <TouchableOpacity onPress={redirectToSelectCategory}>
              <Group align="center" noWrap position="between">
                <AvatarUI radius="full" uri={mapUrlAsset(selector?.category?.thumbnail)} />
                {!selector?.category ? (
                  <TextUI fw="bold" size="lg" color="gray200">
                    Select category
                  </TextUI>
                ) : (
                  <TextUI fw="bold" size="lg" color="gray700" lineClamp={1}>
                    {selector?.category?.name}
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
            <Group position="right">
              <ButtonUI
                loading={loadingSubmit}
                onPress={onDelete}
                size="md"
                radius="xl"
                color="rose"
                leftSection={<IconTrash color="white" />}
              >
                Delete
              </ButtonUI>
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
            </Group>
          </Stack>
        </Stack>
      </ScrollView>
    </>
  );
};

export default TransactionDetailScreen;
