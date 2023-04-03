import React, { useContext, createRef, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import GridModal from "components/onlySearchSingleGrid/grid/GridModal";
import ModalWrap from "components/modal/ModalWrap";
import ButtonAdd from "components/button/ButtonAdd";
import { LayoutContext } from "components/layout/common/Layout";
import { OnlySearchSingleGridContext } from "components/onlySearchSingleGrid/OnlySearchSingleGrid";
import restAPI from "api/restAPI";
import * as S from "./InsertModal.styled";
import NoticeSnack from "components/alert/NoticeSnack";
import GetPostParams from "api/GetPostParams";

function InsertModal(props) {
  const { componentName, uri, columns, columnOptions, header, onClickSearch } =
    props;
  //🔸조회 성공, 실패 스낵바 팝업 조건
  const [alertOpen, setAlertOpen] = useState({
    open: false,
  });
  const refGridModal = createRef();
  const { setIsModalOpen, currentMenuName } = useContext(LayoutContext);
  const { isBackDrop, setIsBackDrop } = useContext(OnlySearchSingleGridContext);
  let rowKey;
  const onClickGrid = (e) => {
    rowKey = e.rowKey;
  };
  const onClickClose = () => {
    setIsModalOpen(false);
    onClickSearch();
  };
  const onClickAddRow = () => {
    refGridModal?.current?.gridInst?.appendRow();
  };
  const onClickRemoveRow = () => {
    refGridModal?.current?.gridInst?.removeRow(rowKey);
  };
  const onClickSave = async () => {
    refGridModal?.current?.gridInst?.finishEditing();
    const data = refGridModal?.current?.gridInst
      ?.getModifiedRows()
      ?.createdRows.map((raw) => GetPostParams(componentName, raw));
    if (data.length !== 0 && isBackDrop === false) {
      setIsBackDrop(true);
      await restAPI
        .post(uri, data)
        .then((res) => {
          setAlertOpen({
            ...alertOpen,
            open: true,
            message: res.data.message,
            severity: "success",
          });
          refGridModal?.current?.gridInst?.clear();
        })
        .catch((res) => {
          setAlertOpen({
            ...alertOpen,
            open: true,
            message: res.message ? res.message : res.response.data.message,
            severity: "error",
          });
        })
        .finally(() => {
          setIsBackDrop(false);
        });
    }
  };

  return (
    <ModalWrap width={"1300px"} height={"650px"}>
      <S.HeaderBox>
        <S.TitleBox>{`[신규] ${currentMenuName}`}</S.TitleBox>
        <S.ButtonClose>
          <CloseIcon onClick={onClickClose} />
        </S.ButtonClose>
      </S.HeaderBox>
      <S.ButtonBox>
        <ButtonAdd
          onClickAddRow={onClickAddRow}
          onClickRemoveRow={onClickRemoveRow}
          onClickSave={onClickSave}
        />
      </S.ButtonBox>
      <S.GridBox>
        <GridModal
          columns={columns}
          columnOptions={columnOptions}
          header={header}
          refGridModal={refGridModal}
          draggable={false}
          onClickGrid={onClickGrid}
        />
      </S.GridBox>

      <NoticeSnack state={alertOpen} setState={setAlertOpen} />
    </ModalWrap>
  );
}

export default InsertModal;
