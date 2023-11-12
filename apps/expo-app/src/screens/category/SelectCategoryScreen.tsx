import React, { useCallback } from "react";
import { AvatarUI, Group, IconChevronLeft, IconPlus, Stack, TextUI } from "../../components/atom";
import { ScrollView, TouchableOpacity, View, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { actionSelectCategory } from "../../store/feature/selector";
import { CategoryInfo } from "../../common/types/category.types";
import { sx } from "@nfd/styles";
import { mapUrlAsset } from "../../utils";
import { ICON_CHECK } from "../../common";
import { ScreenName } from "../../common/enum";

type Props = {
  navigation?: any;
};

function SelectCategoryScreen({ navigation }: Props) {
  // State Init
  const categories = useSelector((state: RootState) => state.resources.categories);
  const categorySelected = useSelector((state: RootState) => state.selector.category);
  const dispatch = useDispatch();

  const handlerSelect = (category: CategoryInfo) => {
    dispatch(actionSelectCategory(category));
    return navigation.goBack();
  };

  const redirectToSelectIcon = useCallback(() => {
    navigation.navigate(ScreenName.SELECT_CATEGORY_ICON, { replace: true });
  }, [navigation]);

  return (
    <>
      <Stack style={{ height: 100 }} bg="sky500" justify="flex-end">
        <Group position="between" style={[sx.pySm, sx.pxMd]} align="center">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <IconChevronLeft color="white" />
          </TouchableOpacity>
          <TextUI fw="bold" size="xl" color="white">
            Select Category
          </TextUI>
          <TouchableOpacity onPress={redirectToSelectIcon}>
            <IconPlus color="white" />
          </TouchableOpacity>
        </Group>
      </Stack>
      <ScrollView keyboardShouldPersistTaps="handled">
        <Stack style={[sx.mtMd]} spacing="xs">
          {categories.length ? (
            <>
              {categories.map((category) => (
                <TouchableOpacity key={category.id} onPress={() => handlerSelect(category)}>
                  <Group noWrap align="center" position="between" bg="white" style={[sx.pMd]}>
                    <Group align="center" noWrap>
                      <AvatarUI radius="full" uri={mapUrlAsset(category?.thumbnail)} />
                      <View>
                        <TextUI fw="semi-bold" size="md" lineClamp={1}>
                          {category.name}
                        </TextUI>
                      </View>
                    </Group>
                    {category.categoryId === categorySelected?.categoryId && (
                      <Image source={{ uri: ICON_CHECK }} height={30} width={30} alt="checked" />
                    )}
                  </Group>
                </TouchableOpacity>
              ))}
            </>
          ) : (
            <TextUI color="gray600" size="xs">
              You not have nay record
            </TextUI>
          )}
        </Stack>
      </ScrollView>
    </>
  );
}

export default SelectCategoryScreen;
