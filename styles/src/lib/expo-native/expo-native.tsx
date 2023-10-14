import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  //Flex
  flexRow: { flexDirection: "row" },
  flexDirectionReverse: { flexDirection: "row-reverse" },
  flexCol: { flexDirection: "column" },
  flexColReverse: { flexDirection: "column-reverse" },
  flexWrap: { flexWrap: "wrap" },
  flexWrapReverse: { flexWrap: "wrap-reverse" },
  flexNoWrap: { flexWrap: "nowrap" },
  grow: { flexGrow: 1 },
  growNone: { flexGrow: 0 },
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "center",
    flexDirection: "column",
    padding: 20,
    gap: 20,
  },
  indicator: {
    justifyContent: "center",
    alignItems: "center",
  },
  stackStretch: {
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "center",
    gap: 20,
    display: "flex",
  },
  stackCenter: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    display: "flex",
  },
  gapXs: {},
  gapSm: {},
  gapMd: {},
  gapLg: {},
  gapXl: {},
  codeBlock: {
    backgroundColor: "rgba(55, 65, 81, 1)",
    marginVertical: 12,
    padding: 12,
    borderRadius: 4,
  },
  monospace: {
    color: "#ffffff",
    fontFamily: "Courier New",
    marginVertical: 4,
  },
  comment: {
    color: "#cccccc",
  },
  marginBottomSm: {
    marginBottom: 6,
  },
  marginBottomMd: {
    marginBottom: 18,
  },
  marginBottomLg: {
    marginBottom: 24,
  },
  textLight: {
    fontWeight: "300",
  },
  textBold: {
    fontWeight: "500",
  },
  textSemiBold: {
    fontWeight: "700",
  },
  textCenter: {
    textAlign: "center",
  },
  text2Xs: {
    fontSize: 12,
  },
  textXs: {
    fontSize: 14,
  },
  textSm: {
    fontSize: 16,
  },
  textMd: {
    fontSize: 18,
  },
  textLg: {
    fontSize: 24,
  },
  textXl: {
    fontSize: 48,
  },
  textContainer: {
    marginVertical: 12,
  },
  textSubtle: {
    color: "#6b7280",
  },
  section: {
    marginVertical: 24,
    marginHorizontal: 12,
  },
  shadowBox: {
    backgroundColor: "white",
    borderRadius: 24,
    shadowColor: "black",
    shadowOpacity: 0.15,
    shadowOffset: {
      width: 1,
      height: 4,
    },
    shadowRadius: 12,
    padding: 24,
    marginBottom: 24,
  },
  listItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  listItemTextContainer: {
    marginLeft: 12,
    flex: 1,
  },
  appTitleText: {
    paddingTop: 12,
    fontWeight: "500",
  },
  hero: {
    borderRadius: 12,
    backgroundColor: "#143055",
    padding: 36,
    marginBottom: 24,
  },
  heroTitle: {
    flex: 1,
    flexDirection: "row",
  },
  heroTitleText: {
    color: "#ffffff",
    marginLeft: 12,
  },
  heroText: {
    color: "#ffffff",
    marginVertical: 12,
  },
  whatsNextButton: {
    backgroundColor: "#ffffff",
    paddingVertical: 16,
    borderRadius: 8,
    width: "50%",
    marginTop: 24,
  },
  learning: {
    marginVertical: 12,
  },
  love: {
    marginTop: 12,
    justifyContent: "center",
  },
});
