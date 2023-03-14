import styled from "styled-components";
import { SEARCH_BAR_HEIGHT } from "constant/Layout";

const SearchBarBox = styled("div")`
  height: ${SEARCH_BAR_HEIGHT};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export { SearchBarBox };
