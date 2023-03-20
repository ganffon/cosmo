import React, { useContext, createRef, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import GridPopup from "components/onlySearchSingleGrid/grid/GridPopup";
import PopupWrap from "components/popup/PopupWrap";
import ButtonAdd from "components/button/ButtonAdd";
import { LayoutEvent } from "components/layout/common/Layout";
import { OnlySearchSingleGridEvent } from "components/onlySearchSingleGrid/OnlySearchSingleGrid";
import restAPI from "api/restAPI";
import * as S from "./InsertPopup.styled";
import NoticeSnack from "components/alert/NoticeSnack";
import GetPostParams from "api/postParams";

function InsertPopup(props) {
  const { componentName, uri, columns, columnOptions, header, onClickSearch } =
    props;
  //🔸조회 성공, 실패 스낵바 팝업 조건
  const [alertOpen, setAlertOpen] = useState({
    open: false,
  });
  const refGridPopup = createRef();
  const { setIsPopupOpen, currentMenuName } = useContext(LayoutEvent);
  const { isBackDrop, setIsBackDrop } = useContext(OnlySearchSingleGridEvent);
  let rowKey;
  const onClickGrid = (e) => {
    rowKey = e.rowKey;
  };
  const onClickClose = () => {
    setIsPopupOpen(false);
    onClickSearch();
  };
  const onClickAddRow = () => {
    refGridPopup?.current?.gridInst?.appendRow();
  };
  const onClickRemoveRow = () => {
    refGridPopup?.current?.gridInst?.removeRow(rowKey);
  };
  const onClickSave = async () => {
    refGridPopup?.current?.gridInst?.finishEditing();
    const data = refGridPopup?.current?.gridInst
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
          refGridPopup?.current?.gridInst?.clear();
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
    <PopupWrap width={"1300px"} height={"650px"}>
      <S.HeaderBox>
        <S.TitleBox>{`[신규] ${currentMenuName}`}</S.TitleBox>
        <S.ButtonClose>
          <CloseIcon onClick={onClickClose} />
        </S.ButtonClose>
      </S.HeaderBox>
      <S.ButtonBox>
        <ButtonAdd />
      </S.ButtonBox>
      <S.GridBox>
        <GridPopup
          columns={columns}
          columnOptions={columnOptions}
          header={header}
          refGridPopup={refGridPopup}
          draggable={false}
          onClickGrid={onClickGrid}
        />
      </S.GridBox>

      <NoticeSnack state={alertOpen} setState={setAlertOpen} />
    </PopupWrap>
  );
}

export default InsertPopup;
