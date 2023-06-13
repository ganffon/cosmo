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
  background: #ffffff;
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

export const GridWrap = styled("div")`
  width: 100%;
  height: 100%;
`;

export const TitleButton = styled("div")`
  display: flex;
  width: 100%;
  gap: 10px;
  justify-content: end;
  align-items: center;
`;

export const TitleButtonWrap = styled("div")`
  display: flex;
  width: 100%;
  padding: 0px 10px;
`;

export const ContentBottom = styled("div")`
  height: calc(100% - 75px);
  width: 100%;
  display: flex;
  gap: 10px;
`;
export const ContentLeft = styled("div")`
  height: 100%;
  width: 500px;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  border-color: rgb(200, 200, 200);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
  background: #ffffff;
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
  width: 50%;
  height: 50px;
  font-family: NotoSansKR_B;
  font-size: 20px;
  padding-bottom: 15px;
  padding-top: 10px;
  padding-left: 10px;
`;
export const GridHeaderWrap = styled("div")`
  width: 100%;
  height: calc(100% - 60px);
  padding: 5px 5px 5px 5px;
`;
export const ContentRight = styled("div")`
  height: 100%;
  width: calc(100% - 510px);
  display: flex;
  border-radius: 10px;
  border-color: rgb(200, 200, 200);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
  flex-direction: column;
  align-items: center;
  background: #ffffff;
  gap: 10px;
`;
export const InfoWrap = styled("div")`
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  flex-flow: row wrap;
  gap: 10px;
  margin-bottom: 10px;
  padding: 0px 10px 5px 10px;
`;
export const GridDetailWrap = styled("div")`
  align-items: center;
  width: 100%;
  height: calc(100% - 70px);
  padding: 5px 5px 5px 5px;
`;

export const TopGridWrap = styled("div")`
  padding: 0px 15px;
  height: 100%;
`;
export const BottomGridWrap = styled("div")`
  padding-left: 10px;
  padding-right: 10px;
  height: calc(100% - 100px);
`;
