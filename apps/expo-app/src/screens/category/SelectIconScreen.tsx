import { sx } from "@nfd/styles";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { apiGetAssetByTaxonomy } from "../../api/asset.api";
import { AssetInfo } from "../../common/types/asset.types";
import { Group, IconChevronLeft, Stack, TextUI } from "../../components/atom";
import LoadingIndicator from "../../components/loader/LoaderIndicator";
import { RootState } from "../../store";
import { actionSetIcons } from "../../store/feature/resources";
import { mapUrlAsset } from "../../utils";

type Props = {
  navigation?: any;
};

function SelectIconScreen({ navigation }: Props) {
  // State Init
  const [loading, setLoading] = useState<boolean>(false);
  const icons = useSelector((state: RootState) => state.resources.icons);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(() => true);
      const res = await apiGetAssetByTaxonomy("category");
      console.log(res);
      dispatch(actionSetIcons(res));
    };
    if (icons.length === 0) {
      fetchData().finally(() => setLoading(() => false));
    }
  }, []);

  const handlerSelect = (icons: AssetInfo) => {
    //     dispatch(actionSelectCategory(category));
    return navigation.goBack();
  };

  return (
    <>
      <Stack style={{ height: 100 }} bg="sky500" justify="flex-end">
        <Group position="between" style={[sx.pySm, sx.pxMd]} align="center">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <IconChevronLeft color="white" />
          </TouchableOpacity>
          <TextUI fw="bold" size="xl" color="white">
            Select Icon
          </TextUI>
          <View />
        </Group>
      </Stack>
      <ScrollView keyboardShouldPersistTaps="handled" style={{ backgroundColor: "white" }}>
        {loading ? (
          <LoadingIndicator />
        ) : (
          <Group style={[sx.mtMd, sx.pSm, { marginRight: "auto", marginLeft: "auto" }]} spacing="xl">
            {icons.length ? (
              <>
                {icons.map((icon) => (
                  <TouchableOpacity key={icon.id} onPress={() => handlerSelect(icon)}>
                    <Image source={{ uri: mapUrlAsset(icon?.source) }} style={{ height: 50, width: 50 }} />
                  </TouchableOpacity>
                ))}
              </>
            ) : (
              <TextUI color="gray600" size="xs">
                You not have nay record
              </TextUI>
            )}
          </Group>
        )}
      </ScrollView>
    </>
  );
}

export default SelectIconScreen;
