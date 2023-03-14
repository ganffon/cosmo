import styled from "styled-components";
import { APP_BAR_HEIGHT, SEARCH_BAR_HEIGHT } from "constant/Layout";

const GridBox = styled("div")`
  width: 100%;
  height: ${(props) =>
    props.isAllScreen
      ? `calc(100vh - ${SEARCH_BAR_HEIGHT})`
      : `calc(100vh - ${APP_BAR_HEIGHT} - ${SEARCH_BAR_HEIGHT})`};
`;

export { GridBox };
