import styled from "styled-components";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import LockIcon from "@mui/icons-material/Lock";
import * as C from "constant/Layout";

export const ContentsArea = styled("div")`
  height: ${(props) => (props.isAllScreen ? "100vh" : `calc(100vh - ${C.APP_BAR_HEIGHT})`)};
  width: 100%;
  background-color: rgb(255, 255, 255);
  display: flex;
  gap: 10px 10px;
  padding: 10px 20px 10px 10px;
  overflow: hidden auto;
`;
export const ContentsLeft = styled("div")`
  height: 100%;
  width: 530px;
  display: flex;
  flex-direction: column;
  gap: 10px 10px;
`;
export const ContentsRight = styled("div")`
  height: 100%;
  width: calc(100% - 540px);
  display: flex;
  flex-direction: column;
  gap: 10px 10px;
`;
export const ScreenTitleBox = styled("div")`
  height: auto;
  width: 100%;
  border-radius: 10px;
  border-color: rgb(200, 200, 200);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
  padding: 10px 10px 10px 30px;
  font-family: NotoSansKR_B;
  font-size: 20px;
`;
export const ItemInfoBox = styled("div")`
  height: auto;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 40px 15px;
  border-radius: 10px;
  border-color: rgb(200, 200, 200);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
  padding: 8% 5% 8% 5%;
  background: #415c76;
`;
export const DataInterfaceBox = styled("div")`
  height: 100%;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  border-radius: 10px;
  border-color: rgb(200, 200, 200);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
  padding: 5% 3% 3% 3%;
  background: #83bef4;
`;
export const DataInterfaceWrap = styled("div")`
  height: auto;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 20px 15px;
`;
export const MadeButtonWrap = styled("div")`
  height: 90px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px 40px;
  margin-top: 30px;
`;
export const ButtonBox = styled("div")`
  height: 80px;
  width: 100%;
  display: flex;
  justify-content: end;
  align-items: center;
  border-radius: 10px;
  border-color: rgb(200, 200, 200);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
  padding: 1% 0%;
`;
export const DataHandleBox = styled("div")`
  height: calc(100% - 90px);
  width: 100%;
  border-radius: 10px;
  border-color: rgb(200, 200, 200);
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
  padding: 10px 10px 10px 10px;
  & .tui-grid-cell-header {
    font-size: 20px;
  }
  & .tui-grid-cell-content {
    font-size: 25px;
  }
`;
export const InputSelectBox = styled("div")`
  width: 370px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 10px;
  padding: 0px 20px 0px 20px;
`;
export const InputBox = styled("div")`
  width: 280px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 10px;
  padding: 0px 20px 0px 20px;
`;
export const InputBoxLeft = styled("div")`
  height: 100%;
  width: 50%;
`;
export const InputBoxRight = styled("div")`
  height: 100%;
  width: 50%;
`;
export const Input = styled(TextField)`
  width: 200px;
`;
export const Title = styled(Typography)`
  width: 100px;
  font-family: NotoSansKR_B;
  font-size: 15px;
`;
export const ScaleLock = styled("div")`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const ScaleLockIcon = styled(LockIcon)`
  width: 30%;
  height: 30%;
  color: gray;
`;
