import React from "react";
import UTurnLeftIcon from "@mui/icons-material/UTurnLeft";
import SaveIcon from "@mui/icons-material/Save";
import AddIcon from "@mui/icons-material/Add";
import * as S from "./Button.styled";
import BtnComponent from "components/button/BtnComponent";

function ButtonACS(props) {
  const { onClickAddRow, onClickCancelRow, onClickSave } = props;
  return (
    <S.ButtonWrap>
      <BtnComponent btnName={"AddRow"} width={"100px"} onClick={onClickAddRow}>
        ADD ROW
      </BtnComponent>

      <BtnComponent
        btnName={"CancelRow"}
        width={"100px"}
        onClick={onClickCancelRow}
      >
        CANCEL ROW
      </BtnComponent>
      <BtnComponent btnName={"Save"} width={"100px"} onClick={onClickSave}>
        SAVE
      </BtnComponent>
    </S.ButtonWrap>
  );
}

export default ButtonACS;
