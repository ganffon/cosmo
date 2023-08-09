import React, { useContext, useEffect, useMemo } from "react";
import CloseIcon from "@mui/icons-material/Close";
import GridModal from "components/grid/GridModal";
import ModalWrap from "components/modal/ModalWrap";
import ButtonACS from "components/button/ButtonACS";
import DateTime from "components/datetime/DateTime";
import { LayoutContext } from "components/layout/common/Layout";
import * as S from "./ModalNewDetail.styled";
import BtnComponent from "components/button/BtnComponent";

function ModalNewDetail(props) {
  const {
    onClickModalAddRow = () => {},
    onClickModalCancelRow = () => {},
    onClickModalSave = () => {},
    onClickModalClose = () => {},
    onClickModalDetailClose = () => {},
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
    modalTitle,
  } = props;
  const { currentMenuName } = useContext(LayoutContext);

  useEffect(() => {
    if (!isNewDetail) {
      refGridModalHeader?.current?.gridInst?.appendRow();
      refGridModalHeader?.current?.gridInst.setValue(0, "subdivision_date", DateTime().dateFull);
    }
  }, []);

  const onClickModalCancelRowInnerFunction = () => {
    const Grid = refGridModalDetail.current?.gridInst;
    const coords = Grid.getFocusedCell();
    let rowKey = coords.rowKey;
    if (rowKey !== null) {
      // 선택한 Row가 있는 경우, 해당 Row의 키를 기반으로 데이터에서 찾아 제거
      const gridInstance = refGridModalDetail.current?.getInstance();
      // 선택한 Row가 있는 경우, 해당 Row 삭제
      gridInstance?.removeRow(rowKey);
    } else {
      // 선택한 Row가 없는 경우, 마지막 Row 제거
      const gridInstance = refGridModalDetail.current?.getInstance();
      const rowCount = refGridModalDetail.current?.getInstance()?.getData()?.length;
      if (rowCount > 0) {
        const lastRowKey = gridInstance.getRowAt(rowCount - 1).rowKey;
        gridInstance?.removeRow(lastRowKey);
      }
    }
    rowKey = null;
  };

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
  }, [gridDataDetail]);

  return (
    <ModalWrap width={"95%"} height={"95%"}>
      <S.HeaderBox>
        <S.TitleBox>{isNewDetail ? `[수정] ${currentMenuName}` : `[신규] ${currentMenuName}`}</S.TitleBox>
        <S.ButtonClose
          color="primary"
          aria-label="close"
          onClick={isNewDetail ? onClickModalDetailClose : onClickModalClose}
        >
          <CloseIcon />
        </S.ButtonClose>
      </S.HeaderBox>
      <S.GridTopTitleBox>{modalTitle}</S.GridTopTitleBox>
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
        <BtnComponent btnName="AddRow" onClick={onClickModalAddRow} />
        <BtnComponent btnName="CancelRow" onClick={onClickModalCancelRowInnerFunction} />
        <BtnComponent btnName="Save" onClick={isNewDetail ? onClickEditModalSave : onClickModalSave} />
      </S.ButtonBox>
      <S.GridBoxBottom>{GridDetail}</S.GridBoxBottom>
    </ModalWrap>
  );
}

export default ModalNewDetail;
