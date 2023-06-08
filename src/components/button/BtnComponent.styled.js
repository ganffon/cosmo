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
        transform: scale(0.9);
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
        transform: scale(0.9);
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
