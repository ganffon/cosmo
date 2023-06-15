import styled from "styled-components";

export const Tooltip = styled("div")`
  position: absolute;
  left: ${(props) => props.x}px;
  top: ${(props) => props.y}px;
  pointer-events: none;
  z-index: 9999;
  padding: 8px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

export const TooltipContents = styled("pre")`
  white-space: pre-wrap;
  font-family: NotoSansKR;
  padding-right: 10px;
`;
