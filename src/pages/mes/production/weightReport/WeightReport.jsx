import { useContext, useState, useEffect, useRef, useMemo } from "react";
import { LoginStateChk } from "custom/LoginStateChk";
import ButtonS from "components/button/ButtonSearch";
import GridSingle from "components/grid/GridSingle";
import NoticeSnack from "components/alert/NoticeSnack";
import BackDrop from "components/backdrop/BackDrop";
import WeightReportSet from "./WeightReportSet";
import TextField from "@mui/material/TextField";
import * as S from "./WeightReport.styled";
import * as Cbo from "custom/useCboSet";
import CN from "json/ColumnName.json";
import restURI from "json/restURI.json";
import { LayoutContext } from "components/layout/common/Layout";
import DateRange from "components/datetime/DateRange";
import DateTime from "components/datetime/DateTime";
import InputSearch from "components/input/InputSearch";
import restAPI from "api/restAPI";

function WeightReport() {
  LoginStateChk();
  const { isAllScreen, isMenuSlide } = useContext(LayoutContext);
  const [lineOpt, lineList] = Cbo.useLine();

  const weighID = useRef("");
  const refGridHeader = useRef(null);
  const refGridDetail = useRef(null);

  const [isBackDrop, setIsBackDrop] = useState(false);
  const [gridDataHeader, setGridDataHeader] = useState(null);
  const [gridDataDetail, setGridDataDetail] = useState(null);
  const [inputTextChange, setInputTextChange] = useState({});

  const [isSnackOpen, setIsSnackOpen] = useState({
    open: false,
  });
  const [comboValue, setComboValue] = useState({
    line_id: null,
  });
  const [dateText, setDateText] = useState({
    startDate: DateTime().dateFull,
    endDate: DateTime(7).dateFull,
  });

  const { columnsHeader, columnsDetail, columnOptions, rowHeadersNum, header } =
    WeightReportSet();

  useEffect(() => {
    //🔸좌측 메뉴 접고, 펴기, 팝업 오픈 ➡️ 그리드 사이즈 리셋
    refGridHeader?.current?.gridInst?.refreshLayout();
    refGridDetail?.current?.gridInst?.refreshLayout();
  }, [isMenuSlide]);

  const onClickSearch = async () => {
    try {
      setIsBackDrop(true);
      let lineID, prodCD, prodNM;

      comboValue.line_id
        ? (lineID = `&line_id=${comboValue.line_id}`)
        : (lineID = "");

      //InputTextBox 정보 변수 저장
      inputTextChange.prod_cd
        ? (prodCD = `&prod_cd=${inputTextChange.prod_cd}`)
        : (prodCD = "");
      inputTextChange.prod_nm
        ? (prodNM = `&prod_nm=${inputTextChange.prod_nm}`)
        : (prodNM = "");

      console.log(
        restURI.prdWeight +
          `?start_date=${dateText.startDate}&end_date=${dateText.endDate}` +
          lineID +
          prodCD +
          prodNM
      );
      //API 전송
      const result = await restAPI.get(
        restURI.prdWeight +
          `?start_date=${dateText.startDate}&end_date=${dateText.endDate}` +
          lineID +
          prodCD +
          prodNM
      );

      //Response된 Data를 HeaderGrid 출력
      setGridDataHeader(result?.data?.data?.rows);
      setGridDataDetail([]);

      //Search버튼 클릭시 DetailGrid에 Default로 출력하기 위한 HeaderGrid 변수 세팅
      const Header = refGridHeader?.current?.gridInst;
      //가장 첫번째 Row의 ID 변수 세팅
      weighID.current = Header.getValue(0, "work_weigh_id");
      //API 전송
      if (weighID.current !== null) {
        const resultDetail = await restAPI.get(
          restURI.prdWeightDetail + `?work_weigh_id=${weighID.current}`
        );
        //Response된 Data를 DetailGrid 출력
        setGridDataDetail(resultDetail?.data?.data?.rows);
      } else {
        //DetailGrid 초기화
        setGridDataDetail([]);
      }

      //조회성공시 우측하단 메세지 출력
      setIsSnackOpen({
        ...isSnackOpen,
        open: true,
        message: result?.data?.message,
        severity: "success",
        location: "bottomRight",
      });
    } catch (err) {
      //조회실패시 우측하단 메세지 출력
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

  const onClickGridHeader = async (e) => {
    if (e?.rowKey !== undefined) {
      const Header = refGridHeader?.current?.gridInst;
      if (weighID.current !== Header.getValue(e?.rowKey, "work_weigh_id")) {
        weighID.current = Header.getValue(e?.rowKey, "work_weigh_id");
        const result = await restAPI.get(
          restURI.prdWeightDetail + `?work_weigh_id=${weighID.current}`
        );

        setGridDataDetail(result?.data?.data?.rows);
      }
    }
  };

  const GridHeader = useMemo(() => {
    return (
      <GridSingle
        columnOptions={columnOptions}
        columns={columnsHeader}
        rowHeaders={rowHeadersNum}
        header={header}
        data={gridDataHeader}
        draggable={false}
        refGrid={refGridHeader}
        onClickGrid={onClickGridHeader}
      />
    );
  }, [gridDataHeader]);

  const handleInputTextChange = (e) => {
    setInputTextChange({ ...inputTextChange, [e.target.id]: e.target.value });
  };

  return (
    <S.ContentsArea isAllScreen={isAllScreen}>
      <S.ShadowBoxButtonHeader
        isMenuSlide={isMenuSlide}
        isAllScreen={isAllScreen}
      >
        <S.ComboWrap>
          <DateRange
            dateText={dateText}
            setDateText={setDateText}
            onClickSearch={onClickSearch}
          />
          <S.ComboBox
            disablePortal
            id="lineCbo"
            size="small"
            key={(option) => option?.line_id}
            options={lineOpt || null}
            getOptionLabel={(option) => option?.line_nm || ""}
            onChange={(_, newValue) => {
              setComboValue({
                ...comboValue,
                line_id:
                  newValue?.line_id === undefined ? null : newValue?.line_id,
              });
            }}
            renderInput={(params) => (
              <TextField {...params} label={CN.line_nm} size="small" />
            )}
          />
          <InputSearch
            id={"prod_cd"}
            name={"품목코드"}
            handleInputTextChange={handleInputTextChange}
            onClickSearch={onClickSearch}
          />
          <InputSearch
            id={"prod_nm"}
            name={"품목명"}
            handleInputTextChange={handleInputTextChange}
            onClickSearch={onClickSearch}
          />
        </S.ComboWrap>
        <S.ButtonWrap>
          <ButtonS onClickSearch={onClickSearch} />
        </S.ButtonWrap>
      </S.ShadowBoxButtonHeader>
      <S.GridHeaderWrap>{GridHeader}</S.GridHeaderWrap>
      <S.GridDetailWrap>
        <GridSingle
          columnOptions={columnOptions}
          columns={columnsDetail}
          rowHeaders={rowHeadersNum}
          header={header}
          data={gridDataDetail}
          draggable={false}
          refGrid={refGridDetail}
        />
      </S.GridDetailWrap>
      <NoticeSnack state={isSnackOpen} setState={setIsSnackOpen} />
      <BackDrop isBackDrop={isBackDrop} />
    </S.ContentsArea>
  );
}

export default WeightReport;
