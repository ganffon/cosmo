import { useContext, useState, useEffect, useRef, useReducer, useMemo } from "react";
import { LayoutContext } from "components/layout/common/Layout";
import GridSingle from "components/grid/GridSingle";
import NoticeSnack from "components/alert/NoticeSnack";
import * as Cbo from "custom/useCboSet";
import BackDrop from "components/backdrop/BackDrop";
import MixedReportSet from "pages/mes/equipment/mixedReport/mixedReportSet";
import * as S from "./mixedReport.styled";
import restURI from "json/restURI.json";
import restAPI from "api/restAPI";
import ContentsArea from "components/layout/common/ContentsArea";
import BtnComponent from "components/button/BtnComponent";
import DateTime from "components/datetime/DateTime";
import { FdrDate } from "components/datetime/fdrDate";
import { FdrCombo } from "components/combo/fdrCombo";

const convertValueText = (objArray, value, text) => {
  const result = objArray.map((item) => ({
    value: item[value],
    text: item[text],
  }));
  return result;
};

export function MixedReport(props) {
  const { isMenuSlide } = useContext(LayoutContext);
  const refGridTotal = useRef(null);
  const refGridMES = useRef(null);
  const refGridOPC = useRef(null);
  const [isBackDrop, setIsBackDrop] = useState(false);

  const [cloudData, setCloudData] = useState([]);
  const [gridDataTotal, setGridDataTotal] = useState([]);
  const [gridDataMES, setGridDataMES] = useState([]);
  const [gridDataOPC, setGridDataOPC] = useState([]);

  const [isSnackOpen, setIsSnackOpen] = useState({
    open: false,
  });

  const [lineOpt, lineList] = Cbo.useLineIncludeRework();

  const { header, columnsLeft, columnsMES, columnsOPC, columnOptions } = MixedReportSet();

  const filterReducer = (filter, action) => {
    switch (action.type) {
      case "update":
        return { ...filter, [action.id]: action.value };
      case "reset":
        return { ...{ regDate: DateTime(-7).dateMonth } };
      default:
        return filter;
    }
  };

  const [filter, filterDispatch] = useReducer(filterReducer, {
    regDate: DateTime(-7).dateMonth,
  });

  useEffect(() => {
    //🔸좌측 메뉴 접고, 펴기, 팝업 오픈 ➡️ 그리드 사이즈 리셋
    if (refGridTotal?.current) {
      refGridTotal?.current?.gridInst?.refreshLayout();
    }
    if (refGridMES?.current) {
      refGridMES?.current?.gridInst?.refreshLayout();
    }
    if (refGridOPC?.current) {
      refGridOPC?.current?.gridInst?.refreshLayout();
    }
  }, [isMenuSlide]);

  const onSearch = async () => {
    if (filter.regDate && filter.line?.value) {
      const params = {
        reg_date: filter.regDate,
        line_id: filter.line?.value,
      };
      try {
        setIsBackDrop(true);

        const result = await restAPI.get(restURI.eqmMixed, { params });
        setCloudData(result.data.data.rows[0]);
        setGridDataTotal(result.data.data.rows[0].total);
        setGridDataMES([]);
        setGridDataOPC([]);

        setIsSnackOpen({
          ...isSnackOpen,
          open: true,
          location: "bottomRight",
          severity: "success",
          message: "조회 성공",
        });
      } catch (err) {
        console.log(err);
        setIsSnackOpen({
          ...isSnackOpen,
          open: true,
          location: "bottomRight",
          severity: "error",
          message: "조회 실패",
        });
      } finally {
        setIsBackDrop(false);
      }
    } else {
      setGridDataTotal([]);
      setGridDataMES([]);
      setGridDataOPC([]);
      setIsSnackOpen({
        ...isSnackOpen,
        open: true,
        location: "topCenter",
        severity: "warning",
        message: "검색 조건 먼저 선택해주세요.",
      });
    }
  };

  useEffect(() => {
    const grid = refGridTotal.current.getInstance();

    const rowCount = grid.getRowCount();

    const currentDate = DateTime().dateFull;

    for (let i = 0; i < rowCount; i++) {
      const difference = grid.getValue(i, "difference");
      if (difference < 0) {
        grid.addCellClassName(i, "difference", "redText");
      }
      const today = grid.getValue(i, "date");
      if (today === currentDate) {
        grid.addCellClassName(i, "date", "blueText boldText");
        grid.addCellClassName(i, "mes", "blueText boldText");
        grid.addCellClassName(i, "opc", "blueText boldText");
        grid.addCellClassName(i, "difference", "boldText");
      }
    }
  }, [gridDataTotal]);

  const onClickTotal = (e) => {
    if (e?.targetType === "cell") {
      const grid = refGridTotal.current.getInstance();
      const totalDate = grid.getValue(e.rowKey, "date");

      const dataMES = cloudData.mes;
      const dataOPC = cloudData.opc;

      setGridDataMES(dataMES.filter((item) => item.date === totalDate)[0].rows);
      setGridDataOPC(dataOPC.filter((item) => item.date === totalDate)[0].rows);
    }
  };

  const gridTotal = useMemo(() => {
    return (
      <GridSingle
        columnOptions={columnOptions}
        columns={columnsLeft}
        rowHeaders={["rowNum"]}
        header={header}
        data={gridDataTotal}
        draggable={false}
        refGrid={refGridTotal}
        onClickGrid={onClickTotal}
      />
    );
  }, [gridDataTotal]);

  return (
    <ContentsArea>
      <S.Header>
        <S.FilterWrap>
          <FdrDate id={"regDate"} label={"조회년월"} type={"month"} value={filter.regDate} dispatch={filterDispatch} />
          <FdrCombo
            id={"line"}
            label={"라인"}
            list={convertValueText(lineOpt, "line_id", "line_nm")}
            value={filter.line}
            dispatch={filterDispatch}
          />
        </S.FilterWrap>
        <BtnComponent btnName={"Search"} onClick={onSearch} />
      </S.Header>
      <S.Body>
        <S.LeftArea>
          <S.GridTitle>전체 비교</S.GridTitle>
          <S.GridWrap>{gridTotal}</S.GridWrap>
        </S.LeftArea>
        <S.RightArea>
          <S.RightTopArea>
            <S.GridTitle>MES 투입실적</S.GridTitle>
            <S.GridWrap>
              <GridSingle
                columnOptions={columnOptions}
                columns={columnsMES}
                rowHeaders={["rowNum"]}
                header={header}
                data={gridDataMES}
                draggable={false}
                refGrid={refGridMES}
              />
            </S.GridWrap>
          </S.RightTopArea>
          <S.RightBottomArea>
            <S.GridTitle>혼합기 가동</S.GridTitle>
            <S.GridWrap>
              <GridSingle
                columnOptions={columnOptions}
                columns={columnsOPC}
                rowHeaders={["rowNum"]}
                header={header}
                data={gridDataOPC}
                draggable={false}
                refGrid={refGridOPC}
              />
            </S.GridWrap>
          </S.RightBottomArea>
        </S.RightArea>
      </S.Body>
      <NoticeSnack state={isSnackOpen} setState={setIsSnackOpen} />
      <BackDrop isBackDrop={isBackDrop} />
    </ContentsArea>
  );
}
