import { Chip, Paper } from "@mui/material";
import styled from "styled-components";

export const ChipsPaper = styled(Paper)`
  height: ${(props) => props.height};
  width: ${(props) => props.width};
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  list-style: none;
  // background: ${(props) => props.bakCor || "#ffffff"};
  border: 1px solid rgba(217, 217, 217, 1);
  box-shadow: none;
  gap: 15px;
  padding: 20px;
`;

export const ChipWrap = styled("div")`
  background: ${(props) => props.bakCor || "#ffffff"};
`;

export const ChipItem = styled(Chip)`
  scale: 1.1;
  font-size: 20px;

  &.chip__backColor--boss {
    background: #3d85c6;
    color: white;

    .MuiChip-deleteIcon {
      color: white;
    }
  }
  &.chip__backColor--rest {
    background: #f8c1d6;
    color: black;
  }
`;
