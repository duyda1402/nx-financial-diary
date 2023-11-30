import { colors, sx } from "@nfd/styles";
import { apiGetTotalBalance } from "apps/expo-app/src/api/wallet.api";
import { BG_BASE } from "apps/expo-app/src/common";
import { ScreenName } from "apps/expo-app/src/common/enum";
import {
  AvatarUI,
  ButtonUI,
  Group,
  IconEye,
  IconEyeOff,
  IconPlus,
  Stack,
  TextUI,
} from "apps/expo-app/src/components/atom";
import BudgetsComponent from "apps/expo-app/src/components/budgets";
import LoadingIndicator from "apps/expo-app/src/components/loader/LoaderIndicator";
import RecentTransition from "apps/expo-app/src/components/recent";
import Wallets from "apps/expo-app/src/components/wallets";
import { RootState } from "apps/expo-app/src/store";
import { actionSetTotalBalance } from "apps/expo-app/src/store/feature/resources";
import { formatNumberWithCommas, mapUrlAsset } from "apps/expo-app/src/utils";
import { useEffect, useState } from "react";
import { ImageBackground, Pressable, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export interface HomeTabProps {
  navigation?: any;
}

function HomeTab({ navigation }: HomeTabProps) {
  // Navigate Init
  // Store Init
  const userInfo = useSelector((state: RootState) => state.auth.info);
  const resources = useSelector((state: RootState) => state.resources);
  const dispatch = useDispatch();
  // State Init
  const [loading, setLoading] = useState<boolean>(false);
  const [isShowBalance, setIsShowBalance] = useState<boolean>(false);
  const [background, setBackground] = useState<string>("");
  //Effect Init
  useEffect(() => {
    const fetchTotalBalance = async () => {
      const total = await apiGetTotalBalance();
      dispatch(actionSetTotalBalance(total ?? 0));
    };
    if (isShowBalance) {
      fetchTotalBalance();
    }
    setBackground(BG_BASE);
  }, [isShowBalance]);

  return (
    <ScrollView>
      {loading ? (
        <Stack style={{ flex: 1 }}>
          <LoadingIndicator />
        </Stack>
      ) : (
        <>
          <ImageBackground
            style={{ paddingTop: 32, backgroundColor: "rgba(0, 0, 0, 1)" }}
            imageStyle={{ opacity: 0.6 }}
            source={{ uri: background }}
          >
            <Stack style={[sx.mtMd, sx.pxMd]}>
              <Group position="between" align="center" noWrap>
                <TextUI style={{ maxWidth: 300 }} color="white" fw="bold" size="2xl" lineClamp={1}>
                  Hello {userInfo?.displayName ? userInfo?.displayName : userInfo?.email}!
                </TextUI>
                <AvatarUI uri={mapUrlAsset(userInfo?.profileUrl)} radius="xl" withBorder />
              </Group>
              <Stack style={[sx.hero]} bg="gray50">
                <Stack spacing="sm">
                  <TextUI color="gray400" fw="semi-bold">
                    Total balance:
                  </TextUI>
                  <Group position="between" align="center">
                    <TextUI color="sky400" size="xl" fw="bold">
                      {isShowBalance ? formatNumberWithCommas(resources.totalBalance) : "******"}
                    </TextUI>
                    <Pressable onPress={() => setIsShowBalance(!isShowBalance)}>
                      {isShowBalance ? <IconEyeOff color={colors.gray400} /> : <IconEye color={colors.gray400} />}
                    </Pressable>
                  </Group>
                </Stack>
              </Stack>
            </Stack>
          </ImageBackground>
          <Stack style={{ marginTop: 16 }}>
            {/* Wallets */}
            <Stack bg="white" style={[sx.pyMd]}>
              <Group style={[{ width: "100%" }, sx.pxMd]} position="between" align="center">
                <TextUI fw="semi-bold" size="md" color="gray700">
                  Your Wallet
                </TextUI>
                <ButtonUI
                  compact
                  variant="subtle"
                  leftSection={<IconPlus size={18} strokeWidth={2} color={colors.sky500} />}
                  color="sky"
                  onPress={() => navigation.navigate(ScreenName.ADD_WALLET)}
                >
                  Add New
                </ButtonUI>
              </Group>
              <Wallets />
            </Stack>
            {/* Wallets */}
            <Stack bg="white" style={[sx.pyMd]}>
              <Group style={[{ width: "100%" }, sx.pxMd]} position="between" align="center">
                <TextUI fw="semi-bold" size="md" color="gray700">
                  Expense vs Income
                </TextUI>
                <ButtonUI
                  compact
                  variant="subtle"
                  color="sky"
                  onPress={() => navigation.navigate(ScreenName.TRANSACTION_HISTORY)}
                >
                  See History
                </ButtonUI>
              </Group>
              <RecentTransition limit={5} />
            </Stack>

            <Stack bg="white" style={[sx.pyMd]}>
              <Group style={[{ width: "100%" }, sx.pxMd]} position="between" align="center">
                <TextUI fw="semi-bold" size="md" color="gray700">
                  Budget
                </TextUI>
                <ButtonUI
                  compact
                  variant="subtle"
                  color="sky"
                  onPress={() => navigation.navigate(ScreenName.BUDGET_LIST)}
                >
                  See All
                </ButtonUI>
              </Group>
              <BudgetsComponent />
            </Stack>
          </Stack>
        </>
      )}
    </ScrollView>
  );
}

export default HomeTab;
