import React, { useContext, useEffect, useMemo, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import GridModal from "components/grid/GridModal";
import { LayoutContext } from "components/layout/common/Layout";
import * as S from "./ModalInput.styled";
import InputPaper from "components/input/InputPaper";

function ModalInput(props) {
  const {
    width = "95%",
    height = "95%",
    onClickModalClose = () => {},
    onEditingFinishInput = () => {},
    onClickGridInput = () => {},
    refGridInput = null,
    refGridInputDetail = null,
    columnsInput = [],
    columnsInputDetail = [],
    columnOptions = [],
    header = [],
    rowHeadersDetail = [],
    gridDataInput = [],
    gridDataInputDetail = [],
  } = props;
  const { currentMenuName } = useContext(LayoutContext);

  const GridHeader = useMemo(() => {
    return (
      <GridModal
        data={gridDataInput}
        columns={columnsInput}
        columnOptions={columnOptions}
        header={header}
        rowHeaders={rowHeadersDetail}
        refGrid={refGridInput}
        draggable={false}
        onClick={onClickGridInput}
        onEditingFinish={onEditingFinishInput}
      />
    );
  }, [gridDataInput]);
  return (
    <S.ModalWrapBox width={width} height={height}>
      <S.HeaderBox>
        <S.TitleBox>{currentMenuName}</S.TitleBox>
        <S.ButtonClose
          color="primary"
          aria-label="close"
          onClick={onClickModalClose}
        >
          <CloseIcon />
        </S.ButtonClose>
      </S.HeaderBox>
      <S.Content>
        <S.GridTitleBox>
          <div>✳️ 일일투입일지</div>
          {/* <S.ButtonSet
            color={"#28a745"}
            hoverColor={"#218838"}
            onClick={onClickInputSave}
            width={"150px"}
          >
            Save
          </S.ButtonSet> */}
        </S.GridTitleBox>
        {/* <S.InfoBox>
          <S.InfoTitle>🔸라인</S.InfoTitle>
          <InputPaper
            width={"150px"}
            height={"60px"}
            nameColor={"black"}
            value={lineNM}
            size={"30px"}
            btn={false}
          />
          <S.InfoTitle>🔸투입자</S.InfoTitle>
          <InputPaper
            width={"250px"}
            height={"60px"}
            nameColor={"black"}
            value={empNM}
            size={"30px"}
            btn={true}
            onClickSelect={onClickSelect}
            onClickRemove={onClickRemove}
          />
          <S.InfoTitle>🔸투입일시</S.InfoTitle>
          <InputPaper
            width={"200px"}
            height={"60px"}
            nameColor={"black"}
            value={nowDateTime.nowDate}
            size={"30px"}
            btn={false}
          />
          <InputPaper
            width={"120px"}
            height={"60px"}
            nameColor={"black"}
            value={nowDateTime.nowTime}
            size={"30px"}
            btn={false}
          />
          <S.ButtonTime
            color={"#28a745"}
            hoverColor={"#218838"}
            onClick={onClickNowTime}
            width={"120px"}
          >
            현재시간
          </S.ButtonTime>
        </S.InfoBox> */}
        <S.GridBox>{GridHeader}</S.GridBox>
        <S.GridTitleBox>
          <div>✳️ 세부계량내역</div>
        </S.GridTitleBox>
        <S.GridBoxBottom>
          <GridModal
            data={gridDataInputDetail}
            columns={columnsInputDetail}
            columnOptions={columnOptions}
            header={header}
            rowHeaders={rowHeadersDetail}
            refGrid={refGridInputDetail}
            draggable={false}
          />
        </S.GridBoxBottom>
      </S.Content>
    </S.ModalWrapBox>
  );
}

export default ModalInput;
