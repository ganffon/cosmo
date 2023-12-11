import { useContext, useState, useEffect, useRef, useReducer } from "react";
import { LayoutContext } from "components/layout/common/Layout";
import GridSingle from "components/grid/GridSingle";
import NoticeSnack from "components/alert/NoticeSnack";

import BackDrop from "components/backdrop/BackDrop";
import WeightErpLotSet from "pages/mes/equipment/weightErpLot/weightErpLotSet";
import useInputSet from "custom/useInputSet";
import * as S from "./weightErpLot.styled";
import restURI from "json/restURI.json";
import restAPI from "api/restAPI";
import ContentsArea from "components/layout/common/ContentsArea";
import BtnComponent from "components/button/BtnComponent";
import DateTime from "components/datetime/DateTime";
import { FdrDateRange } from "components/datetime/fdrDateRange";

export function WeightErpLot(props) {
  const { currentMenuName, isMenuSlide } = useContext(LayoutContext);
  const refSingleGrid = useRef(null);
  const [isBackDrop, setIsBackDrop] = useState(false);
  const [gridData, setGridData] = useState(null);
  const [isSnackOpen, setIsSnackOpen] = useState({
    open: false,
  });
  const [searchToggle, setSearchToggle] = useState(false);

  const { header, columns, columnOptions, inputSet } = WeightErpLotSet();

  const filterReducer = (filter, action) => {
    switch (action.type) {
      case "update":
        return { ...filter, [action.id]: action.value };
      case "reset":
        return { ...{ startDate: DateTime(-7).dateFull, endDate: DateTime(0).dateFull } };
      default:
        return filter;
    }
  };

  const [filter, filterDispatch] = useReducer(filterReducer, {
    startDate: DateTime(-7).dateFull,
    endDate: DateTime(0).dateFull,
  });

  useEffect(() => {
    //🔸좌측 메뉴 접고, 펴기, 팝업 오픈 ➡️ 그리드 사이즈 리셋
    if (refSingleGrid?.current !== null) {
      refSingleGrid?.current?.gridInst?.refreshLayout();
    }
  }, [isMenuSlide]);

  const [inputBoxID, inputTextChange, setInputTextChange] = useInputSet(currentMenuName, inputSet);

  useEffect(() => {
    setTimeout(() => {
      onSearch();
    }, 100);
  }, [searchToggle]);

  const onSearch = async () => {
    const params = {
      start_date: filter.startDate,
      end_date: filter.endDate,
    };
    try {
      setIsBackDrop(true);

      const result = await restAPI.get(restURI.prdWeighDetailNonLot, { params });
      setGridData(result.data.data.rows);
    } catch (err) {
      console.log(err);
    } finally {
      setIsBackDrop(false);
    }
  };

  return (
    <ContentsArea>
      <S.ShadowBoxButton>
        <S.ToolWrap>
          <S.SearchWrap>
            <FdrDateRange
              startID={"startDate"}
              endID={"endDate"}
              startValue={filter.startDate}
              endValue={filter.endDate}
              dispatch={filterDispatch}
              onSearch={onSearch}
              type={"date"}
            />
          </S.SearchWrap>
          <S.ButtonWrap>
            <BtnComponent btnName={"Search"} onClick={onSearch} />
          </S.ButtonWrap>
        </S.ToolWrap>
      </S.ShadowBoxButton>

      <S.ShadowBoxGrid>
        <S.GridWrap>
          <GridSingle
            columnOptions={columnOptions}
            columns={columns}
            rowHeaders={["rowNum"]}
            header={header}
            data={gridData}
            draggable={false}
            refGrid={refSingleGrid}
          />
        </S.GridWrap>
      </S.ShadowBoxGrid>
      <NoticeSnack state={isSnackOpen} setState={setIsSnackOpen} />
      <BackDrop isBackDrop={isBackDrop} />
    </ContentsArea>
  );
}
