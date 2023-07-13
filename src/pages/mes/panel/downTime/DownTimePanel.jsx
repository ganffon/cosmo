import { useContext, useState, useEffect, useRef, useMemo } from "react";
import { LoginStateChk } from "custom/LoginStateChk";
import { LayoutContext } from "components/layout/common/Layout";
import DateTime from "components/datetime/DateTime";
import DownTimePanelSet from "./DownTimePanelSet";
import GridPanel from "components/grid/GridPanel";
import ModalSelect from "components/modal/ModalSelect";
import NoticeSnack from "components/alert/NoticeSnack";
import BackDrop from "components/backdrop/BackDrop";
import restURI from "json/restURI.json";
import * as uSearch from "custom/useSearch";
import * as S from "./DownTimePanel.styled";
import * as RE from "custom/RegularExpression";
import restAPI from "api/restAPI";
import DateRange from "components/datetime/DateRange";
import InputSearch from "components/input/InputSearch";
import BtnWeight from "components/button/panel/BtnWeight";
import Condition from "custom/Condition";
import AlertDelete from "components/onlySearchSingleGrid/modal/AlertDelete";
import DownTimeInput from "./DownTimeInput";
import ContentsArea from "components/layout/common/ContentsArea";
import BtnPanel from "components/button/BtnPanel";
import NoticeAlertModal from "components/alert/NoticeAlertModal";
function DownTimePanel() {
  LoginStateChk();
  const { isAllScreen, isMenuSlide } = useContext(LayoutContext);
  const [downtimeDate, setDowntimeDate] = useState({});
  const [nowDateTime, setNowDateTime] = useState({
    nowDate: DateTime().dateFull,
    nowTime: DateTime().hour + ":" + DateTime().minute,
  });

  const [isBackDrop, setIsBackDrop] = useState(false);
  const [isSnackOpen, setIsSnackOpen] = useState({
    open: false,
  });

  const [isWarning, setIsWarning] = useState({
    open: false,
    title: "",
    message: "",
  });

  const handleWarning = () => {
    setIsWarning({
      ...isWarning,
      open: false,
    });
  };

  const Setting = DownTimePanelSet(onDowntimeEnd);

  const refGridMain = useRef(null);
  const refSelect = useRef(null);

  const [gdMain, setGdMain] = useState(null);
  const [gdSelect, setGdSelect] = useState(null);

  const [lineData, setLineData] = useState();

  const [isDowntimeOpen, setIsDowntimeOpen] = useState(false);
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  const [downtimeInfo, setDowntimeInfo] = useState({});

  useEffect(() => {
    //🔸좌측 메뉴 접고, 펴기, 팝업 오픈 ➡️ 그리드 사이즈 리셋
    refGridMain?.current?.gridInst?.refreshLayout();
  }, [isMenuSlide]);

  useEffect(() => {
    setDowntimeInfo({
      ...downtimeInfo,
      startDate: DateTime().dateFull,
      endDate: DateTime().dateFull,
    });
    handleLine();
    handleSearch();
    const interval = setInterval(() => {
      handleSearch();
    }, 30000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleLine = async () => {
    try {
      setIsBackDrop(true);
      const result = await restAPI.get(restURI.line);

      setLineData(result?.data?.data?.rows);
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
  const SearchDate = () => {
    const currentDate = new Date();

    // 1년 전 날짜 계산
    const oneYearAgo = new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), currentDate.getDate());
    const formattedOneYearAgo = formatDate(oneYearAgo);

    // 1년 후 날짜 계산
    const oneYearLater = new Date(currentDate.getFullYear() + 1, currentDate.getMonth(), currentDate.getDate());
    const formattedOneYearLater = formatDate(oneYearLater);

    // 날짜를 yyyy-MM-dd 형식으로 포맷하는 함수
    function formatDate(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    }
    return [formattedOneYearAgo, formattedOneYearLater];
  };

  const handleSearch = async () => {
    try {
      const result = await restAPI.get(
        restURI.productionDownTime + `?start_date=${SearchDate()[0]}&end_date=${SearchDate()[1]}&complete_fg=INCOMPLETE`
      );

      setGdMain(result?.data?.data?.rows);
    } catch (err) {
      setIsSnackOpen({
        ...isSnackOpen,
        open: true,
        message: err?.response?.data?.message,
        severity: "error",
        location: "bottomRight",
      });
    } finally {
    }
  };

  function onDowntimeEnd(e, rowKey) {
    const Grid = refGridMain?.current?.gridInst;
    setDowntimeInfo({
      ...downtimeInfo,
      workDowntimeID: Grid?.getValue(rowKey, "work_downtime_id"),
      lineID: Grid?.getValue(rowKey, "line_id"),
      lineName: Grid?.getValue(rowKey, "line_nm"),
      procID: Grid?.getValue(rowKey, "proc_id"),
      procName: Grid?.getValue(rowKey, "proc_nm"),
      equipID: Grid?.getValue(rowKey, "equip_id"),
      equipName: Grid?.getValue(rowKey, "equip_nm"),
      downtimeTypeID: Grid?.getValue(rowKey, "downtime_type_id"),
      downtimeTypeName: Grid?.getValue(rowKey, "downtime_type_nm"),
      downtimeID: Grid?.getValue(rowKey, "downtime_id"),
      downtimeName: Grid?.getValue(rowKey, "downtime_nm"),
      startDate: Grid?.getValue(rowKey, "start_date"),
      startTime: Grid?.getValue(rowKey, "start_time"),
      remark: Grid?.getValue(rowKey, "remark"),
      endDate: DateTime().dateFull,
    });
    setIsDowntimeOpen(true);
  }

  const onSelectLine = (id, name) => {
    setDowntimeInfo({
      ...downtimeInfo,
      lineID: id,
      lineName: name,
      startDate: DateTime().dateFull,
      endDate: DateTime().dateFull,
    });
    setIsDowntimeOpen(true);
  };
  const handleEquipData = async () => {
    try {
      setIsBackDrop(true);
      const result = await restAPI.get(restURI.equipment);

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

  const refSelectType = useRef(null);
  const [selectColumn, setSelectColumn] = useState([]);

  const onSelectEquip = () => {
    refSelectType.current = "equip";
    setSelectColumn(Setting.columnsEquip);
    setIsSelectOpen(true);
    handleEquipData();
  };

  const onSelectDowntime = () => {
    refSelectType.current = "downtime";
    setSelectColumn(Setting.columnsDowntime);
    setIsSelectOpen(true);
    handleDowntimeData();
  };

  const onDblClickGridSelect = (e) => {
    if (e?.targetType === "cell") {
      const Grid = refSelect?.current?.gridInst;
      switch (refSelectType.current) {
        case "equip":
          setDowntimeInfo({
            ...downtimeInfo,
            procID: Grid?.getValue(e?.rowKey, "proc_id"),
            procName: Grid?.getValue(e?.rowKey, "proc_nm"),
            equipID: Grid?.getValue(e?.rowKey, "equip_id"),
            equipName: Grid?.getValue(e?.rowKey, "equip_nm"),
          });
          break;

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

  const onStart = async () => {
    if (!downtimeInfo.workDowntimeID) {
      if (!downtimeInfo.equipID) {
        setIsSnackOpen({
          ...isSnackOpen,
          open: true,
          message: "공정/설비를 입력하세요!",
          severity: "warning",
          location: "topCenter",
        });
        return;
      } else if (!downtimeInfo.downtimeID) {
        setIsSnackOpen({
          ...isSnackOpen,
          open: true,
          message: "비가동 정보를 입력하세요!",
          severity: "warning",
          location: "topCenter",
        });
        return;
      } else if (!RE.validateTimeFormat(downtimeInfo.startTime)) {
        setIsSnackOpen({
          ...isSnackOpen,
          open: true,
          message: "시작시간을 입력하세요!",
          severity: "warning",
          location: "topCenter",
        });
        return;
      }
      try {
        setIsBackDrop(true);
        const data = [
          {
            line_id: downtimeInfo.lineID,
            proc_id: downtimeInfo.procID,
            equip_id: downtimeInfo.equipID,
            downtime_id: downtimeInfo.downtimeID,
            downtime_start_date: downtimeInfo.startDate,
            downtime_start_time: downtimeInfo.startTime,
            remark: downtimeInfo.remark,
          },
        ];
        const result = await restAPI.post(restURI.productionDownTime, data);
        setDowntimeInfo({
          ...downtimeInfo,
          workDowntimeID: result?.data?.data?.rows[0].work_downtime_id,
        });

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
        handleSearch();
      }
    }
  };
  const onEnd = async () => {
    if (downtimeInfo.workDowntimeID) {
      if (!RE.validateTimeFormat(downtimeInfo.endTime)) {
        setIsSnackOpen({
          ...isSnackOpen,
          open: true,
          message: "종료시간을 입력하세요!",
          severity: "warning",
          location: "topCenter",
        });
        return;
      } else if (downtimeInfo.startDate > downtimeInfo.endDate) {
        setIsSnackOpen({
          ...isSnackOpen,
          open: true,
          message: "종료일자를 수정해주세요!",
          severity: "warning",
          location: "topCenter",
        });
        return;
      } else if (downtimeInfo.startDate === downtimeInfo.endDate && downtimeInfo.startTime > downtimeInfo.endTime) {
        setIsSnackOpen({
          ...isSnackOpen,
          open: true,
          message: "종료시간을 수정해주세요!",
          severity: "warning",
          location: "topCenter",
        });
        return;
      }
      try {
        setIsBackDrop(true);
        const data = [
          {
            work_downtime_id: downtimeInfo.workDowntimeID,
            line_id: downtimeInfo.lineID,
            proc_id: downtimeInfo.procID,
            equip_id: downtimeInfo.equipID,
            downtime_id: downtimeInfo.downtimeID,
            downtime_start_date: downtimeInfo.startDate,
            downtime_start_time: downtimeInfo.startTime,
            downtime_end_date: downtimeInfo.endDate,
            downtime_end_time: downtimeInfo.endTime,
            remark: downtimeInfo.remark,
          },
        ];
        const result = await restAPI.put(restURI.productionDownTime, data);
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

        handleSearch();
      }
    }
  };
  return (
    <ContentsArea>
      <S.ContentsBottom>
        <S.DowntimeBefore>
          <S.TitleBefore>비가동 등록</S.TitleBefore>
          <S.LineDataWrap>
            {lineData
              ? lineData.map((line, idx) => {
                  return (
                    <BtnPanel
                      title={line.line_nm}
                      height={"10%"}
                      width={"45%"}
                      color={"#ffffff"}
                      fontSize={"26px"}
                      fontColor={"#1491CE"}
                      borderColor={"#1491CE"}
                      onClick={() => onSelectLine(line.line_id, line.line_nm)}
                    />
                  );
                })
              : null}
          </S.LineDataWrap>
        </S.DowntimeBefore>
        <S.DowntimeAfter>
          <S.TitleGridWrap>
            <S.TitleAfter>비가동 진행중</S.TitleAfter>
            <S.GridWrap>
              <GridPanel
                columnOptions={Setting.columnOptions}
                rowHeaders={Setting.rowHeadersNum}
                header={Setting.header}
                columns={Setting.columns}
                data={gdMain}
                refGrid={refGridMain}
              />
            </S.GridWrap>
          </S.TitleGridWrap>
        </S.DowntimeAfter>
      </S.ContentsBottom>
      {isDowntimeOpen ? (
        <DownTimeInput
          setDowntimeInfo={setDowntimeInfo}
          downtimeInfo={downtimeInfo}
          onClickModalClose={() => {
            setDowntimeInfo({});
            setIsDowntimeOpen(false);
          }}
          onSelectEquip={onSelectEquip}
          onSelectDowntime={onSelectDowntime}
          onStart={onStart}
          onEnd={onEnd}
        />
      ) : null}
      {isSelectOpen ? (
        <ModalSelect
          width={"50%"}
          title={refSelectType?.current === "equip" ? "[ 공정/설비 선택 ]" : "[ 비가동 유형/항목 선택 ]"}
          columns={selectColumn}
          columnsOptions={Setting.columnOptions}
          rowHeaders={Setting.rowHeadersNum}
          header={Setting.header}
          refSelectGrid={refSelect}
          gridDataSelect={gdSelect}
          onClickModalSelectClose={() => {
            refSelectType.current = "";
            setIsSelectOpen(false);
          }}
          onDblClickGridSelect={onDblClickGridSelect}
        />
      ) : null}

      {isWarning.open ? (
        <NoticeAlertModal
          textContent={isWarning.message}
          textFontSize={"20px"}
          height={"200px"}
          width={"400px"}
          isConfirm={true}
          onConfirm={() => {
            setIsWarning(false);
          }}
        />
      ) : null}
      <NoticeSnack state={isSnackOpen} setState={setIsSnackOpen} />
      <BackDrop isBackDrop={isBackDrop} />
    </ContentsArea>
  );
}

export default DownTimePanel;
