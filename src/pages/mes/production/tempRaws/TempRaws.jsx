import React, { useContext, useState, useEffect, useRef, useMemo } from "react";
import { LayoutContext } from "components/layout/common/Layout";
import * as S from "../../managementInfo/manage.styled";
import Chart from "react-apexcharts";
import { LoginStateChk } from "custom/LoginStateChk";
import DateTime from "components/datetime/DateTime";
import GridSingle from "components/grid/GridSingle";
import restAPI from "api/restAPI";
import restURI from "json/restURI.json";
import ButtonSearch from "components/button/ButtonSearch";
import TempRawsSet from "./TempRawsSet";
import ContentsArea from "components/layout/common/ContentsArea";
import BtnComponent from "components/button/BtnComponent";
import BackDrop from "components/backdrop/BackDrop";

const TempRaws = () => {
  LoginStateChk();
  const { currentMenuName, isAllScreen, isMenuSlide } = useContext(LayoutContext);
  const [dateText, setDateText] = useState({
    startDate: DateTime().dateFull,
    endDate: DateTime().dateFull,
  });
  const [isSnackOpen, setIsSnackOpen] = useState({
    open: false,
  });
  const weighID = useRef("");
  const refGridHeader = useRef(null);
  const refGridDetail = useRef(null);
  const [isBackDrop, setIsBackDrop] = useState(false);
  const [gridDataHeader, setGridDataHeader] = useState(null);
  const [gridDataDetail, setGridDataDetail] = useState(null);
  const [inputTextChange, setInputTextChange] = useState({});
  const [responseData, setResponseData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleSearchButtonClick = () => {
    // setSearchButtonClicked();
    GetMonthlyLineCapaData();
  };
  const GetMonthlyLineCapaData = () => {
    setIsBackDrop(true);
    restAPI
      .get(restURI.tempRaws, {
        params: {
          reg_date: dateText.startDate,
        },
      })
      .then((response) => {
        // API 응답 데이터 처리 로직
        setResponseData(response.data);
        setGridDataDetail(response?.data?.data?.rows);
      })
      .catch((error) => {
        // 오류 처리 로직
        // console.error('API 호출 중 오류 발생:', error);
      })
      .finally(() => {
        setIsBackDrop(false);
      });
  };
  useEffect(() => {
    GetMonthlyLineCapaData();
  }, []);

  const { columnsHeader, columnsDetail, columnOptions, rowHeadersNum, header } = TempRawsSet();
  useEffect(() => {
    //🔸좌측 메뉴 접고, 펴기, 팝업 오픈 ➡️ 그리드 사이즈 리셋
    refGridHeader?.current?.gridInst?.refreshLayout();
    refGridDetail?.current?.gridInst?.refreshLayout();
  }, [isMenuSlide]);

  const handleInputTextChange = (e) => {
    setInputTextChange({ ...inputTextChange, [e.target.id]: e.target.value });
  };

  return (
    <ContentsArea>
      <S.ShadowBoxButton isMenuSlide={isMenuSlide} isAllScreen={isAllScreen}>
        <S.ToolWrap>
          <S.SearchWrap>
            <S.Date datePickerSet={"single"} dateText={dateText.startDate} setDateText={setDateText} />
          </S.SearchWrap>
          <S.ButtonWrap>
            <BtnComponent btnName={"Search"} onClick={handleSearchButtonClick} />
          </S.ButtonWrap>
        </S.ToolWrap>
      </S.ShadowBoxButton>
      <S.ShadowBoxGrid isAllScreen={isAllScreen}>
        <S.GridWrap>
          {responseData && (
            <GridSingle
              columnOptions={columnOptions}
              columns={columnsDetail}
              rowHeaders={rowHeadersNum}
              header={columnsHeader}
              data={gridDataDetail}
              refGrid={refGridDetail}
            />
          )}
        </S.GridWrap>
      </S.ShadowBoxGrid>
      <BackDrop isBackDrop={isBackDrop} />
    </ContentsArea>
  );
};

export default TempRaws;
