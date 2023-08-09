import styled from "styled-components";
import ModalWrapMulti from "components/modal/ModalWrapMulti";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";

export const Wrap = styled(ModalWrapMulti)`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  display: flex;
  flex-direction: column;
`;
export const CloseWrap = styled("div")`
  height: 40px;
  width: 100%;
  padding: 10px 0px;
  display: flex;
  justify-content: end;
  border-radius: 10px 10px 0px 0px;
`;
export const ButtonClose = styled(IconButton)`
  padding-right: 15px;
`;
export const Wrap1 = styled("div")`
  height: 130px;
  width: 100%;
  padding: 10px 50px;
  display: flex;
  justify-content: space-between;
`;
export const Wrap2 = styled("div")`
  height: 130px;
  width: 100%;
  padding: 10px 50px;
  display: flex;
  justify-content: space-between;
`;
export const Wrap3 = styled("div")`
  height: 130px;
  width: 100%;
  padding: 10px 50px;
  display: flex;
`;
export const Wrap4 = styled("div")`
  height: 130px;
  width: 100%;
  padding: 10px 50px;
  display: flex;
  justify-content: space-between;
`;
export const Wrap5 = styled("div")`
  height: calc(100% - 560px);
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 0px 0px 10px 10px;
`;
export const WrapLeft = styled("div")`
  align-items: center;
  height: 100%;
  width: 50%;
  display: flex;
  padding: 20px;
  justify-content: center;
`;
export const WrapRight = styled("div")`
  align-items: center;
  height: 100%;
  width: 50%;
  display: flex;
  padding: 20px;
  justify-content: center;
`;
export const Box = styled("div")`
  display: flex;
  align-items: center;
`;

export const TitleDowntime = styled("div")`
  font-family: NotoSansKR_B;
  font-size: 20px;
  margin-left: 50px;
  color: red;
`;
export const Title = styled("div")`
  font-family: NotoSansKR_B;
  font-size: 60px;
  margin-right: 20px;
`;

export const DateBox = styled("div")`
  display: flex;
`;

export const DateSingle = styled(TextField)`
  width: 300px;
  margin-left: 10px;
  margin-top: 5px;
  border: 2px solid rgba(0, 0, 0, 0.2);
  border-radius: 4px;
`;

export const BtnSet = styled("button")`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  width: 100%;
  height: 100%;
  padding: 0rem 1rem;

  font-family: "NotoSansKR_B", sans-serif;
  font-size: 6rem;
  color: white;
  white-space: pre-line;
  text-align: center;
  text-decoration: none;

  border: none;
  border-radius: 10px;
  cursor: pointer;

  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

  transition: 0.5s;

  background: ${(props) => props.color};

  &:hover {
    background: ${(props) => props.hoverColor};
  }
`;
