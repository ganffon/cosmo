import { Autocomplete } from "@mui/material";
import InputSearch from "components/input/InputSearch";
import styled from "styled-components";

export const SearchWrap = styled("div")`
  height: 70px;
  width: 100%;
  padding: 0px 20px 0px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  border-radius: 10px;
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
`;
export const FilterWrap = styled("div")`
  display: flex;
  align-items: center;
  gap: 10px;
`;
export const InputBox = styled(InputSearch)`
  margin-left: 0px;
`;
export const ComboBox = styled(Autocomplete)`
  margin-top: 5px;
  width: 180px;
`;
export const FdrRadio = styled("div")`
  height: 40px;
  display: flex;
  align-items: center;
  gap: 5px;

  padding: 5px 10px;
  margin-top: 5px;
  border: 1px solid #b2b2b2;
  border-radius: 5px;
  position: relative;
  cursor: pointer;
  &:hover {
    border: 1px solid #000000;
  }
`;
export const RadioLabel = styled("div")`
  position: absolute;
  top: -10px;
  left: 10px;
  font-size: 0.8rem;
  color: #7f7f7f;
  background: #ffffff;
`;
export const RadioWrap = styled("div")`
  display: flex;
  align-items: center;
  gap: 3px;
`;
export const Radio = styled("input")`
  cursor: pointer;
  margin-top: 2px;
`;
export const RadioText = styled("label")`
  cursor: pointer;
  margin-right: 5px;
`;

export const GridWrap = styled("div")`
  height: calc(100% - 70px);
  width: 100%;
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: rgb(17 17 26 / 10%) 0px 4px 16px, rgb(17 17 26 / 5%) 0px 8px 32px;
`;
