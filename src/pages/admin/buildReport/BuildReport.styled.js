import styled from "styled-components";

export const Header = styled("header")`
  height: 70px;
  width: 100%;
  background: white;
  border-radius: 10px;
  border-color: rgb(200, 200, 200);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
`;
export const HeaderInputWrap = styled("div")`
  display: flex;
`;
export const Main = styled("main")`
  height: calc(100% - 70px);
  width: 100%;
  background: white;
  border-radius: 10px;
  border-color: rgb(200, 200, 200);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
  display: flex;
  flex-direction: column;
  padding: 10px;
`;
export const GridButton = styled("div")`
  height: 50px;
  width: 100%;
  display: flex;
  gap: 10px;
  justify-content: end;
`;
export const GridWrap = styled("div")`
  height: calc(100% - 50px);
  width: 100%;
`;
export const HeaderBox = styled("div")`
  height: 40px;
  display: flex;
  justify-content: space-between;
  padding: 5px 10px;
`;
export const MainBox = styled("div")`
  height: calc(100% - 40px);
  padding: 20px;
`;
export const TitleWrap = styled("div")`
  height: 100px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
export const TitleGroup = styled("div")`
  height: 30px;
  width: 100%;
  display: flex;
  gap: 10px;
  justify-content: space-between;
`;
export const ContentsWrap = styled("div")`
  height: calc(100% - 100px);
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
export const Title = styled("div")`
  height: 25px;
  font-size: 18px;
  &.bold {
    font-weight: 900;
  }
`;
export const ButtonClose = styled("div")`
  cursor: pointer;
`;
export const Issue = styled("textarea")`
  height: calc(100% - 25px);
  width: 100%;
  resize: none;
  font-size: 16px;
  font-family: NotoSansKR;
  background: white;
  border: 1px solid rgba(217, 217, 217, 1);
  box-shadow: none;
  padding: 20px;
  &:focus {
    outline: 0;
  }
`;
