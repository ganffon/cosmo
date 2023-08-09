import ModalWrap from "../../../../components/modal/ModalWrap";
import * as S from "./NoticeModal.styled.js";
import CloseIcon from "@mui/icons-material/Close";
import React, { useContext, useEffect, useState } from "react";
import { LayoutContext } from "../../../../components/layout/common/Layout";
import Cookies from "js-cookie";
import InputPaper from "../../../../components/input/InputPaper";
import DateTime from "../../../../components/datetime/DateTime";
import BtnComponent from "../../../../components/button/BtnComponent";
import restAPI from "../../../../api/restAPI";
import restURI from "json/restURI.json";
import BackDrop from "../../../../components/backdrop/BackDrop";
import NoticeSnack from "../../../../components/alert/NoticeSnack";
import ModalWrapMulti from "components/modal/ModalWrapMulti";

function NoticeModal(props) {
  const {
    onClickModalClose = () => {},
    isEditMode = false,
    readOnly = false,
    onClickData = null,
    width = "39%",
    height = "95%",
  } = props;
  const { currentMenuName } = useContext(LayoutContext);
  const [noticeTitle, setNoticeTitle] = useState("");
  const [startDateText, setStartDateText] = useState({
    startDate: DateTime().dateFull,
  });
  const [endDateText, setEndDateText] = useState({
    startDate: DateTime().dateFull,
  });
  const [newContents, setNewContents] = useState({});
  const [isBackDrop, setIsBackDrop] = useState(false);

  const handleRemark = (e) => {
    setNewContents({ ...newContents, remark: e.target.value });
  };
  const handleChangeTitle = (e) => {
    setNoticeTitle(e.target.value);
  };
  const [isSnackOpen, setIsSnackOpen] = useState({
    open: false,
  });

  useEffect(() => {
    if (isEditMode === true && onClickData !== null) {
      setNoticeTitle(onClickData.title);
      setNewContents({ ...newContents, remark: onClickData.contents });
      setStartDateText({ ...startDateText, startDate: onClickData.notice_start_date });
      setEndDateText({ ...endDateText, startDate: onClickData.notice_end_date });
    } else if (readOnly === true) {
      setNoticeTitle(onClickData.title);
      setNewContents({ ...newContents, remark: onClickData.contents });
      setStartDateText({ ...startDateText, startDate: onClickData.notice_start_date });
      setEndDateText({ ...endDateText, startDate: onClickData.notice_end_date });
    }
  }, [onClickData]);

  const onClickSave = async () => {
    const SaveContent = [
      {
        title: noticeTitle,
        contents: newContents.remark,
        writer_uid: Cookies.get("userUID"),
        notice_start_date: startDateText.startDate,
        notice_end_date: endDateText.startDate,
      },
    ];
    setIsBackDrop(true);
    if (SaveContent !== undefined) {
      if (SaveContent.length !== 0) {
        setIsBackDrop(true);
        await restAPI
          .post(restURI.notice, SaveContent)
          .then((res) => {
            setIsSnackOpen({
              ...isSnackOpen,
              open: true,
              message: res?.data?.message,
              severity: "success",
            });
            // refGrid?.current?.gridInst?.clear();
            onClickModalClose();
          })
          .catch((res) => {
            setIsSnackOpen({
              ...isSnackOpen,
              open: true,
              message: res?.response?.data?.message ?? res?.message,
              severity: "error",
            });
          })
          .finally(() => {
            setIsBackDrop(false);
          });
      }
    }
  };

  const onClickEditSave = async () => {
    const SaveContent = [
      {
        notice_id: onClickData.notice_id,
        title: noticeTitle,
        contents: newContents.remark,
        writer_uid: Cookies.get("userUID"),
        notice_start_date: startDateText.startDate ? startDateText.startDate : startDateText,
        notice_end_date: endDateText.startDate ? endDateText.startDate : endDateText,
      },
    ];
    setIsBackDrop(true);
    if (SaveContent !== undefined) {
      if (SaveContent.length !== 0) {
        setIsBackDrop(true);
        await restAPI
          .put(restURI.notice, SaveContent)
          .then((res) => {
            setIsSnackOpen({
              ...isSnackOpen,
              open: true,
              message: res?.data?.message,
              severity: "success",
            });
            // refGrid?.current?.gridInst?.clear();
            onClickModalClose();
          })
          .catch((res) => {
            setIsSnackOpen({
              ...isSnackOpen,
              open: true,
              message: res?.response?.data?.message ?? res?.message,
              severity: "error",
            });
          })
          .finally(() => {
            setIsBackDrop(false);
          });
      }
    }
  };

  return (
    <ModalWrapMulti width={width} height={height}>
      <S.HeaderBox>
        <S.TitleBox>{`${currentMenuName}`}</S.TitleBox>
        <S.ButtonClose color="primary" aria-label="close" onClick={onClickModalClose}>
          <CloseIcon />
        </S.ButtonClose>
      </S.HeaderBox>

      <S.ContentWrap>
        <S.ContentTitle>
          <InputPaper
            width={"700px"}
            height={"40px"}
            name={"제목"}
            nameSize={"20px"}
            namePositionTop={"-30px"}
            value={noticeTitle || ""}
            readOnly={readOnly}
            onTextChange={handleChangeTitle}
            size={"20px"}
          />
        </S.ContentTitle>
        <S.DateWrap>
          <S.Date
            datePickerSet={"single"}
            dateText={startDateText}
            setDateText={setStartDateText}
            dateTitle={"시작일"}
          />
          <S.Date datePickerSet={"single"} dateText={endDateText} setDateText={setEndDateText} dateTitle={"종료일"} />
        </S.DateWrap>
        <S.ContentBottom>
          {readOnly ? (
            <S.Content
              disabled
              rows={7}
              value={newContents.remark}
              onChange={handleRemark}
              placeholder="내용을 입력해주세요."
            />
          ) : (
            <S.Content rows={7} value={newContents.remark} onChange={handleRemark} placeholder="내용을 입력해주세요." />
          )}
        </S.ContentBottom>
        {readOnly ? (
          <></>
        ) : (
          <S.ButtonWrap>
            {isEditMode ? (
              <BtnComponent btnName={"Save"} onClick={onClickEditSave} />
            ) : (
              <BtnComponent btnName={"Save"} onClick={onClickSave} />
            )}
          </S.ButtonWrap>
        )}
      </S.ContentWrap>
      <BackDrop isBackDrop={isBackDrop} />
      <NoticeSnack state={isSnackOpen} setState={setIsSnackOpen} />
    </ModalWrapMulti>
  );
}

export default NoticeModal;
