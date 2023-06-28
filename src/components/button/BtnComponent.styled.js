import styled, { keyframes } from "styled-components";

export const BtnComponent = styled("button")`
  height: ${(props) => props.height};
  width: ${(props) => props.width};
  border-radius: 6px;
  padding: 5px 20px 5px 20px;
  background: rgba(20, 145, 206, 1);
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
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0em;
  text-align: center;
  color: rgba(255, 255, 255, 1);
`;
export const Icon = styled("img")``;

export const BtnBack = styled("button")`
  height: ${(props) => props.height};
  width: ${(props) => props.width};
  border-radius: 6px;
  padding: 5px 14px 5px 14px;
  gap: 5px;
  background: #ffffff;
  border: 1px solid #cccccc;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background: rgba(87, 181, 243, 0.05);
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

export const Title = styled("div")`
  font-family: NotoSansKR;
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0em;
  text-align: center;
  color: #1491ce;
`;

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
