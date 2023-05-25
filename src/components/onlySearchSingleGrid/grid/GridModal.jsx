import React, { useState, useEffect, useContext } from "react";
// ⬇️ import TUI
import "tui-grid/dist/tui-grid.css";
import Grid from "@toast-ui/react-grid";
// ⬇️ reference of page
import GridTheme from "../../grid/setting/GridTheme";
import { LayoutContext } from "components/layout/common/Layout";

function GridModal(props) {
  const { refGrid, columns, columnOptions, header, draggable, onClickGrid } =
    props;
  const { isModalOpen } = useContext(LayoutContext);
  const [gridData, setGridData] = useState();

  const onChange = (e) => {};

  useEffect(() => {
    GridTheme();
  }, []);

  useEffect(() => {
    //🔸좌측 메뉴 접고, 펴기, 팝업 오픈 ➡️ 그리드 사이즈 리셋
    refGrid?.current?.gridInst?.refreshLayout();
  }, [refGrid.current, isModalOpen]);

  return (
    <Grid
      scrollX={true}
      scrollY={true}
      rowHeaders={["checkbox", "rowNum"]} // index 컬럼 생성 "rowNum", "checkbox", "radio"
      rowHeight={"auto"} // index 컬럼 자동 높이 조절
      bodyHeight={"fitToParent"}
      heightResizable={false}
      ref={refGrid}
      // onClick={frozenColumnPick}
      // onDblclick={frozenColumnPick}
      onAfterChange={onChange}
      columnOptions={columnOptions}
      columns={columns}
      data={gridData}
      // data={props.data}
      header={header}
      draggable={draggable}
      onClick={onClickGrid}
    />
  );
}

export default GridModal;
