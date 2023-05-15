import {
  useContext,
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
} from "react";
import LoginStateChk from "custom/LoginStateChk";
import { LayoutContext } from "components/layout/common/Layout";
import DateTime from "components/datetime/DateTime";
import WeightPanelSet from "./WeightPanelSet";
import BtnSubdivisionScale from "components/button/panel/BtnSubdivisionScale";
import Button5 from "components/button/panel/BtnSubdivisionSL";
import InputPaper from "components/input/InputPaper";
import InputText from "components/input/InputText";
import GridSingle from "components/grid/GridSingle";
import ModalSelect from "components/modal/ModalSelect";
import NoticeSnack from "components/alert/NoticeSnack";
import BackDrop from "components/backdrop/BackDrop";
import restURI from "json/restURI.json";
import * as uSearch from "custom/useSearch";
import * as S from "./WeightPanel.styled";
import restAPI from "api/restAPI";
import AlertDelete from "components/onlySearchSingleGrid/modal/AlertDelete";
import DateRange from "components/datetime/DateRange";
import InputSearch from "components/input/InputSearch";
import BtnWeight from "components/button/panel/BtnWeight";
import ModalWeight from "./ModalWeight";

function WeightPanel() {
  LoginStateChk();
  const { currentMenuName, isAllScreen, isMenuSlide } =
    useContext(LayoutContext);
  const [dateText, setDateText] = useState({
    startDate: DateTime().dateFull,
    endDate: DateTime(7).dateFull,
  });
  const [isModalSelectOpen, setIsModalSelectOpen] = useState(false);
  const [isModalWeightOpen, setIsModalWeightOpen] = useState(false);
  const [isBackDrop, setIsBackDrop] = useState(false);
  const [isSnackOpen, setIsSnackOpen] = useState({
    open: false,
  });

  const { columnOptions, rowHeadersNum, header, columns, columnsDetail } =
    WeightPanelSet();

  const refGridHeader = useRef(null);
  const refGridDetail = useRef(null);

  const [gridDataHeader, setGridDataHeader] = useState(null);
  const [gridDataDetail, setGridDataDetail] = useState(null);

  const [require, setRequire] = useState({
    lineID: "",
    workOrderID: "",
  });
  const [modalSelectSize, setModalSelectSize] = useState({
    width: "80%",
    height: "90%",
  });
  const [dblClickGrid, setDblClickGrid] = useState(""); //🔸DblClick을 호출한 Grid가 어떤것인지? : "Header" or "Detail"

  useEffect(() => {
    //🔸좌측 메뉴 접고, 펴기, 팝업 오픈 ➡️ 그리드 사이즈 리셋
    refGridHeader?.current?.gridInst?.refreshLayout();
    refGridDetail?.current?.gridInst?.refreshLayout();
  }, [isMenuSlide]);
  useEffect(() => {
    onClickSearch();
  }, []);
  const onClickNext = () => {
    setIsModalWeightOpen(true);
  };
  const onClickSearch = async () => {
    if (isBackDrop === false) {
      try {
        setIsBackDrop(true);
        const result = await restAPI.get(
          restURI.prdOrder +
            `?start_date=${dateText.startDate}&end_date=${dateText.endDate}`
        );
        setGridDataHeader(result?.data?.data?.rows);

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
    }
  };
  const onClickModalClose = () => {
    setIsModalWeightOpen(false);
  };
  const onClickGridHeader = async (e) => {
    if (e?.rowKey !== undefined) {
      if (isBackDrop === false) {
        try {
          setIsBackDrop(true);
          const Header = refGridHeader?.current?.gridInst;
          const workOrderID = Header.getValue(e?.rowKey, "work_order_id");
          const result = await restAPI.get(
            restURI.prdOrderInput + `?work_order_id=${workOrderID}`
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
      }
    }
  };

  const [inputTextChange, setInputTextChange] = useState({});
  const handleInputTextChange = (e) => {
    setInputTextChange({ ...inputTextChange, [e.target.id]: e.target.value });
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      // setSearchToggle(!searchToggle);
    }
  };

  return (
    <S.ContentsArea isAllScreen={isAllScreen}>
      <S.ScreenTitleBox>❇️ 작업지시 List</S.ScreenTitleBox>
      <S.SearchBox>
        <S.SearchCondition>
          <DateRange dateText={dateText} setDateText={setDateText} />
          <InputSearch
            id={"line"}
            name={"라인명"}
            handleInputTextChange={handleInputTextChange}
            onClickSearch={onClickSearch}
          />
          <InputSearch
            id={"prod_cd"}
            name={"품번"}
            handleInputTextChange={handleInputTextChange}
            onClickSearch={onClickSearch}
          />
          <InputSearch
            id={"prod_nm"}
            name={"품목"}
            handleInputTextChange={handleInputTextChange}
            onClickSearch={onClickSearch}
          />
        </S.SearchCondition>
        <S.SearchButton>
          <BtnWeight onClickNext={onClickNext} onClickSearch={onClickSearch} />
        </S.SearchButton>
      </S.SearchBox>
      <S.GridHeader>
        <GridSingle
          columns={columns}
          columnOptions={columnOptions}
          rowHeaders={rowHeadersNum}
          data={gridDataHeader}
          refGrid={refGridHeader}
          onClickGrid={onClickGridHeader}
        />
      </S.GridHeader>
      <S.ScreenTitleBox>❇️ 투입품</S.ScreenTitleBox>
      <S.GridDetail>
        <GridSingle
          columns={columnsDetail}
          columnOptions={columnOptions}
          rowHeaders={rowHeadersNum}
          data={gridDataDetail}
          refGrid={refGridDetail}
        />
      </S.GridDetail>
      {isModalWeightOpen ? (
        <ModalWeight
          onClickModalClose={onClickModalClose}
          // columnsModalHeader={columnsSelectLoadHeader}
          // columnsModalDetail={columnsSelectLoadDetail}
          columnOptions={columnOptions}
          header={header}
          // setGridDataHeader={setGridDataSelect}
          // gridDataHeader={gridDataSelect}
          // gridDataDetail={gridDataSelectDetail}
          rowHeadersHeader={rowHeadersNum}
          rowHeadersDetail={rowHeadersNum}
          // refGridModalHeader={refGridSelect}
          // refGridModalDetail={refGridSelectDetail}
          // onClickGridModalHeader={onClickGridSelect}
          // onDblClickGridModalHeader={onDblClickGridSelect}
          // onClickPick={onClickPick}
          require={require}
        />
      ) : null}
      <NoticeSnack state={isSnackOpen} setState={setIsSnackOpen} />
      <BackDrop isBackDrop={isBackDrop} />
    </S.ContentsArea>
  );
}

export default WeightPanel;
