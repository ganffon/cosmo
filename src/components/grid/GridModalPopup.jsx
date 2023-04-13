import React, { useEffect } from "react";
import "tui-grid/dist/tui-grid.css";
import Grid from "@toast-ui/react-grid";
import GridTheme from "components/grid/setting/GridTheme";

function GridModalPopup(props) {
  const {
    columnOptions,
    columns,
    rowHeaders,
    header,
    data,
    draggable,
    refGrid,
    onDblClick,
  } = props;
  useEffect(() => {
    GridTheme();
  }, []);
  return (
    <Grid
      scrollX={true}
      scrollY={true}
      rowHeaders={rowHeaders} // index 컬럼 생성 "rowNum", "checkbox", "radio"
      rowHeight={"auto"} // index 컬럼 자동 높이 조절
      bodyHeight={"fitToParent"}
      heightResizable={false}
      columnOptions={columnOptions}
      columns={columns}
      data={data}
      header={header}
      draggable={draggable}
      ref={refGrid}
      onDblclick={onDblClick}
    />
  );
}

export default GridModalPopup;
