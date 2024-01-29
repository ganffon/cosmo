import * as S from "./MonthlyTempHumidChartSettingModal.styled";
import { FdrModal } from "components/modal/fdrModal";
import GridModal from "components/grid/GridModal";
import * as C from "constant/Grid.js";
import * as col from "custom/GridColumnSet";
import * as RE from "custom/RegularExpression";
import BackDrop from "components/backdrop/BackDrop";
import { useEffect, useRef, useState } from "react";
import restAPI from "api/restAPI";
import restURI from "json/restURI.json";
import BtnComponent from "components/button/BtnComponent";
import NoticeSnack from "components/alert/NoticeSnack";
import GetPutParams from "api/GetPutParams";
import * as disRow from "custom/useDisableRowCheck";
import Condition from "custom/Condition";

export function MonthlyTempHumidChartSettingModal(props) {
  const { setIsSettingModalOpen = {}, handleSearchButtonClick = {} } = props;

  const modalProps = {
    open: false,
    height: props.height,
    width: props.width,
    title: "상한, 하한 설정",
    chart: props.chart,
  };

  const modalCol = [
    col.id("temp_humi_set_id", "temp_humi_set_id", C.HIDDEN_ID),
    col.text(
      "temp_humi_type",
      "구분",
      false,
      false,
      C.WIDTH_SUPER_SHORT,
      C.U,
      C.U,
      C.U,
      C.U,
      true
    ),
    col.number("temp_top", "온도 상한", true, C.WIDTH_SUPER_SHORT, false),
    col.number("temp_bottom", "온도 하한", true, C.WIDTH_SUPER_SHORT, false),
    col.number("humi_top", "습도 상한", true, C.WIDTH_SUPER_SHORT, false),
    col.number("humi_bottom", "습도 하한", true, C.WIDTH_SUPER_SHORT, false),
  ];
  const refModalGrid = useRef(null);

  const [isBackDrop, setIsBackDrop] = useState(false);
  const [gridData, setGridData] = useState(null);
  const [isSnackOpen, setIsSnackOpen] = useState({
    open: false,
  });

  //Grid용 Col 설정
  useEffect(() => {
    getSettingData();
  }, []);

  const getSettingData = () => {
    setIsBackDrop(true);
    restAPI
      .get(restURI.getTempHumiSet, {})
      .then((response) => {
        // API 응답 데이터 처리 로직
        setGridData(response?.data?.data?.rows);
        setIsBackDrop(false);
      })
      .catch((error) => {
        // 오류 처리 로직
        // console.error('API 호출 중 오류 발생:', error);
      });
  };

  const onClickSave = async () => {
    try {
      setIsBackDrop(true);
      const Grid = refModalGrid?.current?.gridInst;
      Grid?.finishEditing();
      const data = Grid.getCheckedRows().map((raw) =>
        GetPutParams("tempHumiSetting", raw)
      );
      const res = await restAPI.put(restURI.getTempHumiSet, data);

      setIsSnackOpen({
        ...isSnackOpen,
        open: true,
        message: res?.data?.message,
        severity: "success",
      });
    } catch (err) {
      setIsSnackOpen({
        ...isSnackOpen,
        open: true,
        message: err?.response?.data?.message,
        severity: "error",
      });
    } finally {
      setIsBackDrop(false);
      handleSearchButtonClick();
      setIsSettingModalOpen(false);
    }
  };

  const onEditingFinishGridDetail = (e) => {
    let validateData;
    let type;
    switch (e.columnName) {
      case "temp_top":
        validateData = refModalGrid.current.gridInst.getValue(
          e?.rowKey,
          "temp_bottom"
        );
        console.log(validateData);
        if (Number(RE.onlyNum(e.value)) < validateData) {
          type = gridData?.[e.rowKey].temp_humi_type;

          refModalGrid.current.gridInst.setValue(
            e?.rowKey,
            "temp_top",
            gridData?.[e.rowKey].temp_top
          );
          setIsSnackOpen({
            ...isSnackOpen,
            open: true,
            message: `[${type}]의 온도 상한이 온도 하한보다 낮을 수 없습니다.`,
            severity: "error",
            location: "bottomRight",
          });
          break;
        } else {
          refModalGrid.current.gridInst.setValue(
            e?.rowKey,
            "temp_top",
            RE.onlyNum(e.value)
          );
          disRow.handleEditingFinishGridCheck(e);
          break;
        }

      case "temp_bottom":
        validateData = refModalGrid.current.gridInst.getValue(
          e?.rowKey,
          "temp_top"
        );
        if (Number(RE.onlyNum(e.value)) > validateData) {
          type = gridData?.[e.rowKey].temp_humi_type;
          refModalGrid.current.gridInst.setValue(
            e?.rowKey,
            "temp_bottom",
            gridData?.[e.rowKey].temp_bottom
          );
          setIsSnackOpen({
            ...isSnackOpen,
            open: true,
            message: `[${type}]의 온도 하한이 온도 상한보다 높을 수 없습니다.`,
            severity: "error",
            location: "bottomRight",
          });

          break;
        }
        refModalGrid.current.gridInst.setValue(
          e?.rowKey,
          "temp_bottom",
          RE.onlyNum(e.value)
        );
        disRow.handleEditingFinishGridCheck(e);
        break;
      case "humi_top":
        validateData = refModalGrid.current.gridInst.getValue(
          e?.rowKey,
          "humi_bottom"
        );
        if (Number(RE.onlyNum(e.value)) < validateData) {
          type = gridData?.[e.rowKey].temp_humi_type;
          refModalGrid.current.gridInst.setValue(
            e?.rowKey,
            "humi_top",
            gridData?.[e.rowKey].humi_top
          );
          setIsSnackOpen({
            ...isSnackOpen,
            open: true,
            message: `[${type}]의 습도 상한이 습도 하한보다 낮을 수 없습니다.`,
            severity: "error",
            location: "bottomRight",
          });

          break;
        } else {
          refModalGrid.current.gridInst.setValue(
            e?.rowKey,
            "humi_top",
            RE.onlyNum(e.value)
          );
          disRow.handleEditingFinishGridCheck(e);
          break;
        }

      case "humi_bottom":
        validateData = refModalGrid.current.gridInst.getValue(
          e?.rowKey,
          "humi_top"
        );
        if (Number(RE.onlyNum(e.value)) > validateData) {
          type = gridData?.[e.rowKey].temp_humi_type;
          refModalGrid.current.gridInst.setValue(
            e?.rowKey,
            "humi_bottom",
            gridData?.[e.rowKey].humi_bottom
          );
          setIsSnackOpen({
            ...isSnackOpen,
            open: true,
            message: `[${type}]의 습도 하한이 습도 상한보다 높을 수 없습니다.`,
            severity: "error",
            location: "bottomRight",
          });
          break;
        } else {
          refModalGrid.current.gridInst.setValue(
            e?.rowKey,
            "humi_bottom",
            RE.onlyNum(e.value)
          );
          disRow.handleEditingFinishGridCheck(e);
          break;
        }

      default:
        break;
    }
  };

  return (
    <FdrModal modalState={modalProps} setModal={props.setModal}>
      <S.ContentsWrap>
        <S.TitleWrap></S.TitleWrap>
        <S.GridWrap>
          <GridModal
            // rowHeaders={["checkbox"]}
            columns={modalCol}
            refGrid={refModalGrid}
            data={gridData}
            onEditingFinish={onEditingFinishGridDetail}
          />
        </S.GridWrap>
        <S.buttonWrap>
          <BtnComponent btnName="Save" onClick={onClickSave} />
        </S.buttonWrap>
      </S.ContentsWrap>
      <NoticeSnack state={isSnackOpen} setState={setIsSnackOpen} />
      <BackDrop isBackDrop={isBackDrop} />
    </FdrModal>
  );
}
