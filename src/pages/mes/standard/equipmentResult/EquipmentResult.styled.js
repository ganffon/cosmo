import styled from "styled-components";
import * as C from "constant/Layout";

export const ContentsArea = styled("div")`
  height: ${(props) =>
    props.isAllScreen ? "100vh" : `calc(100vh - ${C.APP_BAR_HEIGHT})`};
  width: 100%;
  background-color: rgb(255, 255, 255);
  padding: 5px 25px 5px 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  // overflow: hidden auto;
`;

export const ContentTop = styled("div")`
  height: 65px;
  width: 100%;
  border-radius: 10px;
  border-color: rgb(200, 200, 200);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
  padding: 5px 5px 5px 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const SearchWrap = styled("div")`
  display: flex;
  align-items: center;
`;
export const ButtonWrap = styled("div")`
  display: flex;
  align-items: center;
`;
export const ContentBottom = styled("div")`
  height: calc(100% - 75px);
  width: 100%;
  display: flex;
  gap: 10px;
`;
export const ContentLeft = styled("div")`
  height: 100%;
  width: 700px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
export const TitleWrap = styled("div")`
  height: 60px;
  width: 100%;
  display: flex;
  align-items: center;
  border-radius: 10px;
  border-color: rgb(200, 200, 200);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
  padding: 5px 5px 5px 5px;
`;
export const Title = styled("div")`
  font-family: NotoSansKR_B;
  font-size: 20px;
`;
export const GridHeaderWrap = styled("div")`
  width: 100%;
  height: calc(100% - 70px);
  border-radius: 10px;
  border-color: rgb(200, 200, 200);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
  padding: 5px 5px 5px 5px;
`;
export const ContentRight = styled("div")`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
export const InfoWrap = styled("div")`
  width: 100%;
  height: 150px;
  display: flex;
  align-items: center;
  flex-flow: row wrap;
  border-radius: 10px;
  border-color: rgb(200, 200, 200);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
  padding: 5px 5px 5px 5px;
`;
export const GridDetailWrap = styled("div")`
  width: 100%;
  height: calc(100% - 230px);
  border-radius: 10px;
  border-color: rgb(200, 200, 200);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
  padding: 5px 5px 5px 5px;
`;