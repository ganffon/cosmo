import styled from "styled-components";
import { Autocomplete } from "@mui/material";

export const ContentsWrap = styled("div")`
  display: flex;
  align-items: center;
  padding-top: 15px;
  gap: 30px;
`;

export const buttonWrap = styled("div")`
  display: flex;
  align-items: center;
`;

export const DatePickerWrap = styled("div")`
  display: flex;
  align-items: center;
`;
export const LinePickerWrap = styled("div")`
  width: 200px;
  align-items: center;
  display: flex;
`;

export const ComboBox = styled(Autocomplete)`
  width: 200px;
  margin-top: 5px;
`;
