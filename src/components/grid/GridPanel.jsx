import React, { useEffect, useRef } from "react";
import "tui-grid/dist/tui-grid.css";
import Grid from "@toast-ui/react-grid";
import GridTheme from "components/grid/setting/GridTheme";

function GridPanel(props) {
  const {
    columnOptions = [],
    columns = [],
    rowHeaders = [],
    header = [],
    data = [],
    draggable = false,
    refGrid = null,
    onClickGrid = () => {},
    onDblClickGrid = () => {},
    onEditingFinish = () => {},
    isEditMode = false,
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
  const beforeSelectedRow = useRef("");
  const selectedRow = (e) => {
    if (refGrid) {
      const Grid = refGrid?.current?.gridInst;
      if (String(beforeSelectedRow.current)) {
        Grid.getColumns().map((col) => Grid.removeCellClassName(beforeSelectedRow.current, col.name, "selectedBack"));
      }
      if (!isEditMode) {
        Grid.getColumns().map((col) => Grid.addCellClassName(e?.rowKey, col.name, "selectedBack"));
        beforeSelectedRow.current = e?.rowKey;
      }
    }
  };

  useEffect(() => {
    selectedRow();
  }, [isEditMode]);
  return (
    <Grid
      scrollX={true}
      scrollY={true}
      rowHeaders={rowHeaders} // index 컬럼 생성 "rowNum", "checkbox", "radio"
      rowHeight={60} // index 컬럼 자동 높이 조절
      bodyHeight={"fitToParent"}
      heightResizable={false}
      columnOptions={columnOptions}
      columns={columns}
      data={data}
      header={header}
      draggable={draggable}
      ref={refGrid}
      onClick={(e) => {
        onClickGrid(e);
        handleFocus();
        selectedRow(e);
      }}
      onDblclick={onDblClickGrid}
      onEditingFinish={onEditingFinish}
    />
  );
}

export default GridPanel;
