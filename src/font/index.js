import { createGlobalStyle } from "styled-components";
import NotoSansKR from "font/NotoSansKR-Regular-Hestia.woff";
import NotoSansKR_B from "font/NotoSansKR-Bold-Hestia.woff";
import NotoSansKR_M from "font/NotoSansKR-Medium-Hestia.woff";
import NotoSansKR_L from "font/NotoSansKR-Light-Hestia.woff";
import NotoSansKR_T from "font/NotoSansKR-Thin-Hestia.woff";

const GlobalStyle = createGlobalStyle`
@charset "utf-8";
@font-face {
  font-family: "NotoSansKR";
  font-style: normal;
  src: url(${NotoSansKR}) format("woff");
}
@font-face {
  font-family: "NotoSansKR_B";
  font-style: normal;
  src: url(${NotoSansKR_B}) format("woff");
}
@font-face {
  font-family: "NotoSansKR_M";
  font-style: normal;
  src: url(${NotoSansKR_M}) format("woff");
}
@font-face {
  font-family: "NotoSansKR_L";
  font-style: normal;
  src: url(${NotoSansKR_L}) format("woff");
}
@font-face {
  font-family: "NotoSansKR_T";
  font-style: normal;
  src: url(${NotoSansKR_T}) format("woff");
}
`;

export default GlobalStyle;
