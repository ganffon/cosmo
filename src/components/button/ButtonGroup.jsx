import React from "react";
import * as S from "components/button/ButtonGroup.styled";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    neutral: {
      main: "#64748B",
      contrastText: "white",
    },
  },
});

function ButtonGroup(props) {
  const { onClickSelect, onClickCancel } = props;
  return (
    <ThemeProvider theme={theme}>
      <S.ButtonWrap disableElevation variant="contained">
        <S.Buttons
          size="small"
          variant="contained"
          color="neutral"
          onClick={onClickSelect}
        >
          <S.Icon1 />
        </S.Buttons>
        <S.Buttons
          size="small"
          variant="contained"
          color="neutral"
          onClick={onClickCancel}
        >
          <S.Icon2 />
        </S.Buttons>
      </S.ButtonWrap>
    </ThemeProvider>
  );
}

export default ButtonGroup;
