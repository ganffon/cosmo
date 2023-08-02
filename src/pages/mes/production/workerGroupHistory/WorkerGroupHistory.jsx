import { LayoutContext } from "components/layout/common/Layout";
import { LoginStateChk } from "custom/LoginStateChk";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import * as S from "./WorkerGroupHistory.styled";
import DateTime from "components/datetime/DateTime";
import InputPaper from "components/input/InputPaper";
import WorkerGroupHistorySet from "./WorkerGroupHistorySet";
import CloseIcon from "@mui/icons-material/Close";
import restURI from "json/restURI.json";
import restAPI from "api/restAPI";
import GridSingle from "components/grid/GridSingle";
import NoticeSnack from "components/alert/NoticeSnack";
import * as Cbo from "custom/useCboSet";
import CN from "json/ColumnName.json";
import useInputSet from "custom/useInputSet";
import * as uSearch from "custom/useSearch";
import ModalSelect from "components/modal/ModalSelect";
import ModalWrap from "components/modal/ModalWrap";
import GridModal from "components/grid/GridModal";
import ContentsArea from "components/layout/common/ContentsArea";
import BtnComponent from "components/button/BtnComponent";
import BackDrop from "components/backdrop/BackDrop";
import { TextField } from "@mui/material";

function WorkerGroupHistory() {
  LoginStateChk();
  const { currentMenuName, isAllScreen, isMenuSlide } = useContext(LayoutContext);
  const [comboValue, setComboValue] = useState({
    line_id: null,
  });
  const refGridHeader = useRef(null);
  const refGridDetail = useRef(null);
  const [gridDataDetail, setGridDataDetail] = useState(null);
  const [isBackDrop, setIsBackDrop] = useState(false);

  const [dateText, setDateText] = useState({
    startDate: DateTime().year + "-" + DateTime().month,
  });
  const [isSnackOpen, setIsSnackOpen] = useState({
    open: false,
  });

  const [dblClickGrid, setDblClickGrid] = useState(""); //🔸DblClick을 호출한 Grid가 어떤것인지? : "Header" or "Detail"

  useEffect(() => {
    //🔸좌측 메뉴 접고, 펴기, 팝업 오픈 ➡️ 그리드 사이즈 리셋
    if (refGridHeader?.current !== null) {
      refGridHeader?.current?.gridInst?.refreshLayout();
    }
    if (refGridDetail?.current !== null) {
      refGridDetail?.current?.gridInst?.refreshLayout();
    }
  }, [isMenuSlide]);

  const {
    columnOptions,
    rowHeadersNumCheck,
    rowHeadersNum,
    header,
    columnsHeader,
    columnsDetail,
    columnsModalHeader,
    columnsModalDetail,
    inputSet,
    columnsSelectProd,
  } = WorkerGroupHistorySet();

  const onClickSearch = () => {
    actSearchDetail();
  };
  const datePickerChange = (e) => {
    setDateText({ ...dateText, [e.target.id]: e.target.value });
  };

  const actSearchDetail = async () => {
    try {
      setIsBackDrop(true);

      let readURI = restURI.workerGroupHistory + `?reg_date=${dateText.startDate}`;

      let gridData = await restAPI.get(readURI);
      setGridDataDetail(gridData?.data?.data?.rows);
    } catch {
      setIsSnackOpen({
        ...isSnackOpen,
        open: true,
        message: "조회 실패",
        severity: "error",
      });
    } finally {
      setIsBackDrop(false);
    }
  };

  return (
    <ContentsArea isAllScreen={isAllScreen}>
      <S.SearchCondition>
        <S.InputText
          id="startDate"
          type="month"
          format="yyyy-MM"
          defaultValue={dateText.startDate}
          InputProps={{ sx: { height: 40 } }}
          onChange={datePickerChange}
          height="40px"
          label="날짜"
        />
        <S.ButtonTop>
          <BtnComponent btnName={"Search"} onClick={onClickSearch} />
        </S.ButtonTop>
      </S.SearchCondition>
      <S.ContentWrap>
        <GridSingle
          columnOptions={columnOptions}
          columns={columnsDetail}
          rowHeaders={rowHeadersNum}
          header={header}
          data={gridDataDetail}
          draggable={false}
          refGrid={refGridDetail}
        />
      </S.ContentWrap>
      <NoticeSnack state={isSnackOpen} setState={setIsSnackOpen} />
      <BackDrop isBackDrop={isBackDrop} />
    </ContentsArea>
  );
}

export default WorkerGroupHistory;
