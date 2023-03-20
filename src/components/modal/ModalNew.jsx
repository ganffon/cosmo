import React, { useContext } from "react";
import CloseIcon from "@mui/icons-material/Close";
import GridModule from "components/grid/GridModule";
import ModalWrap from "components/modal/ModalWrap";
import ButtonAdd from "components/button/ButtonAdd";
import { LayoutEvent } from "components/layout/common/Layout";
import * as S from "./ModalNew.styled";

function ModalNew(props) {
  const {
    onClickModalAddRow,
    onClickModalCancelRow,
    onClickModalSave,
    onClickModalClose,
    onClickModalGrid,
    refModalGrid,
    columns,
    columnOptions,
    header,
    rowHeaders,
  } = props;
  const { currentMenuName } = useContext(LayoutEvent);

  return (
    <ModalWrap width={"1300px"} height={"650px"}>
      <S.HeaderBox>
        <S.TitleBox>{`[신규] ${currentMenuName}`}</S.TitleBox>
        <S.ButtonClose>
          <CloseIcon onClick={onClickModalClose} />
        </S.ButtonClose>
      </S.HeaderBox>
      <S.ButtonBox>
        <ButtonAdd
          onClickAddRow={onClickModalAddRow}
          onClickCancelRow={onClickModalCancelRow}
          onClickSave={onClickModalSave}
        />
      </S.ButtonBox>
      <S.GridBox>
        <GridModule
          columns={columns}
          columnOptions={columnOptions}
          header={header}
          rowHeaders={rowHeaders}
          refGrid={refModalGrid}
          draggable={false}
          onClickGrid={onClickModalGrid}
        />
      </S.GridBox>
    </ModalWrap>
  );
}

export default ModalNew;
