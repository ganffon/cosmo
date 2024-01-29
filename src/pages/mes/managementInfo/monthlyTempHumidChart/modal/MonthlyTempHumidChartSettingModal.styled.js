import { IconButton } from "@mui/material";
import { FdrModal } from "components/modal/fdrModal";
import styled from "styled-components";

export const ContentsWrap = styled("div")`
  height: 60%;
  parring-bottom: 10px;
`;

export const ChartLayout = styled("div")`
  height: 82%;
`;

export const TitleHeaderLayout = styled("div")`
  font-family: NotoSansKR, Arial;
  font-weight: 900;
  font-size: 20px;
  line-height: 29px;
  margin-top: 10px;
  margin-left: 25px;
`;

export const GridWrap = styled("div")`
  width: 100%;
  height: 280px;
  padding: 0px 10px 15px 10px;
  position: flex;
`;

export const TitleWrap = styled("div")`
  padding-top: 10px;
  display: flex;
`;

export const SpecValues = styled("table")`
  margin-left: 50px;
`;

export const SpecTd = styled("td")`
  font-family: NotoSansKR, Arial;
  font-weight: 900;
  padding-right: 10px;
  border-right: 1px solid #444444;
`;

export const SpecTr = styled("tr")`
  font-family: NotoSansKR, Arial;
  //   font-size: 0.8rem;
`;

export const ShadowBoxGrid = styled("div")`
  background-color: #ffffff;
  width: 100%;
  height: calc(100% - 60px);
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  border-radius: 10px;
  border-color: rgb(255, 255, 255);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
`;

export const buttonWrap = styled("div")`
  display: flex;
  justify-content: flex-end;
  padding-right: 10px;
  padding-bottom: 5px;
  width: 100%;
`;
