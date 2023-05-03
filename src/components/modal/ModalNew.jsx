import React, { useContext, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import GridModal from "components/grid/GridModal";
import ModalWrap from "components/modal/ModalWrap";
import ButtonACS from "components/button/ButtonACS";
import ButtonSave from "components/button/ButtonSave";
import { LayoutContext } from "components/layout/common/Layout";
import * as S from "./ModalNew.styled";

function ModalNew(props) {
  const {
    onClickModalAddRow = () => {},
    onClickModalCancelRow = () => {},
    onClickModalSave = () => {},
    onClickModalClose = () => {},
    onClickModalGrid = () => {},
    onDblClickModalGrid = () => {},
    refModalGrid,
    columns,
    columnOptions,
    header,
    rowHeaders,
    width = "95%",
    height = "95%",
    buttonType = "ACS",
    step = null,
    isAddOneRow = false,
  } = props;
  const { currentMenuName } = useContext(LayoutContext);

  useEffect(() => {
    isAddOneRow && refModalGrid?.current?.gridInst?.appendRow();
  }, []);

  return (
    <ModalWrap width={width} height={height}>
      <S.HeaderBox>
        <S.TitleBox>{`${currentMenuName}`}</S.TitleBox>
        <S.ButtonClose
          color="primary"
          aria-label="close"
          onClick={onClickModalClose}
        >
          <CloseIcon />
        </S.ButtonClose>
      </S.HeaderBox>
      <S.ButtonBox>
        <S.TitleWrap>{step}</S.TitleWrap>
        <S.ButtonWrap>
          {buttonType === "ACS" ? (
            <ButtonACS
              onClickAddRow={onClickModalAddRow}
              onClickCancelRow={onClickModalCancelRow}
              onClickSave={onClickModalSave}
            />
          ) : null}
          {buttonType === "Save" ? (
            <ButtonSave onClickSave={onClickModalSave} />
          ) : null}
        </S.ButtonWrap>
      </S.ButtonBox>
      <S.GridBox>
        <GridModal
          columns={columns}
          columnOptions={columnOptions}
          header={header}
          rowHeaders={rowHeaders}
          refGrid={refModalGrid}
          draggable={false}
          onClick={onClickModalGrid}
          onDblClick={onDblClickModalGrid}
        />
      </S.GridBox>
    </ModalWrap>
  );
}

export default ModalNew;
