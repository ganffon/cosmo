import { useContext, useState, useEffect, useRef } from "react";
import { LayoutContext } from "components/layout/common/Layout";
import GridSingle from "components/grid/GridSingle";
import NoticeSnack from "components/alert/NoticeSnack";

import BackDrop from "components/backdrop/BackDrop";
import InputSearch from "components/input/InputSearch";
import DowntimeReportSet from "./DowntimeReportSet";
import * as disRow from "custom/useDisableRowCheck";
import useInputSet from "custom/useInputSet";
import * as uSearch from "custom/useSearch";
import * as S from "pages/mes/style/oneGrid.styled";
import restURI from "json/restURI.json";
import ContentsArea from "components/layout/common/ContentsArea";
import BtnComponent from "components/button/BtnComponent";
import DateRange from "components/datetime/DateRange";
import DateTime from "components/datetime/DateTime";
import DownTimeInput from "./DownTimeInput";
import ModalSelect from "components/modal/ModalSelect";
import restAPI from "api/restAPI";

function DowntimeReport(props) {
  const { currentMenuName, isAllScreen, isMenuSlide } = useContext(LayoutContext);
  const refSingleGrid = useRef(null);
  const refSelect = useRef(null);
  const [isBackDrop, setIsBackDrop] = useState(false);
  const [gridData, setGridData] = useState(null);
  const [isSnackOpen, setIsSnackOpen] = useState({
    open: false,
  });
  const [isDowntimeOpen, setIsDowntimeOpen] = useState(false);
  const [downtimeInfo, setDowntimeInfo] = useState({});
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [dateText, setDateText] = useState({
    startDate: DateTime(-7).dateFull,
    endDate: DateTime().dateFull,
  });

  const { rowHeaders, header, columns, columnsDowntime, columnOptions, inputSet } = DowntimeReportSet(onDowntimeInput);

  useEffect(() => {
    //🔸좌측 메뉴 접고, 펴기, 팝업 오픈 ➡️ 그리드 사이즈 리셋
    refSingleGrid?.current?.gridInst?.refreshLayout();
  }, [isMenuSlide, refSingleGrid.current]);

  const [inputBoxID, inputTextChange, setInputTextChange] = useInputSet(currentMenuName, inputSet);

  const [disableRowToggle, setDisableRowToggle] = disRow.useDisableRowCheck(false, refSingleGrid);

  const [actSearch] = uSearch.useSearchDI(
    isBackDrop,
    setIsBackDrop,
    isSnackOpen,
    setIsSnackOpen,
    inputBoxID,
    inputTextChange,
    dateText,
    setGridData,
    disableRowToggle,
    setDisableRowToggle,
    restURI.sysDowntimeReport
  );

  function onDowntimeInput(e, rowKey) {
    const Grid = refSingleGrid.current?.gridInst;
    setDowntimeInfo({
      ...downtimeInfo,
      sysDowntimeID: Grid.getValue(rowKey, "sys_downtime_id"),
      lineName: Grid.getValue(rowKey, "line_nm"),
      procName: "충진",
      equipName: "충진기",
      startDate: Grid.getValue(rowKey, "start_date"),
      startTime: Grid.getValue(rowKey, "start_time"),
      endDate: Grid.getValue(rowKey, "end_date"),
      endTime: Grid.getValue(rowKey, "end_time"),
    });
    setIsDowntimeOpen(true);
  }

  const handleInputTextChange = (e) => {
    setInputTextChange({ ...inputTextChange, [e.target.id]: e.target.value });
  };
  const onClickSearch = () => {
    actSearch("start_date", "end_date");
  };

  const onEditingFinishGrid = (e) => {
    disRow.handleEditingFinishGridCheck(e);
  };
  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      actSearch("start_date", "end_date");
    }
  };
  const refSelectType = useRef(null);
  const [selectColumn, setSelectColumn] = useState([]);
  const [gdSelect, setGdSelect] = useState(null);
  const handleDowntimeData = async () => {
    try {
      setIsBackDrop(true);
      const result = await restAPI.get(restURI.downtime);

      setGdSelect(result?.data?.data?.rows);
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
  const onSelectDowntime = () => {
    refSelectType.current = "downtime";
    setSelectColumn(columnsDowntime);
    setIsSelectOpen(true);
    handleDowntimeData();
  };
  const onDblClickGridSelect = (e) => {
    if (e?.targetType === "cell") {
      const Grid = refSelect?.current?.gridInst;
      switch (refSelectType.current) {
        case "downtime":
          setDowntimeInfo({
            ...downtimeInfo,
            downtimeTypeID: Grid?.getValue(e?.rowKey, "downtime_type_id"),
            downtimeTypeName: Grid?.getValue(e?.rowKey, "downtime_type_nm"),
            downtimeID: Grid?.getValue(e?.rowKey, "downtime_id"),
            downtimeName: Grid?.getValue(e?.rowKey, "downtime_nm"),
          });
          break;
        default:
      }
      setIsSelectOpen(false);
    }
  };
  const onSave = async () => {
    if (downtimeInfo.downtimeTypeID !== undefined) {
      try {
        setIsBackDrop(true);
        const data = {
          sys_downtime_id: downtimeInfo.sysDowntimeID,
          downtime_id: downtimeInfo.downtimeID,
          remark: downtimeInfo.remark,
        };
        const result = await restAPI.post(restURI.downTimeInput, data);
        setDowntimeInfo({});
        setIsDowntimeOpen(false);
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
        onClickSearch();
      }
    } else {
      setIsSnackOpen({
        ...isSnackOpen,
        open: true,
        message: "비가동 유형과 항목을 입력하세요!",
        severity: "warning",
        location: "topCenter",
      });
      return;
    }
  };

  return (
    <ContentsArea>
      <S.ShadowBoxButton>
        <S.ToolWrap>
          <S.SearchWrap>
            <DateRange dateText={dateText} setDateText={setDateText} onClickSearch={onClickSearch} />
            {inputSet.map((v) => (
              <InputSearch
                key={v.id}
                id={v.id}
                name={v.name}
                handleInputTextChange={handleInputTextChange}
                onClickSearch={onClickSearch}
                onKeyDown={onKeyDown}
              />
            ))}
          </S.SearchWrap>
          <S.ButtonWrap>
            <BtnComponent btnName={"Search"} onClick={onClickSearch} />
          </S.ButtonWrap>
        </S.ToolWrap>
      </S.ShadowBoxButton>
      <S.ShadowBoxGrid isAllScreen={isAllScreen}>
        <S.GridWrapReport>
          <GridSingle
            columnOptions={columnOptions}
            columns={columns}
            rowHeaders={rowHeaders}
            header={header}
            data={gridData}
            draggable={false}
            refGrid={refSingleGrid}
            onEditingFinish={onEditingFinishGrid}
          />
        </S.GridWrapReport>
      </S.ShadowBoxGrid>
      {isDowntimeOpen ? (
        <DownTimeInput
          setDowntimeInfo={setDowntimeInfo}
          downtimeInfo={downtimeInfo}
          onClickModalClose={() => {
            setDowntimeInfo({});
            setIsDowntimeOpen(false);
          }}
          onSelectDowntime={onSelectDowntime}
          onSave={onSave}
        />
      ) : null}
      {isSelectOpen ? (
        <ModalSelect
          width={"50%"}
          title={"[ 비가동 유형/항목 선택 ]"}
          columns={selectColumn}
          columnsOptions={columnOptions}
          rowHeaders={rowHeaders}
          header={header}
          refSelectGrid={refSelect}
          gridDataSelect={gdSelect}
          onClickModalSelectClose={() => {
            refSelectType.current = "";
            setIsSelectOpen(false);
          }}
          onDblClickGridSelect={onDblClickGridSelect}
        />
      ) : null}
      <NoticeSnack state={isSnackOpen} setState={setIsSnackOpen} />
      <BackDrop isBackDrop={isBackDrop} />
    </ContentsArea>
  );
}

export default DowntimeReport;
