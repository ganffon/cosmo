import { TextField } from "@mui/material";
import InputPaper from "components/input/InputPaper";
import styled from "styled-components";

export const Wrap = styled("div")`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
export const InputWrap = styled("div")`
  width: 100%;
  display: flex;

  gap: 10px;
`;

export const InputWrap2 = styled("div")`
  width: 100%;
  display: flex;
  visibility: hidden;
`;

export const InfoTitle = styled("div")`
  width: ${(props) => props.width};
  font-size: 20px;
  font-weight: 700;
  margin-left: 30px;
  margin-top: 5px;
`;

export const InfoCounter = styled(InputPaper)`
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  color: ${(props) => (props.count === 0 ? "black" : "red")};
`;

export const InfoNullCounter = styled(InputPaper)`
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  color: blue;
`;

export const InputWrapDivide = styled("div")`
  padding-left: 10px;
  width: 100%;
  display: flex;
`;

export const InputWrapDivide2 = styled("div")`
  padding-left: 10px;
  width: 100%;
  display: flex;
  visibility: hidden;
  height: 0;
`;

export const DatePicker = styled(TextField)`
  width: 220px;

  margin-top: 5px;
`;
