import React, { useContext } from "react";
import CloseIcon from "@mui/icons-material/Close";
import GridModal from "components/grid/GridModal";
import ModalWrap from "components/modal/ModalWrap";
import ButtonACS from "components/button/ButtonACS";
import ButtonDS from "components/button/ButtonDS";
import ButtonSearch from "components/button/ButtonSearch";
import { LayoutContext } from "components/layout/common/Layout";
import * as S from "./ModalDate.styled";

function ModalDate(props) {
  const {
    onClickModalAddRow = () => {},
    onClickModalCancelRow = () => {},
    onClickModalSave = () => {},
    onClickModalClose = () => {},
    onClickModalGrid = () => {},
    onDblClickModalGrid = () => {},
    onClickModalDelete = () => {},
    onClickModalSearch = () => {},
    refModalGrid,
    columns,
    columnOptions,
    header,
    rowHeaders,
    datePickerSet,
    dateText,
    setDateText,
    buttonType,
    data,
  } = props;
  const { currentMenuName } = useContext(LayoutContext);
  return (
    <ModalWrap width={"95%"} height={"95%"}>
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
      <S.ToolWrap>
        <S.DateBox>
          <S.Date
            datePickerSet={datePickerSet}
            dateText={dateText}
            setDateText={setDateText}
          />
        </S.DateBox>
        <S.ButtonBox>
          {buttonType === "ACS" ? (
            <ButtonACS
              onClickAddRow={onClickModalAddRow}
              onClickCancelRow={onClickModalCancelRow}
              onClickSave={onClickModalSave}
            />
          ) : null}
          {buttonType === "DS" ? (
            <ButtonDS
              onClickDelete={onClickModalDelete}
              onClickSearch={onClickModalSearch}
            />
          ) : (
            false
          )}
          {buttonType === "Search" ? (
            <ButtonSearch onClickSearch={onClickModalSearch} />
          ) : null}
        </S.ButtonBox>
      </S.ToolWrap>
      <S.GridBox>
        <GridModal
          data={data}
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

export default ModalDate;
