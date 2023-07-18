import { useContext, useState, useEffect, useRef, useMemo } from "react";
import { LayoutContext } from "components/layout/common/Layout";
import GridSingle from "components/grid/GridSingle";
import ModalNew from "components/modal/ModalNew";
import NoticeSnack from "components/alert/NoticeSnack";
import { LoginStateChk } from "custom/LoginStateChk";
import BackDrop from "components/backdrop/BackDrop";
import PackingInputSet from "./PackingInputSet";
import * as disRow from "custom/useDisableRowCheck";
import * as S from "./PackingInput.styled";
import restAPI from "api/restAPI";
import restURI from "json/restURI.json";
import ContentsArea from "components/layout/common/ContentsArea";
import BtnComponent from "components/button/BtnComponent";
import NoticeAlertModal from "components/alert/NoticeAlertModal";
import * as Cbo from "custom/useCboSet";
import { TextField } from "@mui/material";
import CN from "json/ColumnName.json";
import InputPaper from "components/input/InputPaper";
import Alert from "img/Component/alert.png";
import * as RE from "custom/RegularExpression";
import GetPostParams from "api/GetPostParams";

function PackingInput(props) {
  LoginStateChk();
  const { isMenuSlide } = useContext(LayoutContext);
  const [lineOpt, lineList] = Cbo.useLineIncludeRework();
  const refPackingGrid = useRef(null);
  const refInputGrid = useRef(null);
  const refWeightGrid = useRef(null);
  const refModalGrid = useRef(null);
  const workPackingID = useRef(null);
  const selectedRowKey = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBackDrop, setIsBackDrop] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [packingGridData, setPackingGridData] = useState([]);
  const [inputGridData, setInputGridData] = useState([]);
  const [weightGridData, setWeightGridData] = useState([]);
  const [isSnackOpen, setIsSnackOpen] = useState({
    open: false,
  });
  const [saveMode, setSaveMode] = useState("");
  const [currentYield, setCurrentYield] = useState("75.0"); // 사용자가 조정하는 수율 값
  const [weightAlert, setWeightAlert] = useState({ open: false, qty: "" }); //재고 부족 알림
  const [comboValue, setComboValue] = useState({
    line_id: null,
  });

  const { rowHeadersModal, header, columnsPacking, columnsInput, columnsWeight, columnsModal, columnOptions } =
    PackingInputSet(onCancelYield);

  async function onCancelYield(e, rowKey) {
    const Grid = refPackingGrid?.current?.gridInst;
    const lastRowKey = Grid.getRowCount() - 1;
    if (rowKey === String(lastRowKey)) {
      const completeFlag = Grid.getValue(rowKey, "complete_fg");
      if (completeFlag === "완료") {
        try {
          setIsBackDrop(true);
          const ID = Grid.getValue(rowKey, "work_packing_id");
          const URI = restURI.prdPackingInputCancel.replace("{id}", ID);
          const result = await restAPI.patch(URI);

          setIsSnackOpen({
            ...isSnackOpen,
            open: true,
            message: result?.data?.message,
            severity: "success",
            location: "bottomRight",
          });

          onSearch("click");
          handleReset();
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
  }

  useEffect(() => {
    //🔸좌측 메뉴 접고, 펴기, 팝업 오픈 ➡️ 그리드 사이즈 리셋
    refPackingGrid?.current?.gridInst?.refreshLayout();
    refInputGrid?.current?.gridInst?.refreshLayout();
    refWeightGrid?.current?.gridInst?.refreshLayout();
  }, [isMenuSlide]);

  const handleReset = () => {
    setWeightAlert({ ...weightAlert, open: false, qty: "" });
    setInputGridData([]);
    setWeightGridData([]);
  };

  const onClean = () => {
    setIsSnackOpen({
      ...isSnackOpen,
      open: true,
      message: "기능 개발중입니다.",
      severity: "warning",
      location: "topCenter",
    });
    return;
  };
  const onSearch = async (type = "click" | "realtime", lineID = null) => {
    let lineId = "";
    if (type === "click") {
      lineId = comboValue.line_id;
    } else {
      lineId = lineID;
    }

    if (!lineId) {
      refPackingGrid?.current?.gridInst?.clear();
      refInputGrid?.current?.gridInst?.clear();
      refWeightGrid?.current?.gridInst?.clear();
      if (type === "click") {
        setIsSnackOpen({
          ...isSnackOpen,
          open: true,
          message: "라인 먼저 선택하세요!",
          severity: "warning",
          location: "topCenter",
        });
      }
      return;
    }

    try {
      setIsBackDrop(true);
      const result = await restAPI.get(restURI.prdPackingInputOnly + `?line_id=${lineId}`);
      const data = result?.data?.data?.rows.map((data) =>
        data.complete_fg === false ? { ...data, complete_fg: "미완료" } : { ...data, complete_fg: "완료" }
      );
      setPackingGridData(data);

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
  const onClickModalAddRow = () => {
    refModalGrid?.current?.gridInst?.appendRow();
  };
  let rowKey;
  const onClickModalGrid = (e) => {
    rowKey = e.rowKey;
  };
  const onClickModalCancelRow = () => {
    refModalGrid?.current?.gridInst?.removeRow(rowKey);
  };
  const onClickModalSave = () => {};
  function onClickModalClose() {
    setIsModalOpen(false);
  }
  const onYieldCalc = async () => {
    if (comboValue.line_id) {
      const Grid = refPackingGrid?.current?.gridInst;
      if (Grid.getRowCount() > 0) {
        try {
          setIsBackDrop(true);
          workPackingID.current = Grid.getValue(0, "work_packing_id");
          const yieldRate = currentYield;
          const packingQty = Grid.getValue(0, "packing_complete_qty");

          const result = await restAPI.get(
            restURI.prdPackingInputCalc +
              `?work_packing_id=${workPackingID.current}&packing_complete_qty=${packingQty}&work_yield=${yieldRate}`
          );

          const insufficient = result?.data?.data?.insufficient;
          setWeightAlert({
            ...weightAlert,
            qty: insufficient === 0 ? "" : insufficient,
            open: insufficient === 0 ? false : true,
          });
          setInputGridData(result?.data?.data?.rows[0]?.calc);
          setWeightGridData(result?.data?.data?.rows[0]?.weigh);
          setSaveMode("POST");

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
    } else {
      setIsSnackOpen({
        ...isSnackOpen,
        open: true,
        message: "라인 먼저 선택하세요!",
        severity: "warning",
        location: "topCenter",
      });
      return;
    }
  };
  const onSave = async () => {
    const Grid = refInputGrid?.current?.gridInst;
    if (Grid.getRowCount() > 0 && saveMode === "POST") {
      try {
        setIsBackDrop(true);

        Grid?.finishEditing();

        let data = [];
        for (let i = 0; i < Grid?.getRowCount(); i++) {
          const row = Grid?.getRowAt(i);
          row.work_packing_id = workPackingID.current;
          data.push(row);
        }
        const resultData = data.map((raw) => GetPostParams("PackingInput", raw));
        if (resultData) {
          const result = await restAPI.post(restURI.prdPackingInput, resultData);
          onSearch("click");
          handleReset();
          setIsSnackOpen({
            ...isSnackOpen,
            open: true,
            message: result?.data?.message,
            severity: "success",
            location: "bottomRight",
          });
        }
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
    } else {
      setIsSnackOpen({
        ...isSnackOpen,
        open: true,
        message: "수율 계산이 필요합니다.",
        severity: "warning",
        location: "topCenter",
      });
      return;
    }
  };
  const onClickPackingGrid = async (e) => {
    if (e?.targetType === "cell") {
      if (selectedRowKey.current !== e?.rowKey) {
        if (e?.columnName !== "cancel") {
          const Grid = refPackingGrid?.current?.gridInst;
          const completeFlag = Grid.getValue(e.rowKey, "complete_fg");
          const ID = Grid.getValue(e.rowKey, "work_packing_id");
          if (completeFlag) {
            try {
              setIsBackDrop(true);
              setSaveMode("PUT");
              const result = await restAPI.get(restURI.prdPackingInput + `?work_packing_id=${ID}`);

              setInputGridData(result?.data?.data?.rows);

              try {
                const result = await restAPI.get(restURI.prdPackingInputWeight + `?work_packing_id=${ID}`);

                setWeightGridData(result?.data?.data?.rows);
                selectedRowKey.current = e.rowKey;
              } catch (err) {
                setSaveMode("");
                setIsSnackOpen({
                  ...isSnackOpen,
                  open: true,
                  message: err?.response?.data?.message,
                  severity: "error",
                  location: "bottomRight",
                });
              } finally {
              }
            } catch (err) {
              setSaveMode("");
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
          } else {
            setSaveMode("POST");
            handleReset();
          }
        }
      }
    }
  };
  const handleChangeYield = (e) => {
    setCurrentYield(RE.DecimalOnePoint(e?.target?.value));
  };
  const onKeyDownYieldCalc = (e) => {
    if (e?.key === "Enter") {
      onYieldCalc();
    }
  };

  useEffect(() => {
    const Grid = refPackingGrid?.current?.gridInst;
    const lastRowKey = Grid.getRowCount() - 1;
    if (Grid.getValue(0, "complete_fg") === "미완료") {
      Grid.addCellClassName(0, "complete_fg", "redText");
    }
    if (Grid.getValue(lastRowKey, "complete_fg") === "완료") {
      Grid.addCellClassName(lastRowKey, "complete_fg", "blueText");
    }
  }, [packingGridData]);

  const PackingGrid = useMemo(() => {
    return (
      <GridSingle
        refGrid={refPackingGrid}
        rowHeaders={rowHeadersModal}
        columnOptions={columnOptions}
        columns={columnsPacking}
        data={packingGridData}
        onClickGrid={onClickPackingGrid}
      />
    );
  }, [packingGridData]);

  return (
    <ContentsArea>
      <S.ShadowBoxButton>
        <S.SearchWrap>
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
                line_id: !newValue?.line_id ? null : newValue?.line_id,
              });
              onSearch("realtime", !newValue?.line_id ? null : newValue?.line_id);
            }}
            isOptionEqualToValue={(option, value) => option.line_id === value.line_id}
            renderInput={(params) => <TextField {...params} label={CN.line_nm} size="small" />}
          />
        </S.SearchWrap>
        <S.ButtonWrap>
          <BtnComponent btnName={"Clean"} onClick={onClean} />
          <BtnComponent
            btnName={"Search"}
            onClick={() => {
              onSearch("click");
            }}
          />
        </S.ButtonWrap>
      </S.ShadowBoxButton>
      <S.ShadowBoxMain>
        <S.ShadowBoxLeft>
          <S.ShadowBoxLeftTop>
            <S.HeaderWrap>
              <S.Title>포장실적</S.Title>
              <S.Wrap>
                <S.SubTitle>현재 수율</S.SubTitle>
                <InputPaper
                  width={"80px"}
                  size={"20px"}
                  readOnly={false}
                  value={currentYield || ""}
                  onTextChange={handleChangeYield}
                  onKeyDown={onKeyDownYieldCalc}
                />
                <S.SubTitle>%　　</S.SubTitle>
                <BtnComponent btnName={"Yield"} onClick={onYieldCalc} />
              </S.Wrap>
            </S.HeaderWrap>
            <S.GridWrap>{PackingGrid}</S.GridWrap>
          </S.ShadowBoxLeftTop>
          <S.ShadowBoxLeftBottom>
            <S.HeaderWrap>
              <S.Title>투입품 수율 계산</S.Title>
              {weightAlert.open && (
                <S.Wrap>
                  <S.AlertImg src={Alert} />
                  <S.SubTitle className={"alert"}>{weightAlert.qty} 중량이 부족합니다! </S.SubTitle>
                </S.Wrap>
              )}
              <BtnComponent btnName={"Save"} onClick={onSave} />
            </S.HeaderWrap>
            <S.GridWrap>
              <GridSingle
                refGrid={refInputGrid}
                rowHeaders={rowHeadersModal}
                columnOptions={columnOptions}
                columns={columnsInput}
                data={inputGridData}
                isEditMode={true}
              />
            </S.GridWrap>
          </S.ShadowBoxLeftBottom>
        </S.ShadowBoxLeft>
        <S.ShadowBoxRight>
          <S.HeaderWrap>
            <S.Title>계량품</S.Title>
          </S.HeaderWrap>
          <S.GridWrap>
            <GridSingle
              refGrid={refWeightGrid}
              rowHeaders={rowHeadersModal}
              columnOptions={columnOptions}
              columns={columnsWeight}
              data={weightGridData}
            />
          </S.GridWrap>
        </S.ShadowBoxRight>
      </S.ShadowBoxMain>
      <NoticeSnack state={isSnackOpen} setState={setIsSnackOpen} />
      {isDeleteAlertOpen ? (
        <NoticeAlertModal
          textContent={"정말 삭제하시겠습니까?"}
          textFontSize={"20px"}
          height={"200px"}
          width={"400px"}
          isDelete={true}
          isCancel={true}
          // onDelete={handleDelete}
          onCancel={() => {
            setIsDeleteAlertOpen(false);
          }}
        />
      ) : null}
      {isModalOpen ? (
        <ModalNew
          onClickModalAddRow={onClickModalAddRow}
          onClickModalCancelRow={onClickModalCancelRow}
          onClickModalSave={onClickModalSave}
          onClickModalClose={onClickModalClose}
          columns={columnsModal}
          columnOptions={columnOptions}
          header={header}
          rowHeaders={rowHeadersModal}
          refModalGrid={refModalGrid}
          onClickModalGrid={onClickModalGrid}
        />
      ) : null}
      <BackDrop isBackDrop={isBackDrop} />
    </ContentsArea>
  );
}

export default PackingInput;
