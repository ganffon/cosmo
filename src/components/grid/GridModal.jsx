import React, { useEffect, useRef } from "react";
import "tui-grid/dist/tui-grid.css";
import Grid, { useDataApi } from "@toast-ui/react-grid";
import GridTheme from "components/grid/setting/GridTheme";

function GridModal(props) {
  const {
    columnOptions = [],
    columns = [],
    rowHeaders = [],
    header = [],
    data = [],
    draggable = false,
    refGrid = null,
    onClick = () => {},
    onDblClick = () => {},
    onEditingFinish = () => {},
  } = props;

  useEffect(() => {
    GridTheme();
  }, []);

  const handleFocus = () => {
    if (refGrid) {
      const Grid = refGrid?.current?.gridInst;
      const coords = Grid.getFocusedCell();
      if (coords) {
        Grid.startEditing(coords.rowKey, coords.columnName);
      }
    }
  };
  // const afterEnterMoveBottom = (e) => {
  //   const Grid = refGrid?.current?.gridInst;
  //   const coords = Grid.getFocusedCell();
  //   if (coords) {
  //     Grid.startEditing(coords.rowKey + 1, coords.columnName);
  //   }
  // };

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
      onClick={(e) => {
        onClick(e);
        handleFocus();
      }}
      onDblclick={onDblClick}
      onEditingFinish={(e) => {
        // afterEnterMoveBottom(e);
        onEditingFinish(e);
      }}
      // onClipboard={handleClipboard}
    />
  );
}

export default GridModal;
