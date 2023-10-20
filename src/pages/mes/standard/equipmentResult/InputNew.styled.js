import { Paper, TextField } from "@mui/material";
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

export const InfoCounter = styled(Paper)`
  padding: 2px 4px 0px 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  background: ${(props) => (props.readOnly ? "#f7f7f7" : "#ffffff")};
  border: 1px solid rgba(217, 217, 217, 1);
  box-shadow: none;
  margin-left: 10px;
  color: ${(props) => (props.count === 0 ? "black" : "red")};
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
