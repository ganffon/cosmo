import React, { useContext, useEffect, useState } from "react";
import { LayoutContext } from "components/layout/common/Layout";
import * as S from "./DownTimeInput.styled";
import InputPaperPanel from "components/input/InputPaperPanel";
import CloseIcon from "@mui/icons-material/Close";
import DateSingle from "./DateSingle";
import * as RE from "custom/RegularExpression";
import DateTime from "components/datetime/DateTime";
import BtnPanel from "components/button/BtnPanel";
function DownTimeInput(props) {
  const {
    onClickModalClose = () => {},
    onSelectEquip = () => {},
    onSelectDowntime = () => {},
    onStart = () => {},
    onEnd = () => {},
    width = "98%",
    height = "98%",
    setDowntimeInfo = {},
    downtimeInfo = {},
  } = props;
  const { currentMenuName } = useContext(LayoutContext);

  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    if (downtimeInfo.workDowntimeID) {
      const savedDate = downtimeInfo.startDate;
      const savedTime = downtimeInfo.startTime;

      const savedDateTime = new Date(`${savedDate}T${savedTime}:00z`);
      savedDateTime.setHours(savedDateTime.getHours() - 9);
      const startTime = savedDateTime.getTime();

      const timerInterval = setInterval(() => {
        const currentTime = new Date();
        const elapsedTime = Math.floor((currentTime - startTime) / 1000);
        setElapsedTime(elapsedTime);
      }, 1000);

      return () => {
        clearInterval(timerInterval);
      };
    }
  }, [downtimeInfo.workDowntimeID]);

  const onTextChange = (e) => {
    setDowntimeInfo({
      ...downtimeInfo,
      remark: e?.target?.value,
    });
  };
  const onStartTime = (e) => {
    const timeValue = RE.TimeInput(e?.target?.value);
    if (timeValue.length < 6) {
      setDowntimeInfo({
        ...downtimeInfo,
        startTime: timeValue,
      });
    }
  };
  const onEndTime = (e) => {
    const timeValue = RE.TimeInput(e?.target?.value);
    if (timeValue.length < 6) {
      setDowntimeInfo({
        ...downtimeInfo,
        endTime: timeValue,
      });
    }
  };

  const inputStartTime = () => {
    setDowntimeInfo({
      ...downtimeInfo,
      startTime: DateTime().hour + ":" + DateTime().minute,
    });
  };
  const inputEndTime = () => {
    setDowntimeInfo({
      ...downtimeInfo,
      endTime: DateTime().hour + ":" + DateTime().minute,
    });
  };

  const hours = Math.floor(elapsedTime / 3600);
  const minutes = Math.floor((elapsedTime % 3600) / 60);
  const seconds = elapsedTime % 60;

  return (
    <S.Wrap width={width} height={height}>
      <S.CloseWrap>
        <S.TitleDowntime>
          {downtimeInfo.workDowntimeID
            ? seconds === 0
              ? `비가동 경과 시간 계산중...`
              : `비가동 ${hours}시간 ${minutes}분 ${seconds}초 경과`
            : ""}
        </S.TitleDowntime>
        <S.ButtonClose color="primary" aria-label="close" onClick={onClickModalClose}>
          <CloseIcon />
        </S.ButtonClose>
      </S.CloseWrap>
      <S.Wrap1>
        <S.Box>
          <S.Title>라인</S.Title>
          <InputPaperPanel
            width={"300px"}
            height={"100px"}
            value={downtimeInfo.lineName || ""}
            size={"50px"}
          ></InputPaperPanel>
        </S.Box>
        <S.Box>
          <S.Title>공정</S.Title>
          <InputPaperPanel
            width={"400px"}
            height={"100px"}
            value={downtimeInfo.procName || ""}
            size={"50px"}
            onClick={onSelectEquip}
          ></InputPaperPanel>
        </S.Box>
        <S.Box>
          <S.Title>설비</S.Title>
          <InputPaperPanel
            width={"400px"}
            height={"100px"}
            value={downtimeInfo.equipName || ""}
            size={"50px"}
            onClick={onSelectEquip}
          ></InputPaperPanel>
        </S.Box>
      </S.Wrap1>
      <S.Wrap2>
        <S.Box>
          <S.Title>비가동 유형</S.Title>
          <InputPaperPanel
            width={"450px"}
            height={"100px"}
            value={downtimeInfo.downtimeTypeName || ""}
            size={"50px"}
            onClick={onSelectDowntime}
          ></InputPaperPanel>
        </S.Box>
        <S.Box>
          <S.Title>비가동 항목</S.Title>
          <InputPaperPanel
            width={"650px"}
            height={"100px"}
            value={downtimeInfo.downtimeName || ""}
            size={"50px"}
            onClick={onSelectDowntime}
          />
        </S.Box>
      </S.Wrap2>
      <S.Wrap3>
        <S.Box>
          <S.Title>특이사항</S.Title>
          <InputPaperPanel
            width={"1530px"}
            height={"100px"}
            value={downtimeInfo.remark || ""}
            size={"50px"}
            readOnly={false}
            onTextChange={onTextChange}
          />
        </S.Box>
      </S.Wrap3>
      <S.Wrap4>
        <S.Box>
          <S.Title>시작일자</S.Title>
          <DateSingle id={"startDate"} setDateText={setDowntimeInfo} dateText={downtimeInfo} />
        </S.Box>
        <S.Box>
          <S.Title onClick={inputStartTime}>시간</S.Title>
          <InputPaperPanel
            width={"180px"}
            height={"100px"}
            size={"50px"}
            value={downtimeInfo.startTime || ""}
            onTextChange={onStartTime}
            readOnly={false}
          ></InputPaperPanel>
        </S.Box>
        <S.Box>
          <S.Title>종료일자</S.Title>
          <DateSingle id={"endDate"} setDateText={setDowntimeInfo} dateText={downtimeInfo} />
        </S.Box>
        <S.Box>
          <S.Title onClick={inputEndTime}>시간</S.Title>
          <InputPaperPanel
            width={"180px"}
            height={"100px"}
            size={"50px"}
            value={downtimeInfo.endTime || ""}
            onTextChange={onEndTime}
            readOnly={false}
          ></InputPaperPanel>
        </S.Box>
      </S.Wrap4>
      <S.Wrap5>
        <S.WrapLeft>
          <BtnPanel
            title={"비가동 시작"}
            height={"80%"}
            width={"80%"}
            color={"#1491CE"}
            fontSize={"100px"}
            fontColor={"#ffffff"}
            onClick={onStart}
          />
        </S.WrapLeft>
        <S.WrapRight>
          <BtnPanel
            title={"비가동 종료"}
            height={"80%"}
            width={"80%"}
            color={"#555555"}
            fontSize={"100px"}
            fontColor={"#ffffff"}
            onClick={onEnd}
          />
        </S.WrapRight>
      </S.Wrap5>
    </S.Wrap>
  );
}

export default DownTimeInput;
