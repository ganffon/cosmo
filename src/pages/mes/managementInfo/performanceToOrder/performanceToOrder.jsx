import { useContext, useState, useEffect, useRef, useMemo } from "react";
import { LayoutContext } from "components/layout/common/Layout";
import GridSingle from "components/grid/GridSingle";
import NoticeSnack from "components/alert/NoticeSnack";
import BackDrop from "components/backdrop/BackDrop";
import PerformanceToOrderSet from "pages/mes/managementInfo/performanceToOrder/performanceToOrderSet";
import * as disRow from "custom/useDisableRowCheck";
import * as S from "pages/mes/managementInfo/performanceToOrder/performanceToOrder.styled";
import restAPI from "api/restAPI";
import restURI from "json/restURI.json";
import ContentsArea from "components/layout/common/ContentsArea";
import BtnComponent from "components/button/BtnComponent";
import DatePicker from "components/datetime/DatePicker";
import DateTime from "components/datetime/DateTime";
import { TextField } from "@mui/material";
import CN from "json/ColumnName.json";
import * as Cbo from "custom/useCboSet";
import { getParams } from "api/getParams";

export function PerformanceToOrder(props) {
  const { isAllScreen, isMenuSlide } = useContext(LayoutContext);
  const refSingleGrid = useRef(null);
  const [isBackDrop, setIsBackDrop] = useState(false);
  const [gridData, setGridData] = useState(null);
  const [isSnackOpen, setIsSnackOpen] = useState({
    open: false,
  });
  const [lineOpt, lineList] = Cbo.useLineIncludeRework();
  const [dateText, setDateText] = useState({
    startDate: DateTime(-7).dateFull,
    endDate: DateTime().dateFull,
  });
  const [comboValue, setComboValue] = useState({
    line_id: null,
  });
  const [changeSearch, setChangeSearch] = useState({ subtotal_type: "LINE" });

  const { rowNum, header, columns, columnOptions } = PerformanceToOrderSet();

  useEffect(() => {
    //🔸좌측 메뉴 접고, 펴기, 팝업 오픈 ➡️ 그리드 사이즈 리셋
    if (refSingleGrid?.current !== null) {
      refSingleGrid?.current?.gridInst?.refreshLayout();
    }
  }, [isMenuSlide]);

  const changeSearchCondition = (e, id = "") => {
    setChangeSearch({ ...changeSearch, [id === "" ? e?.target?.id : id]: e?.target?.value });
  };
  const onClickSearch = async () => {
    const params = {
      subtotal_type: changeSearch.subtotal_type,
      prod_nm: changeSearch.prod_nm,
      line_id: comboValue.line_id,
      start_date: dateText.startDate,
      end_date: dateText.endDate,
    };
    try {
      setIsBackDrop(true);
      const result = await restAPI.get(restURI.performanceToOrder + getParams(params));

      setGridData(result?.data?.data?.rows);

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
  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      onClickSearch();
    }
  };
  useEffect(() => {
    onClickSearch();
  }, [changeSearch.subtotal_type, comboValue.line_id]);

  const value = { LINE: "라인", MODEL: "제품군", PROD: "품목" };
  const valueKeys = Object.keys(value);
  const valueValues = Object.values(value);

  const subtotalColor = () => {
    if (refSingleGrid) {
      const grid = refSingleGrid?.current?.gridInst;
      const rowCount = grid.getRowCount();
      const columns = grid.getColumns();

      for (let i = 0; i < rowCount; i++) {
        columns.forEach((col) => {
          grid.removeCellClassName(i, col.name, "subtotalBack");
        });
      }
      for (let i = 0; i < rowCount; i++) {
        const rowData = grid.getRow(i);
        if (!rowData.work_order_no) {
          columns.forEach((col) => {
            grid.addCellClassName(i, col.name, "subtotalBack");
          });
        }
      }
    }
  };
  useEffect(() => {
    subtotalColor();
  }, [gridData]);

  const gridMain = useMemo(() => {
    return (
      <GridSingle
        rowHeaders={rowNum}
        header={header}
        columns={columns}
        columnOptions={columnOptions}
        data={gridData}
        draggable={false}
        refGrid={refSingleGrid}
      />
    );
  }, [gridData]);

  return (
    <ContentsArea>
      <S.SearchWrap>
        <S.FilterWrap>
          <DatePicker datePickerSet={"range"} dateText={dateText} setDateText={setDateText} />
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
                line_id: newValue?.line_id === undefined ? null : newValue?.line_id,
              });
            }}
            renderInput={(params) => <TextField {...params} label={CN.line_nm} size="small" />}
            onKeyDown={onKeyDown}
          />
          <S.InputBox
            id={"prod_nm"}
            name={"품목"}
            handleInputTextChange={(e) => changeSearchCondition(e, "")}
            onClickSearch={onClickSearch}
            onKeyDown={onKeyDown}
          />
          <S.FdrRadio>
            <S.RadioLabel>{"소계 유형"}</S.RadioLabel>
            {valueKeys.map((value, index) => {
              return (
                <S.RadioWrap key={`subtotal_type${index}`}>
                  <S.Radio
                    type={"radio"}
                    id={`subtotal_type${index}`}
                    name={"subtotal_type"}
                    value={valueKeys[index]}
                    defaultChecked={valueKeys[index] === valueKeys[0]} // 초기 선택 값
                    disabled={false}
                    onChange={(e) => changeSearchCondition(e, "subtotal_type")}
                  />
                  <S.RadioText htmlFor={`subtotal_type${index}`}>{valueValues[index]}</S.RadioText>
                </S.RadioWrap>
              );
            })}
          </S.FdrRadio>
        </S.FilterWrap>
        <BtnComponent btnName={"Search"} onClick={onClickSearch} />
      </S.SearchWrap>
      <S.GridWrap>{gridMain}</S.GridWrap>
      {/* <S.ShadowBoxButton>
        <S.ToolWrap>
          <S.SearchWrap></S.SearchWrap>
          <S.ButtonWrap>
            <BtnComponent btnName={"Search"} onClick={onClickSearch} />
          </S.ButtonWrap>
        </S.ToolWrap>
      </S.ShadowBoxButton>

      <S.ShadowBoxGrid isAllScreen={isAllScreen}>
        <S.ButtonWrap>
          <BtnComponent btnName={"Edit"} />
          <BtnComponent btnName={"DataLoad"} toolTipTitle={"lineButton"} />
        </S.ButtonWrap>

        <S.GridWrap>
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
        </S.GridWrap>
      </S.ShadowBoxGrid> */}
      <NoticeSnack state={isSnackOpen} setState={setIsSnackOpen} />
      <BackDrop isBackDrop={isBackDrop} />
    </ContentsArea>
  );
}
