import { sx } from "@nfd/styles";
import React, { useEffect, useState } from "react";
import { ImageBackground, ScrollView, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { apiGetTransactionByWallet } from "../../api/transaction.api";
import { TransactionInfo, TransactionType } from "../../common/types/transaction.type";
import { Group, IconPencil, Stack, TextUI } from "../../components/atom";
import IconChevronLeft from "../../components/atom/icons/IconChevronLeft";
import RecentTransition from "../../components/recent";
import { RootState } from "../../store";
import { formatNumberWithCommas, mapUrlAsset } from "../../utils";
import { ScreenName } from "../../common/enum";

type Props = {
  navigation?: any;
};

const WalletDetailScreen = ({ navigation }: Props) => {
  // State Init
  const [transactions, setTransactions] = useState<TransactionInfo[]>([]);
  const [balanceExpense, setBalanceExpense] = useState<number>(0);
  const [balanceIncome, setBalanceIncome] = useState<number>(0);
  // Store Init
  const wallet = useSelector((state: RootState) => state.selector.wallet);

  //Effect Init
  useEffect(() => {
    const fetchData = async () => {
      const recent = await apiGetTransactionByWallet(`${wallet?.walletId}`);
      setTransactions(recent);
      recent.forEach((i) => {
        if (i.type === TransactionType.EXPENSE) {
          setBalanceExpense((pre) => pre + i.amount);
        } else if (i.type === TransactionType.INCOME) {
          setBalanceIncome((pre) => pre + i.amount);
        }
      });
    };
    fetchData();
  }, []);

  return (
    <>
      <ImageBackground
        imageStyle={{ opacity: 0.9 }}
        style={{ backgroundColor: "rgba(0, 0, 0, 1)" }}
        source={{
          uri: `${mapUrlAsset(wallet?.thumbnail || "")}`,
        }}
        resizeMode="cover"
      >
        <Stack style={{ height: 100 }} justify="flex-end">
          <Group position="between" style={[sx.pySm, sx.pxMd]} align="center">
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <IconChevronLeft color="white" />
            </TouchableOpacity>
            <TextUI fw="bold" size="xl" color="white">
              {wallet?.name}
            </TextUI>
            <TouchableOpacity onPress={() => navigation.navigate(ScreenName.WALLET_EDIT)}>
              <IconPencil color="white" />
            </TouchableOpacity>
          </Group>
        </Stack>
      </ImageBackground>
      <ScrollView keyboardShouldPersistTaps="handled" style={{ paddingTop: 16, backgroundColor: "#fff" }}>
        <Stack>
          <Stack style={sx.pxMd}>
            <Group position="between" align="center" style={[sx.hero]} bg="gray50">
              <TextUI color="sky400" fw="semi-bold">
                Total Balance
              </TextUI>
              <TextUI color="sky400" size="xl" fw="bold">
                {formatNumberWithCommas(wallet?.balance || 0)}
              </TextUI>
            </Group>

            <Group position="center" noWrap>
              <Stack spacing="sm" style={[sx.hero, { width: "45%" }]} bg="gray50">
                <TextUI color="sky400" fw="semi-bold">
                  Expense
                </TextUI>
                <Group position="between" align="center">
                  <TextUI color="rose400" size="xl" fw="bold">
                    {formatNumberWithCommas(balanceExpense || 0)}
                  </TextUI>
                </Group>
              </Stack>

              <Stack spacing="sm" style={[sx.hero, { width: "45%" }]} bg="gray50">
                <TextUI color="sky400" fw="semi-bold">
                  Income
                </TextUI>
                <Group position="between" align="center">
                  <TextUI color="green400" size="xl" fw="bold">
                    {formatNumberWithCommas(balanceIncome || 0)}
                  </TextUI>
                </Group>
              </Stack>
            </Group>
          </Stack>
          <Stack bg="white" style={[sx.pyMd]}>
            <Group style={[{ width: "100%" }, sx.pxMd]} position="between" align="center">
              <TextUI fw="semi-bold" size="md" color="gray700">
                Recent
              </TextUI>
            </Group>
            <RecentTransition transactions={transactions} />
          </Stack>
        </Stack>
      </ScrollView>
    </>
  );
};

export default WalletDetailScreen;
