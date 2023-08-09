import React, { useContext, useEffect, useState } from "react";
import { LayoutContext } from "components/layout/common/Layout";
import * as S from "./DownTimeInput.styled";
import InputPaperPanel from "components/input/InputPaperPanel";
import CloseIcon from "@mui/icons-material/Close";
import * as RE from "custom/RegularExpression";
import BtnPanel from "components/button/BtnPanel";
function DownTimeInput(props) {
  const {
    onClickModalClose = () => {},
    onSelectEquip = () => {},
    onSelectDowntime = () => {},
    onSave = () => {},
    width = "98%",
    height = "98%",
    setDowntimeInfo = {},
    downtimeInfo = {},
  } = props;
  const { currentMenuName } = useContext(LayoutContext);

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

  return (
    <S.Wrap width={width} height={height}>
      <S.CloseWrap>
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
          <InputPaperPanel width={"300px"} height={"100px"} size={"50px"} value={downtimeInfo.startDate || ""} />
        </S.Box>
        <S.Box>
          <S.Title>시간</S.Title>
          <InputPaperPanel
            width={"180px"}
            height={"100px"}
            size={"50px"}
            value={downtimeInfo.startTime || ""}
            onTextChange={onStartTime}
          ></InputPaperPanel>
        </S.Box>
        <S.Box>
          <S.Title>종료일자</S.Title>
          <InputPaperPanel width={"300px"} height={"100px"} size={"50px"} value={downtimeInfo.endDate || ""} />
        </S.Box>
        <S.Box>
          <S.Title>시간</S.Title>
          <InputPaperPanel width={"180px"} height={"100px"} size={"50px"} value={downtimeInfo.endTime || ""} />
        </S.Box>
      </S.Wrap4>
      <S.Wrap5>
        <BtnPanel
          title={"비가동 저장"}
          height={"50%"}
          width={"50%"}
          color={"#1491CE"}
          fontSize={"100px"}
          fontColor={"#ffffff"}
          onClick={onSave}
        />
      </S.Wrap5>
    </S.Wrap>
  );
}

export default DownTimeInput;
