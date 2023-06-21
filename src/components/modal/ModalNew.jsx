import React, { useContext, useEffect, useMemo } from "react";
import CloseIcon from "@mui/icons-material/Close";
import GridModal from "components/grid/GridModal";
import ModalWrap from "components/modal/ModalWrap";
import { LayoutContext } from "components/layout/common/Layout";
import * as S from "./ModalNew.styled";
import BtnComponent from "components/button/BtnComponent";

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
    data = [],
  } = props;
  const { currentMenuName } = useContext(LayoutContext);

  useEffect(() => {
    isAddOneRow && refModalGrid?.current?.gridInst?.appendRow();
  }, []);

  const Grid = useMemo(() => {
    return (
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
        data={data}
      />
    );
  }, [data]);

  return (
    <ModalWrap width={width} height={height}>
      <S.HeaderBox>
        <S.TitleBox>{`${currentMenuName}`}</S.TitleBox>
        <S.ButtonClose color="primary" aria-label="close" onClick={onClickModalClose}>
          <CloseIcon />
        </S.ButtonClose>
      </S.HeaderBox>
      <S.ButtonBox>
        <S.TitleWrap>{title}</S.TitleWrap>
        <S.ButtonWrap>
          {buttonType === "ACS" && (
            <>
              <BtnComponent btnName="AddRow" onClick={onClickModalAddRow} />
              <BtnComponent btnName="CancelRow" onClick={onClickModalCancelRow} />
              <BtnComponent btnName="Save" onClick={onClickModalSave} />
            </>
          )}
          {buttonType === "Save" && <BtnComponent btnName="Save" onClick={onClickModalSave} />}
        </S.ButtonWrap>
      </S.ButtonBox>
      <S.GridBox>{Grid}</S.GridBox>
    </ModalWrap>
  );
}

export default ModalNew;
