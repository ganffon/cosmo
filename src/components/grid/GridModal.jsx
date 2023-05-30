import React, { useEffect } from "react";
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

  // const [pasteData] = useDataApi({});

  // const handleClipboard = (event) => {
  //   if (event.clipboardData) {
  //     event.preventDefault();
  //     const clipboardData = event.clipboardData.getData("text");
  //     const rows = clipboardData.split("\n").map((row) => row.split("\t"));
  //     const dataRows = rows.map((row) => {
  //       const newRow = {};
  //       row.forEach((value, index) => {
  //         const columnName = pasteData.columns[index].name;
  //         newRow[columnName] = value;
  //       });
  //       return newRow;
  //     });
  //     pasteData.setRows(dataRows);
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
      onClick={onClick}
      onDblclick={onDblClick}
      onEditingFinish={onEditingFinish}
      // onClipboard={handleClipboard}
    />
  );
}

export default GridModal;
