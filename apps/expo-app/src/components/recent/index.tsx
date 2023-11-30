import React, { useEffect, useState } from "react";
import { Group, Stack, TextUI } from "../atom";
import { sx } from "@nfd/styles";
import { Image } from "react-native";
import { TransactionInfo, TransactionType } from "../../common/types/transaction.type";
import { apiGetTransactionByUser } from "../../api/transaction.api";
import { formatTimeTransaction, mapUrlAsset } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { actionSetListTransactions } from "../../store/feature/resources";

type Props = {
  limit: number;
};

function RecentTransition({ limit = -1 }: Props) {
  const resources = useSelector((state: RootState) => state.resources);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      const result = await apiGetTransactionByUser();
      dispatch(actionSetListTransactions(result));
    };
    fetchData();
  }, []);

  const dataSlice = limit > 0 ? resources.transactions.slice(0, limit) : resources.transactions;
  return (
    <Stack style={[sx.pxMd]} spacing="sm">
      {dataSlice.at(0) ? (
        <>
          {dataSlice.map((item: TransactionInfo) => (
            <Group
              style={[{ width: "100%", borderRadius: 16 }, sx.pxMd, sx.pySm]}
              bg="white"
              align="center"
              position="between"
              noWrap
              key={item.id}
            >
              <Group align="center" noWrap>
                <Image source={{ uri: mapUrlAsset(item.thumbnail) || "" }} style={{ height: 40, width: 40 }} />
                <Stack spacing={0}>
                  <TextUI fw="bold" size="lg" lineClamp={1}>
                    {item.subject}
                  </TextUI>
                  <TextUI size="sm" color="gray300" lineClamp={1}>
                    {item?.description || "-"}
                  </TextUI>
                  <TextUI size="sm" color="gray400">
                    {formatTimeTransaction(item.releaseAt)}
                  </TextUI>
                </Stack>
              </Group>
              <Stack spacing={0} align="flex-end">
                <TextUI fw="bold" size="lg" color={item.type === TransactionType.EXPENSE ? "rose500" : "green500"}>
                  {item.type === TransactionType.EXPENSE ? `- ${item.amount} $` : `+ ${item.amount} $`}
                </TextUI>
              </Stack>
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
