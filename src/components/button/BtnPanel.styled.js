import styled, { keyframes } from "styled-components";

export const ButtonPanel = styled("button")`
  height: ${(props) => props.height};
  width: ${(props) => props.width};
  background: ${(props) => props.background};
  border: 1px solid ${(props) => props.borderColor};
  border-radius: 12px;
  cursor: pointer;
  margin-left: 5px;
  margin-right: 5px;
  display: flex;
  justify-content: center;
  align-items: center;

  &.directionColumn {
    flex-direction: column;
  }
`;

export const Title = styled("div")`
  font-family: "NotoSansKR";
  font-style: normal;
  font-weight: 700;
  font-size: ${(props) => props.fontSize};
  line-height: 28px;
  /* identical to box height, or 108% */
  text-align: center;
  letter-spacing: 0em;
  color: ${(props) => props.fontColor};
`;
export const SubTitle = styled("div")`
  font-family: "NotoSansKR";
  font-style: normal;
  font-size: ${(props) => props.fontSize};
  line-height: 28px;
  /* identical to box height, or 108% */
  text-align: center;
  letter-spacing: 0em;
  color: ${(props) => props.fontColor};
`;

export const SearchTitle = styled("div")`
  font-family: NotoSansKR;
  font-size: ${(props) => props.fontSize};
  padding-left: 15px;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0em;
  text-align: center;
  color: ${(props) => props.fontColor};
`;
export const Icon = styled("img")`
  padding-left: 15px;
`;

export const SearchIcon = styled("img")``;

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
        transform: scale(0.9);
      }
      100% {
        transform: scale(1);
      }
    }
  }
`;
