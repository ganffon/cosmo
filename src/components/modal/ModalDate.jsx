import React, { useContext } from "react";
import CloseIcon from "@mui/icons-material/Close";
import GridModal from "components/grid/GridModal";
import ModalWrap from "components/modal/ModalWrap";
import ButtonACS from "components/button/ButtonACS";
import { LayoutContext } from "components/layout/common/Layout";
import * as S from "./ModalDate.styled";

function ModalNewDate(props) {
  const {
    onClickModalAddRow,
    onClickModalCancelRow,
    onClickModalSave,
    onClickModalClose,
    onClickModalGrid = () => {},
    onDblClickModalGrid = () => {},
    refModalGrid,
    columns,
    columnOptions,
    header,
    rowHeaders,
    datePickerSet,
    dateModal,
    setDateModal,
  } = props;
  const { currentMenuName } = useContext(LayoutContext);

  return (
    <ModalWrap width={"95%"} height={"95%"}>
      <S.HeaderBox>
        <S.TitleBox>{`[신규] ${currentMenuName}`}</S.TitleBox>
        <S.ButtonClose
          color="primary"
          aria-label="close"
          onClick={onClickModalClose}
        >
          <CloseIcon />
        </S.ButtonClose>
      </S.HeaderBox>
      <S.ToolWrap>
        <S.DateBox>
          <S.Date
            datePickerSet={datePickerSet}
            dateText={dateModal}
            setDateText={setDateModal}
          />
        </S.DateBox>
        <S.ButtonBox>
          <ButtonACS
            onClickAddRow={onClickModalAddRow}
            onClickCancelRow={onClickModalCancelRow}
            onClickSave={onClickModalSave}
          />
        </S.ButtonBox>
      </S.ToolWrap>
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

export default ModalNewDate;
