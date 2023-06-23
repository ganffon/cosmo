import * as S from "./equipmentRawDataView.styled";
import { LayoutContext } from "components/layout/common/Layout";
import { LoginStateChk } from "custom/LoginStateChk";
import { useContext, useRef, useState, useEffect } from "react";
import CN from "json/ColumnName.json";
import * as Cbo from "custom/useCboSet";
import DatePicker from "components/datetime/DatePicker";
import DateTime from "components/datetime/DateTime";
import TextField from "@mui/material/TextField";
import restAPI from "api/restAPI";
import GridSingle from "components/grid/GridSingle";
import ButtonSearch from "components/button/ButtonSearch";
import EquipmentRawDataViewSet from "./equipmentRawDataViewSet";
import BackDrop from "components/backdrop/BackDrop";
import ContentsArea from "components/layout/common/ContentsArea";
import TempRawsModal from "./TempRawsModal";
import BtnComponent from "components/button/BtnComponent";
import * as btn from "../../../../components/button/BtnComponent.styled";
import GraphImg from "img/Component/button/vector.svg";

function EquipmentRawDataView() {
  LoginStateChk();
  const { isAllScreen, isMenuSlide } = useContext(LayoutContext);
  const refSingleGrid = useRef(null);
  const [isBackDrop, setIsBackDrop] = useState(false);
  const [isDataIn, setIsDataIn] = useState(false);
  const [lineOpt, lineList] = Cbo.useLineIncludeRework();
  const [procOpt, procList] = Cbo.useProcess();
  const [gridData, setGridData] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [dateText, setDateText] = useState({
    startDate: DateTime().dateFull,
  });
  const [isSnackOpen, setIsSnackOpen] = useState({
    open: false,
  });
  const [tmpColumns, setColumns] = useState();
  const [comboValue, setComboValue] = useState({
    line_id: null,
  });

  const { rowHeaders, columnOptions, header, columns } = EquipmentRawDataViewSet(tmpColumns);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const setGridcolumns = async () => {
    let readURI = `/eqm/raws/columns?reg_date=${dateText.startDate}&`;
    if (comboValue.proc_id !== "" && comboValue.proc_id !== null && comboValue.proc_id !== undefined) {
      readURI = readURI + `proc_id=${comboValue.proc_id}&`;
    }

    if (comboValue.line_id !== "" && comboValue.line_id !== null && comboValue.line_id !== undefined) {
      readURI = readURI + `line_id=${comboValue.line_id}&`;
    }
    readURI = readURI.slice(0, readURI.length - 1);

    if (
      comboValue.proc_id !== "" &&
      comboValue.proc_id !== null &&
      comboValue.proc_id !== undefined &&
      comboValue.line_id !== "" &&
      comboValue.line_id !== null &&
      comboValue.line_id !== undefined
    ) {
      const gridData = await restAPI.get(readURI);

      const columnsArr = gridData.data.data.rows;
      const finalArr = columnsArr.map((row) => {
        if (row["header"].length <= 5) {
          row["minWidth"] = "50";
        } else if (row["header"].length > 5 && row["header"].length <= 10) {
          row["minWidth"] = "100";
        } else if (row["header"].length > 10 && row["header"].length <= 17) {
          row["minWidth"] = "150";
        } else {
          row["minWidth"] = "250";
        }

        row["align"] = "center";
        row["editor"] = false;
        row["hidden"] = false;
        row["rowSpan"] = false;
        row["sortable"] = false;
        row["filter"] = false;
        row["whiteSpace"] = false;
        row["rowSpan"] = false;

        return row;
      });

      setColumns(finalArr);
    }
    getGridData();
  };
  useEffect(() => {
    //🔸좌측 메뉴 접고, 펴기, 팝업 오픈 ➡️ 그리드 사이즈 리셋
    refSingleGrid?.current?.gridInst?.refreshLayout();
  }, [isMenuSlide]);
  const getGridData = async () => {
    setIsBackDrop(true);
    try {
      let readURI = `/eqm/raws?reg_date=${dateText.startDate}&`;

      if (comboValue.proc_id !== "" && comboValue.proc_id !== null && comboValue.proc_id !== undefined) {
        readURI = readURI + `proc_id=${comboValue.proc_id}&`;
      }

      if (comboValue.line_id !== "" && comboValue.line_id !== null && comboValue.line_id !== undefined) {
        readURI = readURI + `line_id=${comboValue.line_id}&`;
      }
      readURI = readURI.slice(0, readURI.length - 1);
      if (
        comboValue.proc_id !== "" &&
        comboValue.proc_id !== null &&
        comboValue.proc_id !== undefined &&
        comboValue.line_id !== "" &&
        comboValue.line_id !== null &&
        comboValue.line_id !== undefined
      ) {
        const gridData = await restAPI.get(readURI);
        setGridData(gridData?.data?.data?.rows[0].grid);
        setChartData(gridData?.data?.data?.rows[0].graph);
        setIsDataIn(true);
      }
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

  const onClickSearch = () => {
    setGridcolumns();
  };
  return (
    <ContentsArea>
      <S.ShadowBoxButton isMenuSlide={isMenuSlide} isAllScreen={isAllScreen}>
        <S.ToolWrap>
          <S.SearchWrap>
            <DatePicker datePickerSet={"single"} dateText={dateText} setDateText={setDateText} />
            <S.ComboWrap>
              <S.ComboBox
                disablePortal
                id="lineCombo"
                size="small"
                key={(option) => option?.line_id}
                options={lineOpt || null}
                getOptionLabel={(option) => option?.line_nm || ""}
                onChange={(_, newValue) => {
                  setComboValue({
                    ...comboValue,
                    line_id: newValue?.line_id === undefined ? null : newValue?.line_id,
                  });
                }}
                renderInput={(params) => <TextField {...params} label={CN.line_nm} size="small" />}
              />
              <S.ComboBox
                disablePortal
                id="procCombo"
                size="small"
                key={(option) => option?.proc_id}
                options={procOpt || null}
                getOptionLabel={(option) => option?.proc_nm || ""}
                onChange={(_, newValue) => {
                  setComboValue({
                    ...comboValue,
                    proc_id: newValue?.proc_id === undefined ? null : newValue?.proc_id,
                  });
                }}
                renderInput={(params) => <TextField {...params} label={CN.proc_nm} size="small" />}
              />
            </S.ComboWrap>
            {/* {isDataIn&&<S.GraphButton onClick={openModal}>모달 열기</S.GraphButton>}{isModalOpen && <TempRawsModal columnsDetail={columns.slice(1)} data={chartData} onClose={closeModal} />} */}
          </S.SearchWrap>
          <S.ButtonWrap>
            {isDataIn && (
              <S.BtnComponent height={"34px"} width={"110px"} onClick={openModal}>
                <img
                  src={GraphImg}
                  alt={GraphImg}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                    flex: "none",
                    width: "20px",
                    height: "30px",
                  }}
                />
                <S.SearchTitle>그래프</S.SearchTitle>
              </S.BtnComponent>
            )}
            {isModalOpen && <TempRawsModal columnsDetail={columns.slice(1)} data={chartData} onClose={closeModal} />}
            <BtnComponent btnName={"Search"} onClick={onClickSearch} />
          </S.ButtonWrap>
        </S.ToolWrap>
      </S.ShadowBoxButton>
      <S.ShadowBoxGrid isAllScreen={isAllScreen}>
        <S.GridWrap>
          <GridSingle
            columnOptions={columnOptions}
            columns={columns}
            rowHeaders={rowHeaders}
            header={header}
            data={gridData}
            refGrid={refSingleGrid}
          />
        </S.GridWrap>
      </S.ShadowBoxGrid>
      <BackDrop isBackDrop={isBackDrop} />
    </ContentsArea>
  );
}

export default EquipmentRawDataView;
