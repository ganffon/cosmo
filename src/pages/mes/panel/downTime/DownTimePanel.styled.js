import styled from "styled-components";
import * as C from "constant/Layout";

export const ContentsArea = styled("div")`
  height: ${(props) =>
    props.isAllScreen ? "100vh" : `calc(100vh - ${C.APP_BAR_HEIGHT})`};
  width: 100%;
  background-color: rgb(255, 255, 255);
  display: flex;
  flex-direction: column;
  padding: 10px 20px 10px 10px;
`;
export const ScreenTitleBox = styled("div")`
  height: 40px;
  width: 100%;
  display: flex;
  margin-bottom: 10px;
`;

export const TitleGridWrap = styled("div")`
  height: 100%;
  width: 100%;
`;

export const TitleBefore = styled("div")`
  height: 40px;
  width: 500px;
  margin-right: 10px;
  padding-left: 10px;
  font-family: NotoSansKR_B;
  font-size: 20px;
`;

export const TitleAfter = styled("div")`
  height: 40px;
  width: width:100%;

  padding-left: 10px;
  padding-top: 5px;
  margin-bottom: 30px;
  font-family: NotoSansKR_B;
  font-size: 20px;
`;
export const ContentsBottom = styled("div")`
  width: 100%;
  height: 100%;
  display: flex;
`;
export const DowntimeBefore = styled("div")`
  width: 500px;
  height: 100%;
  margin-right: 10px;
  display: flex;
  flex-flow: row wrap;
  background: #ffffff;
  padding: 20px;
  border-radius: 10px;
  border-color: rgb(200, 200, 200);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
`;
export const DowntimeAfter = styled("div")`
  width: calc(100% - 500px);
  height: 100%;
  display: flex;
  background: #ffffff;
  border-radius: 10px;
  border-color: rgb(200, 200, 200);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
  padding: 10px 10px;
`;
export const GridWrap = styled("div")`
  height: 92%;
  width: 100%;

  & .tui-grid-cell-header {
    font-size: 20px;
  }
  & .tui-grid-cell-content {
    font-size: 25px;
  }
  & .customButton {
    width: 95%;
    height: 40px;
    font-family: "NotoSansKR";
    font-size: 20px;
  }
`;

export const ButtonSet = styled("button")`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  width: 200px;
  height: 90px;
  padding: 0rem 1rem;
  margin: 5px 0px 0px 10px;

  font-family: "NotoSansKR_B", sans-serif;
  font-size: 3rem;
  color: white;
  text-align: center;
  text-decoration: none;

  border: none;
  border-radius: 10px;
  cursor: pointer;

  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);

  transition: 0.5s;

  background: ${(props) => props.color};

  &:hover {
    background: ${(props) => props.hoverColor};
  }
`;
