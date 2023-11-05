import { sx } from "@nfd/styles";
import React, { useEffect, useState } from "react";
import { Image } from "react-native";
import { formatNumberWithCommas, mapUrlAsset } from "../../utils";
import { Group, Stack, TextUI } from "../atom";
const categoryDefault = "https://cdn-icons-png.flaticon.com/512/4353/4353132.png";
import { ProgressBar } from "@ui-kitten/components";
type Props = {};

function BudgetsComponent({}: Props) {
  const [budgets, setBudgets] = useState<Array<any>>([
    {
      id: 1,
      amount: 10000,
    },
  ]);

  useEffect(() => {
    //     const fetchData = async () => {
    //       const result = await apiGetTransactionByUser();
    //       setTransactions(result);
    //     };
    //     fetchData();
  }, []);
  return (
    <Stack style={[sx.pxMd]} spacing="sm">
      {budgets.at(0) ? (
        <Stack>
          {budgets.map((item) => (
            <Group
              style={[{ width: "100%", borderRadius: 16 }, sx.pySm]}
              bg="white"
              align="center"
              position="between"
              noWrap
              key={item.id}
            >
              <Group align="center" noWrap>
                <Image
                  source={{ uri: mapUrlAsset(item?.categoryId) || categoryDefault }}
                  style={{ height: 40, width: 40 }}
                />
                <Stack spacing={0}>
                  <TextUI fw="semi-bold" size="md" lineClamp={1}>
                    Budgets Food & Beverage
                  </TextUI>
                  <TextUI size="sm" color="gray400">
                    01/11 - 30/11
                  </TextUI>
                </Stack>
              </Group>
              <TextUI fw="bold" size="md" color="gray700">
                {formatNumberWithCommas(item?.amount)}
              </TextUI>
            </Group>
          ))}
          <Stack spacing="xs">
            <ProgressBar size="large" progress={0.1} />
            <Group position="between">
              <TextUI fw="normal" size="sm" color="gray500">
                25 days left
              </TextUI>
              <TextUI fw="normal" size="md" color="gray700">
                {formatNumberWithCommas(9000)}
              </TextUI>
            </Group>
          </Stack>
        </Stack>
      ) : (
        <Stack align="center" justify="center" style={{ height: 100 }}>
          <TextUI color="gray600" size="xs">
            You not have nay record
          </TextUI>
        </Stack>
      )}
    </Stack>
  );
}

export default BudgetsComponent;
