import styled from "styled-components";

export const Header = styled("header")`
  width: 100%;
  height: 60px;
  padding: 10px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;

  display: flex;
  gap: 10px;
  justify-content: space-between;
  align-items: center;
`;

export const FilterWrap = styled("div")`
  display: flex;
  gap: 10px;
`;

export const Body = styled("body")`
  width: 100%;
  height: calc(100% - 60px);
  display: flex;
  gap: 10px;
`;

export const LeftArea = styled("div")`
  width: 30%;
  height: 100%;
  padding: 15px;

  display: flex;
  flex-direction: column;

  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
`;

export const RightArea = styled("div")`
  width: 70%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const RightTopArea = styled("div")`
  width: 100%;
  height: 50%;
  padding: 15px;

  display: flex;
  flex-direction: column;

  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
`;

export const RightBottomArea = styled("div")`
  width: 100%;
  height: 50%;
  padding: 15px;

  display: flex;
  flex-direction: column;

  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
`;

export const GridTitle = styled("div")`
  width: 100%;
  height: 40px;
  font-size: 1.2rem;
`;

export const GridWrap = styled("div")`
  width: 100%;
  height: calc(100% - 40px);
`;
