import { ColorBase, RadiusSize, SizeBase, Variants, sx, DomiTheme } from "@nfd/styles";
import React from "react";
import {
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
  TouchableOpacityProps,
  ActivityIndicator,
} from "react-native";
import Group from "../layout/Group";

type VariantsButton = Exclude<Variants, "gradient">;
interface Props extends TouchableOpacityProps {
  style?: StyleProp<ViewStyle>;
  children?: string;
  color?: Exclude<ColorBase, "white">;
  radius?: RadiusSize;
  disabled?: boolean;
  variant?: VariantsButton;
  uppercase?: boolean;
  size?: Exclude<SizeBase, number>;
  compact?: boolean;
  loading?: boolean;
  /** Content displayed on the left side of the button label */
  leftSection?: React.ReactElement;

  /** Content displayed on the right side of the button label */
  rightSection?: React.ReactElement;
}
const theme = new DomiTheme();

const getStyleVariant = (body: {
  variant: VariantsButton;
  color: Exclude<ColorBase, "white">;
  disabled?: boolean;
  loading?: boolean;
}) => {
  let style: StyleProp<ViewStyle> = {};

  switch (body.variant) {
    case "light":
      style.backgroundColor = "white";
      style.borderColor = body.disabled ? theme.colors("gray", 2) : theme.colors(body.color, 2);
      break;
    case "subtle":
      style.backgroundColor = body.disabled
        ? theme.colors("gray", 2)
        : body.loading
        ? theme.colors(body.color, 2)
        : "transparent";
      break;
    case "outline":
      style.backgroundColor = body.disabled
        ? theme.colors("gray", 2)
        : body.loading
        ? theme.colors(body.color, 2)
        : "transparent";
      style.borderColor = theme.colors(body.color, 5);
      style.borderWidth = 1.5;
      break;
    case "white":
      style.backgroundColor = body.disabled
        ? theme.colors("gray", 2)
        : body.loading
        ? theme.colors(body.color, 2)
        : theme.colors("white");
      break;
    default:
      style.backgroundColor = body.disabled
        ? theme.colors("gray", 2)
        : body.loading
        ? theme.colors(body.color, 2)
        : theme.colors(body.color, 5);
      break;
  }
  return style;
};

const getStyleSize = (body: { size: Exclude<SizeBase, number>; compact?: boolean }) => {
  let style: StyleProp<ViewStyle> = {};
  switch (body.size) {
    case "xs":
      style.height = body.compact ? 22 : 30; //1.875rem
      style.paddingLeft = body.compact ? 7 : 14; //0.875rem
      style.paddingRight = body.compact ? 7 : 14; //0.875rem
      break;
    case "md":
      style.height = body.compact ? 30 : 42; //2.625rem
      style.paddingLeft = body.compact ? 10 : 22; //1.375rem
      style.paddingRight = body.compact ? 10 : 22; //1.375rem
      break;
    case "lg":
      style.height = body.compact ? 34 : 50; //3.125rem
      style.paddingLeft = body.compact ? 12 : 26; //1.625rem
      style.paddingRight = body.compact ? 12 : 26; //1.625rem
      break;
    case "xl":
      style.height = body.compact ? 40 : 60; //3.75rem
      style.paddingLeft = body.compact ? 14 : 32; //2rem
      style.paddingRight = body.compact ? 14 : 32; //2rem
      break;
    default:
      style.height = body.compact ? 26 : 36; //2.25rem
      style.paddingLeft = body.compact ? 8 : 18; //1.125rem
      style.paddingRight = body.compact ? 8 : 18; //1.125rem
      break;
  }
  return style;
};

export default function Button({
  leftSection,
  rightSection,
  disabled,
  children,
  compact,
  color = "blue",
  radius,
  style,
  variant = "filled",
  uppercase,
  size = "sm",
  loading,
  ...props
}: Props) {
  const options: Record<Exclude<SizeBase, number>, StyleProp<TextStyle>> = {
    xs: sx.textXs,
    sm: sx.textSm,
    md: sx.textBase,
    lg: sx.textLg,
    xl: sx.textXl,
  };

  return (
    <TouchableOpacity
      style={[
        style,
        {
          width: "auto",
          borderRadius: theme.radius(radius),
          alignItems: "center",
          justifyContent: "center",
        },
        getStyleSize({ size, compact }),
        getStyleVariant({ variant, disabled, loading, color }),
      ]}
      disabled={disabled || loading}
      {...props}
    >
      <Group position="center" align="center" spacing="xs">
        {loading ? <ActivityIndicator color={theme.colors("white")} /> : leftSection}
        <Text
          style={[
            options[size],
            {
              fontWeight: "700",
              textTransform: uppercase ? "uppercase" : undefined,
              color: disabled
                ? theme.colors("gray", 4)
                : variant === "filled"
                ? theme.colors("white")
                : theme.colors(color, 5),
            },
          ]}
        >
          {children}
        </Text>

        {rightSection}
      </Group>
    </TouchableOpacity>
  );
}
