import { LayoutContext } from "components/layout/common/Layout";

import { useContext, useEffect, useMemo, useRef, useState } from "react";
import * as S from "./LineYield.styled";
import ContentsArea from "components/layout/common/ContentsArea";
import BtnPanel from "components/button/BtnPanel";
import InputSearch from "components/input/InputSearch";
import GridSingle from "components/grid/GridSingle";
import BtnComponent from "components/button/BtnComponent";
import LineYieldSet from "./LineYieldSet";
import restURI from "json/restURI.json";
import restAPI from "api/restAPI";
import NoticeSnack from "components/alert/NoticeSnack";
import BackDrop from "components/backdrop/BackDrop";
import GetPostParams from "api/GetPostParams";
import * as disRow from "custom/useDisableRowCheck";

export function LineYield() {
  const { currentMenuName, isAllScreen, isMenuSlide } = useContext(LayoutContext);

  const refMainGrid = useRef(null);
  const refDetailGrid = useRef(null);
  const clickedWorkYieldId = useRef(null);
  const [gridDataHeader, setGridDataHeader] = useState(null);
  const [gridDataDetail, setGridDataDetail] = useState(null);
  const [isBackDrop, setIsBackDrop] = useState(false);
  const [disableRowToggle, setDisableRowToggle] = disRow.useDisableRowCheck(refMainGrid);
  const [searchToggle, setSearchToggle] = useState(false);
  const [inputTextChange, setInputTextChange] = useState({});
  const [isSnackOpen, setIsSnackOpen] = useState({
    open: false,
  });
  const onEditingFinishGrid = (e) => {
    disRow.handleEditingFinishGridCheck(e);
  };
  const onClickApply = async (e, rowKey) => {
    onEditingFinishGrid();
    const Grid = refMainGrid?.current?.gridInst;
    const afterYield = Grid.getValue(rowKey, "after_yield_value");
    if (afterYield) {
      if (afterYield > 1 || afterYield <= 0) {
        setIsSnackOpen({
          ...isSnackOpen,
          open: true,
          message: "적용수율은 0 ~ 1 사이의 값을 입력해주세요.",
          severity: "error",
          location: "topCenter",
        });
      } else {
        try {
          let datas = new Object();
          datas.line_id = Grid.getValue(rowKey, "line_id");
          datas.yield_value = Grid.getValue(rowKey, "after_yield_value");
          datas.remark = Grid.getValue(rowKey, "remark");
          setIsBackDrop(true);
          let result = [];
          result.push(datas);

          const data = GetPostParams("workYield", datas);

          const res = await restAPI.post(restURI.workYieldApply, data);
          setIsSnackOpen({
            ...isSnackOpen,
            open: true,
            message: res?.data?.message,
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
          onClickSearch();
          let apiTmp;
          apiTmp = restURI.workYieldDetail + `?line_id=${Grid.getValue(rowKey, "line_id")}`;
          const result = await restAPI.get(apiTmp);
          setGridDataDetail(result?.data?.data?.rows);
          disRow.handleCheckReset(true, refMainGrid); //🔸저장 후 refGrid rowCheck 초기화
        }
      }
    } else {
      setIsSnackOpen({
        ...isSnackOpen,
        open: true,
        message: "적용수율을 입력해주세요.",
        severity: "error",
        location: "topCenter",
      });
    }
  };

  const {
    data,
    columnsHeader,
    columnsDetail,
    columnOptions,
    rowHeaders,
    rowHeadersNumCheck,
    rowHeadersNum,
    header,
    inputSet,
  } = LineYieldSet(onClickApply);

  const handleInputTextChange = (e) => {
    setInputTextChange({ ...inputTextChange, [e.target.id]: e.target.value });
  };

  useEffect(() => {
    onClickSearch();
  }, []);

  useEffect(() => {
    //🔸좌측 메뉴 접고, 펴기, 팝업 오픈 ➡️ 그리드 사이즈 리셋
    refMainGrid?.current?.gridInst?.refreshLayout();

    refDetailGrid?.current?.gridInst.refreshLayout();
  }, [isMenuSlide]);

  const onClickSearch = async () => {
    setDisableRowToggle(!disableRowToggle);
    if (!isBackDrop) {
      try {
        let apiTmp;
        inputTextChange.line_nm
          ? (apiTmp = restURI.workYield + `?line_nm=${inputTextChange.line_nm}`)
          : (apiTmp = restURI.workYield);
        const result = await restAPI.get(apiTmp);
        setGridDataHeader(result?.data?.data?.rows);
        setGridDataDetail([]);
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
        });
      } finally {
        setIsBackDrop(false);
      }
    }
  };

  const onClickGrid = async (e) => {
    if (e?.targetType !== "rowHeader" && e?.targetType === "cell" && e?.columnName !== "apply_button") {
      if (!isBackDrop) {
        const Grid = refMainGrid?.current?.gridInst;
        const clickedLineId = Grid.getValue(e?.rowKey, "line_id");
        try {
          let apiTmp;
          apiTmp = restURI.workYieldDetail + `?line_id=${clickedLineId}`;
          const result = await restAPI.get(apiTmp);
          setGridDataDetail(result?.data?.data?.rows);
          /*
          setIsSnackOpen({
            ...isSnackOpen,
            open: true,
            message: result?.data?.message,
            severity: "success",
            location: "bottomRight",
          });
          */
        } catch (err) {
          setIsSnackOpen({
            ...isSnackOpen,
            open: true,
            message: err?.response?.data?.message,
            severity: "error",
          });
        } finally {
          setIsBackDrop(false);
        }
      }
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      setSearchToggle(!searchToggle);
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
        refGrid={refMainGrid}
        onClickGrid={onClickGrid}
        onEditingFinish={onEditingFinishGrid}
      />
    );
  }, [gridDataHeader]);

  const GridDetail = useMemo(() => {
    return (
      <GridSingle
        columnOptions={columnOptions}
        columns={columnsDetail}
        rowHeaders={rowHeadersNum}
        header={header}
        data={gridDataDetail}
        draggable={false}
        refGrid={refDetailGrid}
      />
    );
  }, [gridDataDetail]);

  return (
    <ContentsArea isAllScreen={isAllScreen}>
      <S.ContentTop>
        <S.SearchWrap>
          <InputSearch
            id={"line_nm"}
            name={"라인명"}
            handleInputTextChange={handleInputTextChange}
            onKeyDown={onKeyDown}
          />
        </S.SearchWrap>
        <S.ButtonWrap>
          <BtnPanel
            btnName={"Search"}
            title={"등록"}
            height={"40px"}
            width={"110px"}
            color={"#1491CE"}
            fontSize={"14px"}
            fontColor={"#ffffff"}
            onClick={onClickSearch}
          />
        </S.ButtonWrap>
      </S.ContentTop>
      <S.ContentBottom>
        <S.ContentLeft>
          <S.GridHeaderWrap>
            <S.TitleButtonWrap>
              <S.Title>라인별 수율 등록</S.Title>
            </S.TitleButtonWrap>
            <S.TopGridWrap>{GridHeader}</S.TopGridWrap>
          </S.GridHeaderWrap>
        </S.ContentLeft>
        <S.ContentRight>
          <S.GridDetailWrap>
            <S.TitleButtonRight>
              <S.Title>라인별 수율 이력</S.Title>
            </S.TitleButtonRight>
            <S.BottomGridWrap>{GridDetail}</S.BottomGridWrap>
          </S.GridDetailWrap>
        </S.ContentRight>
      </S.ContentBottom>
      <NoticeSnack state={isSnackOpen} setState={setIsSnackOpen} />
      <BackDrop isBackDrop={isBackDrop} />
    </ContentsArea>
  );
}
