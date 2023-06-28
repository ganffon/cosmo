import styled from "styled-components";
import DatePicker from "components/datetime/DatePicker";
import InputSearch from "components/input/InputSearch";
import * as C from "constant/Layout";

export const ContentsArea = styled("div")`
  height: ${(props) => (props.isAllScreen ? "100vh" : `calc(100vh - ${C.APP_BAR_HEIGHT})`)};
  width: 100%;
  background-color: rgb(255, 255, 255);
  padding: 5px 25px 5px 10px;
  overflow: hidden auto;
`;
export const ContentTop = styled("div")`
  height: 30%;
  width: 100%;
  margin-top: 10px;
  border-radius: 10px;
  border-color: rgb(200, 200, 200);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
  background: #ffffff;
  margin-bottom: 8px;
  padding: 10px 5px 5px 5px;
  justify-content: space-between;
`;
export const ContentMiddleLeft = styled("div")`
  height: 100%;
  width: 50%;
  background: #ffffff;
  margin-right: 10px;
  border-radius: 10px;
  border-color: rgb(200, 200, 200);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
  margin-bottom: 8px;
  padding: 10px 5px 5px 5px;

  justify-content: space-between;
`;

export const ContentMiddleRight = styled("div")`
  height: 100%;
  width: 50%;
  background: #ffffff;
  border-radius: 10px;
  border-color: rgb(200, 200, 200);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
  margin-bottom: 8px;

  padding: 10px 5px 5px 5px;
  justify-content: space-between;
`;

export const ContentBottomLeft = styled("div")`
  height: 100%;
  width: 50%;
  margin-top: 10px;
  border-radius: 10px;
  background: #ffffff;
  border-color: rgb(200, 200, 200);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
  margin-bottom: 8px;
  padding: 10px 5px 5px 5px;

  justify-content: space-between;
`;

export const ContentBottomRight = styled("div")`
  height: 100%;
  width: 50%;
  margin-top: 10px;
  border-radius: 10px;
  border-color: rgb(200, 200, 200);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
  margin-bottom: 8px;
  padding: 10px 5px 5px 5px;
  background: #ffffff;
  margin-left: 10px;
  justify-content: space-between;
`;

export const SearchCondition = styled("div")`
  height: 60px;
  width: 100%;
  border-radius: 10px;
  border-color: rgb(200, 200, 200);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
  margin-bottom: 8px;
  padding: 5px 5px 5px 5px;
  display: flex;
`;
export const ButtonTop = styled("div")`
  display: flex;
  align-items: center;
`;
export const ContentMid = styled("div")`
  height: 40px;
  width: 100%;
  border-radius: 10px;
  border-color: rgb(200, 200, 200);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
  margin-bottom: 8px;
  padding: 5px 5px 5px 5px;
  display: flex;
  justify-content: space-between;
`;
export const ButtonMid = styled("div")`
  display: flex;
  align-items: center;
`;
export const TitleMid = styled("div")`
  display: flex;
  align-items: center;
  margin-left: 10px;
  font-family: NotoSansKR_B;
`;
export const ContentBottom = styled("div")`
  height: 20%;
  width: 50%;
  border-radius: 10px;

  background: #ffffff;
  margin-top: 10px;
  border-color: rgb(200, 200, 200);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
  padding: 5px 5px 5px 5px;
`;
export const ButtonBottom = styled("div")`
  display: flex;
  align-items: end;
`;
export const TitleBottom = styled("div")`
  display: flex;
  align-items: center;
  margin-left: 10px;
  font-family: NotoSansKR_B;
`;
export const GridTopWrap = styled("div")`
  height: 35%;
  width: 100%;
  border-radius: 10px;
  border-color: rgb(200, 200, 200);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
  margin-bottom: 8px;
  padding: 10px 10px 10px 10px;
`;

export const GridBottomWrap = styled("div")`
  height: 40%;
  width: 100%;
  border-radius: 10px;
  border-color: rgb(200, 200, 200);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
  margin-bottom: 8px;
  padding: 10px 10px 10px 10px;
`;
export const InputS = styled(InputSearch)`
  height: 40px;
`;
export const Date = styled(DatePicker)`
  height: 40px;
`;
export const GridDetailWrap = styled("div")`
  height: calc(100% - 170px);
  width: 100%;
  border-radius: 10px;
  border-color: rgb(200, 200, 200);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
  margin-top: 8px;
  padding: 10px 10px 10px 10px;
`;

export const ShadowBoxTopGrid = styled("div")`
  background-color: rgb(255, 255, 255);
  width: 100%;
  height: 30%;
  border-radius: 10px;
  border-color: rgb(255, 255, 255);
  margin-top: 8px;
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
`;

export const ShadowBoxGrid = styled("div")`
  background-color: rgb(255, 255, 255);
  width: 50%;
  height: 100%;
  border-radius: 10px;
  border-color: rgb(255, 255, 255);
  margin-top: 8px;
  margin-right: 8px;
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
`;
export const ContentsHeader = styled("div")`
  height: 40px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  border-color: rgb(200, 200, 200);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
  margin-bottom: 8px;
`;
export const GridWrap = styled("div")`
  width: 100%;
  height: calc(100%-50px);
  padding: 5px;
`;
export const GridWrap2 = styled("div")`
  width: 100%;
  height: 99%;
  padding: 10px 10px 10px 10px;
`;

export const GridBox = styled("div")`
  width: 50%;
  height: 90%;
  padding: 10px 10px 10px 10px;
  display: flex;
`;
export const ToolWrap = styled("div")`
  display: flex;
  justify-content: space-between;
  align-items: end;
  padding: 5px 5px 5px 0px;
`;
export const SearchWrap = styled("div")`
  display: flex;
`;

export const BoxWrap = styled("div")`
  width: 100%;
  height: 100%;

  background-color: rgb(255, 255, 255);
  border-radius: 10px;
  border-color: rgb(255, 255, 255);
  margin-left: 8px;
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
`;
export const TopGridWrap = styled("div")`
  height: 24%;
  padding: 0px 5px 5px 2px;

  margin-top: 8px;
`;

export const ModdleGridWrap = styled("div")`
  display: flex;
  height: 24%;
  padding: 10px 5px 5px 2px;
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
  border-color: rgb(255, 255, 255);
  margin-top: 8px;
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
`;
export const TitleWrap = styled("div")`
  display: flex;
  justify-content: start;
`;

export const InputPaperWrap = styled("div")`
  padding-top: 5px;
  padding-left: 10px;
`;

export const MiddleContentWrap = styled("div")`
  display: flex;
`;
export const BottomContentWrap = styled("div")`
  display: flex;
`;
