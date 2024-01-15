import { IconButton } from "@mui/material";
import { palette } from "constant/color";
import styled from "styled-components";

export const HeaderBox = styled("div")`
  height: 40px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  border: solid 1px #e0e0e0;
  border-radius: 10px 10px 0px 0px;
`;

export const TitleBox = styled("div")`
  padding-top: 8px;
  padding-left: 15px;
  font-weight: 500;
  font-family: NotoSansKR;
`;

export const ButtonClose = styled(IconButton)`
  padding-right: 15px;
`;

export const ShadowBoxGrid = styled("div")`
  background-color: #ffffff;
  height: ${($props) => $props.height};
  width: ${($props) => $props.width};
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  margin-top: 10px;
  border-radius: 10px;
  border-color: rgb(255, 255, 255);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
`;

export const GridTitleWrap = styled("div")`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 30px;
`;

export const GridTitle = styled("div")`
  display: flex;
  align-items: flex-end;
`;

export const GridTitleSub = styled("div")`
  font-size: 0.8rem;
  color: ${palette.red[500]};
  margin-left: 20px;
`;

export const GridButtonWrap = styled("div")`
  display: flex;
  justify-content: flex-end;
  algin-items: center;
  gap: 10px;
`;

export const GridWrap = styled("div")`
  width: 100%;
  height: calc(100% - 30px);
`;

export const MidWrap = styled("div")`
  display: flex;
  align-items: center;
  gap: 10px;
  height: ${($props) => ($props.isBottomExtend ? "180px" : "calc(100% - 460px)")};
  width: 100%;
  margin-top: 5px;
`;

export const BottomWrap = styled("div")`
  display: flex;
  flex-direction: column;
  height: ${($props) => ($props.isBottomExtend ? "520px" : "200px")};
  width: 100%;
  margin-top: 5px;
`;

export const ExtendButton = styled("button")`
  height: 10%;
  background-color: ${palette.orange[200]};
  cursor: pointer;
  border-radius: 5px;
  padding: 5px;
  border: 1px solid ${palette.black[100]};

  margin-left: 20px;

  font-family: NotoSansKR;

  &:hover {
    background-color: ${palette.orange[100]};
  }
`;

export const CalculateButton = styled("button")`
  width: 100px;
  height: 35px;
  background-color: ${palette.blue[300]};
  cursor: pointer;
  border-radius: 10px;
  border: 1px solid ${palette.black[100]};

  font-family: NotoSansKR;

  &:hover {
    background-color: ${palette.blue[500]};
  }

  &.clicked {
    animation: clickEffect 0.3s;
    @keyframes clickEffect {
      0% {
        transform: scale(1);
      }
      50% {
        transform: scale(0.95);
      }
      100% {
        transform: scale(1);
      }
    }
  }
`;

export const SelectDateErpFilter = styled("div")`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  padding: 0px 10px;
`;

export const SelectDateErpGridWrap = styled("div")`
  height: calc(100% - 60px);
  width: 100%;
`;

export const SelectErpGridWrap = styled("div")`
  height: 100%;
  width: 100%;
`;
