import React, { useEffect, useRef, useState } from "react";
import "tui-grid/dist/tui-grid.css";
import Grid from "@toast-ui/react-grid";
import GridTheme from "components/grid/setting/GridTheme";
import * as S from "./GridTooltip.styled";
import TooltipStore from "constant/Tooltip";

function GridSingle(props) {
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
      const Grid = refGrid?.current?.getInstance();
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
        Grid?.getColumns().map((col) => Grid?.removeCellClassName(beforeSelectedRow.current, col.name, "selectedBack"));
      }
      if (!isEditMode) {
        Grid?.getColumns().map((col) => Grid?.addCellClassName(e?.rowKey, col.name, "selectedBack"));
        beforeSelectedRow.current = e?.rowKey;
      }
    }
  };

  useEffect(() => {
    selectedRow();
  }, [isEditMode]);

  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipText, setTooltipText] = useState("");

  const checkTooltip = (columnName) => {
    const matchingTooltip = Object.values(TooltipStore).find((tooltipItem) => tooltipItem.columnName === columnName);

    if (matchingTooltip) {
      const tooltipContent = matchingTooltip.tooltip;
      return tooltipContent;
    } else {
      return false;
    }
  };

  useEffect(() => {
    const Grid = refGrid?.current?.gridInst;
    const handleMouseOver = (e) => {
      const { targetType, nativeEvent, columnName } = e;

      setTooltipPosition({ ...tooltipPosition, x: nativeEvent.layerX, y: nativeEvent.layerY });

      if (targetType === "columnHeader" && nativeEvent.ctrlKey) {
        const tooltipText = checkTooltip(columnName);
        if (tooltipText) {
          setTooltipText(tooltipText);
          setTooltipVisible(true);
        }
      } else {
        setTooltipVisible(false);
      }
    };

    if (Grid) {
      Grid.eventBus.on("mouseover", handleMouseOver);
    }
  }, []);

  // const afterEnterMoveBottom = (e) => {
  //   const Grid = refGrid?.current?.gridInst;
  //   const coords = Grid?.getFocusedCell();
  //   if (e?.columnName === coords?.columnName) {
  //     if (coords) {
  //       Grid.startEditing(coords?.rowKey + 1, coords?.columnName);
  //     }
  //   }
  // };

  return (
    <>
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
          onClickGrid(e);
          handleFocus();
          selectedRow(e);
        }}
        onDblclick={onDblClickGrid}
        onEditingFinish={(e) => {
          // afterEnterMoveBottom(e);
          onEditingFinish(e);
        }}
      />
      {tooltipVisible ? (
        <S.Tooltip x={tooltipPosition.x} y={40}>
          <S.TooltipContents>{tooltipText}</S.TooltipContents>
        </S.Tooltip>
      ) : null}
    </>
  );
}

export default GridSingle;
