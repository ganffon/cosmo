import styled from "styled-components";
import * as C from "constant/Layout";

export const ContentsArea = styled("div")`
  height: ${(props) =>
    props.isAllScreen ? "100vh" : `calc(100vh - ${C.APP_BAR_HEIGHT})`};
  width: 100%;
  background-color: rgb(255, 255, 255);
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 10px 20px 10px 10px;
  // overflow: hidden auto;
`;
export const TopWrap = styled("div")`
  height: 40%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
export const MidWrap = styled("div")`
  height: 30%;
  display: flex;
  flex-direction: column;
`;
export const BottomWrap = styled("div")`
  height: 30%;
  display: flex;
  flex-direction: column;
`;
export const ScreenTitleBox = styled("div")`
  height: 40px;
  width: 100%;
  border-radius: 10px;
  border-color: rgb(200, 200, 200);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
  padding: 4px 4px 4px 20px;
  font-family: NotoSansKR_B;
  font-size: 20px;
`;
export const SearchBox = styled("div")`
  height: 250px;
  width: 100%;
  background-color: #a0adba;
  display: flex;
  justify-content: space-between;
  border-radius: 10px;
  border-color: rgb(200, 200, 200);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
  padding: 10px 20px 10px 10px;
`;
export const ButtonWrap = styled("div")`
  height: 60px;
  display: flex;
  justify-content: end;
  align-items: center;
  border-radius: 10px;
  border-color: rgb(200, 200, 200);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
  padding: 10px 20px 10px 10px;
`;
export const GridHeader = styled("div")`
  height: calc(100% - 10px);
  width: 100%;
  border-radius: 10px;
  border-color: rgb(200, 200, 200);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
  padding: 10px 10px 10px 10px;
`;
export const GridDetail = styled("div")`
  height: calc(100% - 5px);
  width: 100%;
  border-radius: 10px;
  border-color: rgb(200, 200, 200);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
  padding: 10px 10px 10px 10px;
`;
