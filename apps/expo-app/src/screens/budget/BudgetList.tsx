import React from "react";
import BudgetsComponent from "../../components/budgets";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { Group, IconPlus, Stack, TextUI } from "../../components/atom";
import IconChevronLeft from "../../components/atom/icons/IconChevronLeft";
import { sx } from "@nfd/styles";

type Props = {
  navigation?: any;
};

const BudgetListScreen = ({ navigation }: Props) => {
  return (
    <>
      <Stack style={{ height: 100 }} bg="orange400" justify="flex-end">
        <Group position="between" style={[sx.pySm, sx.pxMd]} align="center">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <IconChevronLeft color="white" />
          </TouchableOpacity>
          <TextUI fw="bold" size="xl" color="white">
            Budgets
          </TextUI>
          <TouchableOpacity>
            <IconPlus color="white" />
          </TouchableOpacity>
        </Group>
      </Stack>
      <ScrollView keyboardShouldPersistTaps="handled" style={{ paddingTop: 16, backgroundColor: "#fff" }}>
        <BudgetsComponent />
      </ScrollView>
    </>
  );
};

export default BudgetListScreen;
