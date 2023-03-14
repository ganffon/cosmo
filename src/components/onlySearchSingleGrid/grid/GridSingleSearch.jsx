import React, { useEffect, useContext } from "react";
// ⬇️ import TUI
import "tui-grid/dist/tui-grid.css";
import Grid from "@toast-ui/react-grid";
// ⬇️ reference of page
import GridTheme from "components/grid/setting/GridTheme";
import { OnlySearchSingleGridEvent } from "components/onlySearchSingleGrid/OnlySearchSingleGrid";
import { LayoutEvent } from "components/layout/common/Layout";

function GridSingleSearch(props) {
  const { columnOptions, columns, header, draggable } = props;
  const { refSingleGrid, singleGridData, isEditMode } = useContext(
    OnlySearchSingleGridEvent
  );
  const { isMenuSlide, isPopupOpen } = useContext(LayoutEvent);

  useEffect(() => {
    GridTheme();
  }, []);

  // ⚠️헤더 더블클릭 시 고정 컬럼 세팅 ➡️ 불가능 (더블클릭 이벤트에 헤더정보 안나옴)
  // const frozenColumnPick = (e) => {
  //   const setFrozen = e.instance.getIndexOfColumn(e.columnName) + 1;
  //   if (e.instance.store.column.frozenCount === setFrozen) {
  //     e.instance.store.column.frozenCount = 0;
  //   } else {
  //     e.instance.store.column.frozenCount = setFrozen;
  //   }
  //   console.log(e);
  // };

  useEffect(() => {
    //🔸좌측 메뉴 접고, 펴기, 팝업 오픈 ➡️ 그리드 사이즈 리셋
    refSingleGrid?.current?.gridInst?.refreshLayout();
  }, [isMenuSlide, refSingleGrid.current, isPopupOpen, isEditMode]);

  return (
    <Grid
      scrollX={true}
      scrollY={true}
      rowHeaders={["checkbox", "rowNum"]} // index 컬럼 생성 "rowNum", "checkbox", "radio"
      rowHeight={"auto"} // index 컬럼 자동 높이 조절
      bodyHeight={"fitToParent"}
      heightResizable={false}
      ref={refSingleGrid}
      // onClick={frozenColumnPick}
      // onDblclick={frozenColumnPick}
      columnOptions={columnOptions}
      columns={columns}
      data={singleGridData}
      // data={props.data}
      header={header}
      draggable={draggable}
    />
  );
}

export default GridSingleSearch;
