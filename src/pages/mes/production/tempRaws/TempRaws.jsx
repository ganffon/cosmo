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
import TempRawsModal from './TempRawsModal';

const TempRaws = () => {
  LoginStateChk();
  const { currentMenuName, isAllScreen, isMenuSlide } =
    useContext(LayoutContext);
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
    restAPI
      .get(restURI.tempRaws, {
        params: { 
          reg_date: dateText.startDate
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


  const onClickGridHeader = async (e) => {
    if (e?.rowKey !== undefined) {
      const Header = refGridHeader?.current?.gridInst;
      if (weighID.current !== Header.getValue(e?.rowKey, "work_weigh_id")) {
        weighID.current = Header.getValue(e?.rowKey, "work_weigh_id");
        const result = await restAPI.get(restURI.prdWeightDetail + `?work_weigh_id=${weighID.current}`);

        setGridDataDetail(result?.data?.data?.rows);
      }
    }
  };

  const handleInputTextChange = (e) => {
    setInputTextChange({ ...inputTextChange, [e.target.id]: e.target.value });
  };
  
  return (
    <S.ContentsArea>
      <S.SearchCondition>
        <S.ContentsHeader>
        <S.ContentsHeaderWrap>
          <S.Date
            datePickerSet={"single"}
            dateText={dateText.startDate}
            setDateText={setDateText}
          />  
        </S.ContentsHeaderWrap>
        <button onClick={openModal}>모달 열기</button>{isModalOpen && <TempRawsModal columnsDetail={columnsDetail.slice(1)} data={gridDataDetail} onClose={closeModal} />}
        <ButtonSearch onClickSearch={handleSearchButtonClick} />
        </S.ContentsHeader>
      </S.SearchCondition>
      
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
    </S.ContentsArea>
  );
};

export default TempRaws;
