import React, { useContext, useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import GridModal from "components/grid/GridModal";
import { LayoutContext } from "components/layout/common/Layout";
import * as S from "./ModalInput.styled";
import InputPaper from "components/input/InputPaper";
import restAPI from "api/restAPI";
import restURI from "json/restURI.json";
import DateTime from "components/datetime/DateTime";
import InputText from "components/input/InputText";

function ModalInput(props) {
  const {
    width = "95%",
    height = "95%",
    onClickModalClose = () => {},
    onClickSelect = () => {},
    onClickRemove = () => {},
    onClickInputSave = () => {},
    onEditingFinishInput = () => {},
    onClickNowTime = () => {},
    refGridInput = null,
    columnsInput = [],
    columnOptions = [],
    header = [],
    rowHeadersDetail = [],
    gridDataInput = [],
    nowDateTime = {},
    lineNM = "",
    empNM = "",
  } = props;
  const { currentMenuName } = useContext(LayoutContext);

  const handleBarcodeEnter = async (e) => {
    if (e.key === "Enter") {
      // let uri;
      // try {
      //   if (inputChange === undefined) {
      //     uri = restURI.subdivision + `?complete_fg=INCOMPLETE`;
      //   } else {
      //     if (inputChange.length === 0) {
      //       uri = restURI.subdivision + `?complete_fg=INCOMPLETE`;
      //     } else {
      //       uri =
      //         restURI.subdivision +
      //         `?complete_fg=INCOMPLETE&prod_cd=${inputChange}`;
      //     }
      //   }
      //   const result = await restAPI.get(uri);
      //   setGridDataHeader(result?.data?.data?.rows);
      // } catch (err) {
      //   alert(err);
      // }
    }
  };
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
          <S.ButtonSet
            color={"#28a745"}
            hoverColor={"#218838"}
            onClick={onClickInputSave}
            width={"150px"}
          >
            Save
          </S.ButtonSet>
        </S.GridTitleBox>
        <S.InfoBox>
          <S.InfoTitle>라인</S.InfoTitle>
          <InputPaper
            width={"150px"}
            height={"60px"}
            nameColor={"black"}
            value={lineNM}
            size={"30px"}
            btn={false}
          />
          <S.InfoTitle>투입자</S.InfoTitle>
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
          <S.InfoTitle>투입일시</S.InfoTitle>
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
        </S.InfoBox>
        <S.GridBox>
          <GridModal
            data={gridDataInput}
            columns={columnsInput}
            columnOptions={columnOptions}
            header={header}
            rowHeaders={rowHeadersDetail}
            refGrid={refGridInput}
            draggable={false}
            onEditingFinish={onEditingFinishInput}
          />
        </S.GridBox>
      </S.Content>
    </S.ModalWrapBox>
  );
}

export default ModalInput;
