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
    onClickEditModalSave,
    onClickGridModalHeader,
    onClickGridModalDetail,
    onDblClickGridModalHeader,
    onDblClickGridModalDetail,
    onEditingFinishGridModalHeader,
    onEditingFinishGridModalDetail,
    refGridModalHeader,
    refGridModalDetail,
    isEditMode,
    columnsModalHeader,
    columnsModalDetail,
    columnOptions,
    header,
    rowHeadersHeader,
    rowHeadersDetail,
    gridDataHeaderEdit,
    gridDataDetail,
  } = props;
  const { currentMenuName } = useContext(LayoutContext);

  useEffect(() => {
    !isEditMode && refGridModalHeader?.current?.gridInst?.appendRow();
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
          data={isEditMode ? gridDataHeaderEdit : null}
          columns={columnsModalHeader}
          columnOptions={columnOptions}
          header={header}
          rowHeaders={rowHeadersHeader}
          refGrid={refGridModalHeader}
          draggable={false}
          onClick={onClickGridModalHeader}
          onDblClick={onDblClickGridModalHeader}
          onEditingFinish={onEditingFinishGridModalHeader}
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
          data={isEditMode ? gridDataDetail : null}
          columns={columnsModalDetail}
          columnOptions={columnOptions}
          header={header}
          rowHeaders={rowHeadersDetail}
          refGrid={refGridModalDetail}
          draggable={false}
          onClick={onClickGridModalDetail}
          onDblClick={onDblClickGridModalDetail}
          onEditingFinish={onEditingFinishGridModalDetail}
        />
      </S.GridBoxBottom>
    </ModalWrap>
  );
}

export default ModalNewDetail;
