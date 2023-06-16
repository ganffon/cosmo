import React, { useContext, useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import GridModal from "components/grid/GridModal";
import { LayoutContext } from "components/layout/common/Layout";
import * as S from "./ModalWeight.styled";
import InputPaper from "components/input/InputPaper";
import restAPI from "api/restAPI";
import restURI from "json/restURI.json";
import DateTime from "components/datetime/DateTime";
import InputText from "components/input/InputText";
import BtnComponent from "components/button/BtnComponent";

function ModalWeight(props) {
  const {
    width = "95%",
    height = "95%",
    onClickModalClose = () => {},
    onClickSelect = () => {},
    onClickRemove = () => {},
    onClickWeightSave = () => {},
    onEditingFinishWeight = () => {},
    refGridWeight = null,
    columnsWeight = [],
    columnOptions = [],
    header = [],
    rowHeadersDetail = [],
    gridDataWeight = [],
    selectInputInfo = {},
    // lineNM = "",
    // empNM = "",
  } = props;
  const { currentMenuName } = useContext(LayoutContext);
  const [inputChange, setInputChange] = useState();

  const handleInputChange = (e) => {
    setInputChange(e.target.value);
  };
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
        <S.TitleBox>${currentMenuName}</S.TitleBox>
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
          <S.TitleWrap>일일계량일지</S.TitleWrap>
          <BtnComponent
            width={"150px"}
            height={"40px"}
            btnName={"Save"}
            onClick={onClickWeightSave}
          />
        </S.GridTitleBox>
        <S.InfoBox>
          <S.InfoTitle>라인</S.InfoTitle>
          <InputPaper
            width={"150px"}
            height={"60px"}
            nameColor={"black"}
            value={selectInputInfo.lineNM}
            size={"30px"}
            btn={false}
          />
          <S.InfoTitle>계량일자</S.InfoTitle>
          <InputPaper
            width={"200px"}
            height={"60px"}
            nameColor={"black"}
            value={DateTime().dateFull}
            size={"30px"}
            btn={false}
          />
          <S.InfoTitle>계량자</S.InfoTitle>
          <InputPaper
            width={"250px"}
            height={"60px"}
            nameColor={"black"}
            value={selectInputInfo.empNM}
            size={"30px"}
            btn={true}
            onClickSelect={onClickSelect}
            onClickRemove={onClickRemove}
          />
          <S.InfoTitle>바코드</S.InfoTitle>
          <InputPaper
            id={"barcode"}
            width={"640px"}
            height={"60px"}
            nameColor={"black"}
            value={inputChange}
            size={"25px"}
            btn={false}
            handleEnter={handleBarcodeEnter}
            onChange={handleInputChange}
          />
        </S.InfoBox>
        <S.GridBox>
          <GridModal
            data={gridDataWeight}
            columns={columnsWeight}
            columnOptions={columnOptions}
            header={header}
            rowHeaders={rowHeadersDetail}
            refGrid={refGridWeight}
            draggable={false}
            onEditingFinish={onEditingFinishWeight}
          />
        </S.GridBox>
      </S.Content>
    </S.ModalWrapBox>
  );
}

export default ModalWeight;
