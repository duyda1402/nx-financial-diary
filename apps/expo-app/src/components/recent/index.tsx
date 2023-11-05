import React, { useEffect, useState } from "react";
import { Group, Stack, TextUI } from "../atom";
import { sx } from "@nfd/styles";
import { Image, View } from "react-native";
import { TransactionInfo, TransactionType } from "../../common/types/transaction.type";
import { apiGetTransactionByUser } from "../../api/transaction.api";
import { mapUrlAsset } from "../../utils";

type Props = {};

function RecentTransition({}: Props) {
  const [transactions, setTransactions] = useState<Array<TransactionInfo>>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await apiGetTransactionByUser();
      setTransactions(result);
    };
    fetchData();
  }, []);
  return (
    <Stack style={[sx.pxMd]} spacing="sm">
      {transactions.at(0) ? (
        <>
          {transactions.map((item: TransactionInfo) => (
            <Group
              style={[{ width: "100%", borderRadius: 16 }, sx.pxMd, sx.pySm]}
              bg="white"
              align="center"
              position="between"
              noWrap
              key={item.id}
            >
              <Group align="center" noWrap>
                <Image source={{ uri: mapUrlAsset(item.categoryId) || "" }} style={{ height: 40, width: 40 }} />
                <Stack spacing={0}>
                  <TextUI fw="bold" size="lg" lineClamp={1}>
                    Food & Beverage
                  </TextUI>
                  <TextUI size="sm" color="gray400">
                    Today - 02.34 pm
                  </TextUI>
                </Stack>
              </Group>
              <TextUI fw="bold" size="lg" color={item.type === TransactionType.EXPENSE ? "rose500" : "green500"}>
                {item.type === TransactionType.EXPENSE ? `- ${item.amount}` : `+ ${item.amount}`}
              </TextUI>
            </Group>
          ))}
        </>
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

export default RecentTransition;
