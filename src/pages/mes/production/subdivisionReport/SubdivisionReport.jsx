import { useContext, useState, useEffect, useRef, useMemo } from "react";
import { LoginStateChk } from "custom/LoginStateChk";
import { LayoutContext } from "components/layout/common/Layout";
import DateTime from "components/datetime/DateTime";
import SubdivisionSet from "./SubdivisionReportSet";
import useInputSet from "custom/useInputSet";
import ButtonS from "components/button/ButtonSearch";
import InputSearch from "components/input/InputSearch";
import GridSingle from "components/grid/GridSingle";
import NoticeSnack from "components/alert/NoticeSnack";
import BackDrop from "components/backdrop/BackDrop";
import restURI from "json/restURI.json";
import * as S from "./SubdivisionReport.styled";
import InputPaper from "components/input/InputPaper";
import ContentsArea from "components/layout/common/ContentsArea";
import restAPI from "api/restAPI";
import BtnComponent from "components/button/BtnComponent";

function SubdivisionReport() {
  LoginStateChk();
  const { currentMenuName, isAllScreen, isMenuSlide } =
    useContext(LayoutContext);
  const [isBackDrop, setIsBackDrop] = useState(false);
  const [isSnackOpen, setIsSnackOpen] = useState({
    open: false,
  });
  const [inputInfoValue, setInputInfoValue] = useState([]);

  const {
    columnOptions,
    rowHeadersNumCheck,
    header,
    columnsHeader,
    columnsDetail,
    inputSet,
    inputInfo,
  } = SubdivisionSet();

  const refGridHeader = useRef(null);
  const refGridDetail = useRef(null);

  const [gridDataHeader, setGridDataHeader] = useState(null);
  const [gridDataDetail, setGridDataDetail] = useState(null);
  const [dateText, setDateText] = useState({
    startDate: DateTime(-7).dateFull,
    endDate: DateTime().dateFull,
  });

  const [inputBoxID, inputTextChange, setInputTextChange] = useInputSet(
    currentMenuName,
    inputSet
  );

  useEffect(() => {
    //🔸좌측 메뉴 접고, 펴기, 팝업 오픈 ➡️ 그리드 사이즈 리셋
    refGridHeader?.current?.gridInst?.refreshLayout();
    refGridDetail?.current?.gridInst?.refreshLayout();
  }, [isMenuSlide, refGridHeader.current, refGridDetail.current]);

  const handleInputTextChange = (e) => {
    setInputTextChange({ ...inputTextChange, [e.target.id]: e.target.value });
  };

  useEffect(() => {
    onClickSearch();
  }, []);

  const onClickSearch = () => {
    searchHeaderGrid();
  };

  const searchHeaderGrid = async () => {
    try {
      let prodCD, prodNM, lotNo;
      if (inputTextChange !== undefined) {
        inputTextChange.prod_cd
          ? (prodCD = `&prod_cd=${inputTextChange.prod_cd}`)
          : (prodCD = "");
        inputTextChange.prod_nm
          ? (prodNM = `&prod_nm=${inputTextChange.prod_nm}`)
          : (prodNM = "");
        inputTextChange.lot_no
          ? (lotNo = `&lot_no=${inputTextChange.lot_no}`)
          : (lotNo = "");
      } else {
        prodCD = "";
        prodNM = "";
        lotNo = "";
      }
      setIsBackDrop(true);
      const result = await restAPI.get(
        restURI.subdivision +
          `?start_date=${dateText.startDate}&end_date=${dateText.endDate}` +
          prodCD +
          prodNM +
          lotNo
      );

      setGridDataHeader(result?.data?.data?.rows);
      setGridDataDetail([]);
      setInputInfoValue([]);

      setIsSnackOpen({
        ...isSnackOpen,
        open: true,
        message: result?.data?.message,
        severity: "success",
        location: "bottomRight",
      });
    } catch (err) {
      setIsSnackOpen({
        ...isSnackOpen,
        open: true,
        message: err?.response?.data?.message,
        severity: "error",
        location: "bottomRight",
      });
    } finally {
      setIsBackDrop(false);
    }
  };

  const searchDetailGrid = async (rowID) => {
    setInputInfoValue([]);
    try {
      setIsBackDrop(true);
      const result = await restAPI.get(
        restURI.subdivisionDetail + `?work_subdivision_id=${rowID}`
      );

      setGridDataDetail(result?.data?.data?.rows);
    } catch (err) {
      setIsSnackOpen({
        ...isSnackOpen,
        open: true,
        message: err?.response?.data?.message,
        severity: "error",
        location: "bottomRight",
      });
    } finally {
      setIsBackDrop(false);
    }
  };

  const onClickGridHeader = (e) => {
    const inputInfoValueList = [
      "subdivision_date",
      "prod_cd",
      "prod_nm",
      "lot_no",
      "total_qty",
      "remark",
    ];

    const rowID = e?.instance.getValue(e?.rowKey, "work_subdivision_id");

    if (rowID !== null) {
      setInputInfoValue([]);
      searchDetailGrid(rowID);
      for (let i = 0; i < inputInfoValueList.length; i++) {
        let data = e?.instance.getValue(e?.rowKey, inputInfoValueList[i]);
        if (data === false) {
          //🔸false 인 경우 데이터 안찍혀서 강제로 찍음
          data = "false";
        }
        setInputInfoValue((prevList) => {
          return [...prevList, data];
        });
      }
    }
  };

  const GridHeader = useMemo(() => {
    return (
      <GridSingle
        columnOptions={columnOptions}
        columns={columnsHeader}
        rowHeaders={rowHeadersNumCheck}
        header={header}
        data={gridDataHeader}
        draggable={false}
        refGrid={refGridHeader}
        onClickGrid={onClickGridHeader}
      />
    );
  }, [gridDataHeader]);

  return (
    <ContentsArea flexColumn={false}>
      <S.ContentsLeft>
        <S.ContentsLeftTop>
          <S.SearchLeftWrap>
            <S.SearchWrap>
              <S.Date
                datePickerSet={"range"}
                dateText={dateText}
                setDateText={setDateText}
              />
            </S.SearchWrap>
            <S.SearchWrap>
              {inputSet.map((v, idx) => (
                <InputSearch
                  key={v.id}
                  id={v.id}
                  name={v.name}
                  handleInputTextChange={handleInputTextChange}
                  onClickSearch={onClickSearch}
                />
              ))}
              <S.ContentsHeaderWrap>
                <BtnComponent btnName={"Search"} onClick={onClickSearch} />
              </S.ContentsHeaderWrap>
            </S.SearchWrap>
          </S.SearchLeftWrap>
        </S.ContentsLeftTop>
        <S.ContentsLeftbottom>
          <S.ContentsHeader>
            <S.TitleMid>소분일지</S.TitleMid>
          </S.ContentsHeader>

          <S.GridHeaderWrap>{GridHeader}</S.GridHeaderWrap>
        </S.ContentsLeftbottom>
      </S.ContentsLeft>
      <S.ContentsRight>
        <S.ContentsRightTop>
          <S.SearchInfoWrap>
            <S.SearchRightTopWrap>
              {inputInfo.map((v, idx) => {
                return (
                  <InputPaper
                    key={v.id}
                    name={v.name}
                    value={inputInfoValue[idx] || ""}
                  />
                );
              })}
            </S.SearchRightTopWrap>
          </S.SearchInfoWrap>
        </S.ContentsRightTop>
        <S.ContentsRightBottom>
          <S.SearchRightWrap>
            <S.TitleMid>세부소분일지</S.TitleMid>
          </S.SearchRightWrap>
          <S.GridDetailWrap isAllScreen={isAllScreen}>
            <GridSingle
              columnOptions={columnOptions}
              columns={columnsDetail}
              rowHeaders={rowHeadersNumCheck}
              header={header}
              data={gridDataDetail}
              draggable={false}
              refGrid={refGridDetail}
            />
          </S.GridDetailWrap>
        </S.ContentsRightBottom>
      </S.ContentsRight>
      <NoticeSnack state={isSnackOpen} setState={setIsSnackOpen} />
      <BackDrop isBackDrop={isBackDrop} />
    </ContentsArea>
  );
}

export default SubdivisionReport;
