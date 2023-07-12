import React, { useContext, useEffect, useMemo } from "react";
import CloseIcon from "@mui/icons-material/Close";
import GridModal from "components/grid/GridModal";
import ModalWrap from "components/modal/ModalWrap";
import DateTime from "components/datetime/DateTime";
import { LayoutContext } from "components/layout/common/Layout";
import * as S from "./ModalWeightNew.styled";
import BtnComponent from "components/button/BtnComponent";

function ModalWeightNew(props) {
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
      refGridModalHeader?.current?.gridInst.setValue(0, "subdivision_date", DateTime().dateFull);
    }
  }, []);

  const GridHeader = useMemo(() => {
    return (
      <GridModal
        data={isNewDetail ? gridDataHeaderRowID : null}
        columns={columnsModalHeader}
        columnOptions={columnOptions}
        header={header}
        rowHeaders={rowHeadersHeader}
        refGrid={refGridModalHeader}
        draggable={false}
        onDblClick={onDblClickGridModalHeader}
        onEditingFinish={onEditingFinishGridModalHeader}
      />
    );
  }, [gridDataHeaderRowID]);

  return (
    <ModalWrap width={"95%"} height={"95%"}>
      <S.HeaderBox>
        <S.TitleBox>{isNewDetail ? `[수정] ${currentMenuName}` : `[신규] ${currentMenuName}`}</S.TitleBox>
        <S.ButtonClose color="primary" aria-label="close" onClick={onClickModalClose}>
          <CloseIcon />
        </S.ButtonClose>
      </S.HeaderBox>
      <S.GridTopTitleBox>검사기준서</S.GridTopTitleBox>
      <S.GridBoxTop>
        {/* <GridModal
          data={isNewDetail ? gridDataHeaderRowID : null}
          columns={columnsModalHeader}
          columnOptions={columnOptions}
          header={header}
          rowHeaders={rowHeadersHeader}
          refGrid={refGridModalHeader}
          draggable={false}
          onDblClick={onDblClickGridModalHeader}
          onEditingFinish={onEditingFinishGridModalHeader}
        /> */}
        {GridHeader}
      </S.GridBoxTop>
      <S.ButtonBox>
        <BtnComponent btnName={"Save"} width={"100px"} onClick={onClickModalSave}>
          SAVE
        </BtnComponent>
      </S.ButtonBox>

      <S.GridBoxBottom>
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
      </S.GridBoxBottom>
    </ModalWrap>
  );
}

export default ModalWeightNew;
