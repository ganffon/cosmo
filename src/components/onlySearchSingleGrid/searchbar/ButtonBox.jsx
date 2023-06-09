import React, { useContext } from "react";
// ⬇️ reference of page
import { OnlySearchSingleGridContext } from "components/onlySearchSingleGrid/OnlySearchSingleGrid";
import ButtonGroupSearch from "./ButtonGroupSearch";
import ButtonGroupEdit from "./ButtonGroupEdit";
import * as S from "./ButtonBox.styled";

function ButtonBox(props) {
  const { componentName, btnDisabled, uri } = props;
  const { isEditMode } = useContext(OnlySearchSingleGridContext);
  return (
    <S.ButtonBox>
      {isEditMode ? (
        <ButtonGroupEdit componentName={componentName} uri={uri} />
      ) : (
        <ButtonGroupSearch btnDisabled={btnDisabled} />
      )}
    </S.ButtonBox>
  );
}

export default ButtonBox;
