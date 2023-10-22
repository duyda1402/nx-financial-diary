export type DomiSize = "xs" | "sm" | "md" | "lg" | "xl" | (string & {});
export type DomiNumberSize = DomiSize | number | (string & {});
export type DomiSizes = Record<DomiSize, string>;
