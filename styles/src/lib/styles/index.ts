import { StyleSheet } from "react-native";

export const sx = StyleSheet.create({
  //Flex
  flexRow: { flexDirection: "row" },
  //flexDirectionReverse: { flexDirection: "row-reverse" },
  flexCol: { flexDirection: "column" },
  //flexColReverse: { flexDirection: "column-reverse" },
  flexWrap: { flexWrap: "wrap" },
  flexWrapReverse: { flexWrap: "wrap-reverse" },
  flexNoWrap: { flexWrap: "nowrap" },
  flex1: { flex: 1 },
  justifyCenter: { justifyContent: "center" },
  justifyStart: { justifyContent: "flex-start" },
  justifyEnd: { justifyContent: "flex-end" },
  justifyBetween: { justifyContent: "space-between" },

  grow: { flexGrow: 1 },
  growNone: { flexGrow: 0 },

  gapXs: { gap: 10 },
  gapSm: { gap: 12 },
  gapLg: { gap: 20 },
  gapMd: { gap: 16 },
  gapXl: { gap: 24 },

  //padding
  pXs: { padding: 10 },
  pSm: { padding: 12 },
  pLg: { padding: 20 },
  pMd: { padding: 16 },
  pXl: { padding: 24 },
  ptXs: { paddingTop: 10 },
  ptSm: { paddingTop: 12 },
  ptLg: { paddingTop: 20 },
  ptMd: { paddingTop: 16 },
  ptXl: { paddingTop: 24 },
  pbXs: { paddingBottom: 10 },
  pbSm: { paddingBottom: 12 },
  pbLg: { paddingBottom: 20 },
  pbMd: { paddingBottom: 16 },
  pbXl: { paddingBottom: 24 },
  plXs: { paddingLeft: 10 },
  plSm: { paddingLeft: 12 },
  plLg: { paddingLeft: 20 },
  plMd: { paddingLeft: 16 },
  plXl: { paddingLeft: 24 },
  prXs: { paddingRight: 10 },
  prSm: { paddingRight: 12 },
  prLg: { paddingRight: 20 },
  prMd: { paddingRight: 16 },
  prXl: { paddingRight: 24 },
  pxXs: { paddingRight: 10, paddingLeft: 10 },
  pxSm: { paddingRight: 12, paddingLeft: 12 },
  pxLg: { paddingRight: 20, paddingLeft: 20 },
  pxMd: { paddingRight: 16, paddingLeft: 16 },
  pxXl: { paddingRight: 24, paddingLeft: 24 },
  pyXs: { paddingBottom: 10, paddingTop: 10 },
  pySm: { paddingBottom: 12, paddingTop: 12 },
  pyLg: { paddingBottom: 20, paddingTop: 20 },
  pyMd: { paddingBottom: 16, paddingTop: 16 },
  pyXl: { paddingBottom: 24, paddingTop: 24 },

  //margin
  mXs: { margin: 10 },
  mSm: { margin: 12 },
  mLg: { margin: 20 },
  mMd: { margin: 16 },
  mXl: { margin: 24 },
  mtXs: { marginTop: 10 },
  mtSm: { marginTop: 12 },
  mtLg: { marginTop: 20 },
  mtMd: { marginTop: 16 },
  mtXl: { marginTop: 24 },
  mbXs: { marginBottom: 10 },
  mbSm: { marginBottom: 12 },
  mbLg: { marginBottom: 20 },
  mbMd: { marginBottom: 16 },
  mbXl: { marginBottom: 24 },
  mlXs: { marginLeft: 10 },
  mlSm: { marginLeft: 12 },
  mlLg: { marginLeft: 20 },
  mlMd: { marginLeft: 16 },
  mlXl: { marginLeft: 24 },
  mrXs: { marginRight: 10 },
  mrSm: { marginRight: 12 },
  mrLg: { marginRight: 20 },
  mrMd: { marginRight: 16 },
  mrXl: { marginRight: 24 },
  mxXs: { marginRight: 10, marginLeft: 10 },
  mxSm: { marginRight: 12, marginLeft: 12 },
  mxLg: { marginRight: 20, marginLeft: 20 },
  mxMd: { marginRight: 16, marginLeft: 16 },
  mxXl: { marginRight: 24, marginLeft: 24 },
  myXs: { marginBottom: 10, marginTop: 10 },
  mySm: { marginBottom: 12, marginTop: 12 },
  myLg: { marginBottom: 20, marginTop: 20 },
  myMd: { marginBottom: 16, marginTop: 16 },
  myXl: { marginBottom: 24, marginTop: 24 },

  wFull: { width: "100%" },

  indicator: {
    justifyContent: "center",
    alignItems: "center",
  },

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
