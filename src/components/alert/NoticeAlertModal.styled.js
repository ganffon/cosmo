import styled, { keyframes } from "styled-components";

export const Background = styled("div")`
  width: 50px;
  height: 50px;
`;

export const HeaderBox = styled("div")`
  display: flex;
  justify-content: space-between;
  font-family: "NotoSansKR";
  font-style: normal;
  font-weight: 700;
  border-radius: 10px 10px 0px 0px;
  height: 40px;
`;
export const Title = styled("div")`
  width: 100%;
  height: 28px;
  font-family: "NotoSansKR";
  font-style: normal;
  font-weight: 700;
  font-size: ${(props) => props.size};
  line-height: 28px;
  /* identical to box height, or 108% */
  text-align: left;
  padding-left: 15px;
  letter-spacing: 0em;
  color: ${(props) => props.fontColor};
`;

export const ContentBox = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 10px 10px 0px 0px;
  padding: 5px 20px;
`;
export const Content = styled("pre")`
  white-space: pre-wrap;
  justify-content: center;
  width: 100%;
  font-family: "NotoSansKR";
  font-style: normal;
  font-size: ${(props) => props.size};
  text-align: center;
  color: ${(props) => props.fontColor};
`;
export const SubContent = styled("pre")`
  white-space: pre-wrap;
  width: 100%;
  font-family: NotoSansKR;
  font-style: normal;
  font-size: ${(props) => props.size};
  color: ${(props) => props.fontColor};
`;
export const ButtonWrap = styled("div")`
  display: flex;
  justify-content: end;
  padding-right: 10px;
  padding-bottom: 10px;
  height: 50px;
`;

export const NoticeButton = styled("button")`
  border-radius: 10px;
  border: solid ${(props) => props.backgroundColor} 1px;
  background: ${(props) => props.backgroundColor};
  color: ${(props) => props.fontColor};
  width: 80px;
  margin: 0px 5px;
  font-family: "NotoSansKR";
  font-style: normal;
  font-weight: 200;
  height: 30px;
  cursor: pointer;
`;

//======================================================
export const ButtonPanel = styled("button")`
-webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  height: ${(props) => props.height};
  width: ${(props) => props.width};
  background: ${(props) => props.background};
  border: 1px solid ${(props) => props.borderColor}};
  border-radius: 12px;
  margin-left: 5px;
  margin-right: 5px;
  display:flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export const SearchTitle = styled("div")`
  font-family: NotoSansKR;
  font-size: ${(props) => props.size};
  padding-left: 15px;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0em;
  text-align: center;
  color: ${(props) => props.fontColor};
`;
export const Icon = styled("img")``;

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
