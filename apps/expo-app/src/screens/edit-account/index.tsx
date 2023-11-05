import { sx } from "@nfd/styles";
import { AvatarUI, ButtonUI, Container, Group, Stack } from "apps/expo-app/src/components/atom";
import { RootState } from "apps/expo-app/src/store";
import { mapUrlAsset } from "apps/expo-app/src/utils";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input, Datepicker, Radio, RadioGroup } from "@ui-kitten/components";
import * as ImagePicker from "expo-image-picker";
import { Pressable } from "react-native";
import { apiUploadAsset } from "../../api/auth.api";

export interface SettingTabProps {
  navigation?: any;
}

function EditUserScreen({ navigation }: SettingTabProps) {
  //Store Init
  const userInfo = useSelector((state: RootState) => state.auth.info);
  const dispatch = useDispatch();
  // State Init
  const [loading, setLoading] = useState<boolean>(false);
  const [date, setDate] = useState(new Date());
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [uriImage, setUriImage] = useState<string>(mapUrlAsset(userInfo?.profileUrl) || "");
  //Effect Init
  useEffect(() => {
    setLoading(() => true);
    setTimeout(() => setLoading(() => false), 500);
  }, []);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setUriImage(result.assets[0].uri);
      //  const formData = new FormData();
      //  formData.append("file",result.assets[0].uri);
      //  formData.append("taxonomy", "avatar");
      //  const resultUpload = await apiUploadAsset(formData);
    }
  };
  const handlerUpdate = () => {};

  return (
    <Container bg="white" style={[sx.pxLg]}>
      <Stack spacing={30}>
        <Stack align="center" justify="center" bg="white" spacing={8}>
          <Pressable onPress={pickImage}>
            <AvatarUI size="xl" radius={9999} uri={uriImage} withBorder withBorderColor="gray" />
          </Pressable>
        </Stack>
        <Stack>
          <Input status="info" label="Display Name" placeholder="Enter your name" />
          <Input status="info" label="Phone Number" placeholder="Enter phone" />
          <Datepicker status="info" label="Date of birth" date={date} onSelect={(nextDate) => setDate(nextDate)} />
          <RadioGroup style={{ margin: 2 }} selectedIndex={selectedIndex} onChange={(index) => setSelectedIndex(index)}>
            <Radio status="info">Male</Radio>
            <Radio status="info">Female</Radio>
          </RadioGroup>
          <Input status="info" label="Address" placeholder="Enter address" />
        </Stack>
        <ButtonUI onPress={handlerUpdate}>Update</ButtonUI>
      </Stack>
    </Container>
  );
}

export default EditUserScreen;
