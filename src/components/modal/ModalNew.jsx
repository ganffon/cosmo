import React, { useContext, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import GridModal from "components/grid/GridModal";
import ModalWrap from "components/modal/ModalWrap";
import { LayoutContext } from "components/layout/common/Layout";
import * as S from "./ModalNew.styled";
import ButtonModule from "components/button/ButtonModule";

function ModalNew(props) {
  const {
    onClickModalAddRow = () => {},
    onClickModalCancelRow = () => {},
    onClickModalSave = () => {},
    onClickModalClose = () => {},
    onClickModalGrid = () => {},
    onDblClickModalGrid = () => {},
    onEditingFinishModal = () => {},
    refModalGrid = null,
    columns = [],
    columnOptions = [],
    header = [],
    rowHeaders = [],
    width = "95%",
    height = "95%",
    buttonType = "ACS",
    title = null,
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
        <S.TitleWrap>{title}</S.TitleWrap>
        <S.ButtonWrap>
          {buttonType === "ACS" ? (
            <ButtonModule
              addRowBtn={true}
              cancelRowBtn={true}
              saveBtn={true}
              onClickAddRow={onClickModalAddRow}
              onClickCancelRow={onClickModalCancelRow}
              onClickSave={onClickModalSave}
            />
          ) : null}
          {buttonType === "Save" ? (
            <ButtonModule saveBtn={true} onClickSave={onClickModalSave} />
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
          onEditingFinish={onEditingFinishModal}
        />
      </S.GridBox>
    </ModalWrap>
  );
}

export default ModalNew;
