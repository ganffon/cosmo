import styled from "styled-components";
import IconButton from "@mui/material/IconButton";

export const Title = styled("div")`
  padding-top: 8px;
  padding-left: 15px;
  font-weight: 700;
`;

export const ButtonClose = styled(IconButton)`
  padding-right: 15px;
`;
export const HeaderBox = styled("div")`
  grid-column: 1 / -1;
  grid-row: 1 / 1;
  display: flex;
  justify-content: space-between;
  border: solid 1px #e0e0e0;
  border-radius: 10px 10px 0px 0px;
  height: 40px;
`;
export const InputPaperWrap = styled("div")`
  padding-top: 5px;
  width: 100%;
  padding-left: ${(props) => props.pLeft || "10px"};
  display: flex;
  justify-content: ${(props) => props.justify || "center"};
`;
export const ButtonWrap = styled("div")`
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  gap: 10px;
  height: 40px;
`;
export const ToolWrap = styled("div")`
  grid-column: 1 / -2;
  grid-row: 2 / 2;
  display: flex;
  padding-top: 20px;
  justify-content: space-around;
  height: 60px;
`;

export const DragAndDropFile = styled("div")`
  color: #a4a4a4;
  text-align: center;
  width: 100%;
`;

export const DragAndDropFileWrap = styled("div")`
  display: flex;
  align-items: center;
  border: dashed 2px #e0e0e0;
  border-radius: 10px 10px 10px 10px;
  grid-column: 4 / 19;
  grid-row: -3 / 7;
  width: 100%;
`;
export const IconWrap = styled(IconButton)`
  align-items: top;
  grid-column: 4 / 19;
  grid-row: -3 / 7;
`;
export const BtnComponent = styled("button")`
  height: ${(props) => props.height};
  width: ${(props) => props.width};
  border-radius: 6px;
  padding: 5px 20px 5px 20px;
  background: #ffffff;
  border: 1px solid rgba(20, 145, 206, 1);
  gap: 4px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background: rgba(20, 145, 206, 0.9);
  }
  &.clicked {
    animation: clickEffect 0.3s;

    @keyframes clickEffect {
      0% {
        transform: scale(1);
      }
      50% {
        transform: scale(0.97);
      }
      100% {
        transform: scale(1);
      }
    }
  }
`;
export const SearchTitle = styled("div")`
  font-family: NotoSansKR;
  width: 100%;
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0em;
  text-align: center;
  color: #1491ce;
`;
