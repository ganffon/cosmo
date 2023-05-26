import React, { useContext, useEffect, useMemo } from "react";
import CloseIcon from "@mui/icons-material/Close";
import GridModal from "components/grid/GridModal";
import ModalWrap from "components/modal/ModalWrap";
import ButtonACS from "components/button/ButtonACS";
import DateTime from "components/datetime/DateTime";
import { LayoutContext } from "components/layout/common/Layout";
import * as S from "./ModalNewDetail.styled";

function ModalNewDetail(props) {
  const {
    onClickModalAddRow = () => {},
    onClickModalCancelRow = () => {},
    onClickModalSave = () => {},
    onClickModalClose = () => {},
    onClickEditModalSave = () => {},
    onClickGridModalDetail = () => {},
    onDblClickGridModalHeader = () => {},
    onDblClickGridModalDetail = () => {},
    onEditingFinishGridModalHeader = () => {},
    onEditingFinishGridModalDetail = () => {},
    onClickGridModalHeader = () => {},
    refGridModalHeader,
    refGridModalDetail,
    isNewDetail,
    columnsModalHeader,
    columnsModalDetail,
    columnOptions,
    header,
    rowHeadersHeader,
    rowHeadersDetail,
    gridDataHeaderRowID,
    gridDataDetail,
  } = props;
  const { currentMenuName } = useContext(LayoutContext);

  useEffect(() => {
    if (!isNewDetail) {
      refGridModalHeader?.current?.gridInst?.appendRow();
      refGridModalHeader?.current?.gridInst.setValue(
        0,
        "subdivision_date",
        DateTime().dateFull
      );
    }
  }, []);

  const GridDetail = useMemo(() => {
    return (
      <GridModal
        data={gridDataDetail}
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
    );
  }, [gridDataDetail, onDblClickGridModalDetail]);

  return (
    <ModalWrap width={"95%"} height={"95%"}>
      <S.HeaderBox>
        <S.TitleBox>
          {isNewDetail
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
          data={isNewDetail ? gridDataHeaderRowID : null}
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
        <ButtonACS
          onClickAddRow={onClickModalAddRow}
          onClickCancelRow={onClickModalCancelRow}
          onClickSave={isNewDetail ? onClickEditModalSave : onClickModalSave}
        />
      </S.ButtonBox>
      <S.GridBoxBottom>
        {/* <GridModal
          columns={columnsModalDetail}
          columnOptions={columnOptions}
          header={header}
          rowHeaders={rowHeadersDetail}
          refGrid={refGridModalDetail}
          draggable={false}
          onClick={onClickGridModalDetail}
          onDblClick={onDblClickGridModalDetail}
          onEditingFinish={onEditingFinishGridModalDetail}
        /> */}
        {GridDetail}
      </S.GridBoxBottom>
    </ModalWrap>
  );
}

export default ModalNewDetail;
