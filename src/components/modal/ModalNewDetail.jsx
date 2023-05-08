import React, { useContext, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import GridModal from "components/grid/GridModal";
import ModalWrap from "components/modal/ModalWrap";
import ButtonACS from "components/button/ButtonACS";
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
  } = props;
  const { currentMenuName } = useContext(LayoutContext);

  useEffect(() => {
    !isNewDetail && refGridModalHeader?.current?.gridInst?.appendRow();
  }, []);
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
        <GridModal
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
