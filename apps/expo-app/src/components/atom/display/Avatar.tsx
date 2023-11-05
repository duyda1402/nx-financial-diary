import React, { useEffect, useState } from "react";
import { Image } from "react-native";
import { ColorBase, RadiusSize, SizeBase, colors, DomiTheme } from "@nfd/styles";
import Stack from "../layout/Stack";
import IconUserCircle from "../icons/IconUserCircle";
import TextUI from "../typography/Text";

type Props = {
  uri?: string;
  children?: React.ReactElement | string;
  size?: SizeBase;
  radius?: RadiusSize;
  alt?: string;
  color?: Exclude<ColorBase, "white" | "black">;
  withBorder?: boolean;
  withBorderColor?: Exclude<ColorBase, "black">;
};

function Avatar({
  uri,
  children,
  size,
  radius,
  alt = "avatar",
  color = "blue",
  withBorder,
  withBorderColor = "white",
}: Props) {
  const [isDefault, setDefault] = useState<boolean>(false);
  const theme = new DomiTheme();
  const widthHeight = theme.sizes(size);
  const borderRadius = theme.radius(radius);
  useEffect(() => {
    if (uri) {
      fetch(uri)
        .then((response) => {
          if (response.ok) {
            setDefault(false);
          } else {
            setDefault(true);
          }
        })
        .catch((_error) => {
          setDefault(true);
        });
    }
  }, [uri]);

  return (
    <Stack
      style={{
        height: widthHeight + 3,
        width: widthHeight + 3,
        borderRadius: borderRadius,
        borderWidth: withBorder ? 3 : 0,
        borderColor: withBorderColor !== "white" ? colors[`${withBorderColor}200`] : colors[withBorderColor],
      }}
      bg={`${color}100`}
      align="center"
      justify="center"
    >
      {uri && !isDefault && (
        <Image
          alt={alt}
          source={{ uri: uri }}
          style={{ height: widthHeight, width: widthHeight, borderRadius: borderRadius, resizeMode: "cover" }}
        />
      )}
      {isDefault && (
        <>
          {!children && <IconUserCircle size={widthHeight - widthHeight * 0.25} color={colors[`${color}600`]} />}
          {!!children && typeof children === "string" && (
            <TextUI fw="bold" size={typeof size === "number" ? size - size * 0.6 : size} color={`${color}700`}>
              {children}
            </TextUI>
          )}
          {!!children && typeof children !== "string" && { children }}
        </>
      )}
    </Stack>
  );
}

export default Avatar;
