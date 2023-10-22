import { Tuple } from "./Tuple";

export type DefaultColor =
  | "slate"
  | "gray"
  | "zinc"
  | "neutral"
  | "stone"
  | "red"
  | "orange"
  | "amber"
  | "yellow"
  | "lime"
  | "green"
  | "emerald"
  | "teal"
  | "cyan"
  | "sky"
  | "blue"
  | "indigo"
  | "violet"
  | "purple"
  | "fuchsia"
  | "pink"
  | "rose"
  | (string & {});
export type DomiThemeColorsOverride = {};
export type DomiThemeColors = DomiThemeColorsOverride extends {
  colors: Record<infer CustomColors, Tuple<string, 10>>;
}
  ? Record<CustomColors, Tuple<string, 10>>
  : Record<DefaultColor, Tuple<string, 10>>;
export type DomiColor = keyof DomiThemeColors;

export type ColorScheme = "light" | "dark";
