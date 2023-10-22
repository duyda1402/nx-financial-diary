import { DomiThemeColors, ColorScheme } from "./BaseColor";
import { DomiSizes } from "./BaseSize";

type Shade = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
export interface DomiPrimaryShade {
  light: Shade;
  dark: Shade;
}
export interface DomiTheme {
  white: string;
  black: string;
  colors: DomiThemeColors;
  radius: DomiSizes;
  spacing: DomiSizes;
  colorScheme: ColorScheme;
}
