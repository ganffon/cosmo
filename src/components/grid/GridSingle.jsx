import React, { useEffect, useRef, useState } from "react";
import "tui-grid/dist/tui-grid.css";
import Grid from "@toast-ui/react-grid";
import GridTheme from "components/grid/setting/GridTheme";
import * as S from "./GridTooltip.styled";
import TooltipStore from "constant/Tooltip";
import * as RE from "custom/RegularExpression";

function GridSingle(props) {
  const {
    columnOptions = [],
    columns = [],
    rowHeaders = [],
    header = {},
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

  const handleFocus = (e) => {
    if (e.targetType === "cell") {
      if (refGrid) {
        const Grid = refGrid?.current?.getInstance();
        const coords = Grid.getFocusedCell();
        if (coords) {
          Grid.startEditing(coords.rowKey, coords.columnName);
        }
      }
    }
  };
  // const beforeSelectedRow = useRef("");
  const selectedRow = (e) => {
    if (refGrid) {
      const grid = refGrid?.current?.getInstance();
      if (!isEditMode) {
        if (e?.rowKey !== null && e?.rowKey !== undefined) {
          for (let i = 0; i < grid.getRowCount(); i++) {
            grid.removeRowClassName(i, "selectedBack");
          }
        }
        grid.addRowClassName(e?.rowKey, "selectedBack");
      } else {
        for (let i = 0; i < grid.getRowCount(); i++) {
          grid.removeRowClassName(i, "selectedBack");
        }
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

    let tooltipTimeout;
    const handleMouseOver = (e) => {
      const { targetType, nativeEvent, columnName } = e;
      setTooltipPosition({
        ...tooltipPosition,
        x: nativeEvent.layerX,
        y: nativeEvent.layerY,
      });

      if (targetType === "columnHeader") {
        tooltipTimeout = setTimeout(() => {
          const tooltipText = checkTooltip(columnName);
          if (tooltipText) {
            setTooltipText(tooltipText);
            setTooltipVisible(true);
          }
        }, 1000);
      }
    };
    const handleMouseOut = (e) => {
      clearTimeout(tooltipTimeout);
      setTooltipVisible(false);
    };

    if (Grid) {
      Grid.eventBus.on("mouseover", handleMouseOver);
      Grid.eventBus.on("mouseout", handleMouseOut);
    }
  }, []);

  const onRegularExpression = (e) => {
    const grid = refGrid?.current?.getInstance();
    const column = grid.getColumn(e.columnName);

    switch (column.className) {
      case "gridNumber":
        grid.setValue(e?.rowKey, e?.columnName, RE.onlyNum(e?.value));
        break;
      case "gridDecimalTwoPoints":
        grid.setValue(e?.rowKey, e?.columnName, RE.DecimalTwoPoints(e?.value));
        break;
      case "gridDecimalFourPoints":
        grid.setValue(e?.rowKey, e?.columnName, RE.DecimalFourPoints(e?.value));
        break;
      // case "gridTime":
      //   grid.setValue(e?.rowKey, e?.columnName, onlyTime(e?.value));
      //   break;
      default:
    }
  };

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
          handleFocus(e);
          selectedRow(e);
        }}
        onDblclick={onDblClickGrid}
        onEditingFinish={(e) => {
          onRegularExpression(e);
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
