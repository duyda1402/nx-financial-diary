import { sx } from "@nfd/styles";
import React from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import { Group, Stack, TextUI } from "../../components/atom";
import IconChevronLeft from "../../components/atom/icons/IconChevronLeft";
import IconSearch from "../../components/atom/icons/IconSearch";
import RecentTransition from "../../components/recent";

type Props = {
  navigation?: any;
};

const TransactionListScreen = ({ navigation }: Props) => {
  return (
    <>
      <Stack style={{ height: 100 }} bg="sky500" justify="flex-end">
        <Group position="between" style={[sx.pySm, sx.pxMd]} align="center">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <IconChevronLeft color="white" />
          </TouchableOpacity>
          <TextUI fw="bold" size="xl" color="white">
            Transaction History
          </TextUI>
          <TouchableOpacity>
            <IconSearch color="white" />
          </TouchableOpacity>
        </Group>
      </Stack>
      <ScrollView keyboardShouldPersistTaps="handled" style={{ paddingTop: 16, backgroundColor: "#fff" }}>
        <RecentTransition />
      </ScrollView>
    </>
  );
};

export default TransactionListScreen;
