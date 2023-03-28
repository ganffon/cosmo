import styled from "styled-components";
import {
  APP_BAR_HEIGHT,
  SEARCH_BAR_HEIGHT,
  HEIGHT_MARGIN,
} from "constant/Layout";

export const ContentsArea = styled("div")`
  width: 100%;
  height: ${(props) =>
    props.isAllScreen ? "100vh" : `calc(100vh - ${APP_BAR_HEIGHT})`};
  overflow: hidden auto;
  background-color: white;
  padding: 0px 10px 0px 10px;
`;
export const ShadowBoxButton = styled("div")`
  background-color: rgb(255, 255, 255);
  width: calc(100% - 0.5rem);
  height: ${SEARCH_BAR_HEIGHT};
  border-radius: 3px;
  border-color: rgb(255, 255, 255);

  margin-top: 8px;
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
`;
export const ToolWrap = styled("div")`
  display: flex;
  justify-content: space-between;
  padding: 5px 5px 5px 0px;
`;
export const SearchWrap = styled("div")`
  display: flex;
`;
export const ButtonWrap = styled("div")`
  display: flex;
`;
export const ShadowBoxGrid = styled("div")`
  background-color: rgb(255, 255, 255);
  width: calc(100% - 0.5rem);
  height: ${(props) =>
    props.isAllScreen
      ? `calc(100vh - ${APP_BAR_HEIGHT} - ${HEIGHT_MARGIN})`
      : `calc(100vh - ${APP_BAR_HEIGHT} - ${SEARCH_BAR_HEIGHT} - ${HEIGHT_MARGIN})`};
  border-radius: 3px;
  border-color: rgb(255, 255, 255);
  margin-top: 8px;
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
`;
export const GridWrap = styled("div")`
  width: 100%;
  height: 100%;
`;
