import React, { useContext, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import GridModal from "components/grid/GridModal";
import ModalWrap from "components/modal/ModalWrap";
import ButtonAdd from "components/button/ButtonAdd";
import ButtonEditModal from "components/button/ButtonEditModal";
import { LayoutContext } from "components/layout/common/Layout";
import * as S from "./ModalNewDetail.styled";

function ModalNewDetail(props) {
  const {
    onClickModalAddRow,
    onClickModalCancelRow,
    onClickModalSave,
    onClickModalClose,
    onClickModalGridTop,
    onClickModalGridBottom,
    onClickEditModalSave,
    onDblClickModalGridTop,
    onDblClickModalGridBottom,
    onEditingFinishModalGridTop,
    onEditingFinishModalGridBottom,
    refModalGridTop,
    refModalGridBottom,
    isEditMode,
    columnsModalTop,
    columnsModalBottom,
    columnOptions,
    header,
    rowHeadersTop,
    rowHeadersBottom,
    gridMainEditData,
    gridDetailData,
  } = props;
  const { currentMenuName } = useContext(LayoutContext);

  useEffect(() => {
    !isEditMode && refModalGridTop?.current?.gridInst?.appendRow();
  }, []);
  return (
    <ModalWrap width={"95%"} height={"95%"}>
      <S.HeaderBox>
        <S.TitleBox>
          {isEditMode
            ? `[수정] ${currentMenuName}`
            : `[신규] ${currentMenuName}`}
        </S.TitleBox>
        <S.ButtonClose
          color="primary"
          aria-label="close"
          onClick={onClickModalClose}
        >
          <CloseIcon />
        </S.ButtonClose>
      </S.HeaderBox>
      <S.GridTopTitleBox>✳️ 검사기준서</S.GridTopTitleBox>
      <S.GridBoxTop>
        <GridModal
          data={isEditMode ? gridMainEditData : null}
          columns={columnsModalTop}
          columnOptions={columnOptions}
          header={header}
          rowHeaders={rowHeadersTop}
          refGrid={refModalGridTop}
          draggable={false}
          onClick={onClickModalGridTop}
          onDblClick={onDblClickModalGridTop}
          onEditingFinish={onEditingFinishModalGridTop}
        />
      </S.GridBoxTop>
      <S.ButtonBox>
        {isEditMode ? (
          <ButtonEditModal onClickEditModalSave={onClickEditModalSave} />
        ) : (
          <ButtonAdd
            onClickAddRow={onClickModalAddRow}
            onClickCancelRow={onClickModalCancelRow}
            onClickSave={onClickModalSave}
          />
        )}
      </S.ButtonBox>
      <S.GridBoxBottom>
        <GridModal
          data={isEditMode ? gridDetailData : null}
          columns={columnsModalBottom}
          columnOptions={columnOptions}
          header={header}
          rowHeaders={rowHeadersBottom}
          refGrid={refModalGridBottom}
          draggable={false}
          onClick={onClickModalGridBottom}
          onDblClick={onDblClickModalGridBottom}
          onEditingFinish={onEditingFinishModalGridBottom}
        />
      </S.GridBoxBottom>
    </ModalWrap>
  );
}

export default ModalNewDetail;
