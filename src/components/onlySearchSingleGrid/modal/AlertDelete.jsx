import React from "react";
import ModalWrap from "components/modal/ModalWrap";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import * as S from "./AlertDelete.styled";

function AlertDelete(props) {
  const {
    handleDelete = () => {},
    setIsDeleteAlertOpen,
    title = "DELETE",
    message = "정말 삭제하시겠습니까?",
    onlyYes = false,
  } = props;

  return (
    <ModalWrap width={"400px"} height={"200px"}>
      <S.HeaderBox>
        <S.TitleBox>{title}</S.TitleBox>
      </S.HeaderBox>
      <S.ContentsBox>
        <S.Message>{message}</S.Message>
        <S.ButtonBox>
          <S.ButtonYes variant="contained" size="small" startIcon={<DoneIcon />} color="success" onClick={handleDelete}>
            예 (Yes)
          </S.ButtonYes>
          {onlyYes ? null : (
            <S.ButtonNo
              variant="contained"
              size="small"
              startIcon={<CloseIcon />}
              color="error"
              onClick={() => setIsDeleteAlertOpen(false)}
            >
              아니오 (No)
            </S.ButtonNo>
          )}
        </S.ButtonBox>
      </S.ContentsBox>
    </ModalWrap>
  );
}

export default AlertDelete;
