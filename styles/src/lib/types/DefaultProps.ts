import { StyleProp } from "react-native";
import { MainStyleSystemProps } from "./StyleSystemProps";
import { DomiTheme } from "./BaseTheme";

export type Sx<T> = StyleProp<T> | ((theme: DomiTheme) => StyleProp<T>);

export type ClassName<StylesNames extends string> = Partial<Record<StylesNames, string>>;

export interface DefaultProps<StylesNames extends string = never> extends MainStyleSystemProps {
  sx?: Sx<StylesNames> | (Sx<StylesNames> | undefined)[];
  className?: ClassName<StylesNames>;
}
