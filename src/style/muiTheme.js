import NotoSansKR from "font/NotoSansKR-Regular-Hestia.woff";
import NotoSansKR_B from "font/NotoSansKR-Bold-Hestia.woff";
import NotoSansKR_M from "font/NotoSansKR-Medium-Hestia.woff";
import NotoSansKR_L from "font/NotoSansKR-Light-Hestia.woff";
import NotoSansKR_T from "font/NotoSansKR-Thin-Hestia.woff";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "NotoSansKR, Arial",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
      @font-face {
        font-family: 'NotoSansKR';
        font-style: normal;
        font-display: swap;
        src: local('NotoSansKR'), url(${NotoSansKR}) format('woff');
        unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
      }
      @font-face {
        font-family: 'NotoSansKR_B';
        font-style: normal;
        font-display: swap;
        src: local('NotoSansKR_B'), url(${NotoSansKR_B}) format('woff');
        unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
      }
      @font-face {
        font-family: 'NotoSansKR_M';
        font-style: normal;
        font-display: swap;
        src: local('NotoSansKR_M'), url(${NotoSansKR_M}) format('woff');
        unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
      }
      @font-face {
        font-family: 'NotoSansKR_L';
        font-style: normal;
        font-display: swap;
        src: local('NotoSansKR_L'), url(${NotoSansKR_L}) format('woff');
        unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
      }
      @font-face {
        font-family: 'NotoSansKR_T';
        font-style: normal;
        font-display: swap;
        src: local('NotoSansKR_T'), url(${NotoSansKR_T}) format('woff');
        unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
      }
      `,
    },
  },
});

export default theme;
