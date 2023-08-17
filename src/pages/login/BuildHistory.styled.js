import styled from "styled-components";
import IconButton from "@mui/material/IconButton";

export const HeaderBox = styled("div")`
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-color: #f2f2f2;
  border-radius: 10px 10px 0px 0px;
  height: 40px;
`;
export const TitleBox = styled("div")`
  padding-top: 8px;
  padding-left: 15px;
  font-weight: 700;
  font-family: NotoSansKR_B;
`;
export const ButtonClose = styled(IconButton)`
  padding-right: 15px;
`;
export const ShadowBoxGrid = styled("div")`
  padding: 20px;
  background-color: #ffffff;
  width: 100%;
  height: calc(100% - 40px);
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-radius: 10px;
  border-color: rgb(255, 255, 255);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
`;
export const Main = styled("div")`
  width: 100%;
  height: calc(100% - 40px);
  border-radius: 0px 0px 10px 10px;
  overflow: hidden auto;
  padding: 30px 30px 30px 50px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
export const BuildWrap = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
export const MainTitleWrap = styled("div")`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: end;
`;
export const MainTitle = styled("h2")`
  margin-left: -40px;
`;
export const MainDate = styled("h5")``;
export const MainContents = styled("pre")`
  width: 100%;
`;

export const DividingLine = styled("div")`
  width: 100%;
  height: 2px;
  background: rgb(200, 200, 200);
  margin: 10px 0px;
`;
