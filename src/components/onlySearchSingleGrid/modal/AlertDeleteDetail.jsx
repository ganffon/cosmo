import React from "react";
import ModalWrap from "components/modal/ModalWrap";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import * as S from "./AlertDelete.styled";

function AlertDelete(props) {
  const { handleInputInfo, actDeleteDetail, setIsDeleteAlertOpen } = props;
  return (
    <ModalWrap width={"400px"} height={"200px"}>
      <S.HeaderBox>
        <S.TitleBox>DELETE</S.TitleBox>
      </S.HeaderBox>
      <S.ContentsBox>
        <S.Message>정말로 삭제하시겠습니까?</S.Message>
        <S.ButtonBox>
          <S.ButtonYes
            variant="contained"
            size="small"
            startIcon={<DoneIcon />}
            color="success"
            onClick={() => {
              actDeleteDetail();
            }}
          >
            예 (Yes)
          </S.ButtonYes>
          <S.ButtonNo
            variant="contained"
            size="small"
            startIcon={<CloseIcon />}
            color="error"
            onClick={() => {
              handleInputInfo();
              setIsDeleteAlertOpen(false);
            }}
          >
            아니오 (No)
          </S.ButtonNo>
        </S.ButtonBox>
      </S.ContentsBox>
    </ModalWrap>
  );
}

export default AlertDelete;
