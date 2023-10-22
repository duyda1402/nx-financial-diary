import { DomiColor } from "./BaseColor";
import { DomiNumberSize, DomiSize } from "./BaseSize";

export type SystemProp<Value> = Value | Partial<Record<DomiSize | (string & {}), Value>>;
// example: Value: number => 16 or { "xl" : 16 }
export type SpacingValue = DomiNumberSize;

export interface MainStyleSystemProps {
  m?: SystemProp<SpacingValue>;
  my?: SystemProp<SpacingValue>;
  mx?: SystemProp<SpacingValue>;
  mt?: SystemProp<SpacingValue>;
  mb?: SystemProp<SpacingValue>;
  ml?: SystemProp<SpacingValue>;
  mr?: SystemProp<SpacingValue>;
  p?: SystemProp<SpacingValue>;
  py?: SystemProp<SpacingValue>;
  px?: SystemProp<SpacingValue>;
  pt?: SystemProp<SpacingValue>;
  pb?: SystemProp<SpacingValue>;
  pl?: SystemProp<SpacingValue>;
  pr?: SystemProp<SpacingValue>;
  background?: SystemProp<DomiColor>;
  color?: SystemProp<DomiColor>;
}
