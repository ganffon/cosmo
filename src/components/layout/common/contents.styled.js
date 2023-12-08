import styled from "styled-components";

import { palette } from "../../../constant/color";

export const ContentsHidden = styled("div")`
  width: 100%;
  height: 100%;
  background: ${palette.black[100]};
  padding: 15px 30px 15px 15px;
  font-family: NotoSansKR;
  overflow: hidden auto;
`;

export const ContentsFlex = styled("div")`
  width: 100%;
  ${($props) => ($props.$hidden ? "" : "height: 100%;")}
  display: flex;
  ${($props) => $props.$flexColumn && "flex-direction: column;"}
  gap: 10px;
`;
