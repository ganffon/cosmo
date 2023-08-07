import CN from "json/ColumnName.json";
import "components/grid/setting/GridStyle.css";
import * as C from "constant/Grid.js";
import * as col from "custom/GridColumnSet";

function SysOptionManageSet(isEditMode) {
  const columnOptions = {
    resizable: true,
    frozenBorderWidth: 3,
    frozenCount: 0, // 🔸frozenColumn은 여기 값만 수정
  };
  const rowHeaders = ["checkbox", "rowNum"];
  const rowHeadersNum = ["rowNum"];
  const header = {};
  const datePickerSet = null;

  const columnsHeader = [];
  const columns = [
    col.id("option_id", CN.option_id, C.HIDDEN_ID),
    col.text("option_cd", CN.option_cd, false, false, C.WIDTH_SHORT, "center"),
    col.text("option_nm", CN.option_nm, false, false, C.WIDTH_MIDDLE, "center"),
    col.text("value", CN.value, isEditMode, false, C.WIDTH_MIDDLE, "center"),
    col.text("remark", CN.remark, false, false, C.WIDTH_MIDDLE, "center"),
    col.date("create_at", CN.create_at),
    col.date("update_at", CN.update_at),
  ];

  const inputSet = [
    {
      id: "option_cd",
      name: CN.option_cd,
    },
    {
      id: "option_nm",
      name: CN.option_nm,
    },
  ];

  return {
    columnsHeader,
    columnOptions,
    rowHeaders,
    rowHeadersNum,
    header,
    datePickerSet,
    inputSet,
    columns,
  };
}

export default SysOptionManageSet;
